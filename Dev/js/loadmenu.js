function detectWebGLContext() {
  const canvas = document.createElement("canvas");
  const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

  if (gl instanceof WebGLRenderingContext) {
    return true;
  } else {
    return false;
  }
}


window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    const mainContent = document.getElementById('mainContent');
  
    // Set a timeout to gradually hide the loading screen
    setTimeout(() => {
      loadingScreen.style.opacity = 0; // Set opacity to 0
      setTimeout(() => {
        loadingScreen.style.display = 'none'; // Hide the loading screen after the transition
      }, 1000); // Wait for the transition duration (in milliseconds)
      
      // Show main content
      mainContent.style.display = 'block';
    }, 2000); // Delay before starting the transition
  });
