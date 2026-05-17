import {useEffect, useMemo, useRef} from 'react'
import {Text} from '@react-three/drei'
import * as THREE from 'three'

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
                             emissiveColor = '#00f0ff',
                             powerOn,
                         }: NeonTextProps) => {
    const matRef = useRef<THREE.MeshStandardMaterial>(null)
    const lightRefs = useRef<THREE.PointLight[]>([])
    const baseIntensity = 1.2
    const totalLightIntensity = 1.2   // общая яркость подсветки

    // Позиции источников вдоль текста (ось X локально)
    const lightSources = useMemo(() => {
        const totalWidth = text.replace('\n', '').length * fontSize * 0.7
        const count = Math.max(3, Math.ceil(totalWidth / 0.6))
        const halfWidth = totalWidth / 2
        const step = totalWidth / (count - 1)
        return Array.from({ length: count }, (_, i) => ({
            x: -halfWidth + i * step,
        }))
    }, [text, fontSize])

    // Установка интенсивности всем источникам
    const setLightsIntensity = (value: number) => {
        const perLight = value / lightSources.length
        lightRefs.current.forEach((l) => { if (l) l.intensity = perLight })
    }

    // Эффект включения
    useEffect(() => {
        if (!powerOn) return
        const sequence = [
            { intensity: 0.0, lightIntensity: 0, delay: 0 },
            { intensity: 2.0, lightIntensity: totalLightIntensity, delay: 50 },
            { intensity: 0.3, lightIntensity: 0.2, delay: 150 },
            { intensity: 2.0, lightIntensity: totalLightIntensity, delay: 250 },
            { intensity: 0.4, lightIntensity: 0.3, delay: 400 },
            { intensity: 1.5, lightIntensity: totalLightIntensity * 0.8, delay: 550 },
            { intensity: baseIntensity, lightIntensity: totalLightIntensity, delay: 800 },
        ]
        const timers: ReturnType<typeof setTimeout>[] = []
        sequence.forEach(({ intensity, lightIntensity, delay }) => {
            const t = setTimeout(() => {
                if (matRef.current) matRef.current.emissiveIntensity = intensity
                setLightsIntensity(lightIntensity)
            }, delay)
            timers.push(t)
        })
        return () => timers.forEach(clearTimeout)
    }, [powerOn, baseIntensity, totalLightIntensity, lightSources.length])

    // Мигание
    useEffect(() => {
        if (!powerOn) return
        const interval = setInterval(() => {
            if (!matRef.current) return
            const flicker = () => {
                const seq = [
                    { intensity: 0.2, lightIntensity: 0.1, duration: 50 },
                    { intensity: 2.0, lightIntensity: totalLightIntensity, duration: 70 },
                    { intensity: 0.6, lightIntensity: 0.2, duration: 50 },
                    { intensity: baseIntensity, lightIntensity: totalLightIntensity, duration: 30 },
                ]
                let total = 0
                seq.forEach(({ intensity, lightIntensity, duration }) => {
                    setTimeout(() => {
                        if (matRef.current) matRef.current.emissiveIntensity = intensity
                        setLightsIntensity(lightIntensity)
                    }, total)
                    total += duration
                })
            }
            flicker()
        }, 5000)
        return () => clearInterval(interval)
    }, [powerOn, baseIntensity, totalLightIntensity, lightSources.length])

    return (
        <group position={position} rotation={rotation}>
            {/* Источники света (расположены перед текстом по оси Z, чтобы светить от стены) */}
            {lightSources.map((src, i) => (
                <pointLight
                    key={i}
                    ref={(el) => { if (el) lightRefs.current[i] = el }}
                    position={[src.x, 0, 0.5]}   // локально Z+ = наружу от стены
                    color={emissiveColor}
                    intensity={0}
                    distance={3}
                    decay={2}
                />
            ))}

            {/* Слои текста */}
            <Text
                position={[0, 0, -0.03]}
                fontSize={fontSize}
                material={new THREE.MeshStandardMaterial({ color: '#1a1a2e', emissive: '#000000', roughness: 0.8, metalness: 0.2 })}
            >
                {text}
            </Text>
            <Text
                position={[0, 0, -0.01]}
                fontSize={fontSize}
                material={new THREE.MeshStandardMaterial({ color: '#404060', emissive: emissiveColor, emissiveIntensity: 0.15, roughness: 0.5, metalness: 0.3, opacity: 0.6, transparent: true })}
            >
                {text}
            </Text>
            <Text
                position={[0, 0, 0]}
                fontSize={fontSize}
                material={new THREE.MeshStandardMaterial({ color: '#ffffff', emissive: emissiveColor, emissiveIntensity: 0, roughness: 0.3, metalness: 0.4 })}
                ref={(mesh) => { if (mesh?.material) matRef.current = mesh.material as THREE.MeshStandardMaterial }}
            >
                {text}
            </Text>
        </group>
    )
}