import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1>RepoProvas</h1>
      <Link to="/post">
        <button>Postar prova</button>
        <button>Ver provas</button>
      </Link>
    </div>
  );
}