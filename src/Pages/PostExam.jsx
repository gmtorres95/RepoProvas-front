import React, { useEffect, useState } from 'react';
import { getCategories } from '../services/categoriesService';
import { getDisciplines } from '../services/disciplinesService';

export default function PostExam() {
  const initialState = [{
    id: 0,
    category: 'Carregando...',
    discipline: 'Carregando...',
    name: 'Selecione uma disciplina',
  }];
  const [categories, setCategories] = useState(initialState);
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const [disciplines, setDisciplines] = useState(initialState);
  const [selectedDisciplineId, setSelectedDisciplineId] = useState(0);
  const [teachers, setTeachers] = useState(initialState);
  const [selectedTeacherId, setSelectedTeacherId] = useState(0);

  useEffect(() => {
    getCategories(setCategories);
    getDisciplines(setDisciplines);
  }, []);

  function selectDiscipline(disciplineId) {
    setSelectedDisciplineId(disciplineId);
    setSelectedTeacherId(0);
    if (disciplineId === 0) setTeachers(initialState);
    else {
      disciplineId = disciplines.map((discipline) => discipline.id).indexOf(Number(disciplineId));
      setTeachers(disciplines[disciplineId].teachers);
    }
  }

  return(
    <div>
      <h1>Postar prova</h1>
      <form>
        <label for="category">Selecione a categoria da prova: </label>
        <select name="category" id="category" onChange={(e) => setSelectedCategoryId(Number(e.target.value))}>
          <option value={0} />
          {categories.map((category) => 
            <option value={category.id} key={category.id}>
              {category.category}
            </option>
            )}
        </select>

        <label for="discipline">Selecione a disciplina: </label>
        <select name="discipline" id="discipline" onChange={(e) => selectDiscipline(Number(e.target.value))}>
          <option value={0} />
          {disciplines.map((discipline) =>
            <option value={discipline.id} key={discipline.id}>
              {discipline.discipline}
            </option>
          )}
        </select>

        <label for="teacher">Selecione o professor: </label>
        <select name="teacher" id="teacher" onChange={(e) => setSelectedTeacherId(Number(e.target.value))}>
          <option value={0} />
          {teachers.map((teacher) =>
            <option value={teacher.id} key={teacher.id}>
              {teacher.name}
            </option>
          )}
        </select>
      </form>
    </div>
  );
}
