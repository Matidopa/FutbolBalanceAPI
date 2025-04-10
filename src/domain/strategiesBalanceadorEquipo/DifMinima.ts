import { Jugador } from "../entities/Jugador";
import { Equipo } from "../entities/Equipo";
import { BalanceadorEquipoStrategy } from "./BalanceadorEquipoStrategy";

export class DifMinima implements BalanceadorEquipoStrategy {
    nombre(): string {
      return "Diferencia mínima de puntaje";
    }
  
    armarEquipos(jugadores: Jugador[], cantidadEquipos: number): Equipo[] {
      if (cantidadEquipos <= 1) throw new Error("Cantidad de equipos inválida");
  
     // 1. Ordenar los jugadores de mayor a menor puntaje
     jugadores.sort((a, b) => b.puntaje - a.puntaje);

    // 2. Crear equipos vacíos
    const equipos: Equipo[] = Array.from({ length: cantidadEquipos }, () => new Equipo([]));

    // 3. Asignar cada jugador al equipo con menor puntaje acumulado
    for (const jugador of jugadores) {
      const equipoMenosPuntaje = equipos.reduce((menos, actual) =>
        actual.puntajeTotal < menos.puntajeTotal ? actual : menos
      );
      equipoMenosPuntaje.addJugador(jugador);
    }

    return equipos;
    }
  
  }
  

