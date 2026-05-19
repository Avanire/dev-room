import { Html } from '@react-three/drei';
import { animated, useSpring } from '@react-spring/web';
import { usePlayerStore } from 'entities/Player/model/usePlayerStore';
import { roomConfig } from 'shared/config/roomConfig';
import { COLORS } from 'shared/config/retroFutureTheme';

export const SpeechBubble = () => {
    const dialogData = usePlayerStore(s => s.dialogData);
    const activeId = usePlayerStore(s => s.activeInteractableId);
    const activeObject = roomConfig.objects.find(o => o.id === activeId);

    const styles = useSpring({
        opacity: dialogData ? 1 : 0,
        transform: dialogData ? 'scale(1)' : 'scale(0.9)',
        config: { tension: 200, friction: 20 },
    });

    if (!activeObject || !dialogData) return null;

    return (
        <Html
            position={[activeObject.position[0], 2.2, activeObject.position[1]]}
            center
            distanceFactor={6}
            style={{ pointerEvents: 'auto' }}
            occlude={false}
        >
            <animated.div
                style={{
                    ...styles,
                    background: 'rgba(10, 10, 26, 0.85)',
                    border: `2px solid ${COLORS.neonCyan}`,
                    borderRadius: '6px',
                    padding: '14px 18px',
                    maxWidth: '300px',
                    fontFamily: '"Orbitron", sans-serif',
                    fontSize: '10px',
                    lineHeight: '1.5',
                    color: COLORS.text,
                    boxShadow: `0 0 15px ${COLORS.neonCyan}44, inset 0 0 10px ${COLORS.neonCyan}22`,
                    backdropFilter: 'blur(4px)',
                    position: 'relative',
                }}
            >
                {/* Хвостик-указатель */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: '-10px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 0,
                        height: 0,
                        borderLeft: '8px solid transparent',
                        borderRight: '8px solid transparent',
                        borderTop: `10px solid ${COLORS.neonCyan}`,
                    }}
                />

                <h3
                    style={{
                        margin: '0 0 8px',
                        fontSize: '11px',
                        fontWeight: 700,
                        color: COLORS.neonCyan,
                        textShadow: `0 0 8px ${COLORS.neonCyan}`,
                    }}
                >
                    {dialogData.title}
                </h3>
                <p style={{ margin: '0 0 8px', whiteSpace: 'pre-wrap' }}>{dialogData.text}</p>
                {dialogData.links?.map((link, i) => (
                    <a
                        key={i}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'block',
                            color: COLORS.neonMagenta,
                            fontSize: '9px',
                            wordBreak: 'break-all',
                            textShadow: `0 0 5px ${COLORS.neonMagenta}`,
                        }}
                    >
                        {link}
                    </a>
                ))}
            </animated.div>
        </Html>
    );
};
