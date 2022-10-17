import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from './myContext';
import useFetch from '../hooks/APIfetch';

function Provider({ children }) {
  const { isLoading, data } = useFetch();

  const [search, setSearch] = useState('');
  const [filteredSearch, setFilteredSearch] = useState([]);
  const [filter, setFilter] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });
  const [filtered, setFiltered] = useState([]);
  const [columnFilter, setColumnFilter] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  useEffect(() => {
    const searchFilter = data
      .filter((d) => d.name.toUpperCase().includes(search.toUpperCase()));
    setFilteredSearch(searchFilter);
  }, [data, search]);

  const removeFilter = ({ target: { name } }) => {
    const index = Number(name);
    setFiltered(filtered.filter((oldState) => oldState !== filtered[index]));
  };

  useEffect(() => {
    let planets = data;
    filtered.forEach((e) => {
      if (e.comparison === 'menor que') {
        planets = planets.filter((p) => Number(p[e.column]) < Number(e.value));
      }
      if (e.comparison === 'maior que') {
        planets = planets.filter((p) => Number(p[e.column]) > Number(e.value));
      }
      if (e.comparison === 'igual a') {
        planets = planets.filter(
          (p) => Number(p[e.column]) === Number(e.value),
        );
      }
    });

    setFilteredSearch(planets);
  }, [filtered]);

  const removeFilters = () => {
    setFiltered([]);
  };

  const numericFilter = () => {
    setFiltered((oldState) => [...oldState, filter]);

    setColumnFilter(columnFilter.filter((oldState) => oldState !== filter.column));

    const newFilter = columnFilter.filter(
      (oldState) => oldState !== filter.column,
    );
    setFilter((oldState) => ({ ...oldState, column: newFilter[0] }));
  };

  const changeFilter = ({ target: { name, value } }) => {
    setFilter((oldState) => ({ ...oldState, [name]: value }));
  };

  const contextValue = {
    data,
    isLoading,
    search,
    setSearch,
    filteredSearch,
    columnFilter,
    changeFilter,
    numericFilter,
    filtered,
    removeFilter,
    filter,
    setFilter,
    removeFilters,
  };

  return <Context.Provider value={ contextValue }>{children}</Context.Provider>;
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
