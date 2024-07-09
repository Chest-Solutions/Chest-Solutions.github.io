// Create a scene
var scene = new THREE.Scene();

// Create a WebGL renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('webgl-container').appendChild(renderer.domElement);

// Handle loading errors
loader.load('chest.glb', function (gltf) {
    scene.add(gltf.scene);
  }, undefined, function (error) {
    console.error('Error loading the 3D model', error);
  
    // Show a browser notification
    if (Notification.permission === 'granted') {
      // If the user has already granted permission for notifications
      new Notification('Error', {
        body: 'Oops! There was an error loading the 3D model.'
      });
    } else if (Notification.permission !== 'denied') {
      // If the user hasn't denied permission but hasn't granted it yet
      Notification.requestPermission().then(function (permission) {
        if (permission === 'granted') {
          new Notification('Error', {
            body: 'Oops! There was an error loading the 3D model.'
          });
        }
      });
    }
  });
// Add a directional light to the scene
var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

// Adjust renderer size based on viewport
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize);

// Create a camera and position it
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Set up a render loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
