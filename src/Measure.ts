
import * as THREE from 'three'
import { VRM } from '@pixiv/three-vrm'

export const measure = (vrm: VRM) => {
    const boxHelper = new THREE.BoxHelper(vrm.scene, 0xffff00);

    vrm.scene.add(boxHelper);

    const bbox = new THREE.Box3().setFromObject(vrm.scene);
    console.log(bbox);
}
