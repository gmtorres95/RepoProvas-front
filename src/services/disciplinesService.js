import axios from 'axios';

function getDisciplines(setDiscipline) {
  axios.get(`${process.env.REACT_APP_API_BASE_URL}/disciplines`)
    .then((resp) => {
      setDiscipline(resp.data);
    })
    .catch((err) => {
      alert('Erro ao buscar disciplinas');
      console.log(err);
    })
}

export {
  getDisciplines,
};
