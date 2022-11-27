// tweakpane
import { Pane } from 'tweakpane';
import * as EssentialsPlugin from '@tweakpane/plugin-essentials';

// three-js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// shaders
import vsh from './shaders/vertex-shader.glsl';
import fsh from './shaders/fragment-shader.glsl';

// assets
import leftx from './assets/Cold_Sunset__Cam_2_Left+X.png';
import rightx from './assets/Cold_Sunset__Cam_3_Right-X.png';
import upy from './assets/Cold_Sunset__Cam_4_Up+Y.png';
import downy from './assets/Cold_Sunset__Cam_5_Down-Y.png';
import frontz from './assets/Cold_Sunset__Cam_0_Front+Z.png';
import backz from './assets/Cold_Sunset__Cam_1_Back-Z.png';

class ThreeJSWebTemplate {
  constructor() {}

  async initialize() {
    this.threejs_ = new THREE.WebGLRenderer();
    this.threejs_.outputEncoding = THREE.sRGBEncoding;
    document.body.appendChild(this.threejs_.domElement);

    window.addEventListener(
      'resize',
      () => {
        this.onWindowResize_();
      },
      false
    );

    this.scene_ = new THREE.Scene();

    this.camera_ = new THREE.PerspectiveCamera(
      60,
      1920.0 / 1080.0,
      0.1,
      1000.0
    );
    this.camera_.position.set(1, 0, 5);

    const controls = new OrbitControls(this.camera_, this.threejs_.domElement);
    controls.target.set(0, 0, 0);
    controls.update();

    const loader = new THREE.CubeTextureLoader();
    const texture = loader.load([leftx, rightx, upy, downy, frontz, backz]);
    this.scene_.background = texture;

    await this.setupProject_();

    this.tweakpane_ = new Pane({ title: 'tweaks' });
    this.tweakpane_.registerPlugin(EssentialsPlugin);
    this.fpsGraph_ = this.tweakpane_.addBlade({
      view: 'fpsgraph',

      label: 'fpsgraph',
      lineCount: 2,
    });

    this.previousRAF_ = null;
    this.onWindowResize_();
    this.raf_();
  }

  async setupProject_() {
    const material = new THREE.ShaderMaterial({
      uniforms: {
        specMap: { value: this.scene_.background },
        time: { value: 0.0 },
      },
      vertexShader: vsh,
      fragmentShader: fsh,
    });

    this.material_ = material;

    const geometry = new THREE.IcosahedronGeometry(1, 128);
    const mesh = new THREE.Mesh(geometry, material);
    this.scene_.add(mesh);

    this.totalTime_ = 0;
  }

  onWindowResize_() {
    this.threejs_.setSize(window.innerWidth, window.innerHeight);

    this.camera_.aspect = window.innerWidth / window.innerHeight;
    this.camera_.updateProjectionMatrix();
  }

  raf_() {
    requestAnimationFrame((t) => {
      if (this.previousRAF_ === null) {
        this.previousRAF_ = t;
      }

      this.step_(t - this.previousRAF_);

      this.fpsGraph_.begin();
      this.threejs_.render(this.scene_, this.camera_);
      this.fpsGraph_.end();

      this.raf_();
      this.previousRAF_ = t;
    });
  }

  step_(timeElapsed) {
    const timeElapsedS = timeElapsed * 0.001;
    this.totalTime_ += timeElapsedS;

    this.material_.uniforms.time.value = this.totalTime_;
  }
}

let APP_ = null;

window.addEventListener('DOMContentLoaded', async () => {
  APP_ = new ThreeJSWebTemplate();
  await APP_.initialize();
});
