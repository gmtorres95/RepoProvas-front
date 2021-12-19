import axios from 'axios';

function getDisciplines(setDisciplines) {
  axios.get(`${process.env.REACT_APP_API_BASE_URL}/disciplines`)
    .then((resp) => {
      setDisciplines(resp.data);
    })
    .catch((err) => {
      alert('Erro ao buscar disciplinas');
      console.log(err);
    })
}

export {
  getDisciplines,
};
