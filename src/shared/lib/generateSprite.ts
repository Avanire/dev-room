import * as THREE from 'three';

export const generatePlayerSprite = (): THREE.CanvasTexture => {
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d')!;

    // Тело (тёмно-синий)
    ctx.fillStyle = '#1D2B53';
    ctx.fillRect(4, 2, 8, 10);
    // Голова (светлее)
    ctx.fillStyle = '#FFCCAA';
    ctx.fillRect(5, 0, 6, 4);
    // Глаза
    ctx.fillStyle = '#000';
    ctx.fillRect(6, 1, 2, 2);
    ctx.fillRect(10, 1, 2, 2);
    // Ноги
    ctx.fillStyle = '#5F574F';
    ctx.fillRect(5, 12, 3, 4);
    ctx.fillRect(9, 12, 3, 4);

    const texture = new THREE.CanvasTexture(canvas);
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    return texture;
};
