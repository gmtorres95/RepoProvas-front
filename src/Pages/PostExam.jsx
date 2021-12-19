import React, { useEffect, useState } from 'react';
import { getCategories } from '../services/categoriesService';
import { getDisciplines } from '../services/disciplinesService';

export default function PostExam() {
  const [categories, setCategories] = useState([{ category: 'Carregando...' }]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);

  useEffect(() => {
    getCategories(setCategories);
  }, []);

  return(
    <div>
      <h1>Postar prova</h1>
      <form>
        <label for="category">Selecione a categoria da prova: </label>
        <select name="category" id="category" onChange={(e) => setSelectedCategoryId(e.target.value)}>
          <option value={0} />
            {categories.map((category) => 
              <option value={category.id} key={category.id}>
                {category.category}
              </option>
            )}
        </select>
      </form>
    </div>
  );
}
