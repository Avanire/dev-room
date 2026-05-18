import {Box, Cylinder} from '@react-three/drei'
import {COLORS} from 'shared/config/retroFutureTheme'

export const RoomDecoration = () => {
    return (
        <group>
            {/* Голографическая картина на правой стене */}
            <group position={[-2, 1.7, -4.9]} rotation={[0, -Math.PI / 2, 0]}>
                <Box args={[0.05, 1.2, 0.8]} position={[0, 0, 0]}>
                    <meshStandardMaterial color={COLORS.metalLight} roughness={0.3} metalness={0.7} />
                </Box>
                <Box args={[0.03, 1.0, 0.6]} position={[0.02, 0, 0]}>
                    <meshStandardMaterial
                        color={COLORS.hologram}
                        emissive={COLORS.neonMagenta}
                        emissiveIntensity={0.3}
                        transparent
                        opacity={0.5}
                    />
                </Box>
            </group>

            {/* Голографическая картина на левой стене */}
            <group position={[2.8, 1.6, 4.9]} rotation={[0, Math.PI / 2, 0]}>
                <Box args={[0.05, 1.2, 0.8]} position={[0, 0, 0]}>
                    <meshStandardMaterial color={COLORS.metalLight} roughness={0.3} metalness={0.7} />
                </Box>
                <Box args={[0.03, 1.0, 0.6]} position={[0.02, 0, 0]}>
                    <meshStandardMaterial
                        color={COLORS.hologram}
                        emissive={COLORS.neonCyan}
                        emissiveIntensity={0.3}
                        transparent
                        opacity={0.5}
                    />
                </Box>
            </group>

            {/* Большие колонны по углам */}
            <group position={[1.2, -0.5, -4.5]}>
                <Cylinder args={[0.3, 0.3, 3, 16]}>
                    <meshStandardMaterial
                        color="#f0f4fa"
                        roughness={0.2}
                        metalness={0.6}
                    />
                </Cylinder>
                <Cylinder args={[0.35, 0.35, 0.1, 16]} position={[0, 1.4, 0]}>
                    <meshStandardMaterial
                        color={COLORS.neonCyan}
                        emissive={COLORS.neonCyan}
                        emissiveIntensity={0.6}
                    />
                </Cylinder>
            </group>

            <group position={[5.5, 0.5, 4.5]}>
                <Cylinder args={[0.3, 0.3, 1, 16]}>
                    <meshStandardMaterial
                        color="#f0f4fa"
                        roughness={0.2}
                        metalness={0.6}
                    />
                </Cylinder>
                <Cylinder args={[0.35, 0.35, 0.1, 16]} position={[0, 0.4, 0]}>
                    <meshStandardMaterial
                        color={COLORS.neonMagenta}
                        emissive={COLORS.neonMagenta}
                        emissiveIntensity={0.6}
                    />
                </Cylinder>
            </group>

            {/* Диван */}
            <group position={[-1, 0.3, 4.7]} rotation={[0, Math.PI, 0]}>
                {/* Основание */}
                <Box args={[2.2, 0.4, 0.9]} position={[0, 0.2, 0]}>
                    <meshStandardMaterial
                        color={COLORS.surfaceLight}
                        roughness={0.3}
                        metalness={0.7}
                    />
                </Box>
                {/* Спинка */}
                <Box args={[2.2, 0.55, 0.2]} position={[0, 0.55, -0.35]}>
                    <meshStandardMaterial
                        color={COLORS.surfaceLight}
                        roughness={0.3}
                        metalness={0.7}
                    />
                </Box>
                {/* Левый подлокотник */}
                <Box args={[0.2, 0.4, 0.9]} position={[-1.0, 0.4, 0]}>
                    <meshStandardMaterial
                        color={COLORS.surfaceLighter}
                        roughness={0.3}
                        metalness={0.7}
                    />
                </Box>
                {/* Правый подлокотник */}
                <Box args={[0.2, 0.4, 0.9]} position={[1.0, 0.4, 0]}>
                    <meshStandardMaterial
                        color={COLORS.surfaceLighter}
                        roughness={0.3}
                        metalness={0.7}
                    />
                </Box>
                {/* Неоновая полоса по периметру спинки */}
                <Box args={[2.4, 0.05, 0.05]} position={[0, 0.85, -0.44]}>
                    <meshStandardMaterial
                        color={COLORS.neonCyan}
                        emissive={COLORS.neonCyan}
                        emissiveIntensity={0.8}
                    />
                </Box>
                {/* Подушка */}
                <Box args={[1.8, 0.1, 0.7]} position={[0, 0.45, 0.05]}>
                    <meshStandardMaterial
                        color="#dfe6e9"
                        roughness={0.7}
                        metalness={0.1}
                    />
                </Box>
            </group>

            {/* Журнальный столик перед диваном */}
            <group position={[-1.3, 0.2, 2.9]}>
                {/* Ножки (4 шт.) */}
                {[[-0.7, 0, -0.35], [0.7, 0, -0.35], [-0.7, 0, 0.35], [0.7, 0, 0.35]].map((pos, i) => (
                    <Cylinder key={i} args={[0.04, 0.06, 0.4, 8]} position={[pos[0], pos[1], pos[2]]}>
                        <meshStandardMaterial color={COLORS.surfaceMedium} roughness={0.4} metalness={0.8} />
                    </Cylinder>
                ))}
                {/* Столешница */}
                <Box args={[1.6, 0.04, 0.8]} position={[0, 0.2, 0]}>
                    <meshStandardMaterial color={COLORS.surfaceLight} roughness={0.3} metalness={0.7} />
                </Box>
                {/* Голографическая поверхность */}
                <Box args={[1.4, 0.02, 0.6]} position={[0, 0.22, 0]}>
                    <meshStandardMaterial
                        color={COLORS.hologram}
                        emissive={COLORS.emissiveCyan}
                        emissiveIntensity={0.4}
                        transparent
                        opacity={0.5}
                    />
                </Box>
                {/* Парящий логотип React (абстрактные кольца) */}
                <group position={[0, 0.45, 0]}>
                    <mesh rotation={[Math.PI / 2, 0, 0]}>
                        <torusGeometry args={[0.15, 0.02, 8, 16]} />
                        <meshStandardMaterial
                            color={COLORS.neonCyan}
                            emissive={COLORS.neonCyan}
                            emissiveIntensity={0.9}
                        />
                    </mesh>
                    <mesh rotation={[Math.PI / 3, 0, 0]}>
                        <torusGeometry args={[0.15, 0.02, 8, 16]} />
                        <meshStandardMaterial
                            color={COLORS.neonMagenta}
                            emissive={COLORS.neonMagenta}
                            emissiveIntensity={0.9}
                        />
                    </mesh>
                    <mesh rotation={[-Math.PI / 3, 0, 0]}>
                        <torusGeometry args={[0.15, 0.02, 8, 16]} />
                        <meshStandardMaterial
                            color={COLORS.neonGreen}
                            emissive={COLORS.neonGreen}
                            emissiveIntensity={0.9}
                        />
                    </mesh>
                    {/* Центральная точка */}
                    <mesh>
                        <sphereGeometry args={[0.04, 8, 8]} />
                        <meshStandardMaterial
                            color="#ffffff"
                            emissive={COLORS.neonCyan}
                            emissiveIntensity={1}
                        />
                    </mesh>
                </group>
            </group>
        </group>
    )
}