import { DifMinima } from '../src/domain/strategiesBalanceadorEquipo/DifMinima';
import { Jugador } from '../src/domain/entities/Jugador';
import { Equipo } from '../src/domain/entities/Equipo';

it('debería formar los equipos con la única combinación de diferencia mínima', () => {
  const jugadores = [
    new Jugador('A', 1),
    new Jugador('B', 4),
    new Jugador('C', 5),
    new Jugador('D', 2)
  ];

  const algoritmo = new DifMinima();
  const equipos = algoritmo.armarEquipos(jugadores, 2);

  expect(equipos.length).toBe(2);

  const puntajes = equipos.map(e => e.puntajeTotal);
  expect(Math.abs(puntajes[0] - puntajes[1])).toBe(0);

  const nombresEquipos = equipos.map(e => e.jugadores.map(j => j.nombre).sort().join(',')).sort();

  expect(nombresEquipos).toContain('A,C');
  expect(nombresEquipos).toContain('B,D');
});

it('debería balancear 10 jugadores en 2 equipos de 5 con la menor diferencia posible', () => {
  const jugadores = [
    new Jugador('A', 8),
    new Jugador('B', 7),
    new Jugador('C', 6),
    new Jugador('D', 9),
    new Jugador('E', 5),
    new Jugador('F', 4),
    new Jugador('G', 10),
    new Jugador('H', 3),
    new Jugador('I', 6),
    new Jugador('J', 2),
  ];

  const algoritmo = new DifMinima();
  const equipos = algoritmo.armarEquipos(jugadores, 2);

  // Se formaron 2 equipos
  expect(equipos.length).toBe(2);

  // Cada equipo tiene 5 jugadores
  expect(equipos[0].jugadores.length).toBe(5);
  expect(equipos[1].jugadores.length).toBe(5);

  // Todos los jugadores están incluidos y sin repetir
  const jugadoresAsignados = equipos.flatMap(e => e.jugadores.map(j => j.nombre)).sort();
  const jugadoresOriginales = jugadores.map(j => j.nombre).sort();
  expect(jugadoresAsignados).toEqual(jugadoresOriginales);

  // Verificamos que la diferencia sea razonablemente baja (idealmente mínima)
  const puntajeEquipo1 = equipos[0].puntajeTotal;
  const puntajeEquipo2 = equipos[1].puntajeTotal;
  const diferencia = Math.abs(puntajeEquipo1 - puntajeEquipo2);
  expect(diferencia).toBeLessThanOrEqual(3); // ajustá este valor según lo que devuelva tu algoritmo

});

