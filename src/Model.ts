import * as THREE from 'three'
import { VRM } from '@pixiv/three-vrm'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export class Model {

    private _scene: THREE.Scene;
    private _vrm: VRM;
    private _onload: (vrm?: VRM) => void;

    constructor(scene: THREE.Scene, onLoad?: (vrm?: VRM) => void) {
        this._scene = scene;
        this._vrm = null;
        this._onload = onLoad;
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
                    this._onload(vrm);
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