import { Jugador } from '../entities/Jugador';
import { Equipo } from '../entities/Equipo';

export interface BalanceadorEquipoStrategy {
  armarEquipos(jugadores: Jugador[],cantEquipos: number): Equipo[];
  nombre(): string; 
}