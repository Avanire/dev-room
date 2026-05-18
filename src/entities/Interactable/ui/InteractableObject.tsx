import {InteractableConfig} from 'shared/config/roomConfig'
import {COLORS} from 'shared/config/retroFutureTheme'
import ArcadeMachine from "entities/Interactable/ui/ArcadeMachine.tsx";
import Bookshelf from "entities/Interactable/ui/Bookshelf.tsx";
import Desk from "entities/Interactable/ui/Desk.tsx";


interface Props {
    config: InteractableConfig
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
                return (
                    <group position={[x, y, z]}>
                        {/* Внешняя рамка */}
                        <mesh>
                            <boxGeometry args={[0.7, 0.6, 0.05]} />
                            <meshStandardMaterial
                                color={COLORS.surfaceLight}
                                roughness={0.3}
                                metalness={0.7}
                            />
                        </mesh>
                        {/* Диплом (голографический лист) */}
                        <mesh position={[0, 0, 0.03]}>
                            <planeGeometry args={[0.5, 0.4]} />
                            <meshStandardMaterial
                                color={COLORS.hologram}
                                emissive={COLORS.neonCyan}
                                emissiveIntensity={0.5}
                                roughness={0.2}
                                metalness={0.2}
                                side={2}
                            />
                        </mesh>
                    </group>
                )
            case 'arcade':
                return <ArcadeMachine position={[x, y, z]} />;
            default:
                return null
        }
    }

    return <>{renderObject()}</>
}