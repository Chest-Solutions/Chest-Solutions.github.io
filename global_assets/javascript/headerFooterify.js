// Function to fetch and insert header and footer content
function insertHeaderFooter(headerUrl, footerUrl) {
    document.addEventListener("DOMContentLoaded", function () {
        // Fetch and insert the header content
        fetch(headerUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load header from ${headerUrl}`);
                }
                return response.text();
            })
            .then(headerContent => {
                const header = document.querySelector("header");
                if (header) {
                    header.innerHTML = headerContent;
                } else {
                    console.error("Header element not found on the page.");
                }
            })
            .catch(error => console.error(error));

        // Fetch and insert the footer content
        fetch(footerUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load footer from ${footerUrl}`);
                }
                return response.text();
            })
            .then(footerContent => {
                const footer = document.querySelector("footer");
                if (footer) {
                    footer.innerHTML = footerContent;
                } else {
                    console.error("Footer element not found on the page.");
                }
            })
            .catch(error => console.error(error));
    });
}

// Exporting the function for use in other scripts
export { insertHeaderFooter };