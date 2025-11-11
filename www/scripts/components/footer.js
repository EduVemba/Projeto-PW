export function createFooter() {
    const footer = document.createElement('footer');
    //TODO: Adicionar conteudo no rodapé (links, informações de contato, etc.)
    footer.className = 'site-footer';
    footer.textContent = "© 2025 Orchids Inc. || Eduardo Vemba & João Freitas.";
    return footer;
}