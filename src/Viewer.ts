import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { DOGShader } from './shader/dog'


export class Viewer {
    private _scene: THREE.Scene;
    private _canvas: HTMLCanvasElement;
    private _camera: THREE.Camera;
    private _controls: OrbitControls;
    private _composer: EffectComposer;

    constructor(canvas: HTMLCanvasElement) {
        this.initScene(canvas);
    }

    public get scene(): THREE.Scene {
        return this._scene;
    }

    public update() {
        this._composer.render();
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
        const renderer = new THREE.WebGLRenderer({
            canvas: this._canvas
        });
        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.setSize(this._canvas.clientWidth, this._canvas.clientHeight)
        renderer.setClearColor(0x7fbfff, 1.0)

        // コンポーザー
        this._composer = new EffectComposer(renderer);
        this.initRenderPass(this._scene, this._camera, this._composer);
    }

    private initRenderPass(scene: THREE.Scene, camera: THREE.Camera, composer: EffectComposer) {
        const renderPass = new RenderPass(scene, camera);
        composer.addPass(renderPass);

        // ガウス差分フィルタの適用
        const dog = new ShaderPass(DOGShader);
        composer.addPass(dog);

    }
}
