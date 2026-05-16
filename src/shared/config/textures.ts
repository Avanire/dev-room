import {generateTexture} from 'shared/lib/generateTexture'
import {RepeatWrapping} from 'three'

// Пол: светлый металл с едва заметной точечной матрицей
export const floorTexture = generateTexture(64, 64, (ctx) => {
    // базовый светло-серый с голубоватым оттенком
    ctx.fillStyle = '#c0d0e0'
    ctx.fillRect(0, 0, 64, 64)
    // мелкие точки для имитации шероховатости
    ctx.fillStyle = '#a0b0c0'
    for (let x = 0; x < 64; x += 4) {
        for (let y = 0; y < 64; y += 4) {
            if ((x + y) % 8 === 0) {
                ctx.fillRect(x, y, 2, 2)
            }
        }
    }
})
floorTexture.wrapS = RepeatWrapping
floorTexture.wrapT = RepeatWrapping
floorTexture.repeat.set(4, 3)

// Стены: однотонные панели цвета «металлик-слоновая кость»
export const wallTexture = generateTexture(32, 32, (ctx) => {
    ctx.fillStyle = '#e8ecf0'
    ctx.fillRect(0, 0, 32, 32)
    // едва заметные вертикальные стыки панелей (без ярких полос)
    ctx.fillStyle = '#cdd6df'
    ctx.fillRect(6, 0, 2, 32)
    ctx.fillRect(24, 0, 2, 32)
})
wallTexture.wrapS = RepeatWrapping
wallTexture.wrapT = RepeatWrapping
wallTexture.repeat.set(4, 1.5)