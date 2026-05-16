import {create} from 'zustand'
import type {DialogData} from 'shared/config/roomConfig'

interface PlayerState {
    position: [number, number]
    activeInteractableId: string | null
    dialogData: DialogData | null
    setPosition: (x: number, z: number) => void
    setActiveInteractable: (id: string | null) => void
    setDialogData: (data: DialogData | null) => void
}

export const usePlayerStore = create<PlayerState>((set) => ({
    position: [0, 0],
    activeInteractableId: null,
    dialogData: null,
    setPosition: (x, z) => set({ position: [x, z] }),
    setActiveInteractable: (id) => set({ activeInteractableId: id }),
    setDialogData: (data) => set({ dialogData: data }),
}))