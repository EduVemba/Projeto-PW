//TODO: O body sera aonde ficara o conteudo principal da aplicacao

//TODO: pegar o tipo de main do header com o window.location.href.
const mainHeader = () => {
    const head = document.createElement('header');
    const text = document.createElement('h2');
    head.classList.add('main-header');

    text.textContent = 'Todos';

    //FIXME: vai ser usado o IIFE para alterar juntamente com o window.location.href.

    head.appendChild(text);
    return head;
}

export const createMain = () => {
    const body = document.createElement('main');
    const header = mainHeader();

    body.appendChild(header);

    return body;
}

