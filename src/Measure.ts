
import * as THREE from 'three'
import { VRM, VRMSchema } from '@pixiv/three-vrm'

export const measure = (vrm: VRM) => {
    const boxHelper = new THREE.BoxHelper(vrm.scene, 0xffff00);

    vrm.scene.add(boxHelper);

    const bBox = new THREE.Box3().setFromObject(vrm.scene);
    const bSize = bBox.max.sub(bBox.min);

    const headBone = vrm.firstPerson.firstPersonBone;
    const headPos = new THREE.Vector3();

    const eyelevel = headBone.getWorldPosition(headPos).y;
    message(bSize, eyelevel);
}

const message = (
    boundingBoxSize: THREE.Vector3,
    eyeLevel: number,
) => {

    const heightCm = (100 * boundingBoxSize.y).toFixed(1);
    const eyelevelCm = (100 * eyeLevel).toFixed(1);
    const messageText = `
        <p>身長(cm):${heightCm}</p>
        <p>視点の高さ(cm):${eyelevelCm}</p>
        <p>バウンディングボックス{x,y,z} (m):{${boundingBoxSize.x},${boundingBoxSize.y},${boundingBoxSize.z}}`;

    const modelInfoDiv = document.getElementById('modelInfo');
    modelInfoDiv.innerHTML = messageText;
    console.log(messageText)
}