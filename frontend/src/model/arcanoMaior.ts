import { Carta } from "./carta";

export class ArcanoMaior extends Carta {
    jornada: string;
    arquetipo: string;

    constructor(idCarta: number, nome: string, numero: number, palavraChave: string, jornada: string, arquetipo: string) {
        super(idCarta, nome, numero, palavraChave);
        this.jornada = jornada;
        this.arquetipo = arquetipo;
    }
}