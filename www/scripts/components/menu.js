

export function setWindowContext(path) {
    window.location.href = path;
}

export function createMenuButton(text, path) {
    const button = document.createElement('button');
    button.textContent = text;
    button.className = 'menu-reference';
    button.addEventListener('click', () => setWindowContext(path));
    return button;
}