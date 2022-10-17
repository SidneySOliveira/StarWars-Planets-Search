import React, { useContext } from 'react';
import Context from '../context/myContext';

function Filter() {
  const {
    search,
    setSearch,
    columnFilter,
    changeFilter,
    numericFilter,
    filtered,
    removeFilter,
    filter: filterValue,
    setFilter,
    removeFilters,
  } = useContext(Context);

  return (
    <div className="background-filter">
      <div>
        <input
          className="SearchByName"
          name="byName"
          data-testid="name-filter"
          type="text"
          onChange={ (e) => {
            setSearch(e.target.value);
          } }
          value={ search }
          placeholder="Search by name"
        />
      </div>
      <div>
        <select
          name="column"
          data-testid="column-filter"
          onChange={ changeFilter }
          value={ filterValue.column }
        >
          {columnFilter.map((column) => (
            <option key={ column } value={ column }>
              {column}
            </option>
          ))}
        </select>

        <select
          data-testid="comparison-filter"
          name="comparison"
          onChange={ changeFilter }
          value={ filterValue.comparison }
        >
          <option value="maior que" selected>
            maior que
          </option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>

        <input
          data-testid="value-filter"
          name="value"
          type="number"
          onChange={ changeFilter }
          value={ filterValue.value }
          onClick={ () => {
            setFilter((oldState) => ({ ...oldState, value: '' }));
          } }
        />
        <button
          className="btn-filter"
          data-testid="button-filter"
          type="submit"
          onClick={ numericFilter }
        >
          FILTRAR
        </button>
        <button
          className="btn-remove"
          data-testid="button-remove-filters"
          type="submit"
          onClick={ removeFilters }
        >
          Remover todas filtragens
        </button>
      </div>
      {filtered.map((filter, i) => (
        <div key={ i } data-testid="filter">
          <span key={ i }>
            {`${filter.column} ${filter.comparison} ${filter.value}`}
          </span>
          <button name={ i } type="button" onClick={ removeFilter }>
            {/* <i className="fa-solid fa-trash" /> */}
            X
          </button>
        </div>
      ))}
    </div>
  );
}

export default Filter;
