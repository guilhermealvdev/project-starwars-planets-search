import React, { useContext, useState, useEffect } from 'react';
import { PlanetsContext } from '../contexts/PlanetsContext';

function Table() {
  const { planets } = useContext(PlanetsContext)!;
  const [filter, setFilter] = useState('');
  const [filters, setFilters] = useState([]);
  const [availableColumns, setAvailableColumns] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const [selectedColumn, setSelectedColumn] = useState('population');
  const [selectedComparison, setSelectedComparison] = useState('maior que');
  const [filterValue, setFilterValue] = useState('0');

  useEffect(() => {
    setFilter('');
    setFilters([]);
    setAvailableColumns([
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ]);
    setSelectedColumn('population');
    setSelectedComparison('maior que');
    setFilterValue('0');
  }, []);

  const filterPlanets = (planet) => {
    return filters.every(({ columnName, comparador, num }) => {
      const planetValue = parseFloat(planet[columnName]);
      switch (comparador) {
        case 'maior que':
          return planetValue > num;
        case 'menor que':
          return planetValue < num;
        case 'igual a':
          return planetValue === num;
        default:
          return true;
      }
    });
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleFilterNumerico = (e) => {
    e.preventDefault();
    const newFilter = {
      columnName: selectedColumn,
      comparador: selectedComparison,
      num: parseFloat(filterValue),
    };
    setFilters([...filters, newFilter]); // Adiciona o novo filtro à lista de filtros existente
    setSelectedColumn('population');
    setSelectedComparison('maior que');
    setFilterValue('0');

    const updatedAvailableColumns = availableColumns.filter(
      (column) => column !== newFilter.columnName,
    );
    setAvailableColumns(updatedAvailableColumns);
  };

  const removeFilter = (index) => {
    const newFilters = [...filters];
    const removedColumn = newFilters[index].columnName;
    newFilters.splice(index, 1);
    setFilters(newFilters);

    setAvailableColumns([...availableColumns, removedColumn]);
  };

  const removeAllFilters = () => {
    setFilters([]);
    setAvailableColumns([
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ]);
  };

  const filteredPlanets = planets.filter((planet) => {
    return (
      planet.name.toLowerCase().includes(filter.toLowerCase())
      && filterPlanets(planet)
    );
  });

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Filtro de Texto"
          value={ filter }
          onChange={ handleFilterChange }
          data-testid="name-filter"
        />
      </div>
      <div>
        <form onSubmit={ handleFilterNumerico }>
          <select
            name="columnName"
            value={ selectedColumn }
            onChange={ (e) => setSelectedColumn(e.target.value) }
            data-testid="column-filter"
          >
            {availableColumns.map((option) => (
              <option key={ option } value={ option }>
                {option}
              </option>
            ))}
          </select>

          <select
            name="comparador"
            value={ selectedComparison }
            onChange={ (e) => setSelectedComparison(e.target.value) }
            data-testid="comparison-filter"
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>

          <input
            type="number"
            name="num"
            value={ filterValue }
            onChange={ (e) => setFilterValue(e.target.value) }
            data-testid="value-filter"
          />

          <button type="submit" data-testid="button-filter">Filtrar</button>
        </form>
      </div>
      {filters.map((filter2, index) => (
        <div key={ index } data-testid="filter">
          <span>
            Filtro:
            {filter2.columnName}
            {filter2.comparador}
            {filter2.num}
          </span>
          <button onClick={ () => removeFilter(index) }>Remover</button>
        </div>
      ))}
      <button onClick={ removeAllFilters } data-testid="button-remove-filters">
        Remover todas filtragens
      </button>
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
        <tbody data-testid="planet-table">
          {filteredPlanets.map((planet, index) => (
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
