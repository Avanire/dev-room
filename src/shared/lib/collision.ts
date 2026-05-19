const ROOM_WIDTH = 12;
const ROOM_DEPTH = 10;
const WALL_THICKNESS = 0.2;
const PLAYER_RADIUS = 0.5;

const minX = -ROOM_WIDTH / 2 + WALL_THICKNESS + PLAYER_RADIUS;
const maxX = ROOM_WIDTH / 2 - WALL_THICKNESS - PLAYER_RADIUS;
const minZ = -ROOM_DEPTH / 2 + WALL_THICKNESS + PLAYER_RADIUS;
const maxZ = ROOM_DEPTH / 2 - WALL_THICKNESS - PLAYER_RADIUS;

export const clampPlayerPosition = (x: number, z: number): [number, number] => {
    return [Math.min(maxX, Math.max(minX, x)), Math.min(maxZ, Math.max(minZ, z))];
};
