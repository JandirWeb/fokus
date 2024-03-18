const btnAddTarefa = document.querySelector('.app__button--add-task');
const formAddTarefa = document.querySelector('.app__form-add-task');
const textarea = document.querySelector('.app__form-textarea');
const ulTarefas = document.querySelector('.app__section-task-list');

const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

function criarElementoTarefa(tarefa){
    const li = document.createElement('li');
    li.classList.add('app__section-task-list-item');

    const svg = document.createElement('svg');
    svg.innerHTML = `
    
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    `;

    const paragrafo = document.createElement('p');
    paragrafo.classList.add('app__section-task-list-item-description');
    paragrafo.textContent = tarefa.descricao;

    const botao = document.createElement('button');
    botao.classList.add('app_button-edit');

    const imgBotao = document.createElement('img');
    imgBotao.setAttribute('src', '/imagens/edit.png' );

    botao.append(imgBotao);

    li.append(svg);
    li.append(paragrafo);
    li.append(botao);

    return li;
}

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

tarefas.forEach(tarefa => {
    const elementoTarefa = criarElementoTarefa(tarefa);
    ulTarefas.append(elementoTarefa);
});