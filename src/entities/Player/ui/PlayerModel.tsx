import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import { usePlayerStore } from 'entities/Player/model/usePlayerStore';
import { COLORS } from 'shared/config/retroFutureTheme';

export const PlayerModel = () => {
    const groupRef = useRef<Group>(null);
    const position = usePlayerStore(s => s.position);

    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.position.set(position[0], 0, position[1]);
            groupRef.current.rotation.y += 0.005;
        }
    });

    return (
        <group ref={groupRef} position={[position[0], 0, position[1]]}>
            {/* Тело-капсула: светлый металл */}
            <mesh position={[0, 0.5, 0]}>
                <capsuleGeometry args={[0.25, 0.4, 8, 16]} />
                <meshStandardMaterial color="#e0e8f0" roughness={0.25} metalness={0.9} />
            </mesh>
            {/* Голова-шлем: очень светлый, почти белый */}
            <mesh position={[0, 1.0, 0]}>
                <sphereGeometry args={[0.3, 16, 16]} />
                <meshStandardMaterial color="#f0f4fa" roughness={0.2} metalness={0.6} />
            </mesh>
            {/* Визор шлема: яркий голубой неон */}
            <mesh position={[0, 1.0, 0.25]}>
                <planeGeometry args={[0.3, 0.15]} />
                <meshStandardMaterial
                    color={COLORS.neonCyan}
                    emissive={COLORS.neonCyan}
                    emissiveIntensity={1}
                    side={2}
                    transparent
                    opacity={0.95}
                />
            </mesh>
            {/* Неоновое кольцо: оставляем ярким */}
            <mesh position={[0, 1.0, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.32, 0.03, 8, 24]} />
                <meshStandardMaterial
                    color={COLORS.neonCyan}
                    emissive={COLORS.neonCyan}
                    emissiveIntensity={1}
                />
            </mesh>
        </group>
    );
};
