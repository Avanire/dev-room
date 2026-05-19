import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { COLORS } from 'shared/config/retroFutureTheme';

// ---------- Текстура голографического диплома ----------
const diplomaCanvas = document.createElement('canvas');
diplomaCanvas.width = 256;
diplomaCanvas.height = 200;
const diplomaCtx = diplomaCanvas.getContext('2d')!;
const diplomaTexture = new THREE.CanvasTexture(diplomaCanvas);
diplomaTexture.minFilter = THREE.LinearFilter;
diplomaTexture.magFilter = THREE.LinearFilter;

function drawDiploma(time: number) {
    const ctx = diplomaCtx;
    const w = diplomaCanvas.width;
    const h = diplomaCanvas.height;

    // Полупрозрачный фон с сеткой
    ctx.fillStyle = '#0a0a14';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(0,255,255,0.15)';
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
    }
    for (let y = 0; y < h; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
    }

    // Рамка внутри диплома
    ctx.strokeStyle = '#ff00ff';
    ctx.lineWidth = 3;
    ctx.strokeRect(10, 10, w - 20, h - 20);

    // Заголовок
    ctx.fillStyle = '#00ffff';
    ctx.font = 'bold 20px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('CERTIFICATE', w / 2, 50);

    // Золотая строка
    ctx.fillStyle = '#ffd700';
    ctx.font = '12px monospace';
    ctx.fillText('OF EXCELLENCE IN CYBER ARTS', w / 2, 75);

    // Динамический элемент
    const pulse = Math.sin(time * 2) * 0.3 + 0.7;
    ctx.fillStyle = `rgba(255,0,255,${pulse})`;
    ctx.font = '16px monospace';
    ctx.fillText('AWARDED TO', w / 2, 110);

    // Имя
    ctx.fillStyle = '#ffffff';
    ctx.font = '18px monospace';
    ctx.fillText('RILEY T. SHADOW', w / 2, 135);

    // QR-подобный код (детерминированная анимация)
    ctx.fillStyle = '#00ff00';
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (Math.sin(i * 13 + j * 7 + time * 10) > 0.2) {
                ctx.fillRect(180 + i * 6, 140 + j * 6, 4, 4);
            }
        }
    }

    // Дата
    ctx.fillStyle = '#aaaaaa';
    ctx.font = '10px monospace';
    ctx.fillText('2087.11.23 // NEO-TOKYO', w / 2, 185);
}

function useDiplomaTexture() {
    const textureRef = useRef(diplomaTexture);
    useFrame(({ clock }) => {
        drawDiploma(clock.elapsedTime);
        textureRef.current.needsUpdate = true;
    });

    // eslint-disable-next-line react-hooks/refs
    return textureRef.current;
}

// ---------- Компонент ----------
interface DiplomaFrameProps {
    x: number;
    y: number;
    z: number;
    rotation?: [number, number, number];
}

export default function DiplomaFrame({ x, y, z, rotation = [0, 0, 0] }: DiplomaFrameProps) {
    const diplomaTex = useDiplomaTexture();

    // Геометрии
    const outerFrameGeom = useMemo(() => new RoundedBoxGeometry(0.7, 0.6, 0.05, 3, 0.015), []);
    const innerFrameGeom = useMemo(() => new RoundedBoxGeometry(0.62, 0.52, 0.03, 3, 0.01), []);
    const glassGeom = useMemo(() => new THREE.PlaneGeometry(0.52, 0.42), []);
    const diplomaGeom = useMemo(() => new THREE.PlaneGeometry(0.5, 0.4), []);
    const cornerGeom = useMemo(() => new RoundedBoxGeometry(0.04, 0.04, 0.02, 2, 0.005), []);
    const hangerGeom = useMemo(() => new THREE.CylinderGeometry(0.02, 0.02, 0.08, 8), []);
    const sealGeom = useMemo(() => new THREE.CylinderGeometry(0.04, 0.04, 0.01, 16), []);

    // Неоновая полоска по периметру рамки
    const glowStrips = useMemo(
        () => ({
            top: new RoundedBoxGeometry(0.68, 0.015, 0.015, 2, 0.002),
            bottom: new RoundedBoxGeometry(0.68, 0.015, 0.015, 2, 0.002),
            left: new RoundedBoxGeometry(0.015, 0.58, 0.015, 2, 0.002),
            right: new RoundedBoxGeometry(0.015, 0.58, 0.015, 2, 0.002),
        }),
        []
    );

    return (
        <group position={[x, y, z]} rotation={rotation}>
            {/* Крепление на стену */}
            <mesh geometry={hangerGeom} position={[0, 0.38, -0.08]} rotation={[Math.PI / 2, 0, 0]}>
                <meshStandardMaterial
                    color={COLORS.surfaceMedium}
                    roughness={0.4}
                    metalness={0.8}
                />
            </mesh>

            {/* Внешняя рамка */}
            <mesh geometry={outerFrameGeom} position={[0, 0, 0]}>
                <meshStandardMaterial
                    color={COLORS.metalLight}
                    roughness={0.3}
                    metalness={0.9}
                    emissive={COLORS.emissiveMagenta}
                    emissiveIntensity={0.2}
                />
            </mesh>

            {/* Неоновые полосы по краям */}
            <mesh geometry={glowStrips.top} position={[0, 0.3, 0.032]}>
                <meshStandardMaterial
                    color={COLORS.neonCyan}
                    emissive={COLORS.neonCyan}
                    emissiveIntensity={0.8}
                    roughness={0.2}
                />
            </mesh>
            <mesh geometry={glowStrips.bottom} position={[0, -0.3, 0.032]}>
                <meshStandardMaterial
                    color={COLORS.neonCyan}
                    emissive={COLORS.neonCyan}
                    emissiveIntensity={0.8}
                    roughness={0.2}
                />
            </mesh>
            <mesh geometry={glowStrips.left} position={[-0.35, 0, 0.032]}>
                <meshStandardMaterial
                    color={COLORS.neonCyan}
                    emissive={COLORS.neonCyan}
                    emissiveIntensity={0.8}
                    roughness={0.2}
                />
            </mesh>
            <mesh geometry={glowStrips.right} position={[0.35, 0, 0.032]}>
                <meshStandardMaterial
                    color={COLORS.neonCyan}
                    emissive={COLORS.neonCyan}
                    emissiveIntensity={0.8}
                    roughness={0.2}
                />
            </mesh>

            {/* Внутренняя окантовка (паспарту) */}
            <mesh geometry={innerFrameGeom} position={[0, 0, 0.025]}>
                <meshStandardMaterial color={COLORS.surfaceDark} roughness={0.5} metalness={0.4} />
            </mesh>

            {/* Стекло */}
            <mesh geometry={glassGeom} position={[0, 0, 0.045]}>
                <meshPhysicalMaterial
                    color="#ffffff"
                    roughness={0.1}
                    metalness={0.0}
                    transparent
                    opacity={0.15}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                />
            </mesh>

            {/* Голографический диплом */}
            <mesh geometry={diplomaGeom} position={[0, 0, 0.035]}>
                <meshStandardMaterial
                    map={diplomaTex}
                    emissive={COLORS.neonCyan}
                    emissiveIntensity={0.4}
                    roughness={0.2}
                    metalness={0.1}
                    transparent
                    opacity={0.95}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Декоративные уголки */}
            {[
                [-0.32, 0.27],
                [0.32, 0.27],
                [-0.32, -0.27],
                [0.32, -0.27],
            ].map(([cx, cy], i) => (
                <mesh key={i} geometry={cornerGeom} position={[cx, cy, 0.035]}>
                    <meshStandardMaterial
                        color={COLORS.neonMagenta}
                        emissive={COLORS.neonMagenta}
                        emissiveIntensity={0.6}
                        roughness={0.2}
                        metalness={0.2}
                    />
                </mesh>
            ))}

            {/* Золотая печать */}
            <mesh geometry={sealGeom} position={[0.18, -0.18, 0.04]}>
                <meshStandardMaterial
                    color="#ffd700"
                    emissive="#ffd700"
                    emissiveIntensity={0.3}
                    roughness={0.3}
                    metalness={0.9}
                />
            </mesh>
        </group>
    );
}
