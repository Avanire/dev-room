import {Box, Cylinder, Ring} from '@react-three/drei'
import {InteractableConfig} from 'shared/config/roomConfig'
import {COLORS} from 'shared/config/retroFutureTheme'

interface Props {
    config: InteractableConfig
}

export const InteractableObject = ({ config }: Props) => {
    const [x, z, objY] = config.position;
    const y = objY !== undefined ? objY : 0.5;

    const renderObject = () => {
        switch (config.type) {
            case 'monitor':
                return (
                    <group position={[x, y - 0.2, z]}>
                        {/* Подставка */}
                        <Cylinder args={[0.15, 0.2, 0.3, 8]} position={[0, -0.15, 0]}>
                            <meshStandardMaterial
                                color={COLORS.metalLight}
                                roughness={0.3}
                                metalness={0.9}
                            />
                        </Cylinder>
                        {/* Голографический экран */}
                        <Box
                            args={[0.7, 0.45, 0.05]}
                            position={[0, 0.2, -0.15]}
                        >
                            <meshStandardMaterial
                                color={COLORS.hologram}
                                emissive={COLORS.emissiveCyan}
                                emissiveIntensity={0.6}
                                transparent
                                opacity={0.8}
                                roughness={0.2}
                                metalness={0.4}
                            />
                        </Box>
                        {/* Кольцо вокруг экрана */}
                        <Ring
                            args={[0.35, 0.4, 32]}
                            position={[0, 0.2, -0.12]}
                            rotation={[0, 0, 0]}
                        >
                            <meshStandardMaterial
                                color={COLORS.neonCyan}
                                emissive={COLORS.neonCyan}
                                emissiveIntensity={0.8}
                                side={2}
                            />
                        </Ring>
                    </group>
                )
            case 'server':
                return (
                    <group position={[x, y, z]}>
                        <Cylinder args={[0.3, 0.3, 1.4, 16]}>
                            <meshStandardMaterial
                                color={COLORS.metal}
                                roughness={0.4}
                                metalness={0.8}
                            />
                        </Cylinder>
                        {/* Светящиеся индикаторы */}
                        {[0.8, 0.4, 0, -0.4, -0.8].map((h, i) => (
                            <Cylinder
                                key={i}
                                args={[0.32, 0.32, 0.05, 16]}
                                position={[0, h, 0]}
                            >
                                <meshStandardMaterial
                                    color={
                                        i % 2 === 0 ? COLORS.neonCyan : COLORS.neonMagenta
                                    }
                                    emissive={
                                        i % 2 === 0 ? COLORS.neonCyan : COLORS.neonMagenta
                                    }
                                    emissiveIntensity={0.7}
                                    roughness={0.2}
                                    metalness={0.2}
                                />
                            </Cylinder>
                        ))}
                    </group>
                )
            case 'bookshelf':
                return (
                    <group position={[x, y, z]}>
                        <Box args={[1.2, 1.2, 0.4]}>
                            <meshStandardMaterial
                                color={COLORS.darkPanel}
                                roughness={0.5}
                                metalness={0.6}
                            />
                        </Box>
                        {/* Полки и светящиеся ячейки */}
                        {[0, 0.3, -0.3].map((dx, i) => (
                            <Box
                                key={i}
                                args={[0.15, 0.3, 0.3]}
                                position={[dx, 0, 0]}
                            >
                                <meshStandardMaterial
                                    color={i % 2 === 0 ? COLORS.neonCyan : COLORS.neonMagenta}
                                    emissive={
                                        i % 2 === 0 ? COLORS.neonCyan : COLORS.neonMagenta
                                    }
                                    emissiveIntensity={0.5}
                                    transparent
                                    opacity={0.9}
                                />
                            </Box>
                        ))}
                    </group>
                )
            case 'whiteboard':
                return (
                    <group position={[x, y, z]}>
                        {/* Рамка */}
                        <Box args={[1.1, 0.9, 0.05]}>
                            <meshStandardMaterial
                                color={COLORS.metalLight}
                                roughness={0.3}
                                metalness={0.9}
                            />
                        </Box>
                        {/* Доска */}
                        <Box args={[0.9, 0.7, 0.06]} position={[0, 0, 0.01]}>
                            <meshStandardMaterial
                                color={COLORS.hologram}
                                emissive={COLORS.emissiveCyan}
                                emissiveIntensity={0.3}
                                transparent
                                opacity={0.7}
                            />
                        </Box>
                    </group>
                )
            case 'laptop':
                return (
                    <group position={[x, y, z]}>
                        {/* Основание */}
                        <Box args={[0.8, 0.05, 0.5]}>
                            <meshStandardMaterial
                                color={COLORS.metal}
                                roughness={0.4}
                                metalness={0.8}
                            />
                        </Box>
                        {/* Голографический экран над основанием */}
                        <Box
                            args={[0.7, 0.35, 0.02]}
                            position={[0, 0.2, -0.2]}
                        >
                            <meshStandardMaterial
                                color={COLORS.hologram}
                                emissive={COLORS.emissiveMagenta}
                                emissiveIntensity={0.5}
                                transparent
                                opacity={0.8}
                            />
                        </Box>
                    </group>
                )
            case 'desk':
                return (
                    <group position={[x, y, z]}>
                        {/* Столешница */}
                        <Box args={[1.4, 0.06, 0.8]} position={[0, -0.03, 0]}>
                            <meshStandardMaterial
                                color={COLORS.surfaceLight}
                                roughness={0.3}
                                metalness={0.7}
                            />
                        </Box>
                        {/* Ножки стола */}
                        {[[-0.6, -0.45, -0.3], [0.6, -0.45, -0.3], [-0.6, -0.45, 0.3], [0.6, -0.45, 0.3]].map((pos, i) => (
                            <Cylinder key={i} args={[0.04, 0.06, 0.9, 8]} position={[pos[0], pos[1], pos[2]]}>
                                <meshStandardMaterial color={COLORS.surfaceMedium} roughness={0.4} metalness={0.8} />
                            </Cylinder>
                        ))}
                        {/* Монитор */}
                        <group position={[0, 0.18, -0.2]}>
                            <Cylinder args={[0.06, 0.1, 0.15, 8]} position={[0, -0.07, 0]}>
                                <meshStandardMaterial color={COLORS.surfaceLighter} roughness={0.3} metalness={0.7} />
                            </Cylinder>
                            <Box args={[0.8, 0.5, 0.04]} position={[0, 0.2, 0]}>
                                <meshStandardMaterial
                                    color={COLORS.hologram}
                                    emissive={COLORS.emissiveCyan}
                                    emissiveIntensity={0.6}
                                    roughness={0.2}
                                    metalness={0.3}
                                />
                            </Box>
                            <Box args={[0.84, 0.54, 0.02]} position={[0, 0.2, 0.03]}>
                                <meshStandardMaterial color={COLORS.neonCyan} emissive={COLORS.neonCyan} emissiveIntensity={0.4} roughness={0.2} metalness={0.3} />
                            </Box>
                        </group>
                        {/* Клавиатура */}
                        <Box args={[0.5, 0.03, 0.15]} position={[0, 0.02, 0.25]}>
                            <meshStandardMaterial color={COLORS.surfaceDark} roughness={0.6} metalness={0.4} />
                        </Box>
                        {/* Мышь */}
                        <Cylinder args={[0.03, 0.03, 0.02, 8]} position={[0.35, 0.02, 0.3]}>
                            <meshStandardMaterial color={COLORS.surfaceMedium} roughness={0.3} metalness={0.8} />
                        </Cylinder>
                        {/* Стул */}
                        <group position={[0, -0.6, 0.5]}>
                            {/* Сиденье */}
                            <Box args={[0.5, 0.06, 0.5]} position={[0, 0, 0]}>
                                <meshStandardMaterial color={COLORS.surfaceLight} roughness={0.3} metalness={0.7} />
                            </Box>
                            {/* Спинка */}
                            <Box args={[0.5, 0.4, 0.06]} position={[0, 0.25, 0.22]}>
                                <meshStandardMaterial color={COLORS.surfaceLight} roughness={0.3} metalness={0.7} />
                            </Box>
                            {/* Ножки стула */}
                            {[[-0.2, -0.2, -0.2], [0.2, -0.2, -0.2], [-0.2, -0.2, 0.2], [0.2, -0.2, 0.2]].map((pos, i) => (
                                <Cylinder key={i} args={[0.03, 0.03, 0.4, 8]} position={[pos[0], pos[1], pos[2]]}>
                                    <meshStandardMaterial color={COLORS.surfaceMedium} roughness={0.4} metalness={0.8} />
                                </Cylinder>
                            ))}
                        </group>
                    </group>
                )
            case 'frame':
                return (
                    <group position={[x, y, z]}>
                        {/* Внешняя рамка */}
                        <mesh>
                            <boxGeometry args={[0.7, 0.6, 0.05]} />
                            <meshStandardMaterial
                                color={COLORS.surfaceLight}
                                roughness={0.3}
                                metalness={0.7}
                            />
                        </mesh>
                        {/* Диплом (голографический лист) */}
                        <mesh position={[0, 0, 0.03]}>
                            <planeGeometry args={[0.5, 0.4]} />
                            <meshStandardMaterial
                                color={COLORS.hologram}
                                emissive={COLORS.neonCyan}
                                emissiveIntensity={0.5}
                                roughness={0.2}
                                metalness={0.2}
                                side={2}
                            />
                        </mesh>
                    </group>
                )
            case 'window':
                return (
                    <group position={[x, y + 0.5, z]}>
                        {/* Иллюминатор */}
                        <Ring args={[0.7, 0.8, 32]} rotation={[0, 0, 0]}>
                            <meshStandardMaterial
                                color={COLORS.metalLight}
                                roughness={0.3}
                                metalness={0.9}
                            />
                        </Ring>
                        <mesh>
                            <circleGeometry args={[0.7, 32]} />
                            <meshStandardMaterial
                                color={COLORS.bg}
                                emissive={COLORS.emissiveCyan}
                                emissiveIntensity={0.3}
                                side={2}
                                transparent
                                opacity={0.6}
                            />
                        </mesh>
                    </group>
                )
            default:
                return null
        }
    }

    return <>{renderObject()}</>
}