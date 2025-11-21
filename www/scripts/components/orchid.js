"use strict";


//TODO: dependendo do tipo de informação as imagens mudam.
export const orchidPage = (orchid) => {
    const orchidContent = document.createElement('div');
    orchidContent.className = "orchid-content"

    const orchidInfo = getOrchidInfo(orchid);

    const image = document.createElement('img');
    image.src = orchidInfo.img;
    image.className = "orchid-main-image";

    const information = document.createElement('div');
    information.className = "orchid-information";

    Object.entries(orchidInfo).forEach(([key, value]) => {
        if (key === "img" || key === "Type" || key === "Descripton") return;

        const characteristic = CHARACTERISTICS_MAP[key]?.[value];

        if (characteristic) {
            const characteristicDiv = document.createElement('div');
            characteristicDiv.className = 'characteristic-item';

            const charImage = document.createElement('img');
            charImage.src = characteristic.image;
            charImage.alt = characteristic.name;
            charImage.className = 'characteristic-icon';
            
            const span = document.createElement('span');
            span.textContent = `${key}: ${characteristic.name}`;

            characteristicDiv.appendChild(span);
            characteristicDiv.appendChild(charImage);

            information.appendChild(characteristicDiv);
        }
    });

    orchidContent.appendChild(information);
    orchidContent.appendChild(image);

    return orchidContent;
}


const getOrchidInfo = (orchid) => ({
    Description:   orchid.getDescription(),
    img:    orchid.getImageSrc(),
    Type: orchid.getType(),
    Genero: orchid.getGenus(),
    Luminosity:   orchid.getLuminosity(),
    Temperature:   orchid.getTemperature(),
    Humidity:    orchid.getHumidity(),
    Size:   orchid.getSize(),
});


const CHARACTERISTICS_MAP = {
    Genero: {
        1: { name: 'Bulbophyllum', image: './images/icons/bulbophyllum.png' },
        2: { name: 'Cattleya', image: './images/icons/cattleya.png' },
        3: { name: 'Cymbidium', image: './images/icons/cymbidium.png' },
        4: { name: 'Paphiopedilum', image: './images/icons/paphiopedilum.png' },
        5: { name: 'Phalaenopsis', image: './images/icons/phalaenopsis.png' }
    },
    Type: {
        1: { name: 'Espécie', image: './images/characteristics/type-species.png' },
        2: { name: 'Híbrido', image: './images/characteristics/type-hybrid.png' }
    },
    Luminosity: {
        1: { name: 'Sombra total', image: './images/characteristics/luminosity-full-shade.png' },
        2: { name: 'Luz sombreada', image: './images/characteristics/luminosity-shaded-light.png' },
        3: { name: 'Luz filtrada', image: './images/characteristics/luminosity-filtered-light.png' },
        4: { name: 'Luz forte', image: './images/characteristics/luminosity-strong-light.png' }
    },
    Temperature: {
        1: { name: 'Frio', image: './images/characteristics/temperature-cold.png' },
        2: { name: 'Temperado', image: './images/characteristics/temperature-seasoned.png' },
        3: { name: 'Quente', image: './images/characteristics/temperature-hot.png' },
        4: { name: 'Muito quente', image: './images/characteristics/temperature-very-hot.png' }
    },
    Humidity: {
        1: { name: '\u226440%', image: './images/characteristics/humidity-lt40.png' },
        2: { name: '40% a 60%', image: './images/characteristics/humidity-40-60.png' },
        3: { name: '60% a 80%', image: './images/characteristics/humidity-60-80.png' },
        4: { name: '\u226580%', image: './images/characteristics/humidity-gt80.png' }
    },
    Size: {
        1: { name: 'Miniatura', image: './images/characteristics/size-miniature.png' },
        2: { name: 'Pequeno', image: './images/characteristics/size-small.png' },
        3: { name: 'Médio', image: './images/characteristics/size-medium.png' },
        4: { name: 'Grande', image: './images/characteristics/size-big.png' }
    }
};