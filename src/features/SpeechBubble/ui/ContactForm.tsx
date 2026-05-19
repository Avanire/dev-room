import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { COLORS } from 'shared/config/retroFutureTheme';

export const ContactForm = () => {
    const [subject, setSubject] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [sent, setSent] = useState(false);
    const [error, setError] = useState('');
    const [sending, setSending] = useState(false);

    // Honeypot - боты заполнят это поле, люди нет
    const [honeypot, setHoneypot] = useState('');
    const honeypotRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Проверка honeypot: если поле заполнено - молча завершаем "успехом"
        if (honeypot) {
            // Имитация задержки, чтобы бот не понял блокировку
            setSending(true);
            setTimeout(() => {
                setSending(false);
                setSent(true);
            }, 2000);
            return;
        }

        setSending(true);

        try {
            await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                { subject, email, message },
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            );
            setSent(true);
        } catch (err) {
            setError('Ошибка отправки. Попробуйте позже.');
            console.error('EmailJS error:', err);
        } finally {
            setSending(false);
        }
    };

    return (
        <div style={{ width: '100%' }}>
            {sent ? (
                <p style={{ color: COLORS.neonGreen, textShadow: `0 0 8px ${COLORS.neonGreen}` }}>
                    Сообщение отправлено! Я скоро свяжусь с вами.
                </p>
            ) : (
                <form
                    onSubmit={handleSubmit}
                    style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
                >
                    {error && (
                        <p
                            style={{
                                color: COLORS.neonMagenta,
                                fontSize: '10px',
                                textShadow: `0 0 5px ${COLORS.neonMagenta}`,
                            }}
                        >
                            {error}
                        </p>
                    )}

                    {/* Скрытое honeypot-поле */}
                    <div
                        style={{ position: 'absolute', left: '-9999px', opacity: 0 }}
                        aria-hidden="true"
                    >
                        <label htmlFor="honeypot">Оставьте это поле пустым</label>
                        <input
                            ref={honeypotRef}
                            type="text"
                            id="honeypot"
                            name="honeypot"
                            value={honeypot}
                            onChange={e => setHoneypot(e.target.value)}
                            tabIndex={-1}
                            autoComplete="off"
                        />
                    </div>

                    {/* Видимые поля */}
                    <div>
                        <label style={{ fontSize: '10px', color: COLORS.neonCyan }}>Тема</label>
                        <input
                            type="text"
                            value={subject}
                            onChange={e => setSubject(e.target.value)}
                            required
                            disabled={sending}
                            style={{
                                width: '100%',
                                padding: '6px 8px',
                                background: COLORS.darkPanel,
                                border: `1px solid ${COLORS.neonCyan}`,
                                borderRadius: '4px',
                                color: COLORS.text,
                                fontFamily: 'Orbitron, monospace',
                                fontSize: '11px',
                                outline: 'none',
                                boxShadow: `0 0 8px ${COLORS.neonCyan}44`,
                                opacity: sending ? 0.5 : 1,
                            }}
                        />
                    </div>
                    <div>
                        <label style={{ fontSize: '10px', color: COLORS.neonCyan }}>
                            Email для связи
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            disabled={sending}
                            style={{
                                width: '100%',
                                padding: '6px 8px',
                                background: COLORS.darkPanel,
                                border: `1px solid ${COLORS.neonCyan}`,
                                borderRadius: '4px',
                                color: COLORS.text,
                                fontFamily: 'Orbitron, monospace',
                                fontSize: '11px',
                                outline: 'none',
                                boxShadow: `0 0 8px ${COLORS.neonCyan}44`,
                                opacity: sending ? 0.5 : 1,
                            }}
                        />
                    </div>
                    <div>
                        <label style={{ fontSize: '10px', color: COLORS.neonCyan }}>
                            Сообщение
                        </label>
                        <textarea
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                            required
                            rows={3}
                            disabled={sending}
                            style={{
                                width: '100%',
                                padding: '6px 8px',
                                background: COLORS.darkPanel,
                                border: `1px solid ${COLORS.neonCyan}`,
                                borderRadius: '4px',
                                color: COLORS.text,
                                fontFamily: 'Orbitron, monospace',
                                fontSize: '11px',
                                resize: 'vertical',
                                outline: 'none',
                                boxShadow: `0 0 8px ${COLORS.neonCyan}44`,
                                opacity: sending ? 0.5 : 1,
                            }}
                        />
                    </div>

                    {sending ? (
                        <div
                            style={{
                                alignSelf: 'flex-end',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                fontFamily: 'Orbitron, monospace',
                                fontSize: '11px',
                                color: COLORS.neonCyan,
                                textShadow: `0 0 8px ${COLORS.neonCyan}`,
                            }}
                        >
                            <span className="neon-spinner" />
                            Отправка...
                        </div>
                    ) : (
                        <button
                            type="submit"
                            style={{
                                padding: '8px 16px',
                                background: 'transparent',
                                border: `2px solid ${COLORS.neonMagenta}`,
                                borderRadius: '4px',
                                color: COLORS.neonMagenta,
                                fontFamily: 'Orbitron, monospace',
                                fontSize: '11px',
                                cursor: 'pointer',
                                textShadow: `0 0 5px ${COLORS.neonMagenta}`,
                                boxShadow: `0 0 10px ${COLORS.neonMagenta}44`,
                                transition: 'all 0.3s',
                                alignSelf: 'flex-end',
                            }}
                            onMouseOver={e => {
                                e.currentTarget.style.background = COLORS.neonMagenta;
                                e.currentTarget.style.color = '#000';
                            }}
                            onMouseOut={e => {
                                e.currentTarget.style.background = 'transparent';
                                e.currentTarget.style.color = COLORS.neonMagenta;
                            }}
                        >
                            Отправить
                        </button>
                    )}
                </form>
            )}
        </div>
    );
};
