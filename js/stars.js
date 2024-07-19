import * as THREE from 'https://cdn.skypack.dev/three@0.132.2/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/GLTFLoader.js';

let model, clonedModel;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 5);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const starGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({ color: 0xffffff });
starMaterial.renderOrder = -5;

const starVertices = [];
for (let i = 0; i < 10000; i++) {
  const x = THREE.MathUtils.randFloatSpread(2000);
  const y = THREE.MathUtils.randFloatSpread(2000);
  const z = THREE.MathUtils.randFloatSpread(2000);
  starVertices.push(x, y, z);
}

starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const loader = new GLTFLoader();
loader.load(
  'models/chest.glb',
  function (gltf) {
    model = gltf.scene;
    model.traverse((child) => {});
    model.renderOrder = 1;
    clonedModel = model.clone();
    scene.add(clonedModel);
    scene.add(model);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
scene.add(light);

function animate() {
  requestAnimationFrame(animate);
  stars.rotation.x += 0.0005;
  stars.rotation.y += 0.0005;
  if (model) {
    model.rotation.y += 0.02;
    model.rotation.x += 0.05;
    model.rotation.z += 0.01;
  }
  renderer.render(scene, camera);
  renderer.setSize(window.innerWidth, window.innerHeight);
}
animate();
