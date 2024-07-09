// Create a scene
var scene = new THREE.Scene();

// Create a WebGL renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('webgl-container').appendChild(renderer.domElement);

// Load your 3D model
var loader = new THREE.GLTFLoader();
loader.load('chest.glb', function (gltf) {
    scene.add(gltf.scene);
});

// Create a camera and position it
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Set up a render loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();