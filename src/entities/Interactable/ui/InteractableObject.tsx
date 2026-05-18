import {Box, Cylinder} from '@react-three/drei'
import {InteractableConfig} from 'shared/config/roomConfig'
import {COLORS} from 'shared/config/retroFutureTheme'
import ArcadeMachine from "entities/Interactable/ui/ArcadeMachine.tsx";
import Bookshelf from "entities/Interactable/ui/Bookshelf.tsx";


interface Props {
    config: InteractableConfig
}

export const InteractableObject = ({ config }: Props) => {
    const [x, z, objY] = config.position;
    const y = objY !== undefined ? objY : 0.5;

    const renderObject = () => {
        switch (config.type) {
            case 'bookshelf':
                return <Bookshelf x={x} y={y} z={z} rotation={[0, -Math.PI / 2, 0]} />;
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
                return <ArcadeMachine position={[x, y, z]} />;
            default:
                return null
        }
    }

    return <>{renderObject()}</>
}