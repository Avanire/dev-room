import {floorTexture, wallTexture} from 'shared/config/textures'
import {PALETTE} from 'shared/config/palette'

const Room = () => {
    const width = 12
    const depth = 10
    const height = 3
    const wallThickness = 0.2

    return (
        <group>
            {/* Пол */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
                <planeGeometry args={[width, depth]} />
                <meshToonMaterial map={floorTexture} />
            </mesh>

            {/* Ковёр */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
                <planeGeometry args={[3, 2]} />
                <meshToonMaterial color={PALETTE.RED} />
            </mesh>

            {/* Стены */}
            <mesh position={[0, height / 2, depth / 2]}>
                <boxGeometry args={[width, height, wallThickness]} />
                <meshToonMaterial map={wallTexture} />
            </mesh>
            <mesh position={[0, height / 2, -depth / 2]}>
                <boxGeometry args={[width, height, wallThickness]} />
                <meshToonMaterial map={wallTexture} />
            </mesh>
            <mesh position={[-width / 2, height / 2, 0]}>
                <boxGeometry args={[wallThickness, height, depth]} />
                <meshToonMaterial map={wallTexture} />
            </mesh>
            <mesh position={[width / 2, height / 2, 0]}>
                <boxGeometry args={[wallThickness, height, depth]} />
                <meshToonMaterial map={wallTexture} />
            </mesh>

            {/* Постер на задней стене */}
            <mesh position={[0, 1.8, depth / 2 - wallThickness / 2 - 0.01]}>
                <planeGeometry args={[1.5, 1]} />
                <meshToonMaterial color={PALETTE.YELLOW} />
            </mesh>

            {/* Растение у левой стены */}
            <group position={[-width / 2 + 0.5, 0, -2]}>
                {/* Горшок */}
                <mesh position={[0, 0.2, 0]}>
                    <boxGeometry args={[0.3, 0.4, 0.3]} />
                    <meshToonMaterial color={PALETTE.BROWN} />
                </mesh>
                {/* Листья (простой зелёный куб) */}
                <mesh position={[0, 0.5, 0]}>
                    <boxGeometry args={[0.5, 0.4, 0.5]} />
                    <meshToonMaterial color={PALETTE.GREEN} />
                </mesh>
            </group>

            {/* Растение у правой стены */}
            <group position={[width / 2 - 0.5, 0, 2]}>
                <mesh position={[0, 0.2, 0]}>
                    <boxGeometry args={[0.3, 0.4, 0.3]} />
                    <meshToonMaterial color={PALETTE.BROWN} />
                </mesh>
                <mesh position={[0, 0.5, 0]}>
                    <boxGeometry args={[0.5, 0.4, 0.5]} />
                    <meshToonMaterial color={PALETTE.GREEN} />
                </mesh>
            </group>
        </group>
    )
}

export default Room