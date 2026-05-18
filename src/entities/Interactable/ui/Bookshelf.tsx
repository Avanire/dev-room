import {useMemo} from 'react'
import {RoundedBoxGeometry} from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import {BoxGeometry, ConeGeometry, CylinderGeometry} from 'three'
import {COLORS} from 'shared/config/retroFutureTheme'

interface BookshelfProps {
    x: number
    y: number
    z: number
    rotation?: [number, number, number]
}

interface BookItemProps {
    offsetX: number
    thickness: number
    height: number
    depth: number
    coverColor: string
    pageColor: string
    shelfY: number
    isHorizontal: boolean
    stackIndex?: number
    coverGeom: RoundedBoxGeometry
    pageGeom: RoundedBoxGeometry
    spineStripeGeom: BoxGeometry
}

// Компонент отдельной книги
function BookItem({
                      offsetX,
                      thickness,
                      height,
                      depth,
                      coverColor,
                      pageColor,
                      shelfY,
                      isHorizontal,
                      stackIndex,
                      coverGeom,
                      pageGeom,
                      spineStripeGeom,
                  }: BookItemProps) {
    // Вычисляем позицию по Y в зависимости от ориентации
    const bookCenterY = isHorizontal
        ? shelfY + thickness * ((stackIndex ?? 0) + 0.5)
        : shelfY + height / 2

    return (
        <group
            position={[offsetX, bookCenterY, 0]}
            rotation={isHorizontal ? [0, 0, Math.PI / 2] : [0, 0, 0]}
        >
            {/* Обложка */}
            <mesh geometry={coverGeom}>
                <meshStandardMaterial
                    color={coverColor}
                    emissive={coverColor}
                    emissiveIntensity={0.25}
                    roughness={0.5}
                    metalness={0.1}
                />
            </mesh>

            {/* Страничный блок */}
            <mesh geometry={pageGeom} position={[0, -0.01, 0]}>
                <meshStandardMaterial color={pageColor} roughness={0.8} metalness={0.0} />
            </mesh>

            {/* Золотистая полоска на корешке */}
            {!isHorizontal && (
                <mesh geometry={spineStripeGeom} position={[0, height * 0.15, depth * 0.5 + 0.001]}>
                    <meshStandardMaterial
                        color="#ffd700"
                        emissive="#ffd700"
                        emissiveIntensity={0.4}
                        roughness={0.3}
                        metalness={0.9}
                    />
                </mesh>
            )}
        </group>
    )
}

// Основной компонент книжной полки
export default function Bookshelf({ x, y, z, rotation = [0, Math.PI / 2, 0] }: BookshelfProps) {
    const shelfLevels = [0.35, 0.7, 1.05]

    // Конфигурация книг: [offsetX, thickness, height, depth, coverColor, pageColor]
    const booksConfig = [
        // Нижняя полка
        [
            [-0.35, 0.08, 0.26, 0.22, COLORS.bookOne, COLORS.pageLight],
            [-0.2, 0.06, 0.18, 0.18, COLORS.bookTwo, COLORS.pageLight],
            [-0.08, 0.07, 0.2, 0.2, COLORS.bookThree, COLORS.pageLight],
            [0.05, 0.05, 0.19, 0.19, COLORS.bookOne, COLORS.pageLight],
            [0.18, 0.06, 0.21, 0.21, COLORS.bookTwo, COLORS.pageLight],
            [0.32, 0.07, 0.23, 0.23, COLORS.bookThree, COLORS.pageLight],
        ],
        // Средняя полка
        [
            [0.38, 0.09, 0.28, 0.25, COLORS.bookTwo, COLORS.pageLight],
            [0.25, 0.05, 0.2, 0.2, COLORS.bookThree, COLORS.pageLight],
            [0.15, 0.06, 0.22, 0.22, COLORS.bookOne, COLORS.pageLight],
            [0.05, 0.05, 0.18, 0.18, COLORS.bookTwo, COLORS.pageLight],
            [-0.08, 0.07, 0.24, 0.24, COLORS.bookThree, COLORS.pageLight],
            [-0.2, 0.06, 0.2, 0.2, COLORS.bookOne, COLORS.pageLight],
            [-0.32, 0.08, 0.26, 0.22, COLORS.bookTwo, COLORS.pageLight],
        ],
        // Верхняя полка
        [
            [-0.15, 0.07, 0.15, 0.22, COLORS.bookThree, COLORS.pageLight],
            [-0.15, 0.07, 0.17, 0.22, COLORS.bookOne, COLORS.pageLight],
            [-0.15, 0.07, 0.19, 0.22, COLORS.bookTwo, COLORS.pageLight],
            [0.2, 0.06, 0.2, 0.2, COLORS.bookOne, COLORS.pageLight],
            [0.32, 0.07, 0.22, 0.22, COLORS.bookThree, COLORS.pageLight],
        ],
    ] as const

    // ===== Кешированные геометрии для корпуса =====
    const sideGeom = useMemo(() => new RoundedBoxGeometry(0.1, 1.2, 0.4, 3, 0.02), [])
    const shelfGeom = useMemo(() => new RoundedBoxGeometry(1.0, 0.04, 0.4, 3, 0.02), [])
    const backGeom = useMemo(() => new RoundedBoxGeometry(1.0, 1.2, 0.04, 3, 0.02), [])
    const topGeom = useMemo(() => new RoundedBoxGeometry(1.2, 0.04, 0.44, 3, 0.02), [])
    const neonLineGeom = useMemo(() => new BoxGeometry(0.015, 1.0, 0.01), [])
    const shelfGlowGeom = useMemo(() => new BoxGeometry(0.96, 0.01, 0.06), [])
    const roofGlowGeom = useMemo(() => new BoxGeometry(1.18, 0.015, 0.04), [])

    // ===== Кешированные геометрии для книг =====
    const bookGeometries = useMemo(() => {
        const geomMap = new Map<string, { cover: RoundedBoxGeometry; page: RoundedBoxGeometry; spine: BoxGeometry }>()
        booksConfig.flat().forEach(([_, thickness, height, depth]) => {
            const key = `${thickness}-${height}-${depth}`
            if (!geomMap.has(key)) {
                geomMap.set(key, {
                    cover: new RoundedBoxGeometry(thickness, height, depth, 2, 0.005),
                    page: new RoundedBoxGeometry(thickness - 0.015, height - 0.03, depth - 0.02, 2, 0.003),
                    spine: new BoxGeometry(thickness + 0.002, height * 0.08, 0.003),
                })
            }
        })
        return geomMap
    }, [booksConfig])

    // ===== Геометрии для декоративной пирамидки =====
    const pyramidBaseGeom = useMemo(() => new CylinderGeometry(0.06, 0.07, 0.03, 16), [])
    const pyramidConeGeom = useMemo(() => new ConeGeometry(0.05, 0.1, 4), [])

    return (
        <group position={[x, y, z]} rotation={rotation}>
            {/* ===== Боковые стенки ===== */}
            {[-0.55, 0.55].map((posX) => (
                <mesh key={posX} geometry={sideGeom} position={[posX, 0, 0]}>
                    <meshStandardMaterial
                        color={COLORS.metalLight}
                        emissive={COLORS.emissiveMagenta}
                        emissiveIntensity={0.3}
                        roughness={0.35}
                        metalness={0.85}
                    />
                </mesh>
            ))}

            {/* ===== Задняя стенка + неоновые линии ===== */}
            <mesh geometry={backGeom} position={[0, 0, 0.2]}>
                <meshStandardMaterial
                    color="#0a0a1a"
                    roughness={0.5}
                    metalness={0.4}
                    emissive={COLORS.emissiveCyan}
                    emissiveIntensity={0.15}
                />
            </mesh>
            {[-0.3, 0, 0.3].map((offsetX, i) => (
                <mesh key={`neonline-${i}`} geometry={neonLineGeom} position={[offsetX, 0, 0.22]}>
                    <meshStandardMaterial
                        color={COLORS.neonCyan}
                        emissive={COLORS.neonCyan}
                        emissiveIntensity={0.9}
                        roughness={0.1}
                        metalness={0.1}
                    />
                </mesh>
            ))}

            {/* ===== Полки с подсветкой ===== */}
            {shelfLevels.map((h, i) => (
                <group key={i}>
                    <mesh geometry={shelfGeom} position={[0, h - 0.5, 0]}>
                        <meshStandardMaterial color={COLORS.metalLight} roughness={0.3} metalness={0.9} />
                    </mesh>
                    <mesh geometry={shelfGlowGeom} position={[0, h - 0.52, 0.2]}>
                        <meshStandardMaterial
                            color={COLORS.neonMagenta}
                            emissive={COLORS.neonMagenta}
                            emissiveIntensity={0.6}
                            roughness={0.2}
                            metalness={0.1}
                        />
                    </mesh>
                </group>
            ))}

            {/* ===== Книги ===== */}
            {booksConfig.map((levelBooks, levelIndex) =>
                levelBooks.map(([offsetX, thickness, height, depth, coverColor, pageColor], bookIndex) => {
                    const shelfY = shelfLevels[levelIndex] - 0.5
                    // Верхняя полка, первые три книги — горизонтальная стопка
                    const isHorizontal = levelIndex === 2 && bookIndex < 3
                    const key = `${thickness}-${height}-${depth}`
                    const geoms = bookGeometries.get(key)!
                    return (
                        <BookItem
                            key={`book-${levelIndex}-${bookIndex}`}
                            offsetX={offsetX}
                            thickness={thickness}
                            height={height}
                            depth={depth}
                            coverColor={coverColor}
                            pageColor={pageColor}
                            shelfY={shelfY}
                            isHorizontal={isHorizontal}
                            stackIndex={isHorizontal ? bookIndex : undefined}
                            coverGeom={geoms.cover}
                            pageGeom={geoms.page}
                            spineStripeGeom={geoms.spine}
                        />
                    )
                })
            )}

            {/* ===== Голографическая пирамидка на верхней полке ===== */}
            <group position={[-0.35, 0.62, 0]}>
                <mesh geometry={pyramidBaseGeom}>
                    <meshStandardMaterial color={COLORS.metalLight} roughness={0.3} metalness={0.9} />
                </mesh>
                <mesh geometry={pyramidConeGeom} position={[0, 0.05, 0]}>
                    <meshStandardMaterial
                        color={COLORS.neonCyan}
                        emissive={COLORS.neonCyan}
                        emissiveIntensity={0.6}
                        roughness={0.1}
                        metalness={0.1}
                        transparent
                        opacity={0.6}
                    />
                </mesh>
            </group>

            {/* ===== Верхняя крышка с неоновой окантовкой ===== */}
            <mesh geometry={topGeom} position={[0, 0.62, 0]}>
                <meshStandardMaterial color={COLORS.metalLight} roughness={0.3} metalness={0.9} />
            </mesh>
            <mesh geometry={roofGlowGeom} position={[0, 0.64, -0.2]}>
                <meshStandardMaterial
                    color={COLORS.neonMagenta}
                    emissive={COLORS.neonMagenta}
                    emissiveIntensity={0.8}
                    roughness={0.2}
                />
            </mesh>
        </group>
    )
}