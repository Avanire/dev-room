import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { COLORS } from 'shared/config/retroFutureTheme';

interface LampProps {
    x: number;
    y: number;
    z: number;
    rotation?: [number, number, number];
}

export default function CyberLamp({ x, y, z, rotation = [0, 0, 0] }: LampProps) {
    // Геометрии основания
    const baseGeom = useMemo(() => new THREE.CylinderGeometry(0.4, 0.45, 0.15, 24), []);
    const baseRingGeom = useMemo(() => new THREE.TorusGeometry(0.42, 0.03, 8, 24), []);

    // Стойка
    const poleGeom = useMemo(() => new THREE.CylinderGeometry(0.08, 0.1, 2.8, 16), []);
    const jointGeom = useMemo(() => new THREE.CylinderGeometry(0.12, 0.12, 0.08, 16), []);

    // Плафон
    const shadeGeom = useMemo(() => new THREE.CylinderGeometry(0.3, 0.3, 1.8, 24, 1, true), []);
    const shadeTopGeom = useMemo(() => new THREE.CylinderGeometry(0.3, 0.3, 0.08, 24), []);
    const shadeBottomGeom = useMemo(() => new THREE.CylinderGeometry(0.3, 0.3, 0.08, 24), []);
    const innerGlowGeom = useMemo(() => new THREE.CylinderGeometry(0.26, 0.26, 1.7, 24), []);

    // Неоновый ободок
    const neonRingGeom = useMemo(() => new THREE.TorusGeometry(0.32, 0.025, 8, 24), []);

    // Ссылка на источник света
    const lightRef = useRef<THREE.PointLight>(null);

    // Пульсация света
    useFrame(({ clock }) => {
        if (lightRef.current) {
            const pulse = 0.7 + Math.sin(clock.elapsedTime * 3) * 0.3;
            lightRef.current.intensity = pulse;
        }
    });

    return (
        <group position={[x, y, z]} rotation={rotation}>
            {/* Основание */}
            <mesh geometry={baseGeom} position={[0, -1.3, 0]} castShadow receiveShadow>
                <meshStandardMaterial
                    color={COLORS.surfaceMedium}
                    roughness={0.3}
                    metalness={0.9}
                />
            </mesh>
            <mesh geometry={baseRingGeom} position={[0, -1.22, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <meshStandardMaterial
                    color={COLORS.neonMagenta}
                    emissive={COLORS.neonMagenta}
                    emissiveIntensity={0.6}
                    roughness={0.2}
                />
            </mesh>

            {/* Стойка */}
            <mesh geometry={poleGeom} position={[0, 0.1, 0]} castShadow receiveShadow>
                <meshStandardMaterial color="#f0f4fa" roughness={0.2} metalness={0.6} />
            </mesh>
            {[-0.1, 0.1].map((h, i) => (
                <mesh key={i} geometry={jointGeom} position={[0, h, 0]} castShadow>
                    <meshStandardMaterial
                        color={COLORS.metalLight}
                        roughness={0.3}
                        metalness={0.8}
                    />
                </mesh>
            ))}

            {/* Плафон */}
            <mesh geometry={shadeGeom} position={[0, 0.5, 0]} castShadow>
                <meshStandardMaterial
                    color="#f0f4fa"
                    roughness={0.2}
                    metalness={0.5}
                    transparent
                    opacity={0.85}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Внутренняя светящаяся сердцевина */}
            <mesh geometry={innerGlowGeom} position={[0, 0.5, 0]}>
                <meshStandardMaterial
                    color={COLORS.neonCyan}
                    emissive={COLORS.neonCyan}
                    emissiveIntensity={0.9}
                    roughness={0.1}
                    metalness={0.1}
                />
            </mesh>

            {/* Крышки плафона */}
            <mesh geometry={shadeTopGeom} position={[0, 1.4, 0]} castShadow receiveShadow>
                <meshStandardMaterial
                    color={COLORS.surfaceLighter}
                    roughness={0.3}
                    metalness={0.8}
                />
            </mesh>
            <mesh geometry={shadeBottomGeom} position={[0, 0.6, 0]} castShadow receiveShadow>
                <meshStandardMaterial
                    color={COLORS.surfaceLighter}
                    roughness={0.3}
                    metalness={0.8}
                />
            </mesh>

            {/* Неоновые кольца */}
            {[-0.1, 1.2].map((h, i) => (
                <mesh
                    key={i}
                    geometry={neonRingGeom}
                    position={[0, h, 0]}
                    rotation={[Math.PI / 2, 0, 0]}
                >
                    <meshStandardMaterial
                        color={COLORS.neonCyan}
                        emissive={COLORS.neonCyan}
                        emissiveIntensity={0.8}
                        roughness={0.2}
                    />
                </mesh>
            ))}

            {/* Верхний шарик */}
            <mesh position={[0, 1.5, 0]}>
                <sphereGeometry args={[0.06, 8, 8]} />
                <meshStandardMaterial
                    color={COLORS.neonMagenta}
                    emissive={COLORS.neonMagenta}
                    emissiveIntensity={0.9}
                    roughness={0.2}
                />
            </mesh>

            {/* Источник света внутри плафона */}
            <pointLight
                ref={lightRef}
                position={[0, 1.5, 0]}
                color={COLORS.bookOne}
                intensity={3}
                distance={1}
                castShadow
                shadow-mapSize-width={512}
                shadow-mapSize-height={512}
            />
        </group>
    );
}
