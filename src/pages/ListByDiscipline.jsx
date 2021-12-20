import React, { useEffect, useState } from 'react';
import { getCategories } from '../services/categoriesService';
import { getExamsByDiscipline } from '../services/semestersService';

export default function ListByDiscipline() {
  const [semesters, setSemesters] = useState([]);
  const [disciplines, setDisciplines] = useState([]);
  const [categories, setCategories] = useState([]);
  const [baseCategories, setBaseCategories] = useState([]);

  useEffect(() => {
    getCategories(setBaseCategories);
    getExamsByDiscipline(setSemesters);
  }, []);

  function setDisciplineHandler(e) {
    if (e.target.value !== '-1') setDisciplines(semesters[e.target.value].disciplines);
    else setDisciplines([]);
    setCategories([]);
  }

  function getExamsHandler(e) {
    if (e.target.value === '-1') {
      setCategories([]);
      return;
    }

    const newCategories = [...baseCategories];
    newCategories.map((category) =>
      category.exams = disciplines[e.target.value]
        .exams
        .filter((exam) =>
          exam.category_id === category.id
        ));
    setCategories(newCategories);
  }

  if (!semesters.length || !baseCategories.length) return <h1>Carregando...</h1>

  return (
    <div>
      <h1>Listar por disciplina</h1>
      
      <label>Selecione um período: </label>
      <select onChange={setDisciplineHandler}>
        <option value={-1} />
        {semesters.map((semester, i) => 
          <option value={i} key={semester.id}>
            {semester.semester}
          </option>
        )}
      </select>

      <label>Selecione uma disciplina: </label>
      <select onChange={getExamsHandler}>
        <option value={-1} />
        {disciplines.map((discipline, i) => 
          <option value={i} key={discipline.id}>
            {discipline.discipline}
          </option>
        )}
      </select>

      {categories.map((category) => !!category.exams?.length &&
        <ul key={category.id}>
          <li>{category.category}</li>
          {category.exams.map((exam) => category.id === exam.category_id &&
            <p key={exam.id}><a href={exam.link}>{exam.name} - {exam.teacher.name}</a></p>
          )}
        </ul>
      )}
    </div>
  );
}
