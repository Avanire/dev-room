import {useMemo, useRef} from 'react'
import {useFrame} from '@react-three/fiber'
import * as THREE from 'three'
import {RoundedBoxGeometry} from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'

function useScreenAnimation() {
    // Создаём canvas и текстуру один раз (глобально для компонента)
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const textureRef = useRef<THREE.CanvasTexture | null>(null)

    // Инициализация
    // eslint-disable-next-line react-hooks/refs
    if (!canvasRef.current) {
        const canvas = document.createElement('canvas')
        canvas.width = 256
        canvas.height = 224
        canvasRef.current = canvas
        const texture = new THREE.CanvasTexture(canvas)
        texture.minFilter = THREE.LinearFilter
        texture.magFilter = THREE.LinearFilter
        // eslint-disable-next-line react-hooks/refs
        textureRef.current = texture
    }

    // Анимация
    useFrame(({ clock }) => {
        const canvas = canvasRef.current
        const texture = textureRef.current
        if (!canvas || !texture) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const w = canvas.width
        const h = canvas.height
        const time = clock.elapsedTime

        // Тёмный фон с scanlines
        ctx.fillStyle = '#0a0a14'
        ctx.fillRect(0, 0, w, h)

        // Имитация пиксельной сетки
        ctx.fillStyle = 'rgba(0,255,255,0.04)'
        for (let y = 0; y < h; y += 4) {
            ctx.fillRect(0, y, w, 2)
        }

        // Простая анимация "Пакмана"
        const pacX = (Math.sin(time * 2) * 0.3 + 0.5) * w
        const pacY = (Math.cos(time * 3) * 0.2 + 0.5) * h
        ctx.fillStyle = '#ffff00'
        ctx.beginPath()
        const mouth = Math.abs(Math.sin(time * 8)) * 0.3
        ctx.arc(pacX, pacY, 20, mouth, Math.PI * 2 - mouth)
        ctx.lineTo(pacX, pacY)
        ctx.fill()

        // Несколько точек-призраков
        const ghosts = ['#ff0000', '#00ffff', '#ff69b4']
        ghosts.forEach((color, i) => {
            const angle = time * 1.5 + (i * Math.PI * 2) / 3
            const gx = w / 2 + Math.cos(angle) * 80
            const gy = h / 2 + Math.sin(angle) * 60
            ctx.fillStyle = color
            ctx.beginPath()
            ctx.arc(gx, gy, 8, 0, Math.PI * 2)
            ctx.fill()
            ctx.fillRect(gx - 6, gy, 12, 6)
        })

        // Текст "INSERT COIN"
        ctx.fillStyle = '#ffffff'
        ctx.font = '12px monospace'
        ctx.fillText('CREDIT 1', 10, 20)

        texture.needsUpdate = true
    })

    // eslint-disable-next-line react-hooks/refs
    return textureRef.current
}

export default function ArcadeMachine({
                                          position,
                                          rotation = [0, -Math.PI / 2, 0],
                                      }: {
    position: [number, number, number]
    rotation?: [number, number, number]
}) {
    const screenTex = useScreenAnimation()

    // Геометрии, создаваемые один раз
    const bodyGeom = useMemo(() => new RoundedBoxGeometry(1.0, 1.4, 0.8, 4, 0.05), [])
    const baseGeom = useMemo(() => new RoundedBoxGeometry(1.08, 0.12, 0.88, 3, 0.03), [])
    const sideGeom = useMemo(() => new RoundedBoxGeometry(0.04, 1.25, 0.7, 2, 0.01), [])
    const frameGeom = useMemo(() => new RoundedBoxGeometry(0.84, 0.54, 0.06, 4, 0.03), [])
    const screenGeom = useMemo(() => new THREE.PlaneGeometry(0.74, 0.44), [])
    const buttonBaseGeom = useMemo(() => new THREE.CylinderGeometry(0.08, 0.09, 0.04, 16), [])
    const buttonTopGeom = useMemo(() => new THREE.SphereGeometry(0.07, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), [])
    const panelGeom = useMemo(() => new RoundedBoxGeometry(0.9, 0.14, 0.4, 3, 0.02), [])
    const coinGeom = useMemo(() => new RoundedBoxGeometry(0.12, 0.18, 0.04, 2, 0.01), [])
    const neonGeom = useMemo(() => new RoundedBoxGeometry(1.02, 0.04, 0.04, 2, 0.01), [])

    // Позиции для ножек и кнопок (кортежи)
    const legPositions: [number, number, number][] = [
        [-0.45, -0.25, 0.35],
        [0.45, -0.25, 0.35],
        [-0.45, -0.25, -0.35],
        [0.45, -0.25, -0.35],
    ]
    const buttonPositions: [number, number, number][] = [
        [-0.3, 0.43, -0.22],
        [0, 0.43, -0.22],
        [0.3, 0.43, -0.22],
    ]
    const btnColors = ['#ff00ff', '#00ffff', '#00ff00']

    return (
        <group position={position} rotation={rotation}>
            {/* Основание с ножками */}
            <mesh geometry={baseGeom} position={[0, -0.15, 0]}>
                <meshStandardMaterial color="#2a2a3a" roughness={0.4} metalness={0.9} />
            </mesh>
            {legPositions.map((pos, i) => (
                <mesh key={i} position={pos}>
                    <cylinderGeometry args={[0.06, 0.07, 0.06, 8]} />
                    <meshStandardMaterial color="#111122" roughness={0.3} metalness={0.8} />
                </mesh>
            ))}

            {/* Основной корпус */}
            <mesh geometry={bodyGeom} position={[0, 0.5, 0]}>
                <meshStandardMaterial
                    color="#c8d8e8"
                    roughness={0.35}
                    metalness={0.65}
                    emissive="#001122"
                    emissiveIntensity={0.15}
                />
            </mesh>

            {/* Боковые декоративные панели */}
            <mesh geometry={sideGeom} position={[-0.51, 0.5, 0]}>
                <meshStandardMaterial color="#1a1a2e" roughness={0.5} metalness={0.2} />
            </mesh>
            <mesh geometry={sideGeom} position={[0.51, 0.5, 0]}>
                <meshStandardMaterial color="#1a1a2e" roughness={0.5} metalness={0.2} />
            </mesh>

            {/* Экранная рамка */}
            <mesh geometry={frameGeom} position={[0, 1.1, -0.38]}>
                <meshStandardMaterial color="#3a3a5a" roughness={0.25} metalness={0.9} />
            </mesh>

            {/* Голографический экран */}
            <mesh geometry={screenGeom} position={[0, 1.1, -0.43]}>
                <meshStandardMaterial
                    map={screenTex ?? undefined}
                    emissive={new THREE.Color('#00ffff')}
                    emissiveIntensity={0.6}
                    roughness={0.1}
                    metalness={0.0}
                    transparent
                    opacity={0.98}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Панель управления */}
            <mesh geometry={panelGeom} position={[0, 0.35, -0.42]} rotation={[0.15, 0, 0]}>
                <meshStandardMaterial color="#0a0a1a" roughness={0.3} metalness={0.9} />
            </mesh>

            {/* Кнопки с ободками */}
            {buttonPositions.map((pos, i) => (
                <group key={i} position={pos}>
                    <mesh>
                        <torusGeometry args={[0.09, 0.02, 8, 16]} />
                        <meshStandardMaterial color="#4a4a7a" roughness={0.2} metalness={0.95} />
                    </mesh>
                    <mesh geometry={buttonBaseGeom}>
                        <meshStandardMaterial color="#111122" roughness={0.3} metalness={0.7} />
                    </mesh>
                    <mesh geometry={buttonTopGeom} position={[0, 0.025, 0]}>
                        <meshStandardMaterial
                            color={btnColors[i]}
                            emissive={btnColors[i]}
                            emissiveIntensity={1.2}
                            roughness={0.15}
                            metalness={0.1}
                        />
                    </mesh>
                </group>
            ))}

            {/* Джойстик с манжетой */}
            <group position={[-0.4, 0.43, -0.35]}>
                <mesh>
                    <cylinderGeometry args={[0.12, 0.13, 0.04, 16]} />
                    <meshStandardMaterial color="#2a2a3a" roughness={0.3} metalness={0.9} />
                </mesh>
                <mesh position={[0, 0.03, 0]}>
                    <cylinderGeometry args={[0.09, 0.05, 0.12, 16]} />
                    <meshStandardMaterial color="#1a1a1a" roughness={0.9} metalness={0.0} />
                </mesh>
                <mesh position={[0, 0.16, 0]} rotation={[0.25, 0, 0]}>
                    <cylinderGeometry args={[0.03, 0.04, 0.3, 8]} />
                    <meshStandardMaterial color="#8899aa" roughness={0.25} metalness={0.85} />
                </mesh>
                <mesh position={[0, 0.33, 0]}>
                    <sphereGeometry args={[0.06, 16, 16]} />
                    <meshStandardMaterial
                        color="#ff00ff"
                        emissive="#ff00ff"
                        emissiveIntensity={0.7}
                        roughness={0.2}
                        metalness={0.1}
                    />
                </mesh>
            </group>

            {/* Монетоприёмник */}
            <group position={[0.35, 0.7, -0.41]}>
                <mesh geometry={coinGeom}>
                    <meshStandardMaterial color="#2a2a3a" roughness={0.3} metalness={0.9} />
                </mesh>
                <mesh position={[0, 0.03, 0.021]}>
                    <boxGeometry args={[0.08, 0.02, 0.01]} />
                    <meshStandardMaterial color="#000000" roughness={0.1} metalness={0.1} emissive="#000000" />
                </mesh>
                <mesh position={[0, -0.07, 0.03]}>
                    <cylinderGeometry args={[0.03, 0.03, 0.02, 8]} />
                    <meshStandardMaterial color="#111122" roughness={0.4} metalness={0.8} />
                </mesh>
            </group>

            {/* Декоративные неоновые полосы */}
            <mesh geometry={neonGeom} position={[0, 0.05, -0.42]}>
                <meshStandardMaterial
                    color="#ff00ff"
                    emissive="#ff00ff"
                    emissiveIntensity={0.8}
                    roughness={0.2}
                />
            </mesh>
            <mesh geometry={neonGeom} position={[0, 0.92, -0.42]}>
                <meshStandardMaterial
                    color="#00ffff"
                    emissive="#00ffff"
                    emissiveIntensity={0.8}
                    roughness={0.2}
                />
            </mesh>

            {/* Наклейки / декали */}
            <mesh position={[0.01, 0.75, -0.41]}>
                <planeGeometry args={[0.5, 0.15]} />
                <meshBasicMaterial color="#ffcc00" transparent opacity={0.8} side={THREE.DoubleSide} />
            </mesh>
            <mesh position={[0.01, 0.25, -0.41]}>
                <planeGeometry args={[0.6, 0.1]} />
                <meshBasicMaterial color="#aaaaaa" transparent opacity={0.7} side={THREE.DoubleSide} />
            </mesh>

            {/* Вентиляционная решётка на задней стенке */}
            <group position={[0, 0.6, 0.42]}>
                {Array.from({ length: 5 }).map((_, i) => (
                    <mesh key={i} position={[0, i * 0.06 - 0.12, 0]}>
                        <boxGeometry args={[0.7, 0.02, 0.02]} />
                        <meshStandardMaterial color="#1a1a2e" roughness={0.6} metalness={0.5} />
                    </mesh>
                ))}
            </group>
        </group>
    )
}