"use strict";

import { orchidsCollection } from "../state/orchidsInstance.js";


export const filterBy = (category,type) => {

    const collection = orchidsCollection.getTodos;

    const targetType = {
        "genus": "getGenus",
        "type": "getType",
        "luminosity": "getLuminosity",
        "temperature": "getTemperature",
        "humidity": "getHumidity",
        "size": "getSize",
    };

    const targetGetterName = targetType[category];

    if (category === "Todas" || !targetGetterName) {
        return category === "Todas" ? collection : [];
    }

    const result = collection.filter(orchid => {
        return orchid[targetGetterName]() === type;
    });


    return result;
}