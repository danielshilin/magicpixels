document.addEventListener("DOMContentLoaded", () => {
    const footer = document.getElementById("footer-text");

    // Get the current year
    const currentYear = new Date().getFullYear();

    // Add the copyright text
    footer.textContent = `© ${currentYear} MagicPixels.pro`;
});
