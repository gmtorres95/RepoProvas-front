import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App';
import Home from './pages/Home';
import PostExam from './pages/PostExam';
import List from './pages/List';
import ListByTeacher from './pages/ListByTeacher';
import ListByDiscipline from './pages/ListByDiscipline';
import NoRoute from './pages/NoRoute';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Home />} />
          <Route path='post' element={<PostExam />} />
          <Route path='list' element={<List />}>
            <Route path='teacher' element={<ListByTeacher />} />
            <Route path='discipline' element={<ListByDiscipline />} />
          </Route>
          <Route path='*' element={<NoRoute/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
