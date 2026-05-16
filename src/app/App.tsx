import {WithR3F} from './providers/with-r3f'
import {DevRoom} from 'widgets/DevRoom/ui/DevRoom'
import './styles/global.css';

function App() {
    return (
        <WithR3F>
            <ambientLight intensity={0.4} />
            <directionalLight position={[6, 8, 4]} intensity={0.9} />
            <DevRoom />
        </WithR3F>
    )
}

export default App