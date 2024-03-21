const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const playBt = document.querySelector('#start-pause');
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const icoIniciarPausarBt = document.querySelector('#start-pause img');
const botoes = document.querySelectorAll('.app__card-button');
const musicaFocoInput = document.querySelector('#alternar-musica');
const btnEditTime = document.querySelector('.btn-edit-time');
const modalEditTime = document.querySelector('.overlay-bg');
const saveTime = document.querySelector('#save-time');
const cancelTime = document.querySelector('#cancel-time');
const editNewTime = document.querySelector('.app__form-edit-time input');

const musica = new Audio('/sons/luna-rise-part-one.mp3');
const playAudio = new Audio('/sons/play.wav');
const pauseAudio = new Audio('/sons/pause.mp3');
const timeoutAudio = new Audio('/sons/beep.mp3');

const txtBanner = document.querySelector('.app__title');
const imgBanner = document.querySelector('.app__image');
const displayTempo = document.querySelector('#timer');

btnEditTime.addEventListener('click', () =>{
    modalEditTime.classList.remove('hidden');
});
cancelTime.addEventListener('click', () =>{
    modalEditTime.classList.add('hidden');
});
saveTime.addEventListener('click', (e) => {
    e.preventDefault();
    modalEditTime.classList.add('hidden');
});

let secondFormat = editNewTime.value.split(':');
let newTime = (+secondFormat[0]) * 60 * 60 + (+secondFormat[1]) * 60 + (+secondFormat[2]);

console.log(newTime);

let focoTime = newTime;
const descansoCurtoTime = 300;
const descansoLongoTime = 900;

var tempoDecorrido = focoTime;

let intervaloId = null;

musica.loop = true;

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
        musica.play();
    } else{
        musica.pause();
    }
});

focoBt.addEventListener('click', ()=>{
    tempoDecorrido = focoTime;
    alterarContexto('foco');
    focoBt.classList.add('active');
    mostrarTempo();
});

curtoBt.addEventListener('click', ()=>{
    tempoDecorrido = descansoCurtoTime;
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
    mostrarTempo();
});

longoBt.addEventListener('click', ()=>{
    tempoDecorrido = descansoLongoTime;
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
    mostrarTempo();
});

function alterarContexto(contexto){
    botoes.forEach(function (contexto){
        contexto.classList.remove('active');
    });

    html.setAttribute('data-contexto', contexto);
    imgBanner.setAttribute('src', `/imagens/${contexto}.png`);

    switch (contexto){
        case "foco":
            txtBanner.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;

        case "descanso-curto":
            txtBanner.innerHTML = `
            Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta.</strong>
            `
            break;

        case "descanso-longo":
            txtBanner.innerHTML = `
            Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if(tempoDecorrido <= 0){
        timeoutAudio.play();
        alert("tempo finalizado!");

        const focoAtivo = html.getAttribute('data-contexto') == 'foco';
        if(focoAtivo){
            const evento = new CustomEvent('FocoFinalizado');
            document.dispatchEvent(evento);
        }

        zerar();
        return
    }

    tempoDecorrido -= 1;
    mostrarTempo();
}

playBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar(){
    if(intervaloId){
        zerar();
        pauseAudio.play();
        return
    }
    playAudio.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausarBt.textContent = "Pausar";
    icoIniciarPausarBt.setAttribute('src', '/imagens/pause.png');
}

function zerar(){
    clearInterval(intervaloId);
    iniciarOuPausarBt.textContent = "Começar";
    icoIniciarPausarBt.setAttribute('src', '/imagens/play_arrow.png');
    intervaloId = null;
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorrido * 1000);
    const tempoFormatado = tempo.toLocaleString('pr-br', {minute: '2-digit', second: '2-digit'});
    displayTempo.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();