import { floorTexture, wallTexture } from 'shared/config/textures';

const Room = () => {
    const width = 12;
    const depth = 10;
    const height = 3;
    const wallThickness = 0.2;

    return (
        <group>
            {/* Пол */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
                <planeGeometry args={[width, depth]} />
                <meshStandardMaterial
                    map={floorTexture}
                    roughness={0.4}
                    metalness={0.8}
                    color={'#fff'}
                />
            </mesh>

            {/* Стены */}
            <mesh position={[0, height / 2, -depth / 2]}>
                <boxGeometry args={[width, height, wallThickness]} />
                <meshStandardMaterial
                    map={wallTexture}
                    roughness={0.6}
                    metalness={0.5}
                    color={'#fff'}
                />
            </mesh>
            <mesh position={[-width / 2, height / 2, 0]}>
                <boxGeometry args={[wallThickness, height, depth]} />
                <meshStandardMaterial
                    map={wallTexture}
                    roughness={0.6}
                    metalness={0.5}
                    color={'#fff'}
                />
            </mesh>
        </group>
    );
};

export default Room;
