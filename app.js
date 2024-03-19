let listaDeNumerosSorteados = [];
let numeroMaximo = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;
let mensagemNumeroMaximo = `escolha um número entre 1 e ${numeroMaximo}`;

console.log(numeroSecreto);
exibirMensagemInicial();

function exibirTextoNaTela(tag, texto){
   let campo = document.querySelector(tag);
   campo.innerHTML = texto;
   responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial() {
   exibirTextoNaTela('h1', 'Jogo do número secreto');
   exibirTextoNaTela('p', mensagemNumeroMaximo);
}

function limparCampo(){
   chute = document.querySelector('input');
   chute.value = '';
}

function gerarNumeroAleatorio(){
   let numeroAleatorio = parseInt(Math.random() * numeroMaximo + 1);
   let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length

   if(quantidadeDeElementosNaLista == numeroMaximo){
      listaDeNumerosSorteados = [];
      return gerarNumeroAleatorio();
   }

   if(listaDeNumerosSorteados.includes(numeroAleatorio)){
      return gerarNumeroAleatorio();
   }else{
      listaDeNumerosSorteados.push(numeroAleatorio);
      console.log(listaDeNumerosSorteados);
      return numeroAleatorio;
   }
}
function verificarChute(){
   let chute = document.querySelector('input').value;

   if(chute == numeroSecreto){
      let palavraTentativa = tentativas > 1? 'tentativas' : 'tentativa';
      let mensagemAcerto = `Parabéns! Você acertou o número secreto ${numeroSecreto} em ${tentativas} ${palavraTentativa}`;
      exibirTextoNaTela('h1', 'Acertou!');
      exibirTextoNaTela('p', mensagemAcerto);
      limparCampo();
      document.getElementById('reiniciar').removeAttribute('disabled');
      document.getElementById('comecar').getAttribute('disabled', true);
   }else{
      let dica = chute > numeroSecreto ? 'menor' : 'maior';
      let mensagemErro = `Errou! O número secreto é ${dica} que ${chute}`
      exibirTextoNaTela('p', mensagemErro);
      limparCampo();
      tentativas++;
   }
}

function resetarJogo() {
   numeroSecreto = gerarNumeroAleatorio();
   exibirMensagemInicial();
   tentativas = 1;
   document.getElementById('reiniciar').setAttribute('disabled', true);
   document.getElementById('comecar').removeAttribute('disabled');
}