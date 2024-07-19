import * as THREE from 'https://cdn.skypack.dev/three@0.132.2/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/GLTFLoader.js';

let scene, camera, renderer;
let model, clonedModel;

init();
animate();

function init() {
  scene = new THREE.Scene();

  const textureLoader = new THREE.TextureLoader();
  const backgroundTexture = textureLoader.load('images/sky.png');
  scene.background = backgroundTexture;

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 500;

  const directionalLight = new THREE.DirectionalLight(0x8787ff, 1);
  directionalLight.position.set(0, 0, 0);
  scene.add(directionalLight);

  const loader = new GLTFLoader();
  loader.load(
    'models/chest.glb',
    function (gltf) {
      model = gltf.scene;
      model.traverse((child) => {});
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

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
}

function loadMainWebsite() {
  function scrolldown() {
    setTimeout(function(){
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }, 100);  
  }

  var script = document.createElement('script');
  script.src = 'js/main.js';
  document.head.appendChild(script);
}

document.addEventListener('mousedown', loadMainWebsite, false);

function animate() {
  requestAnimationFrame(animate);
  if (model) {
    model.rotation.y += 0.02;
    model.rotation.x += 0.05;
    model.rotation.z += 0.01;
  }
  renderer.render(scene, camera);
}
