import {useMemo} from 'react'
import * as THREE from 'three'
import {RoundedBoxGeometry} from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import {COLORS} from 'shared/config/retroFutureTheme'

interface SofaProps {
    x: number
    y: number
    z: number
    rotation?: [number, number, number]
}

export default function Sofa({ x, y, z, rotation = [0, Math.PI, 0] }: SofaProps) {
    // Геометрии основных частей
    const baseGeom = useMemo(() => new RoundedBoxGeometry(2.2, 0.4, 0.9, 4, 0.05), [])
    const backGeom = useMemo(() => new RoundedBoxGeometry(2.2, 0.55, 0.2, 4, 0.04), [])
    const armGeom = useMemo(() => new RoundedBoxGeometry(0.2, 0.4, 0.9, 3, 0.03), [])
    const seatCushionGeom = useMemo(() => new RoundedBoxGeometry(1.8, 0.12, 0.7, 4, 0.06), [])
    const smallCushionGeom = useMemo(() => new RoundedBoxGeometry(0.4, 0.1, 0.4, 3, 0.05), [])

    // Ножки
    const legGeom = useMemo(() => new THREE.CylinderGeometry(0.06, 0.07, 0.15, 8), [])

    // Неоновая подсветка
    const glowStripTopGeom = useMemo(() => new RoundedBoxGeometry(2.4, 0.04, 0.04, 2, 0.005), [])
    const glowStripBottomGeom = useMemo(() => new RoundedBoxGeometry(2.2, 0.03, 0.03, 2, 0.003), [])

    return (
        <group position={[x, y, z]} rotation={rotation}>
            {/* Основание */}
            <mesh geometry={baseGeom} position={[0, 0.2, 0]} castShadow receiveShadow>
                <meshStandardMaterial
                    color={COLORS.surfaceLight}
                    roughness={0.35}
                    metalness={0.5}
                />
            </mesh>

            {/* Спинка */}
            <mesh geometry={backGeom} position={[0, 0.55, -0.35]} castShadow receiveShadow>
                <meshStandardMaterial
                    color={COLORS.surfaceLight}
                    roughness={0.35}
                    metalness={0.5}
                />
            </mesh>

            {/* Подлокотники */}
            {[-1.0, 1.0].map((cx) => (
                <mesh key={cx} geometry={armGeom} position={[cx, 0.4, 0]} castShadow receiveShadow>
                    <meshStandardMaterial
                        color={COLORS.surfaceLighter}
                        roughness={0.3}
                        metalness={0.6}
                    />
                </mesh>
            ))}

            {/* Сиденье (подушка) */}
            <mesh geometry={seatCushionGeom} position={[0, 0.47, 0.05]} castShadow receiveShadow>
                <meshStandardMaterial
                    color="#dfe6e9"
                    roughness={0.8}
                    metalness={0.1}
                />
            </mesh>

            {/* Декоративные подушки (две штуки) */}
            <mesh geometry={smallCushionGeom} position={[-0.5, 0.55, -0.1]} rotation={[0, 0.3, 0.2]} castShadow>
                <meshStandardMaterial
                    color={COLORS.neonMagenta}
                    emissive={COLORS.neonMagenta}
                    emissiveIntensity={0.25}
                    roughness={0.7}
                    metalness={0.1}
                />
            </mesh>
            <mesh geometry={smallCushionGeom} position={[0.5, 0.55, -0.1]} rotation={[0, -0.3, -0.1]} castShadow>
                <meshStandardMaterial
                    color={COLORS.neonCyan}
                    emissive={COLORS.neonCyan}
                    emissiveIntensity={0.25}
                    roughness={0.7}
                    metalness={0.1}
                />
            </mesh>

            {/* Металлические ножки (4 шт.) */}
            {[[-0.9, -0.2, -0.3], [0.9, -0.2, -0.3], [-0.9, -0.2, 0.3], [0.9, -0.2, 0.3]].map((pos, i) => (
                <mesh key={i} geometry={legGeom} position={[pos[0], pos[1], pos[2]]} castShadow receiveShadow>
                    <meshStandardMaterial
                        color={COLORS.surfaceMedium}
                        roughness={0.3}
                        metalness={0.9}
                    />
                </mesh>
            ))}

            {/* Неоновая полоса по верхнему краю спинки */}
            <mesh geometry={glowStripTopGeom} position={[0, 0.85, -0.44]}>
                <meshStandardMaterial
                    color={COLORS.neonCyan}
                    emissive={COLORS.neonCyan}
                    emissiveIntensity={0.8}
                    roughness={0.2}
                />
            </mesh>

            {/* Неоновая подсветка снизу основания */}
            <mesh geometry={glowStripBottomGeom} position={[0, 0.02, -0.45]}>
                <meshStandardMaterial
                    color={COLORS.neonMagenta}
                    emissive={COLORS.neonMagenta}
                    emissiveIntensity={0.7}
                    roughness={0.2}
                />
            </mesh>
            <mesh geometry={glowStripBottomGeom} position={[0, 0.02, 0.45]}>
                <meshStandardMaterial
                    color={COLORS.neonMagenta}
                    emissive={COLORS.neonMagenta}
                    emissiveIntensity={0.7}
                    roughness={0.2}
                />
            </mesh>
        </group>
    )
}