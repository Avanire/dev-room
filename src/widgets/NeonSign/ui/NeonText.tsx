import {useEffect, useRef} from 'react'
import {Text} from '@react-three/drei'
import * as THREE from 'three'
import {COLORS} from 'shared/config/retroFutureTheme'

interface NeonTextProps {
    text: string
    position: [number, number, number]
    rotation?: [number, number, number]
    fontSize?: number
    emissiveColor?: string
    powerOn: boolean
}

export const NeonText = ({
                             text,
                             position,
                             rotation = [0, 0, 0],
                             fontSize = 0.45,
                             emissiveColor = COLORS.neonCyan,
                             powerOn,
                         }: NeonTextProps) => {
    const matRef = useRef<THREE.MeshStandardMaterial>(null)
    const baseIntensity = 1.2

    // Эффект включения
    useEffect(() => {
        if (!powerOn) return
        const sequence = [
            { intensity: 0.0, delay: 0 },
            { intensity: 2.0, delay: 50 },
            { intensity: 0.3, delay: 150 },
            { intensity: 2.0, delay: 250 },
            { intensity: 0.4, delay: 400 },
            { intensity: 1.5, delay: 550 },
            { intensity: baseIntensity, delay: 800 },
        ]
        const timers: ReturnType<typeof setTimeout>[] = []
        sequence.forEach(({ intensity, delay }) => {
            const t = setTimeout(() => {
                if (matRef.current) matRef.current.emissiveIntensity = intensity
            }, delay)
            timers.push(t)
        })
        return () => timers.forEach(clearTimeout)
    }, [powerOn, baseIntensity])

    // Периодическое мигание
    useEffect(() => {
        if (!powerOn) return
        const interval = setInterval(() => {
            if (!matRef.current) return
            const flicker = () => {
                const seq = [
                    { intensity: 0.2, duration: 50 },
                    { intensity: 2.0, duration: 70 },
                    { intensity: 0.6, duration: 50 },
                    { intensity: baseIntensity, duration: 30 },
                ]
                let total = 0
                seq.forEach(({ intensity, duration }) => {
                    setTimeout(() => {
                        if (matRef.current) matRef.current.emissiveIntensity = intensity
                    }, total)
                    total += duration
                })
            }
            flicker()
        }, 5000)
        return () => clearInterval(interval)
    }, [powerOn, baseIntensity])

    return (
        <group position={position} rotation={rotation}>
            {/* Задний слой */}
            <Text
                position={[0, 0, -0.03]}
                fontSize={fontSize}
                material={
                    new THREE.MeshStandardMaterial({
                        color: '#1a1a2e',
                        emissive: '#000000',
                        roughness: 0.8,
                        metalness: 0.2,
                    })
                }
            >
                {text}
            </Text>
            {/* Средний слой */}
            <Text
                position={[0, 0, -0.01]}
                fontSize={fontSize}
                material={
                    new THREE.MeshStandardMaterial({
                        color: '#404060',
                        emissive: emissiveColor,
                        emissiveIntensity: 0.15,
                        roughness: 0.5,
                        metalness: 0.3,
                        opacity: 0.6,
                        transparent: true,
                    })
                }
            >
                {text}
            </Text>
            {/* Основной слой (яркий, анимированный) */}
            <Text
                position={[0, 0, 0]}
                fontSize={fontSize}
                material={
                    new THREE.MeshStandardMaterial({
                        color: '#ffffff',
                        emissive: emissiveColor,
                        emissiveIntensity: 0,
                        roughness: 0.3,
                        metalness: 0.4,
                    })
                }
                ref={(mesh) => {
                    if (mesh && mesh.material) {
                        matRef.current = mesh.material as THREE.MeshStandardMaterial
                    }
                }}
            >
                {text}
            </Text>
        </group>
    )
}