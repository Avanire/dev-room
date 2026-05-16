import {generateTexture} from 'shared/lib/generateTexture'
import {PALETTE} from './palette'
import {RepeatWrapping} from "three";

// Паркет (16x16 пикселей, повторяющийся)
export const floorTexture = generateTexture(16, 16, (ctx) => {
    ctx.fillStyle = PALETTE.PEACH
    ctx.fillRect(0, 0, 16, 16)
    ctx.fillStyle = PALETTE.BROWN
    // доски
    for (let i = 0; i < 4; i++) {
        ctx.fillRect(i * 4, 0, 2, 16)
    }
    ctx.fillStyle = PALETTE.DARK_GRAY
    ctx.fillRect(0, 7, 16, 2) // поперечная линия
})

// Обои (16x16, полоска или кирпичики)
export const wallTexture = generateTexture(16, 16, (ctx) => {
    ctx.fillStyle = PALETTE.LIGHT_GRAY
    ctx.fillRect(0, 0, 16, 16)
    ctx.fillStyle = PALETTE.WHITE
    ctx.fillRect(0, 4, 16, 2)
    ctx.fillRect(0, 12, 16, 2)
})

wallTexture.wrapS = RepeatWrapping
wallTexture.wrapT = RepeatWrapping
wallTexture.repeat.set(6, 1.5)