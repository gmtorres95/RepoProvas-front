import React, { useEffect, useState } from 'react';
import { getCategories } from '../services/categoriesService';
import { getExamsByTeacher } from '../services/examsService';

export default function ListByTeacher() {
  const [teachers, setTeachers] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories(setCategories);
    getExamsByTeacher(setTeachers);
  }, []);

  function getExamsHandler(e) {
    const newCategories = [...categories];
    newCategories.map((category) =>
      category.exams = teachers[e.target.value]
        .exams
        .filter((exam) =>
          exam.category_id === category.id
        ));
    setCategories(newCategories);
  }

  return (
    <div>
      <h1>Listar por professor</h1>

      <label>Selecione um professor: </label>
      <select onChange={(e) => getExamsHandler(e)}>
        <option value={0} />
        {teachers.map((teacher, i) => 
          <option value={i} key={teacher.id}>
            {`${teacher.name} (${teacher.exams.length})`}
          </option>
          )}
      </select>

      {categories.map((category) => !!category.exams?.length &&
        <ul key={category.id}>
          <li>{category.category}</li>
          {category.exams.map((exam) => category.id === exam.category_id &&
            <p key={exam.id}><a href={exam.link}>{exam.discipline.discipline} - {exam.name}</a></p>
          )}
        </ul>
      )}
    </div>
  );
}
