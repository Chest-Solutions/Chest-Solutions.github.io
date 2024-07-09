import * as THREE from 'https://cdn.skypack.dev/three@0.132.2/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/GLTFLoader.js';

let scene, camera, renderer;
let model;

init();
animate();

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 500;
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);

  // Set the position of the light
  directionalLight.position.set(5, 5, 5); // Adjust the position according to your scene setup

  // Add the light to the scene
  scene.add(directionalLight);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const loader = new GLTFLoader();

  loader.load(
    'chest.glb',
    function (gltf) {
      model = gltf.scene;
      model.traverse((child) => {
    });
    scene.add(model);
    },
    undefined,
    function (error) {
      console.error(error);
    }
    );

  const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
  scene.add(light);
  }

function animate() {
  requestAnimationFrame(animate);
  if (model) {
    model.rotation.y += 0.05;
    model.rotation.x += 1
    model.rotation.z += 0.02
  }
  renderer.render(scene, camera);
  }
