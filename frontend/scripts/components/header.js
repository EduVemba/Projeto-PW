

export function createHeader() {
    const header = document.createElement('header');
    //TODO: Adicionar conteudo no cabeçalho (menu, logo, etc.)
    header.textContent = 'The Orchids Site';
    header.className = 'site-header';

    return header;
}