import React, { createContext, useEffect, useState } from 'react';
import { fetchPlanets } from '../services/api';

type Planet = {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  films: string[];
  created: string;
  edited: string;
  url: string;
};

type PlanetsContextType = {
  planets: Planet[];
};

const PlanetsContext = createContext<PlanetsContextType | undefined>(undefined);

function PlanetsProvider({ children }: { children: React.ReactNode }) {
  const [planets, setPlanets] = useState<Planet[]>([]);

  useEffect(() => {
    const fetchAndSetPlanets = async () => {
      const data = await fetchPlanets();
      setPlanets(data);
      // Para ver 'data' no console: Table.tsx linha 6 (data = planets)
    };
    fetchAndSetPlanets();
  }, []);

  return (
    <PlanetsContext.Provider value={ { planets } }>
      {children}
    </PlanetsContext.Provider>
  );
}

export { PlanetsContext, PlanetsProvider };
