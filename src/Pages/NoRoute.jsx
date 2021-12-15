import React from 'react';
import { Link } from 'react-router-dom';

export default function NoRoute() {
  return (
    <div>
      <h1>404 - Page not found</h1>
      <Link to="/">
        <button>Click here to go back to the home page</button>
      </Link>
    </div>
  );
}
