
import * as THREE from 'three'
import { VRM } from '@pixiv/three-vrm'

export const measure = (vrm: VRM) => {
    const boxHelper = new THREE.BoxHelper(vrm.scene, 0xffff00);

    vrm.scene.add(boxHelper);

    const bBox = new THREE.Box3().setFromObject(vrm.scene);
    const bSize = bBox.max.sub(bBox.min);
    message(bSize, 1.0);
}

const message = (
    boundingBoxSize: THREE.Vector3,
    eyeLevel: number,
) => {

    const height = (100 * boundingBoxSize.y).toFixed(1);
    const messageText =
        `身長(cm):${height}
視点の高さ(cm):${height}
バウンディングボックス(m):
    x:${boundingBoxSize.x}
    y:${boundingBoxSize.y}
    z:${boundingBoxSize.z}
`;

    console.log(messageText)
}