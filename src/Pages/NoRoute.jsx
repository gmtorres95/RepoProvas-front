import React from 'react';
import { Link } from 'react-router-dom';

export default function NoRoute() {
  return (
    <div>
      <h1>404 - Página não encontrada</h1>
      <Link to="/">
        <button>Voltar para o início</button>
      </Link>
    </div>
  );
}
