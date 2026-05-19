import Room from 'entities/Room/ui/Room';
import { PlayerModel } from 'entities/Player/ui/PlayerModel';
import { useKeyboard } from 'features/PlayerMovement/lib/useKeyboard';
import { useProximityCheck } from 'features/Interaction/lib/checkProximity';
import { InteractableObject } from 'entities/Interactable/ui/InteractableObject';
import { roomConfig } from 'shared/config/roomConfig';
import { COLORS } from 'shared/config/retroFutureTheme';
import { NeonSign3D } from 'widgets/NeonSign/ui/NeonSign3D.tsx';
import { RoomDecoration } from 'entities/Room/ui/RoomDecoration.tsx';

export const DevRoom = () => {
    useKeyboard();
    useProximityCheck();

    return (
        <>
            {/* Освещение */}
            <ambientLight intensity={1} />
            <directionalLight position={[4, 6, 2]} intensity={1} color="#ffffff" />
            <pointLight
                position={[0, 2.5, 0]}
                intensity={0.4}
                color={COLORS.neonCyan}
                distance={8}
            />
            <pointLight
                position={[-3, 1, -2]}
                intensity={0.3}
                color={COLORS.neonMagenta}
                distance={6}
            />
            <pointLight position={[3, 1, 2]} intensity={0.3} color={COLORS.neonCyan} distance={6} />

            <Room />
            <RoomDecoration />
            {roomConfig.objects.map(obj => (
                <InteractableObject key={obj.id} config={obj} />
            ))}
            <NeonSign3D />
            <PlayerModel />
        </>
    );
};
