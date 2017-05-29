let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

//constantes
const ANSWER_LENGTH = 4;
const TURN_COMMA = 10000;

function guess() {

    let input = document.getElementById('user-guess');
    
    //executa o código apenas se os valores ainda nao foram definidos.
    if ( answer.value == '' || attempt.value == ''){
    	setHiddenFields();
    }

    //verifica input e para o codigo em caso de erro
    //incrementa o contado caso nao seja
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

//gera uma resposta aleatoria de 4 digitos
function setHiddenFields (){

	answer.value = Math.floor(Math.random() * TURN_COMMA);
	answer.value = answer.value.toString(); 
	while(answer.value.length < ANSWER_LENGTH){
		answer.value += "0";
	};

	attempt.value = 0;
	
}

//exibe mensagens
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

//core do game
function getResults (input){
	
	//inicia contador da pontuação
	let hits = 0;

	//inicia div's do resultado, para somente acrescentar valores depois.
	let result = `<div class="row"><span class="col-md-6"> ${input} </span><div class="col-md-6">`;

    //conversão, number to string
    let answerString = answer.value.toString();
    let inputString = input.toString();

	let answerArray = [];
	let inputArray  = []; 

	//converção, strings para arrays
	for (let i = 0; i< ANSWER_LENGTH; i++){ 
		answerArray.push( answerString.charAt([i]) );
		inputArray.push(  inputString.charAt([i]) ); 
	}

	//percorre cada posição do Input
	for ( let inputIndex in inputArray){ 
		//a posição atual consta na Answer?

		//compara a posição atual com todas as posições da Answer para responder
		if ( answerArray.find( arrayCell => arrayCell === inputArray[inputIndex] ) ){
            //TRUE => sim, consta.

			//entretando, a posição é a correta?
			let rightPosition = undefined;

            //percorre cada posição da Answer para responder a pergunta anterior
			for (let answerIndex in answerArray){
				if(inputIndex === answerIndex && inputArray[inputIndex] === answerArray[answerIndex]){
					rightPosition = true;
				}
			}

			if (rightPosition){
                //SIM
				result += `<span class="glyphicon glyphicon-ok"></span>`;
				hits += 1;
				rightPosition = false;
			} else {
                //NAO, mas o valor sim
				result += `<span class="glyphicon glyphicon-transfer"></span>`;
			}

		} else {
            //FALSE => não consta.
			result += `<span class="glyphicon glyphicon-remove"></span>`;
		}
	}

	// finaliza html e insere os dados
	result += `</div></div>`;
	document.getElementById("results").innerHTML += result;

	//checa se a resposta esta correta
	return hits === ANSWER_LENGTH;
}

function showAnswer (display) {

	document.getElementById("code").innerHTML = answer.value;
	if (display) {
		document.getElementById("code").classList.add("success");
	} else {
		document.getElementById("code").classList.add("failure");
	}
}

function showReplay (){
	document.getElementById("guessing-div").style.display = "none";
	document.getElementById("replay-div").style.display = "block";
}

