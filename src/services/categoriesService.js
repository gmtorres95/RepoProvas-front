import axios from 'axios';

function getCategories(setCategories) {
  axios.get(`${process.env.REACT_APP_API_BASE_URL}/categories`)
    .then((resp) => {
      setCategories(resp.data);
    })
    .catch((err) => {
      alert('Erro ao buscar categorias');
      console.log(err);
    })
}

export {
  getCategories,
};
