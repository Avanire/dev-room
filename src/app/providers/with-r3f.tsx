import { Canvas } from '@react-three/fiber';
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing';
import { ReactNode } from 'react';
import { COLORS } from 'shared/config/retroFutureTheme';

interface WithR3FProps {
    children: ReactNode;
}

export const WithR3F = ({ children }: WithR3FProps) => {
    return (
        <Canvas
            camera={{
                position: [12, 12, 12],
                fov: 40,
                near: 0.1,
                far: 50,
            }}
            style={{ width: '100vw', height: '100vh', background: COLORS.bg }}
            gl={{ toneMapping: 3 }} // ACESFilmicToneMapping для HDR-эффекта
        >
            <color attach="background" args={[COLORS.bg]} />
            {children}
            <EffectComposer>
                <Bloom
                    luminanceThreshold={0.2}
                    luminanceSmoothing={0.9}
                    height={300}
                    intensity={0.8}
                />
                <Vignette eskil={false} offset={0.1} darkness={1.1} />
            </EffectComposer>
        </Canvas>
    );
};
