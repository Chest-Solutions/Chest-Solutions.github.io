function displayMainContent() {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });

    var mainContent = document.createElement('div');
    mainContent.classList.add('main-content');
    mainContent.textContent = "Chest Solutions";
    document.body.appendChild(mainContent);
}

displayMainContent();
