import * as THREE from 'three'
import { VRM } from '@pixiv/three-vrm'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { measure } from './Measure';

export class Model {

    private _scene: THREE.Scene;
    private _vrm: VRM;

    constructor(scene: THREE.Scene) {
        this._scene = scene;
        this._vrm = null;
    }

    // VRMの読み込み
    public loadVRM(url: string) {

        if (this._vrm) {
            this._scene.remove(this._vrm.scene);
            this._vrm.dispose();
        }
        const loader = new GLTFLoader();
        loader.load(url,
            (gltf) => {
                VRM.from(gltf).then((vrm) => {
                    this._scene.add(vrm.scene);
                    this._vrm = vrm;
                    measure(vrm);
                })
            }
        );

    }

    public setPose(pose: any) {
        if (this._vrm) {
            this._vrm.humanoid.setPose(pose);
        }
    }
}