import { Jugador } from './Jugador';

export class Equipo {
    constructor(public readonly _jugadores: Jugador[]) {}

    get puntajeTotal(): number { 
        return this._jugadores.reduce((total, jugador) => total + jugador.puntaje, 0);
    }

    get estilos(): Record<string, number> {
        return this._jugadores.reduce(
          (acc, j) => {
            acc[j.estilo] = (acc[j.estilo] ?? 0) + 1;
            return acc;
          },
          { ofensivo: 0, defensivo: 0, hibrido: 0 }
        );
      }

    get jugadores(): Jugador[] {    
        return this._jugadores;
    }
    addJugador(jugador: Jugador): void {
        this._jugadores.push(jugador);
    }
}