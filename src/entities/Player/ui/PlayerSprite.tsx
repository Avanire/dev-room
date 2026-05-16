import {useMemo, useRef} from 'react'
import {useFrame, useThree} from '@react-three/fiber'
import {Mesh} from 'three'
import {usePlayerStore} from 'entities/Player/model/usePlayerStore'
import {generatePlayerSprite} from 'shared/lib/generateSprite'

export const PlayerSprite = () => {
    const meshRef = useRef<Mesh>(null)
    const { camera } = useThree()
    const position = usePlayerStore((s) => s.position)
    const spriteTexture = useMemo(() => generatePlayerSprite(), [])

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.position.set(position[0], 0.5, position[1])
            meshRef.current.lookAt(camera.position)
        }
    })

    return (
        <mesh ref={meshRef} position={[position[0], 0.5, position[1]]}>
            <planeGeometry args={[0.8, 0.8]} />
            <meshBasicMaterial map={spriteTexture} transparent side={2} />
        </mesh>
    )
}