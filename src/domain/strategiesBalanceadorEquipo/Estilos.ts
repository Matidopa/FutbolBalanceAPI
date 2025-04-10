import { BalanceadorEquipoStrategy } from "./BalanceadorEquipoStrategy";
import { Jugador, EstiloJugador } from "../entities/Jugador";
import { Equipo } from "../entities/Equipo";

export class Estilos implements BalanceadorEquipoStrategy {
    nombre(): string {
        return 'Balanceo por estilos';
    }
    
    armarEquipos(jugadores: Jugador[], cantidadEquipos: number): Equipo[] {
        if (cantidadEquipos  != 2) throw new Error('Cantidad de equipos inválida');

        // 1. Agrupo por estilos
        const grupos = new Map<EstiloJugador, Jugador[]>();

        jugadores.forEach(jugador => {
            const estilo = jugador.estilo;
            if (!grupos.has(estilo)) {
                grupos.set(estilo, []);
            }
            grupos.get(estilo)!.push(jugador);
        });

        // 2. Crear equipos vacíos
        const equipos: Equipo[] = Array.from({ length: cantidadEquipos }, () => new Equipo([]));
    
        // 3. Asignar cada jugador al equipo de forma alternada
        for (const jugadoresDelGrupo of grupos.values()) {
            const ordenados = [...jugadoresDelGrupo].sort((a, b) => b.puntaje - a.puntaje);
          
            ordenados.forEach((jugador) => {
              // Encontramos el equipo con menor puntaje Y con menos o igual cantidad de jugadores
              const equipoElegido = equipos.reduce((mejorEquipo, actual) => {
                const diffJugadores = actual.jugadores.length - mejorEquipo.jugadores.length;
                const mejorPuntaje = mejorEquipo.puntajeTotal;
                const actualPuntaje = actual.puntajeTotal;
          
                if (diffJugadores > 1) return mejorEquipo; // saltamos equipos muy desbalanceados en cantidad
                if (actualPuntaje < mejorPuntaje) return actual;
                return mejorEquipo;
              }, equipos[0]);
          
              equipoElegido.addJugador(jugador);
            });
          }
          return equipos;
          
    }
    }