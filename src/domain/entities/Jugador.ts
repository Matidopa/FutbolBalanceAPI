export type EstiloJugador = 'defensivo' | 'ofensivo' | 'hibrido';

export class Jugador {
    private _nombre: string;
    private _puntaje: number;
    private _estilo: EstiloJugador ;


    constructor(nombre: string,  puntaje: number,estilo: EstiloJugador = 'hibrido' ) {
        this._nombre = nombre;
        this._estilo = estilo;
        this._puntaje = puntaje;
    }
    

    get nombre(): string {
        return this._nombre;
      }
    
      get puntaje(): number {
        return this._puntaje;
      }

        get estilo(): EstiloJugador {
            return this._estilo;
        }


}