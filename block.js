loader.load('chest.glb', function (gltf) {
  const model = gltf.scene;
  model.traverse((child) => {
    if (child.isMesh) {
      child.material.color.set(0xffffff); // Set the color to white
    }
  });
  scene.add(model);
}, undefined, function (error) {
  console.error('Error loading the 3D model', error);
});
