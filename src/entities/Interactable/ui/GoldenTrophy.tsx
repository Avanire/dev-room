import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

interface GoldenTrophyProps {
    position?: [number, number, number];
    rotation?: [number, number, number];
}

export default function GoldenTrophy({ position, rotation = [0, 0, 0] }: GoldenTrophyProps) {
    // ---------- Пьедестал ----------
    const baseGeom = useMemo(() => new RoundedBoxGeometry(0.5, 0.12, 0.5, 3, 0.02), []);
    const pillarGeom = useMemo(() => new RoundedBoxGeometry(0.35, 0.4, 0.35, 3, 0.03), []);
    const topPlateGeom = useMemo(() => new RoundedBoxGeometry(0.45, 0.08, 0.45, 3, 0.02), []);

    // ---------- Кубок ----------
    const stemBaseGeom = useMemo(() => new THREE.CylinderGeometry(0.07, 0.09, 0.2, 16), []);
    const stemGeom = useMemo(() => new THREE.CylinderGeometry(0.05, 0.06, 0.35, 16), []);
    const bowlGeom = useMemo(
        () => new THREE.SphereGeometry(0.22, 32, 24, 0, Math.PI * 2, 0, Math.PI / 2),
        []
    );
    const innerBowlGeom = useMemo(
        () => new THREE.SphereGeometry(0.18, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2),
        []
    );
    const rimGeom = useMemo(() => new THREE.TorusGeometry(0.22, 0.015, 16, 32), []);
    const handleGeom = useMemo(() => new THREE.TorusGeometry(0.12, 0.03, 8, 16), []);
    const bottomDiscGeom = useMemo(() => new THREE.CircleGeometry(0.2, 32), []);

    // ---------- Анимация ----------
    const lightRef = useRef<THREE.PointLight>(null);

    useFrame(({ clock }) => {
        const t = clock.elapsedTime;
        const pulse = 0.7 + Math.sin(t * 2) * 0.3;
        if (lightRef.current) {
            lightRef.current.intensity = 0.8 + pulse * 0.6;
        }
    });

    return (
        <group position={position} rotation={rotation}>
            {/* ===== Пьедестал ===== */}
            <mesh geometry={baseGeom} position={[0, -0.35, 0]} castShadow receiveShadow>
                <meshStandardMaterial color="#e8e0d5" roughness={0.4} metalness={0.0} />
            </mesh>
            <mesh geometry={pillarGeom} position={[0, -0.1, 0]} castShadow receiveShadow>
                <meshStandardMaterial color="#d5cec0" roughness={0.5} metalness={0.0} />
            </mesh>
            <mesh geometry={topPlateGeom} position={[0, 0.12, 0]} castShadow receiveShadow>
                <meshStandardMaterial color="#e8e0d5" roughness={0.4} metalness={0.0} />
            </mesh>

            {/* ===== Кубок ===== */}
            <group position={[0, 0.22, 0]}>
                {/* Основание ножки */}
                <mesh geometry={stemBaseGeom} position={[0, 0.02, 0]} castShadow>
                    <meshStandardMaterial color="#ffd700" roughness={0.15} metalness={1.0} />
                </mesh>

                {/* Ножка */}
                <mesh geometry={stemGeom} position={[0, 0.18, 0]} castShadow>
                    <meshStandardMaterial color="#ffd700" roughness={0.1} metalness={1.0} />
                </mesh>

                {/* Чаша (внешняя) – развёрнута вверх */}
                <mesh
                    geometry={bowlGeom}
                    position={[0, 0.38, 0]}
                    rotation={[Math.PI, 0, 0]}
                    castShadow
                >
                    <meshStandardMaterial color="#ffd700" roughness={0.1} metalness={1.0} />
                </mesh>

                {/* Внутренняя поверхность – развёрнута вместе с чашей */}
                <mesh geometry={innerBowlGeom} position={[0, 0.39, 0]} rotation={[Math.PI, 0, 0]}>
                    <meshStandardMaterial
                        color="#ffcc00"
                        emissive="#ff8800"
                        emissiveIntensity={0.4}
                        roughness={0.3}
                        metalness={0.0}
                    />
                </mesh>

                {/* Ободок */}
                <mesh
                    geometry={rimGeom}
                    position={[0, 0.39, 0]}
                    rotation={[Math.PI / 2, 0, 0]}
                    castShadow
                >
                    <meshStandardMaterial color="#ffd700" roughness={0.1} metalness={1.0} />
                </mesh>

                {/* Дно чаши – заглушка, чтобы сверху не было видно пустоты */}
                <mesh
                    geometry={bottomDiscGeom}
                    position={[0, 0.36, 0]}
                    rotation={[-Math.PI / 2, 0, 0]}
                >
                    <meshStandardMaterial color="#ffd700" roughness={0.2} metalness={0.9} />
                </mesh>

                {/* Ручки (две по бокам) */}
                {[-1, 1].map(side => (
                    <mesh
                        key={side}
                        geometry={handleGeom}
                        position={[side * 0.21, 0.22, 0]}
                        rotation={[0, 0, side * 0.5]}
                        castShadow
                    >
                        <meshStandardMaterial color="#ffd700" roughness={0.1} metalness={1.0} />
                    </mesh>
                ))}

                {/* Тёплый свет внутри чаши */}
                <pointLight
                    ref={lightRef}
                    position={[0, 0.45, 0]}
                    color="#ffaa44"
                    intensity={1.0}
                    distance={5}
                    castShadow
                />
            </group>
        </group>
    );
}
