import { InteractableConfig } from 'shared/config/roomConfig';
import ArcadeMachine from 'entities/Interactable/ui/ArcadeMachine.tsx';
import Bookshelf from 'entities/Interactable/ui/Bookshelf.tsx';
import Desk from 'entities/Interactable/ui/Desk.tsx';
import DiplomaFrame from 'entities/Interactable/ui/DiplomaFrame.tsx';
import Crystal from 'entities/Interactable/ui/Crystal.tsx';

interface Props {
    config: InteractableConfig;
}

export const InteractableObject = ({ config }: Props) => {
    const [x, z, objY] = config.position;
    const y = objY !== undefined ? objY : 0.5;

    const renderObject = () => {
        switch (config.type) {
            case 'bookshelf':
                return <Bookshelf x={x} y={y} z={z} rotation={[0, -Math.PI / 2, 0]} />;
            case 'desk':
                return <Desk x={x} y={y} z={z} />;
            case 'frame':
                return <DiplomaFrame x={x} y={y} z={z} rotation={[0, 0, 0]} />;
            case 'arcade':
                return <ArcadeMachine position={[x, y, z]} />;
            case 'artifact':
                return <Crystal position={[x, y, z]} />;
            default:
                return null;
        }
    };

    return <>{renderObject()}</>;
};
