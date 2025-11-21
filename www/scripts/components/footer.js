export function createFooter(content = "", className = "") {
    const footer = document.createElement('footer');
    footer.className = className;
    footer.textContent = content;
    return footer;
}