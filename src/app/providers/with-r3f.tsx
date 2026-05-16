import {Canvas} from '@react-three/fiber'
import {EffectComposer, Pixelation} from '@react-three/postprocessing'
import {ReactNode} from 'react'

interface WithR3FProps {
    children: ReactNode
}

export const WithR3F = ({ children }: WithR3FProps) => {
    return (
        <Canvas
            camera={{
                position: [8, 8, 8],
                fov: 35,
                near: 0.1,
                far: 50,
            }}
            style={{ width: '100vw', height: '100vh', background: '#1D2B53' }}
        >
            <color attach="background" args={['#1D2B53']} />
            {children}
            <EffectComposer>
                <Pixelation granularity={5} />
            </EffectComposer>
        </Canvas>
    )
}