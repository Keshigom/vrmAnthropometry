import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


export class Viewer {
    private _scene: THREE.Scene;
    private _canvas: HTMLCanvasElement;
    private _camera: THREE.Camera;
    private _controls: OrbitControls;
    private _renderer: THREE.WebGLRenderer;

    constructor(canvas: HTMLCanvasElement) {
        this.initScene(canvas);
    }

    public get scene(): THREE.Scene {
        return this._scene;
    }

    public update() {
        this._renderer.render(this._scene, this._camera);
    }


    private initScene(canvas: HTMLCanvasElement) {

        // canvas
        this._canvas = canvas;
        this._canvas.width = 1024 / 2;
        this._canvas.height = 1024 / 2;

        // シーン
        this._scene = new THREE.Scene()

        // カメラ
        this._camera = new THREE.PerspectiveCamera(
            45, this._canvas.clientWidth / this._canvas.clientHeight, 0.1, 1000)
        this._camera.position.set(0, 1.3, -1)
        this._camera.rotation.set(0, Math.PI, 0)


        // ライト
        const light = new THREE.DirectionalLight(0xffffff)
        light.position.set(-1, 1, -1).normalize()
        this._scene.add(light)

        // カメラコントローラー
        this._controls = new OrbitControls(this._camera, this._canvas);
        this._controls.target.y = 1.0;
        this._controls.update();

        // レンダラー
        this._renderer = new THREE.WebGLRenderer({
            antialias: false,
            canvas: this._canvas
        });
        this._renderer.setPixelRatio(window.devicePixelRatio)
        this._renderer.setSize(this._canvas.clientWidth, this._canvas.clientHeight)
        this._renderer.setClearColor(0x7fbfff, 1.0)

        // ヘルパー
        const axesHelper = new THREE.AxesHelper(5);
        this._scene.add(axesHelper);
        const gridHelper = new THREE.GridHelper(10, 10);
        this._scene.add(gridHelper);
    }

}
