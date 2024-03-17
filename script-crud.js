const btnAddTarefa = document.querySelector('.app__button--add-task');
const formAddTarefa = document.querySelector('.app__form-add-task');
const textarea = document.querySelector('.app__form-textarea');

const tarefas = [];

btnAddTarefa.addEventListener('click', () => {
    formAddTarefa.classList.toggle('hidden');
});

formAddTarefa.addEventListener('submit', (evento) =>{
    evento.preventDefault();

    const tarefa = {
        descricao: textarea.value
    }

    tarefas.push(tarefa);

    localStorage.setItem('tarefas', JSON.stringify(tarefas));
});