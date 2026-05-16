import {Box} from '@react-three/drei'
import {InteractableConfig} from 'shared/config/roomConfig'
import {PALETTE} from 'shared/config/palette'

interface Props {
    config: InteractableConfig
}

export const InteractableObject = ({ config }: Props) => {
    const [x, z] = config.position
    const y = 0.5

    const renderObject = () => {
        switch (config.type) {
            case 'monitor':
                return (
                    <group>
                        <Box args={[0.8, 0.05, 0.6]} position={[x, y - 0.2, z]}>
                            <meshToonMaterial color={PALETTE.DARK_GRAY} />
                        </Box>
                        <Box args={[0.6, 0.4, 0.05]} position={[x, y + 0.1, z - 0.3]}>
                            <meshToonMaterial color={PALETTE.DARK_BLUE} />
                        </Box>
                    </group>
                )
            case 'server':
                return (
                    <Box args={[0.6, 1.2, 0.4]} position={[x, y + 0.4, z]}>
                        <meshToonMaterial color={PALETTE.DARK_GRAY} />
                    </Box>
                )
            case 'bookshelf':
                return (
                    <Box args={[1, 1, 0.3]} position={[x, y + 0.3, z]}>
                        <meshToonMaterial color={PALETTE.BROWN} />
                    </Box>
                )
            case 'whiteboard':
                return (
                    <Box args={[1, 0.8, 0.05]} position={[x, y + 0.2, z]}>
                        <meshToonMaterial color={PALETTE.WHITE} />
                    </Box>
                )
            case 'laptop':
                return (
                    <group>
                        <Box args={[0.7, 0.05, 0.5]} position={[x, y - 0.2, z]}>
                            <meshToonMaterial color={PALETTE.LIGHT_GRAY} />
                        </Box>
                        <Box args={[0.7, 0.3, 0.02]} position={[x, y + 0.05, z - 0.25]}>
                            <meshToonMaterial color={PALETTE.DARK_BLUE} />
                        </Box>
                    </group>
                )
            case 'frame':
                return (
                    <Box args={[0.6, 0.5, 0.05]} position={[x, y + 0.1, z]}>
                        <meshToonMaterial color={PALETTE.YELLOW} />
                    </Box>
                )
            case 'window':
                return (
                    <Box args={[1.5, 1, 0.05]} position={[x, y + 0.5, z]}>
                        <meshToonMaterial color={PALETTE.BLUE} />
                    </Box>
                )
            default:
                return (
                    <Box args={[0.4, 0.4, 0.4]} position={[x, y, z]}>
                        <meshToonMaterial color={PALETTE.PINK} />
                    </Box>
                )
        }
    }

    return <>{renderObject()}</>
}