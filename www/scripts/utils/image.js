"use strict";

/**
 * Get image element for an orchid
 * @param {String} genus - Genus name in lowercase (e.g., 'bulbophyllum')
 * @param {Number} id - Orchid ID
 * @returns {HTMLImageElement} Image element
 */
function GetImage(genus, id) {
    const type = genusType[genus];
    const img = document.createElement('img');
    img.src = `./images/orchids/${type}/${id}.jpg`;
    img.alt = `Orchid ${genus}`;
    img.onerror = () => {
        img.src = './images/logo/default.png'; 
    };
    return img;
}

const genusType = {
    1: 'bulbophyllum',
    2: 'cattleya',
    3: 'cymbidium',
    4: 'paphiopedilum',
    5: 'phalaenopsis'
}

/**
 * Get thumbnail image element for an orchid
 * @param {Number} genus - Genus ID (1-5)
 * @param {Number} id - Orchid ID
 * @param {Number} size - Thumbnail size in pixels (default 50)
 * @returns {HTMLImageElement} Thumbnail image element
 */
function GetThumbnail(genus, id, size = 50) {
    const img = GetImage(genus, id);
    img.style.width = `${size}px`;
    img.style.height = `${size}px`;
    img.style.borderRadius = '4px';
    img.style.objectFit = 'cover';
    return img;
}

export { GetImage, GetImageUrl, GetThumbnail };