import axios from 'axios';

function getExamsByDiscipline(setSemesters) {
  axios.get(`${process.env.REACT_APP_API_BASE_URL}/semesters`)
    .then((resp) => {
      setSemesters(resp.data.sort((a, b) => a.id > b.id ? 1 : -1))
    })
    .catch((err) => {
      if (err.response.status === 404) alert('Nenhum período cadastrado');
      else alert('Erro ao buscar períodos');
    })
}

export {
  getExamsByDiscipline,
};
