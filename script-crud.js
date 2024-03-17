//Encontrar o botão de adicionar tarefa
const btnAddTarefa = document.querySelector('.app__button--add-task');

const formAddTarefa = document.querySelector('.app__form-add-task');

btnAddTarefa.addEventListener('click', () => {
    formAddTarefa.classList.toggle('hidden');
});