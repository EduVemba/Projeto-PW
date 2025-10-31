//TODO: ficheiro principal que vai gerenciar a aplicação
import { createHeader } from './components/header.js';
import { createFooter } from './components/footer.js';


const body = document.body;

const header = createHeader();
const footer = createFooter();

body.appendChild(header);
body.appendChild(footer);