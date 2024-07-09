    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
  
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
  
    const loader = new THREE.GLTFLoader();
    let model;
  
    loader.load(
  '/chest.glb/', // Example path assuming the file is in a 'models' directory
  function (gltf) {
    model = gltf.scene;
    // ... rest of the loading process remains the same
  },
  undefined,
  function (error) {
    console.error(error);
  }
);
  
    camera.position.z = 5;
  
    function animate() {
      requestAnimationFrame(animate);
      if (model) {
        model.rotation.x += 0.01;
        model.rotation.y += 0.01;
      }
      renderer.render(scene, camera);
    }
  
    animate();
