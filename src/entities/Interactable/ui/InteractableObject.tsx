import {Box, Cylinder} from '@react-three/drei'
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
            case 'bookshelf': {
                const shelfLevels = [0.35, 0.7, 1.05];
                const booksConfig: Array<Array<[number, number, number, number, string]>> = [
                    [[-0.35, 0.08, 0.26, 0.22, COLORS.bookTwo], [-0.2, 0.05, 0.18, 0.18, COLORS.bookOne], [-0.1, 0.06, 0.2, 0.2, COLORS.bookThree]],
                    [[0.42, 0.07, 0.28, 0.25, COLORS.bookOne], [0.3, 0.05, 0.2, 0.2, COLORS.bookThree], [0.2, 0.06, 0.22, 0.22, COLORS.bookTwo], [0.1, 0.05, 0.2, 0.2, COLORS.bookThree], [0, 0.06, 0.22, 0.22, COLORS.bookTwo]],
                ];

                return (
                    <group position={[x, y, z]} rotation={[0, Math.PI / 2, 0]}>
                        {/* Боковые стенки */}
                        <Box args={[0.1, 1.2, 0.4]} position={[-0.55, 0, 0]}>
                            <meshBasicMaterial color={COLORS.emissiveMagenta} />
                        </Box>
                        <Box args={[0.1, 1.2, 0.4]} position={[0.55, 0, 0]}>
                            <meshBasicMaterial color={COLORS.emissiveMagenta} />
                        </Box>

                        {/* Полки */}
                        {shelfLevels.map((h, i) => (
                            <Box key={i} args={[1.0, 0.04, 0.4]} position={[0, h - 0.5, 0]}>
                                <meshBasicMaterial color={COLORS.metalLight} />
                            </Box>
                        ))}

                        {/* Книги по уровням */}
                        {shelfLevels.map((levelHeight, levelIndex) =>
                            booksConfig[levelIndex]?.map(([offsetX, thickness, height, depth, color], bookIndex) => (
                                <Box
                                    key={`book-${levelIndex}-${bookIndex}`}
                                    args={[thickness, height, depth]}
                                    position={[offsetX, levelHeight - 0.5 + height / 2, 0]}
                                >
                                    <meshBasicMaterial color={color} />
                                </Box>
                            ))
                        )}
                    </group>
                );
            }
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
            case 'arcade':
                return (
                    <group position={[x, y, z]} rotation={[0, -Math.PI / 2, 0]}>
                        {/* Корпус: светлый металлик с лёгкой голубой подсветкой */}
                        <Box args={[1.0, 1.4, 0.8]} position={[0, 0.5, 0]}>
                            <meshStandardMaterial
                                color={COLORS.surfaceLight}   // #c8d8e8
                                emissive={COLORS.emissiveCyan}
                                emissiveIntensity={0.25}
                                roughness={0.3}
                                metalness={0.7}
                            />
                        </Box>

                        {/* Экранная рамка (металлик потемнее) */}
                        <Box args={[0.84, 0.54, 0.06]} position={[0, 1.1, -0.38]}>
                            <meshStandardMaterial
                                color={COLORS.metalLight}      // #4a4a7a
                                roughness={0.3}
                                metalness={0.9}
                            />
                        </Box>

                        {/* Голографический экран */}
                        <Box args={[0.74, 0.44, 0.03]} position={[0, 1.1, -0.36]}>
                            <meshStandardMaterial
                                color={COLORS.hologram}
                                emissive={COLORS.neonCyan}
                                emissiveIntensity={0.9}
                                roughness={0.2}
                                metalness={0.1}
                                transparent
                                opacity={0.95}
                            />
                        </Box>

                        {/* Панель управления — контрастная, очень тёмная */}
                        <Box args={[0.9, 0.12, 0.35]} position={[0, 0.4, -0.35]}>
                            <meshStandardMaterial
                                color="#0a0a1a"
                                roughness={0.3}
                                metalness={0.9}
                            />
                        </Box>

                        {/* Яркие кнопки */}
                        {[[-0.3, 0.4, -0.2], [0, 0.4, -0.2], [0.3, 0.4, -0.2]].map((pos, i) => (
                            <Cylinder key={i} args={[0.06, 0.06, 0.03, 16]} position={[pos[0], pos[1], pos[2]]}>
                                <meshStandardMaterial
                                    color={i === 0 ? COLORS.neonMagenta : i === 1 ? COLORS.neonCyan : COLORS.neonGreen}
                                    emissive={i === 0 ? COLORS.neonMagenta : i === 1 ? COLORS.neonCyan : COLORS.neonGreen}
                                    emissiveIntensity={1.2}
                                    roughness={0.2}
                                    metalness={0.1}
                                />
                            </Cylinder>
                        ))}

                        {/* Джойстик */}
                        <Cylinder args={[0.08, 0.1, 0.06, 8]} position={[-0.4, 0.45, -0.35]}>
                            <meshStandardMaterial color={COLORS.metalLight} roughness={0.3} metalness={0.9} />
                        </Cylinder>
                        <Cylinder args={[0.03, 0.03, 0.35, 8]} position={[-0.4, 0.65, -0.35]} rotation={[0.2, 0, 0]}>
                            <meshStandardMaterial color={COLORS.surfaceLight} roughness={0.3} metalness={0.8} />
                        </Cylinder>
                        <mesh position={[-0.4, 0.83, -0.35]}>
                            <sphereGeometry args={[0.06, 8, 8]} />
                            <meshStandardMaterial
                                color={COLORS.neonMagenta}
                                emissive={COLORS.neonMagenta}
                                emissiveIntensity={0.9}
                            />
                        </mesh>

                        {/* Декоративные неоновые полосы по краям */}
                        <Box args={[1.02, 0.05, 0.05]} position={[0, 0.9, -0.42]}>
                            <meshStandardMaterial
                                color={COLORS.neonCyan}
                                emissive={COLORS.neonCyan}
                                emissiveIntensity={0.7}
                                roughness={0.2}
                            />
                        </Box>
                        <Box args={[1.02, 0.05, 0.05]} position={[0, 0.1, -0.42]}>
                            <meshStandardMaterial
                                color={COLORS.neonMagenta}
                                emissive={COLORS.neonMagenta}
                                emissiveIntensity={0.7}
                                roughness={0.2}
                            />
                        </Box>
                    </group>
                )
            default:
                return null
        }
    }

    return <>{renderObject()}</>
}