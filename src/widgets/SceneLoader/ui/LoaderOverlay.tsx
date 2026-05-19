import { useEffect, useState } from 'react';
import { COLORS } from 'shared/config/retroFutureTheme';

export const LoaderOverlay = () => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        // Минимальная задержка для плавности, затем скрываем
        const timer = setTimeout(() => setVisible(false), 1200);
        return () => clearTimeout(timer);
    }, []);

    if (!visible) return null;

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 2000,
                background: COLORS.bg,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: '"Orbitron", monospace',
                color: COLORS.neonCyan,
                textShadow: `0 0 10px ${COLORS.neonCyan}`,
                pointerEvents: 'all', // блокирует взаимодействие с Canvas
            }}
        >
            <div
                style={{
                    fontSize: '24px',
                    letterSpacing: '4px',
                    marginBottom: '20px',
                    animation: 'neon-text-flicker 1.5s infinite',
                }}
            >
                INITIALIZING...
            </div>
            {/* Простая неоновая полоса прогресса */}
            <div
                style={{
                    width: '300px',
                    height: '4px',
                    background: COLORS.darkPanel,
                    borderRadius: '2px',
                    overflow: 'hidden',
                    border: `1px solid ${COLORS.neonCyan}`,
                    boxShadow: `0 0 8px ${COLORS.neonCyan}`,
                }}
            >
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        background: COLORS.neonCyan,
                        boxShadow: `0 0 12px ${COLORS.neonCyan}`,
                        animation: 'progress-glow 0.8s ease-in-out infinite alternate',
                    }}
                />
            </div>
            <div style={{ fontSize: '12px', marginTop: '10px', opacity: 0.7 }}>LOADING</div>
        </div>
    );
};
