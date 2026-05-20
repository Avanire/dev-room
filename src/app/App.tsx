import { WithR3F } from './providers/with-r3f';
import { DevRoom } from 'widgets/DevRoom/ui/DevRoom';
import { ModalDialog } from 'features/SpeechBubble/ui/ModalDialog';
import { LoaderOverlay } from 'widgets/SceneLoader/ui/LoaderOverlay.tsx';
import { ControlHint } from 'widgets/ControlHint/ui/ControlHint.tsx';

function App() {
    return (
        <>
            <LoaderOverlay />
            <WithR3F>
                <DevRoom />
            </WithR3F>
            <ModalDialog />
            <ControlHint />
        </>
    );
}

export default App;
