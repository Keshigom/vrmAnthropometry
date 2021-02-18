import { Viewer } from './Viewer'
import { Model } from './Model'

window.addEventListener("DOMContentLoaded", () => {

    const canvas = document.getElementById('viewer') as HTMLCanvasElement;
    const viewer = new Viewer(canvas);
    const scene = viewer.scene;
    const model = new Model(scene);
    model.loadVRM('./three-vrm-girl.vrm');


    // VRM 読み込み
    const inputVRM = document.getElementById('inputVRM');
    inputVRM.addEventListener('change', (event) => {
        const target = event.target as HTMLInputElement;
        const files = target.files;
        if (!files) return;

        const file = files[0];
        if (!file) return;

        const blob = new Blob([file], { type: "application/octet-stream" });
        const url = URL.createObjectURL(blob);
        model.loadVRM(url);
    });

    // フレーム更新
    const update = () => {
        requestAnimationFrame(update)
        viewer.update();
    }
    update();
})

