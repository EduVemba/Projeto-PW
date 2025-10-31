

export function createHeader() {
    const header = document.createElement('header');
    //TODO: Adicionar conteudo no cabeçalho (menu, logo, etc.)
    header.textContent = 'Cabeçalho do Site';
    header.className = 'site-header';

    header.style.backgroundColor = '#4CAF50';
    header.style.color = 'white';
    header.style.padding = '20px';
    header.style.textAlign = 'center';
    header.style.fontSize = '24px';

    return header;
}