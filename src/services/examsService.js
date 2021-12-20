import axios from 'axios';

function postExam(body, navigate) {
  axios.post(`${process.env.REACT_APP_API_BASE_URL}/exams`, body)
    .then((resp) => {
      alert('Prova postada com sucesso!');
      navigate('/');
    })
    .catch((err) => {
      if (err.response.status === 400) alert ('URL deve ser um arquivo pdf');
      else if (err.response.status === 409) alert ('Essa prova já foi cadastrada');
      else if (err.response.status === 404) alert ('Erro ao selecionar a categoria');
      else alert ('Erro no servidor');
      console.log(err);
    })
}

function getExamsByTeacher(setTeachers) {
  axios.get(`${process.env.REACT_APP_API_BASE_URL}/teachers`)
    .then((resp) => {
      setTeachers(resp.data.sort((a, b) => a.name > b.name ? 1 : -1))
    })
    .catch((err) => {
      if (err.response.status === 404) alert('Nenhum professor cadastrado');
      else alert('Erro ao buscar professores');
    })
}

export {
  postExam,
  getExamsByTeacher,
};
