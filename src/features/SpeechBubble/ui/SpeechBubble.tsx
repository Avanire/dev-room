import {Html} from '@react-three/drei'
import {animated, useSpring} from '@react-spring/web'
import {usePlayerStore} from 'entities/Player/model/usePlayerStore'
import {roomConfig} from 'shared/config/roomConfig'

export const SpeechBubble = () => {
    const dialogData = usePlayerStore((s) => s.dialogData)
    const activeId = usePlayerStore((s) => s.activeInteractableId)

    // Находим объект, чтобы получить его позицию для привязки бабла
    const activeObject = roomConfig.objects.find((o) => o.id === activeId)

    // Анимация появления/исчезновения
    const styles = useSpring({
        opacity: dialogData ? 1 : 0,
        transform: dialogData ? 'scale(1)' : 'scale(0.8)',
        config: { tension: 300, friction: 20 },
    })

    if (!activeObject || !dialogData) return null

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
                    background: '#fff',
                    border: '4px solid #2d3436',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    maxWidth: '280px',
                    fontFamily: '"Press Start 2P", monospace',
                    fontSize: '10px',
                    lineHeight: '1.6',
                    color: '#2d3436',
                    boxShadow: '6px 6px 0 #2d3436',
                    position: 'relative',
                }}
            >
                {/* Хвостик бабла */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: '-16px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 0,
                        height: 0,
                        borderLeft: '10px solid transparent',
                        borderRight: '10px solid transparent',
                        borderTop: '12px solid #fff',
                        zIndex: 1,
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        bottom: '-22px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 0,
                        height: 0,
                        borderLeft: '12px solid transparent',
                        borderRight: '12px solid transparent',
                        borderTop: '14px solid #2d3436',
                    }}
                />

                <h3 style={{ margin: '0 0 8px', fontSize: '11px', fontWeight: 'bold' }}>
                    {dialogData.title}
                </h3>
                <p style={{ margin: '0 0 8px', whiteSpace: 'pre-wrap' }}>
                    {dialogData.text}
                </p>
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
                                    color: '#0984e3',
                                    fontSize: '9px',
                                    wordBreak: 'break-all',
                                }}
                            >
                                {link}
                            </a>
                        ))}
                    </div>
                )}
            </animated.div>
        </Html>
    )
}