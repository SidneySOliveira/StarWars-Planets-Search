import React from 'react';
import './App.css';
import Provider from './context/myProvider';
import Filter from './components/Filter';
import Table from './components/Table';
import Header from './components/Header';

function App() {
  return (
    <Provider>
      <Header />
      <Filter />
      <Table />
    </Provider>
  );
}

export default App;
