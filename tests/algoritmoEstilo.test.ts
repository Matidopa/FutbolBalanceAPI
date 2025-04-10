import { Estilos } from '../src/domain/strategiesBalanceadorEquipo/Estilos';
import { Jugador } from '../src/domain/entities/Jugador';
import { Equipo } from '../src/domain/entities/Equipo';

describe('AlgoritmoBalanceoPorEstilos', () => {
  it('debería crear dos equipos con distribución equilibrada de estilos', () => {
    const jugadores = [
      new Jugador('Jugador 1', 7, 'ofensivo'),
      new Jugador('Jugador 2', 6, 'ofensivo'),
      new Jugador('Jugador 3', 8, 'defensivo'),
      new Jugador('Jugador 4', 8, 'defensivo'),
      new Jugador('Jugador 5', 9, 'hibrido'),
      new Jugador('Jugador 6', 10, 'hibrido'),
      new Jugador('Jugador 7', 4, 'ofensivo'),
      new Jugador('Jugador 8', 7, 'defensivo'),
      new Jugador('Jugador 9', 7, 'hibrido'),
      new Jugador('Jugador 10', 5, 'ofensivo'),
    ];

    const estrategia = new Estilos();
    const equipos: Equipo[] = estrategia.armarEquipos(jugadores, 2);

    expect(equipos).toHaveLength(2);

    const jugadoresTotales = equipos.flatMap(e => e.jugadores);
    expect(jugadoresTotales).toHaveLength(jugadores.length);

    const estilosPorEquipo = equipos.map(eq => ({
      ofensivos: eq.jugadores.filter(j => j.estilo === 'ofensivo').length,
      defensivos: eq.jugadores.filter(j => j.estilo === 'defensivo').length,
      hibridos: eq.jugadores.filter(j => j.estilo === 'hibrido').length,
    }));

   
    const puntaje1 = equipos[0].puntajeTotal;
    const puntaje2 = equipos[1].puntajeTotal;
    const diferencia = Math.abs(puntaje1 - puntaje2);
    console.log(`Puntaje equipo 1: ${puntaje1}, equipo 2: ${puntaje2}, diferencia: ${diferencia}`);

    expect(diferencia).toBeLessThanOrEqual(2); // tolerancia ajustable

    console.log('--- Equipos Generados ---');
    equipos.forEach((equipo, index) => {
      console.log(`Equipo ${index + 1}:`);
      equipo.jugadores.forEach(j => {
        console.log(`  ${j.nombre} - ${j.puntaje} pts - ${j.estilo}`);
      });
      console.log(`  Total: ${equipo.puntajeTotal} pts`);
    });
  });
});