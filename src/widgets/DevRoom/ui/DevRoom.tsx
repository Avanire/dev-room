import Room from 'entities/Room/ui/Room'
import {PlayerSprite} from 'entities/Player/ui/PlayerSprite'
import {useKeyboard} from 'features/PlayerMovement/lib/useKeyboard'
import {useProximityCheck} from 'features/Interaction/lib/checkProximity'
import {InteractableObject} from 'entities/Interactable/ui/InteractableObject'
import {SpeechBubble} from 'features/SpeechBubble/ui/SpeechBubble'
import {roomConfig} from 'shared/config/roomConfig'

export const DevRoom = () => {
    useKeyboard()
    useProximityCheck()

    return (
        <>
            <Room />
            {roomConfig.objects.map((obj) => (
                <InteractableObject key={obj.id} config={obj} />
            ))}
            <PlayerSprite />
            <SpeechBubble />
        </>
    )
}