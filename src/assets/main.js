//variaveis para manipular inputs
let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

//constantes
const ANSWER_LENGTH = 4;
const TURN_COMMA = 10000;

//"controler"
function guess() {

    let input = document.getElementById('user-guess');
    
    //executa o código apenas se os valores ainda nao foram definidos.
    if ( answer.value == '' || attempt.value == ''){
    	setHiddenFields();
    }

    //verifica input e para o codigo em caso de erro
    //incrementa o contador caso nao seja um erro
    if (!validateInput(input.value)) {
    	return false;
    } else {
    	attempt.value++;
    }

    // executa o core e retorna o feedback ao usuario
    if (getResults(input.value)) {
    	setMessage("You Win! :)");
    	showAnswer(true);
    	showReplay();
    } else if ( attempt.value >= 10 ) {
    	setMessage("You Lose! :(");
    	showAnswer(false);
		showReplay();    	
    } else {
    	setMessage("Incorrect, try again.");
    } 
}

//gera uma resposta aleatoria de 4 digitos - "model"
function setHiddenFields (){

	answer.value = Math.floor(Math.random() * TURN_COMMA);
	answer.value = answer.value.toString(); 
	while(answer.value.length < ANSWER_LENGTH){
		answer.value += "0";
	};

	attempt.value = 0;
	
}

//exibe mensagens - "view"
function setMessage (body){
	document.getElementById("message").innerHTML = body;
}

//verifica se o tamanho do input corresponde ao tamanho da resposta
function validateInput (validateInput) {

	validateInput = validateInput.toString();

	if ( validateInput.length == ANSWER_LENGTH ){
		return true;
	} else {
		setMessage("Guesses must be exactly 4 characters long.");
		return false;
	}
}

//core do game - "model"
function getResults (input){
	
	//inicia contador da pontuação
	let hits = 0;

	//inicia div's do resultado, para somente acrescentar valores depois.
	let html = `<div class="row"><span class="col-md-6"> ${input} </span><div class="col-md-6">`;

	for ( let i = 0; i < ANSWER_LENGTH; i++) {
		if (input.charAt(i) == answer.value.charAt(i)) {
            //posição correta
			html += `<span class="glyphicon glyphicon-ok"></span>`;
            hits += 1;
		} else if (answer.value.indexOf(input.charAt(i)) > -1){
			//pertence ao grupo
			html += `<span class="glyphicon glyphicon-transfer"></span>`;
		} else {
			//não pertence ao grupo
			html += `<span class="glyphicon glyphicon-remove"></span>`;
		}
	}

	// finaliza html e insere os dados
	html += `</div></div>`;
	document.getElementById("results").innerHTML += html;

	//checa se a resposta esta correta
	return hits === ANSWER_LENGTH;
}

//altera classes css para success ou failure - "view"
function showAnswer (success) {
	let code = document.getElementById("code");
	if (success) {
		code.className += ' success';
	} else {
		code.className += ' failure';
	}
	code.innerHTML = answer.value;
}

//pergunta se o usuario deseja executar o jogo novamente - "view"
function showReplay (){
	document.getElementById("guessing-div").style.display = "none";
	document.getElementById("replay-div").style.display = "block";
}

