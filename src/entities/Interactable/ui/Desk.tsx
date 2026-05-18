import {useMemo, useRef} from 'react'
import {useFrame} from '@react-three/fiber'
import * as THREE from 'three'
import {RoundedBoxGeometry} from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import {COLORS} from 'shared/config/retroFutureTheme'

// ---------- Динамическая текстура для экрана монитора ----------
const screenCanvas = document.createElement('canvas')
screenCanvas.width = 256
screenCanvas.height = 180
const screenCtx = screenCanvas.getContext('2d')!
const screenTexture = new THREE.CanvasTexture(screenCanvas)
screenTexture.minFilter = THREE.LinearFilter
screenTexture.magFilter = THREE.LinearFilter

function drawMonitorFrame(time: number) {
    const ctx = screenCtx
    const w = screenCanvas.width
    const h = screenCanvas.height
    ctx.fillStyle = '#0a0a14'
    ctx.fillRect(0, 0, w, h)
    ctx.fillStyle = 'rgba(0,255,255,0.04)'
    for (let y = 0; y < h; y += 3) ctx.fillRect(0, y, w, 1)
    const cx = w / 2, cy = h / 2
    ctx.strokeStyle = '#00ffff'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(cx, cy, 40 + Math.sin(time * 3) * 5, 0, Math.PI * 2)
    ctx.stroke()
    ctx.fillStyle = '#ffffff'
    ctx.font = '10px monospace'
    ctx.fillText('SYS.READY', 10, 20)
    ctx.fillText('SECURE_LINK: ACTIVE', 10, 35)
    const sqSize = 8 + Math.sin(time * 4) * 2
    ctx.fillStyle = '#ff00ff'
    ctx.fillRect(cx - 30 - sqSize / 2, cy - sqSize / 2, sqSize, sqSize)
    ctx.fillStyle = '#00ff00'
    ctx.fillRect(cx + 30 - sqSize / 2, cy - sqSize / 2, sqSize, sqSize)
}

function useMonitorTexture() {
    const textureRef = useRef(screenTexture)
    useFrame(({ clock }) => {
        drawMonitorFrame(clock.elapsedTime)
        textureRef.current.needsUpdate = true
    })
    return textureRef.current
}

// ---------- Голографическая клавиатура ----------
function HolographicKeyboard() {
    const baseGeom = useMemo(() => new RoundedBoxGeometry(0.5, 0.03, 0.15, 2, 0.005), [])
    const keyGeom = useMemo(() => new RoundedBoxGeometry(0.04, 0.01, 0.025, 1, 0.002), [])
    const keysLayout = useMemo(() => {
        const rows = [
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            [0.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5],
            [1, 2, 3, 4, 5, 6, 7, 8, 9],
        ]
        return rows.flatMap((row, r) =>
            row.map((col) => ({
                x: (col - 4.5) * 0.045,
                y: 0.015,
                z: (r - 1) * 0.03 - 0.02,
            }))
        )
    }, [])

    return (
        <group position={[0, 0.02, 0.25]}>
            <mesh geometry={baseGeom}>
                <meshStandardMaterial color={COLORS.surfaceDark} roughness={0.4} metalness={0.6} emissive={COLORS.emissiveCyan} emissiveIntensity={0.15} />
            </mesh>
            {keysLayout.map((pos, i) => (
                <mesh key={i} geometry={keyGeom} position={[pos.x, pos.y, pos.z]}>
                    <meshStandardMaterial color={COLORS.neonCyan} emissive={COLORS.neonCyan} emissiveIntensity={0.5} roughness={0.2} metalness={0.1} transparent opacity={0.9} />
                </mesh>
            ))}
        </group>
    )
}

// ---------- Мышь ----------
function CyberMouse() {
    const bodyGeom = useMemo(() => new RoundedBoxGeometry(0.07, 0.03, 0.1, 2, 0.005), [])
    const wheelGeom = useMemo(() => new THREE.CylinderGeometry(0.008, 0.008, 0.02, 8), [])
    const btnGeom = useMemo(() => new RoundedBoxGeometry(0.015, 0.01, 0.03, 1, 0.003), [])

    return (
        <group position={[0.35, 0.02, 0.3]} rotation={[0, -0.2, 0]}>
            <mesh geometry={bodyGeom}>
                <meshStandardMaterial color={COLORS.surfaceMedium} roughness={0.3} metalness={0.8} />
            </mesh>
            <mesh geometry={wheelGeom} position={[0, 0.02, -0.02]} rotation={[Math.PI / 2, 0, 0]}>
                <meshStandardMaterial color={COLORS.neonMagenta} emissive={COLORS.neonMagenta} emissiveIntensity={0.6} />
            </mesh>
            <mesh geometry={btnGeom} position={[-0.02, 0.015, -0.025]}>
                <meshStandardMaterial color={COLORS.surfaceLight} roughness={0.2} />
            </mesh>
            <mesh geometry={btnGeom} position={[0.02, 0.015, -0.025]}>
                <meshStandardMaterial color={COLORS.surfaceLight} roughness={0.2} />
            </mesh>
            <mesh position={[0, 0.015, -0.05]}>
                <sphereGeometry args={[0.006, 4, 4]} />
                <meshStandardMaterial color={COLORS.neonCyan} emissive={COLORS.neonCyan} emissiveIntensity={1} />
            </mesh>
        </group>
    )
}

// ---------- Основной компонент Desk ----------
interface DeskProps {
    x: number
    y: number
    z: number
    rotation?: [number, number, number]
}

export default function Desk({ x, y, z, rotation = [0, 0, 0] }: DeskProps) {
    const monitorTex = useMonitorTexture()

    // Геометрии стола
    const tabletopGeom = useMemo(() => new RoundedBoxGeometry(1.4, 0.06, 0.8, 3, 0.02), [])
    const legGeom = useMemo(() => new THREE.CylinderGeometry(0.04, 0.06, 0.9, 12), [])
    const cableGeom = useMemo(() => new THREE.CylinderGeometry(0.015, 0.015, 0.4, 6), [])

    // Геометрии монитора
    const monitorStandGeom = useMemo(() => new THREE.CylinderGeometry(0.06, 0.1, 0.15, 12), [])
    const monitorFrameGeom = useMemo(() => new RoundedBoxGeometry(0.84, 0.54, 0.04, 3, 0.01), [])
    const screenPlaneGeom = useMemo(() => new THREE.PlaneGeometry(0.74, 0.44), [])
    const neonFrameGeom = useMemo(() => new RoundedBoxGeometry(0.84, 0.54, 0.02, 3, 0.005), [])

    // Геометрии стула
    const seatGeom = useMemo(() => new RoundedBoxGeometry(0.5, 0.06, 0.5, 2, 0.02), [])
    const backGeom = useMemo(() => new RoundedBoxGeometry(0.5, 0.4, 0.06, 2, 0.02), [])
    const gasliftGeom = useMemo(() => new THREE.CylinderGeometry(0.04, 0.05, 0.25, 8), [])
    const crossArmGeom = useMemo(() => new THREE.CylinderGeometry(0.03, 0.03, 0.22, 6), [])
    const wheelGeom = useMemo(() => new THREE.CylinderGeometry(0.025, 0.025, 0.03, 8), [])
    const torusGeom = useMemo(() => new THREE.TorusGeometry(0.06, 0.008, 8, 16), [])

    // Декоративные элементы
    const glowStripGeom = useMemo(() => new RoundedBoxGeometry(1.36, 0.01, 0.04, 2, 0.002), [])
    const tabletGeom = useMemo(() => new RoundedBoxGeometry(0.2, 0.01, 0.3, 2, 0.005), [])

    // Предварительно вычисленные позиции для крестовины
    const chairPositions = useMemo(() =>
        Array.from({ length: 5 }).map((_, i) => {
            const angle = (i / 5) * Math.PI * 2
            return {
                rx: Math.cos(angle) * 0.2,
                rz: Math.sin(angle) * 0.2,
                rotationY: angle,
            }
        }), [])

    return (
        <group position={[x, y, z]} rotation={rotation}>
            {/* ===== СТОЛ ===== */}
            <mesh geometry={tabletopGeom} position={[0, -0.03, 0]}>
                <meshStandardMaterial color={COLORS.surfaceLight} roughness={0.3} metalness={0.7} />
            </mesh>
            <mesh geometry={glowStripGeom} position={[0, -0.06, -0.38]}>
                <meshStandardMaterial color={COLORS.neonCyan} emissive={COLORS.neonCyan} emissiveIntensity={0.7} roughness={0.2} metalness={0.1} />
            </mesh>
            {[[-0.6, -0.45, -0.3], [0.6, -0.45, -0.3], [-0.6, -0.45, 0.3], [0.6, -0.45, 0.3]].map((pos, i) => (
                <mesh key={i} geometry={legGeom} position={[pos[0], pos[1], pos[2]]}>
                    <meshStandardMaterial color={COLORS.surfaceMedium} roughness={0.4} metalness={0.8} />
                </mesh>
            ))}
            <mesh geometry={cableGeom} position={[0, -0.3, -0.35]} rotation={[0, 0, 0.2]}>
                <meshStandardMaterial color="#111122" roughness={0.6} />
            </mesh>

            {/* ===== МОНИТОР ===== */}
            <group position={[0, 0.18, -0.2]}>
                <mesh geometry={monitorStandGeom} position={[0, -0.07, 0]}>
                    <meshStandardMaterial color={COLORS.surfaceLighter} roughness={0.3} metalness={0.7} />
                </mesh>
                <mesh geometry={monitorFrameGeom} position={[0, 0.2, 0]}>
                    <meshStandardMaterial color={COLORS.metalLight} roughness={0.25} metalness={0.9} emissive={COLORS.emissiveMagenta} emissiveIntensity={0.15} />
                </mesh>
                <mesh geometry={screenPlaneGeom} position={[0, 0.2, 0.025]}>
                    <meshStandardMaterial map={monitorTex} emissive={COLORS.emissiveCyan} emissiveIntensity={0.6} roughness={0.2} metalness={0.1} transparent opacity={0.98} side={THREE.DoubleSide} />
                </mesh>
                <mesh geometry={neonFrameGeom} position={[0, 0.2, 0.03]}>
                    <meshStandardMaterial color={COLORS.neonCyan} emissive={COLORS.neonCyan} emissiveIntensity={0.4} roughness={0.2} metalness={0.3} />
                </mesh>
                <mesh position={[0, -0.03, 0.022]}>
                    <boxGeometry args={[0.08, 0.02, 0.002]} />
                    <meshStandardMaterial color={COLORS.neonMagenta} emissive={COLORS.neonMagenta} emissiveIntensity={0.8} />
                </mesh>
            </group>

            {/* ===== ПЕРИФЕРИЯ ===== */}
            <HolographicKeyboard />
            <CyberMouse />

            {/* ===== СТУЛ ===== */}
            <group position={[0, -0.6, 0.5]}>
                <mesh geometry={seatGeom}>
                    <meshStandardMaterial color={COLORS.surfaceLight} roughness={0.3} metalness={0.7} />
                </mesh>
                <mesh geometry={backGeom} position={[0, 0.22, 0.24]} rotation={[0.1, 0, 0]}>
                    <meshStandardMaterial color={COLORS.surfaceLight} roughness={0.3} metalness={0.7} />
                </mesh>

                {/* Газлифт и светящееся кольцо */}
                <mesh geometry={gasliftGeom} position={[0, -0.15, 0]}>
                    <meshStandardMaterial color={COLORS.surfaceMedium} roughness={0.3} metalness={0.9} />
                </mesh>
                <mesh geometry={torusGeom} position={[0, -0.15, 0]}>
                    <meshStandardMaterial color={COLORS.neonMagenta} emissive={COLORS.neonMagenta} emissiveIntensity={0.8} />
                </mesh>

                {/* Крестовина (лучи + колёсики) */}
                {chairPositions.map(({ rx, rz, rotationY }, i) => (
                    <group key={i}>
                        {/* Луч */}
                        <mesh
                            geometry={crossArmGeom}
                            position={[rx, -0.28, rz]}
                            rotation={[0, rotationY, Math.PI / 2]}
                        >
                            <meshStandardMaterial color={COLORS.surfaceMedium} roughness={0.3} metalness={0.9} />
                        </mesh>
                        {/* Колесо */}
                        <mesh
                            geometry={wheelGeom}
                            position={[rx, -0.35, rz]}
                            rotation={[0, rotationY, Math.PI / 2]}
                        >
                            <meshStandardMaterial color="#111122" roughness={0.7} metalness={0.3} />
                        </mesh>
                    </group>
                ))}
            </group>

            {/* ===== ПЛАНШЕТ НА СТОЛЕ ===== */}
            <group position={[-0.5, 0.02, -0.1]} rotation={[0, 0.3, 0]}>
                <mesh geometry={tabletGeom}>
                    <meshStandardMaterial color={COLORS.surfaceDark} roughness={0.4} metalness={0.6} />
                </mesh>
                <mesh position={[0, 0.008, 0]}>
                    <planeGeometry args={[0.18, 0.26]} />
                    <meshStandardMaterial color={COLORS.hologram} emissive={COLORS.emissiveCyan} emissiveIntensity={0.5} roughness={0.1} metalness={0.1} transparent opacity={0.8} />
                </mesh>
            </group>
        </group>
    )
}