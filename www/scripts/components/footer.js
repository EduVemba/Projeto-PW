export function createFooter(content = "", className = "") {
    const footer = document.createElement('footer');
    //TODO: Adicionar conteudo no rodapé (links, informações de contato, etc.)
    footer.className = className;
    footer.textContent = content;
    return footer;
}