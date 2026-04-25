import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.158/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.158/examples/jsm/controls/OrbitControls.js';

let model;

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("canvas"),
  alpha: true
});

renderer.setSize(window.innerWidth, window.innerHeight);

const light = new THREE.HemisphereLight(0xffffff, 0x444444);
scene.add(light);

const loader = new GLTFLoader();

loader.load('public/models/model.glb', (gltf) => {
  model = gltf.scene;
  scene.add(model);
});

camera.position.set(0, 1.5, 3);

const controls = new OrbitControls(camera, renderer.domElement);

const textureLoader = new THREE.TextureLoader();

// تغيير التيشيرت
window.changeShirt = function(path) {
  textureLoader.load(path, (texture) => {
    model.traverse((child) => {
      if (child.isMesh && child.name.toLowerCase().includes("shirt")) {
        child.material.map = texture;
        child.material.needsUpdate = true;
      }
    });
  });
};

// تغيير البنطلون
window.changePant = function(path) {
  textureLoader.load(path, (texture) => {
    model.traverse((child) => {
      if (child.isMesh && child.name.toLowerCase().includes("pant")) {
        child.material.map = texture;
        child.material.needsUpdate = true;
      }
    });
  });
};

// Size Guide
const guides = {
  regular: "Regular Fit: Normal size",
  oversize: "Oversize Fit: Bigger fit"
};

document.getElementById("fitType").addEventListener("change", (e) => {
  document.getElementById("sizeGuide").innerText = guides[e.target.value];
});

// render loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
