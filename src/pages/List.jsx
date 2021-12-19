import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function List() {
  return(
    <div>
      <h1>Listar provas</h1>
      <Link to="/list/teacher">
        <button>Por professor</button>
      </Link>
      <Link to="/list/discipline">
        <button>Por disciplina</button>
      </Link>
      <Outlet />
    </div>
  );
}
