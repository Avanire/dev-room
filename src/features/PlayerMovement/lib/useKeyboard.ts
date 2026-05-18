import {useEffect} from 'react'
import {usePlayerStore} from 'entities/Player/model/usePlayerStore'
import {clampPlayerPosition} from 'shared/lib/collision'

const SPEED = 4

export const useKeyboard = () => {
    const setPosition = usePlayerStore((s) => s.setPosition)

    useEffect(() => {
        const keys = new Set<string>()

        const handleKeyDown = (e: KeyboardEvent) => {
            const key = e.key.toLowerCase()
            if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(key)) {
                e.preventDefault()
                keys.add(key)
            }
        }

        const handleKeyUp = (e: KeyboardEvent) => {
            const key = e.key.toLowerCase()
            if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(key)) {
                keys.delete(key)
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)

        let lastTime = performance.now()
        let animationFrame: number

        const update = () => {
            const now = performance.now()
            const delta = (now - lastTime) / 1000
            lastTime = now

            let dx = 0
            let dz = 0
            if (keys.has('arrowup')) dz -= 1
            if (keys.has('arrowdown')) dz += 1
            if (keys.has('arrowleft')) dx -= 1
            if (keys.has('arrowright')) dx += 1

            if (dx !== 0 || dz !== 0) {
                const len = Math.sqrt(dx * dx + dz * dz)
                dx /= len
                dz /= len

                const { position } = usePlayerStore.getState()
                const newX = position[0] + dx * SPEED * delta
                const newZ = position[1] + dz * SPEED * delta

                const [clampedX, clampedZ] = clampPlayerPosition(newX, newZ)
                setPosition(clampedX, clampedZ)
            }

            animationFrame = requestAnimationFrame(update)
        }

        update()

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
            cancelAnimationFrame(animationFrame)
        }
    }, [setPosition])
}