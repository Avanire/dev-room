import { animated, useSpring } from '@react-spring/web';
import { usePlayerStore } from 'entities/Player/model/usePlayerStore';
import { COLORS } from 'shared/config/retroFutureTheme';

export const ModalDialog = () => {
    const dialogData = usePlayerStore(s => s.dialogData);

    const styles = useSpring({
        opacity: dialogData ? 1 : 0,
        transform: dialogData
            ? 'translate(-50%, -50%) scale(1)'
            : 'translate(-50%, -50%) scale(0.9)',
        config: { tension: 200, friction: 20 },
    });

    if (!dialogData) return null;

    return (
        <animated.div
            key={dialogData.title + dialogData.text}
            className="neon-text-flicker"
            style={{
                ...styles,
                position: 'fixed',
                top: '50%',
                left: '50%',
                zIndex: 1000,
                pointerEvents: 'auto',
                maxWidth: '600px',
                width: '80vw',
                maxHeight: '80vh',
                overflowY: 'auto',
                padding: '30px 25px',
                background: COLORS.bg,
                borderRadius: '8px',
                backdropFilter: 'blur(4px)',
                backgroundImage: `repeating-linear-gradient(0deg, ${COLORS.bg}, ${COLORS.bg} 2px, #0f0f1a 2px, #0f0f1a 4px)`,
            }}
        >
            <h3 style={{ margin: '0 0 15px', fontSize: '16px', fontWeight: 700 }}>
                {dialogData.title}
            </h3>
            {dialogData.text && (
                <p
                    style={{
                        margin: '0 0 15px',
                        fontSize: '12px',
                        whiteSpace: 'pre-wrap',
                        lineHeight: 1.5,
                    }}
                >
                    {dialogData.text}
                </p>
            )}
            {dialogData.links && dialogData.links.length > 0 && (
                <div>
                    {dialogData.links.map((link, i) => (
                        <a
                            key={i}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'block',
                                color: COLORS.bookThree,
                                fontSize: '14px',
                                wordBreak: 'break-all',
                            }}
                        >
                            {link.replace('mailto:', '')}
                        </a>
                    ))}
                </div>
            )}
        </animated.div>
    );
};
