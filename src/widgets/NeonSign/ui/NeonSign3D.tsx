import { useEffect, useState } from 'react';
import { NeonText } from './NeonText';
import { COLORS } from 'shared/config/retroFutureTheme';

export const NeonSign3D = () => {
    const [powerOn, setPowerOn] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setPowerOn(true), 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <NeonText
                text={'FRONTEND\n DEVELOPER'}
                position={[-4.7, 2.7, -2.1]}
                rotation={[0, Math.PI / 2, 0]}
                emissiveColor={COLORS.neonCyan}
                powerOn={powerOn}
            />
            <NeonText
                text={'ANTON\n TATARINOV'}
                position={[-4.7, 1.4, -2.1]}
                rotation={[0, Math.PI / 2, 0]}
                emissiveColor={COLORS.yellowCyberpunk}
                powerOn={powerOn}
            />
            <NeonText
                text="SKILLS"
                position={[3.5, 2.3, -4.89]}
                emissiveColor={COLORS.neonGreen}
                powerOn={powerOn}
            />
            <NeonText
                text="ABOUT ME"
                position={[0, 2, -4.89]}
                emissiveColor={COLORS.neonGreen}
                powerOn={powerOn}
            />
            <NeonText
                text="EXPERIENCE"
                position={[-4.7, 2.6, 1]}
                rotation={[0, Math.PI / 2, 0]}
                emissiveColor={COLORS.neonGreen}
                powerOn={powerOn}
            />
            <NeonText
                text="CONTACT ME"
                position={[-4.9, 2.4, 4]}
                rotation={[0, Math.PI / 2, 0]}
                emissiveColor={COLORS.hologram}
                powerOn={powerOn}
            />
        </>
    );
};
