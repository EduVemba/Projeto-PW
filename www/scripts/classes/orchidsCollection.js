import { Orchid } from './orchid.js';

//TODO: Todo tipo de orquideas criados devem ser armazenados aqui
/**
 * @class OrchidsCollection
 * @description Classe que representa uma coleção de orquídeas e que gerencia pelas características das orquídeas.
 * 
 */

const CHARACTERISTICS_MAP = {
    genero: {1: 'Bulbophyllum', 2 : 'Cattleya', 3: 'Cymbidium', 4: 'Paphiopedilum', 5: 'Phalaenopsis'},
    tipo: {1: 'Espécie', 2: 'Híbrido'},
    luminosidade: {1: 'Sombra', 2: 'Luz fraca', 3: 'Luz filtrada', 4: 'Luz forte'},
    temperatura: {1: 'Frio', 2: 'Intermédia', 3: 'Quente', 4: 'Muito Quente'},
    humidade: {1: '0% a 40%', 2: '40% a 60%', 3: '60% a 80%', 4: '80% a 100%'},
    tamanho: {1: 'Pequeno', 2: 'Médio', 3: 'Grande', 4: 'Miniatura'}
};


export class OrchidsCollection {
    #orchids = [];
    #nextId = 1;

    constructor(initialData = []){
        this.init(initialData);
    }

    init(initialData){
        if(!initialData || initialData.length === 0)return;

        this.#orchids = [];
        let maxId = 0;

        initialData.forEach(item => {
            const orchid = new Orchid(
                item.id,
                item.nome,
                item.genero,
                item.tipo,
                item.luminosidade,
                item.temperatura,
                item.humidade,
                item.tamanho
            );
            this.#orchids.push(orchid);

            if(item.id > maxId){
                maxId = item.id;
            }
        });

        this.#nextId = maxId + 1;
    }

    listAll(){
        return [...this.#orchids];
    }

    createOrchid({nome,genero, tipo, luminosidade, temperatura, humidade, tamanho}){
        if(this.existsName(nome)){
            throw new Error("Já existe uma orquídea com esse nome!");
        }

        const novoId = this.#nextId;
        const novaOrquidea = new Orchid(
            novoId,
            nome,
            genero,
            tipo,
            luminosidade,
            temperatura,
            humidade,
            tamanho
        );

        this.#orchids.push(novaOrquidea);
        this.#nextId++;

        return novaOrquidea;
    }

    editOrchid(id, newData){
        const orquidea = this.#orchids.find(o => o.getId() === id);
        if(!orquidea){
            throw new Error("Orquidea não encontrada!");
        }

        if(newData.nome && newData.nome.toLowerCase() !== orquidea.getNome().toLowerCase()){
            if(this.existsName(newData.nome)){
                throw new Error("Já existe uma outra orquídea com esse nome!");
            }
            orquidea.setNome(newData.nome);
        }

        if (newData.genero) orquidea.setGenero(newData.genero);
        if (newData.tipo) orquidea.setTipo(newData.tipo);
        if (newData.luminosidade) orquidea.setLuminosidade(newData.luminosidade);
        if (newData.temperatura) orquidea.setTemperatura(newData.temperatura);
        if (newData.humidade) orquidea.setHumidade(newData.humidade);
        if (newData.tamanho) orquidea.setTamanho(newData.tamanho);

        return orquidea;
    }

    deleteOrchid(id){
        const tamanhoOriginal = this.#orchids.length;
        this.#orchids = this.#orchids.filter(o => o.getId() !== id);

        if(this.#orchids.length === tamanhoOriginal){
            throw new Error("Não foi encontrada nenhuma orquidea com esse id;");
        }
    }

    existsName(nome){
        const nomeFormatado = nome.trim().toLowerCase();
        return this.#orchids.some(o => o.getNome().toLowerCase() === nomeFormatado);
    }


        createOrchidCard(orquidea) {
        const card = document.createElement('div');
        card.classList.add('orchid-card');
        card.setAttribute('data-id', orquidea.getId());

        const details = orquidea.getDados();
        const getLabel = (caract,code) => CHARACTERISTICS_MAP[caract]?.[code] || 'N/A';

        const createDetailParagraph = (label, value) => {
            const p = document.createElement('p');
            const strong = document.createElement('strong');
            strong.textContent = `${label}: `
            p.appendChild(strong);
            p.appendChild(document.createTextNode(value));
            return p; 
        };

        const createActionButton = (text, className, id) => {
            const button = document.createElement('button');
            button.classList.add(className);
            button.setAttribute('data-id', id);
            button.textContent = text;
            return button;
        };

        const title = document.createElement('h3');
        title.textContent = details.nome;
        card.appendChild(title);

        card.appendChild(createDetailParagraph('Género', getLabel('genero', details.genero)));
        card.appendChild(createDetailParagraph('Tipo', getLabel('tipo', details.tipo)));
        card.appendChild(createDetailParagraph('Luminosidade', getLabel('luminosidade', details.luminosidade)));
        card.appendChild(createDetailParagraph('Temperatura', getLabel('temperatura', details.temperatura)));
        card.appendChild(createDetailParagraph('Humidade', getLabel('humidade', details.humidade)));
        card.appendChild(createDetailParagraph('Tamanho', getLabel('tamanho', details.tamanho)));

        const actionsDiv = document.createElement('div');
        actionsDiv.classList.add('card-actions');

        actionsDiv.appendChild(createActionButton('Editar', 'btn-edit', details.id));
        actionsDiv.appendChild(createActionButton('Apagar', 'btn-delete', details.id));

        card.appendChild(actionsDiv);

        return card;
    }
}