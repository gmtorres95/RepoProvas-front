import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCategories } from '../services/categoriesService';
import { getDisciplines } from '../services/disciplinesService';
import { postExam } from '../services/examsService';

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
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [link, setLink] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getCategories(setCategories);
    getDisciplines(setDisciplines);
  }, []);

  function selectDisciplineHandler(disciplineId) {
    setSelectedDisciplineId(disciplineId);
    setSelectedTeacherId(0);
    if (disciplineId === 0) setTeachers(initialState);
    else {
      disciplineId = disciplines.map((discipline) => discipline.id).indexOf(Number(disciplineId));
      setTeachers(disciplines[disciplineId].teachers);
    }
  }

  function submitHandler(e) {
    e.preventDefault();
    if (!selectedCategoryId) {
      alert('Selecione a categoria da prova');
      return;
    }
    if (!selectedDisciplineId) {
      alert('Selecione a disciplina da prova');
      return;
    }
    if (!selectedTeacherId) {
      alert('Selecione o professor da prova');
      return;
    }
    const name = `${year}.${semester}`;
    const body = {
      category_id: selectedCategoryId,
      discipline_id: selectedDisciplineId,
      teacher_id: selectedTeacherId,
      name,
      link,
    }
    postExam(body, navigate);
  }

  return(
    <div>
      <h1>Postar prova</h1>
      <form onSubmit={submitHandler}>
        <label>Selecione a categoria da prova: </label>
        <select onChange={(e) => setSelectedCategoryId(Number(e.target.value))}>
          <option value={0} />
          {categories.map((category) => 
            <option value={category.id} key={category.id}>
              {category.category}
            </option>
            )}
        </select>

        <label>Selecione a disciplina: </label>
        <select onChange={(e) => selectDisciplineHandler(Number(e.target.value))}>
          <option value={0} />
          {disciplines.map((discipline) =>
            <option value={discipline.id} key={discipline.id}>
              {discipline.discipline}
            </option>
          )}
        </select>

        <label>Selecione o professor: </label>
        <select onChange={(e) => setSelectedTeacherId(Number(e.target.value))}>
          <option value={0} />
          {teachers.map((teacher) =>
            <option value={teacher.id} key={teacher.id}>
              {teacher.name}
            </option>
          )}
        </select>

        <label>Selecione o ano da prova: </label>
        <input
          type='number'
          min={1900}
          max={2099}
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />

        <label>Selecione o semestre da prova: </label>
        <input
          type='number'
          min={1}
          max={2}
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          required
        />

        <label>URL da prova</label>
        <input
          type='url'
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
        />

        <button type='submit'>Postar prova</button>
      </form>
    </div>
  );
}
