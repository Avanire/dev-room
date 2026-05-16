import {useEffect, useRef} from 'react'
import {useFrame} from '@react-three/fiber'
import {usePlayerStore} from 'entities/Player/model/usePlayerStore'
import {roomConfig} from 'shared/config/roomConfig'

export const useProximityCheck = () => {
    const playerPos = useRef<[number, number]>([0, 0])
    const activeId = useRef<string | null>(null)
    const setActive = usePlayerStore((s) => s.setActiveInteractable)
    const setDialogData = usePlayerStore((s) => s.setDialogData)

    // Подписка на позицию игрока
    useEffect(() => {
        const unsubscribe = usePlayerStore.subscribe((state) => {
            playerPos.current = state.position
        })
        return unsubscribe
    }, [])

    useFrame(() => {
        const px = playerPos.current[0]
        const pz = playerPos.current[1]
        let closestId: string | null = null
        let closestDist = Infinity

        for (const obj of roomConfig.objects) {
            const ox = obj.position[0]
            const oz = obj.position[1]
            const dist = Math.sqrt((px - ox) ** 2 + (pz - oz) ** 2)
            if (dist < obj.radius && dist < closestDist) {
                closestDist = dist
                closestId = obj.id
            }
        }

        if (closestId !== activeId.current) {
            activeId.current = closestId
            setActive(closestId)

            // Автоматическое открытие/закрытие диалога
            if (closestId) {
                const obj = roomConfig.objects.find((o) => o.id === closestId)
                if (obj) {
                    setDialogData(obj.dialog)
                }
            } else {
                setDialogData(null)
            }
        }
    })
}