const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const playBt = document.querySelector('#start-pause');
const botoes = document.querySelectorAll('.app__card-button');
const musicaFocoInput = document.querySelector('#alternar-musica');


const musica = new Audio('/sons/luna-rise-part-one.mp3');
const playAudio = new Audio('/sons/play.wav');
const pauseAudio = new Audio('/sons/pause.mp3');
const timeoutAudio = new Audio('/sons/beep.mp3');

const txtBanner = document.querySelector('.app__title');
const imgBanner = document.querySelector('.app__image');
const displayTempo = document.querySelector('#timer');

const focoTime = 1500;
const descansoCurtoTime = 300;
const descansoLongoTime = 900;

let tempoDecorridoEmSegundos = 5;
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
    alterarContexto('foco');
    focoBt.classList.add('active');
});

curtoBt.addEventListener('click', ()=>{
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
});

longoBt.addEventListener('click', ()=>{
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
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
    if(tempoDecorridoEmSegundos <= 0){
        zerar();
        timeoutAudio.play();
        alert("tempo finalizado!");
        return
    }

    tempoDecorridoEmSegundos -= 1;
    console.log('Temporizador: ' + tempoDecorridoEmSegundos);
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
}

function zerar(){
    clearInterval(intervaloId);
    intervaloId = null;
}