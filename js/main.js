function displayMainContent() {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });
    // Create a container div
    var mainContent = document.createElement('div');
    
    // Apply a CSS class to increase the text size
    mainContent.classList.add('medium-text');

    // Set the text content
    mainContent.textContent = "Chest Solutions"; // Example content - replace this with your actual website content
    
    // Append the content to the document body
    document.body.appendChild(mainContent);
}

// Call the function to display the main website content
displayMainContent();
