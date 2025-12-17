
import { Orchid } from "../../www/scripts/classes/orchid"


/**
     * @brief função utilizado para verificar se o tipo a ser passado é da classe Orquidea
     * @param {Orchid} orchid 
     */
export function VerifyOrchid (orchid) {
    if (!(orchid instanceof Orchid)){
        throw new Error('Valor invalido')
    }
}