import React, { useContext, useState } from 'react';
import { PlanetsContext } from '../contexts/PlanetsContext';

function Table() {
  const { planets } = useContext(PlanetsContext)!;
  console.log(planets); // Array de objetos
  const [filter, setFilter] = useState('');

  const filteredPlanets = planets.filter((planet) => {
    return (
      planet.name.toLowerCase().includes(filter.toLowerCase())
    );
  });

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Filtro de Texto"
          data-testid="name-filter"
          value={ filter }
          onChange={ handleFilterChange }
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {filteredPlanets.map((planet, index) => ( // .map no array de objetos para lista-los
            <tr key={ index }>
              <td>{planet.name}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.population}</td>
              <td>
                <ul>
                  {planet.films.map((film, filmIndex) => (
                    <li key={ filmIndex }>
                      <a href={ film }>{`Film ${filmIndex + 1}`}</a>
                    </li>
                  ))}
                </ul>
              </td>
              <td>{planet.created}</td>
              <td>{planet.edited}</td>
              <td>{planet.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
