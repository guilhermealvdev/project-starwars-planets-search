import React from 'react';
import './App.css';
import { PlanetsProvider } from './contexts/PlanetsContext';
import Table from './components/Table';

function App() {
  return (
    <PlanetsProvider>
      <div>
        <h1>Star Wars Planets</h1>
        <Table />
      </div>
    </PlanetsProvider>
  );
}

export default App;
