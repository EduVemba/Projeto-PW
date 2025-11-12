"use strict";
export class Orchids {
    #id;
    #description;
    #genus;
    #type;
    #luminosity;
    #temperature;
    #humidity;
    #size;
    #image_src;

    /**
     * @param {number} id
     * @param {string} description
     * @param {number} genus
     * @param {number} type
     * @param {number} luminosity
     * @param {number} temperature
     * @param {number} humidity
     * @param {number} size
     * @param {string} image_src
     */
    constructor(id,description, genus, type, luminosity, temperature, humidity, size, image_src) {
        //FIXME: Notice Solução temporaria para checagem de tipos ou final.
        if (typeof id !== "number") throw new TypeError("id deve ser número");
        if (typeof description !== "string") throw new TypeError("description deve ser string");
        if (typeof genus !== "number") throw new TypeError("genus deve ser número");
        if (typeof type !== "number") throw new TypeError("type deve ser número");
        if (typeof luminosity !== "number") throw new TypeError("luminosity deve ser número");
        if (typeof temperature !== "number") throw new TypeError("temperature deve ser número");
        if (typeof humidity !== "number") throw new TypeError("humidity deve ser número");
        if (typeof size !== "number") throw new TypeError("size deve ser número");
        if (typeof image_src !== "string") throw new TypeError("image_src deve ser string");

        this.#id = id;
        this.#description = description;
        this.#genus = genus;
        this.#type = type;
        this.#luminosity = luminosity;
        this.#temperature = temperature;
        this.#humidity = humidity;
        this.#size = size;
        this.#image_src = image_src;
    }

    getId(){return this.#id;}
    getDescription(){return this.#description;}
    getGenus(){return this.#genus;}
    getType(){return this.#type;}
    getLuminosity(){return this.#luminosity;}
    getTemperature(){return this.#temperature;}
    getHumidity(){return this.#humidity;}
    getSize(){return this.#size;}
    getImagemSrc(){return this.#image_src;}

    toCardElement(){
        const card = document.createElement("div");
        card.className = "orchid-card";

        const img = document.createElement("img");
        img.src = this.#image_src;
        img.alt = this.#description;

        const name = document.createElement("h3");
        name.textContent = this.#description;

        card.append(img,name);
        return card;
    }

}

export { Orchids };