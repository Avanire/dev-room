import { useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { COLORS } from 'shared/config/retroFutureTheme';

interface CrystalProps {
    position: [number, number, number];
    rotation?: [number, number, number];
}

export default function Crystal({ position, rotation = [0, 0, 0] }: CrystalProps) {
    const [time, setTime] = useState(0);

    // Геометрия кристалла – октаэдр, вытянутый по вертикали
    const crystalGeom = useMemo(() => {
        const geom = new THREE.OctahedronGeometry(0.22, 0);
        geom.scale(1, 1.6, 1); // вытягиваем
        return geom;
    }, []);

    // Подставка
    const baseGeom = useMemo(() => new THREE.CylinderGeometry(0.18, 0.22, 0.1, 16), []);
    const ringGeom = useMemo(() => new THREE.TorusGeometry(0.2, 0.03, 8, 24), []);

    // Мелкие парящие осколки (4 штуки)
    const shardGeom = useMemo(() => new THREE.OctahedronGeometry(0.05, 0), []);

    // Ссылки на материалы и свет для пульсации
    const crystalMatRef = useRef<THREE.MeshStandardMaterial>(null);
    const lightRef = useRef<THREE.PointLight>(null);
    const groupRef = useRef<THREE.Group>(null);

    useFrame(({ clock }) => {
        setTime(clock.elapsedTime);
        const t = clock.elapsedTime;
        const pulse = 0.6 + Math.sin(t * 3) * 0.4; // 0.2 – 1.0

        // Пульсация свечения кристалла
        if (crystalMatRef.current) {
            crystalMatRef.current.emissiveIntensity = pulse;
            crystalMatRef.current.opacity = 0.7 + pulse * 0.3;
        }

        // Пульсация источника света
        if (lightRef.current) {
            lightRef.current.intensity = 0.8 + pulse * 0.8;
        }

        // Медленное вращение всего кристалла вокруг своей оси
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.005;
        }
    });

    // Позиции для осколков (орбита)
    const shardPositions = useMemo(
        () => [
            { radius: 0.35, speed: 1.5, startAngle: 0 },
            { radius: 0.35, speed: -1.8, startAngle: Math.PI / 2 },
            { radius: 0.4, speed: 1.2, startAngle: Math.PI },
            { radius: 0.4, speed: -1.4, startAngle: Math.PI * 1.5 },
        ],
        []
    );

    return (
        <group position={position} rotation={rotation}>
            {/* Вращающаяся группа (кристалл + осколки) */}
            <group ref={groupRef}>
                {/* Сам кристалл */}
                <mesh geometry={crystalGeom} position={[0, 0.3, 0]} castShadow>
                    <meshStandardMaterial
                        ref={crystalMatRef}
                        color={COLORS.neonCyan}
                        emissive={COLORS.neonCyan}
                        emissiveIntensity={0.6}
                        roughness={0.1}
                        metalness={0.2}
                        transparent
                        opacity={0.8}
                    />
                </mesh>

                {/* Парящие осколки */}
                {shardPositions.map(({ radius, startAngle }, i) => (
                    <group key={i} rotation={[0, startAngle, 0]}>
                        <mesh
                            geometry={shardGeom}
                            position={[radius, 0.3 + Math.sin(time * 0.5 + i) * 0.1, 0]}
                        >
                            <meshStandardMaterial
                                color={COLORS.neonMagenta}
                                emissive={COLORS.neonMagenta}
                                emissiveIntensity={0.8}
                                roughness={0.2}
                                metalness={0.2}
                                transparent
                                opacity={0.7}
                            />
                        </mesh>
                    </group>
                ))}
            </group>

            {/* Подставка */}
            <mesh geometry={baseGeom} position={[0, -0.1, 0]} castShadow receiveShadow>
                <meshStandardMaterial
                    color={COLORS.surfaceMedium}
                    roughness={0.3}
                    metalness={0.9}
                />
            </mesh>

            {/* Неоновое кольцо подставки */}
            <mesh geometry={ringGeom} position={[0, -0.04, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <meshStandardMaterial
                    color={COLORS.neonMagenta}
                    emissive={COLORS.neonMagenta}
                    emissiveIntensity={0.8}
                    roughness={0.2}
                />
            </mesh>

            {/* Внутренний источник света (пульсирует) */}
            <pointLight
                ref={lightRef}
                position={[0, 0.3, 0]}
                color={COLORS.neonCyan}
                intensity={1.2}
                distance={4}
                castShadow
            />
        </group>
    );
}
