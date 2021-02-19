
import * as THREE from 'three'
import { VRM } from '@pixiv/three-vrm'

export const measure = (vrm: VRM, renderInfo: THREE.WebGLInfo) => {

    // バウンディングボックスの可視化
    const boxHelper = new THREE.BoxHelper(vrm.scene, 0xffff00);
    vrm.scene.add(boxHelper);

    // バウンディングボックスから身長を求める
    const bBox = new THREE.Box3().setFromObject(vrm.scene);
    const bSize = bBox.max.sub(bBox.min);

    // 一人称設定から目線の高さを求める
    const headBone = vrm.firstPerson.firstPersonBone;
    const headPos = new THREE.Vector3();
    const eyelevel = headBone.getWorldPosition(headPos).y;

    // ポリゴン数の取得
    const polygonCount = renderInfo.render.triangles;

    message(bSize, eyelevel, polygonCount);
}

const message = (
    boundingBoxSize: THREE.Vector3,
    eyeLevel: number,
    polygonCount: number,
) => {

    const heightCm = (100 * boundingBoxSize.y).toFixed(1);
    const eyelevelCm = (100 * eyeLevel).toFixed(1);
    const messageText = `
        <p>身長(cm):${heightCm}</p>
        <p>視点の高さ(cm):${eyelevelCm}</p>
        <p>△ポリゴン数:${polygonCount}</p>
        <p>バウンディングボックス{x,y,z} (m):{${boundingBoxSize.x},${boundingBoxSize.y},${boundingBoxSize.z}}`;

    const modelInfoDiv = document.getElementById('modelInfo');
    modelInfoDiv.innerHTML = messageText;
}