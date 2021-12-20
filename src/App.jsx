import React from 'react';
import { Outlet } from 'react-router';
import { Link, useLocation } from 'react-router-dom';

export default function App() {
  const location = useLocation();

  return (
    <div>
      {location.pathname !== '/' && <Link to='/'>
        <button>Voltar para o início</button>
      </Link>}
      <Outlet />
    </div>
  );
}
