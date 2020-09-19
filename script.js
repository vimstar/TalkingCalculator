var SpeechRecognition = webkitSpeechRecognition;
var SpeechGrammarList = webkitSpeechGrammarList;
var SpeechRecognitionEvent = webkitSpeechRecognitionEvent;

var commands = [ 'one' , 'two' , 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'zero', 'plus', 'minus', 'times', 'divide', 'equals', 'point', 'clear'];
var grammar = '#JSGF V1.0; grammar numbers; public <command> = ' + commands.join(' | ') + ' ;';

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = true;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var recognizing = false;

const dictionary = {
  '1': 1,
  'one': 1,
  '2': 2,
  'two': 2,
  'to': 2,
  '3': 3,
  'three': 3,
  '4': 4,
  'four': 4,
  'for': 4,
  '5': 5,
  'five': 5,
  '6': 6,
  'six': 6,
  'sex': 6,
  '7': 7,
  'seven': 7,
  '8': 8,
  'eight': 8,
  '9': 9,
  'nine': 9,
  '0': 0,
  'zero': 0,
  '+': '+',
  'plus': '+',
  'add': '+',
  '-': '-',
  'minus': '-',
  'subtract': '-',
  '*': '*',
  'time': '*',
  'times': '*',
  'multiplied': '*',
  '/': '/',
  'divide': '/',
  'divided': '/',
  '.': '.',
  'point': '.',
  '=': '=',
  'equal': '=',
  'equals': '=',
  'C': 'C',
  'clear': 'C'
};

window.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.calculator input');
  buttons.forEach((button) => {
    button.addEventListener('click', handleClick);
  });
});

function handleClick (e) {
  const value = e.target.value;
  processCommand(value);
}

recognition.onstart = function() {
    recognizing = true;
    start_img.src = 'mic-animate.gif';
}

recognition.onend = function() {
    recognizing = false;
    start_img.src = 'mic.gif';
}

recognition.onerror = function(event) {
  start_img.src = 'mic.gif';
  console.log('Error occurred in recognition:' + event.error);
}

recognition.onresult = function(event) {
  var command = event.results[event.results.length - 1][0].transcript.toLowerCase();
  console.log('Command recieved: ' + command);
  const commands = command.split(' ');
  commands.forEach(processCommand);
}

function startButton(event) {
  if (recognizing) {
    recognition.stop();
    return;
  }
  recognition.start();
  start_img.src = 'mic-slash.gif';
  console.log('Ready to receive commands.');
}

function calcNumbers(result){
	form.displayResult.value = form.displayResult.value + result;	
}

function calcResult(){
	form.displayResult.value = eval(form.displayResult.value);
}

function clearValue(){
	form.displayResult.value = '';	
}

function processCommand (command) {
  const value = dictionary[command];
  if (isNumeric(command)){
	  calcNumbers(command);
  } else if (value){
    console.log('Command found: ', command);
    if (value === '='){
		calcResult();
	} else if (value === 'C'){
		clearValue();
	} else{
		calcNumbers(value);
	}
  } else {
    console.log('could not find', command);
  }
}

function isNumeric(num){
  return !isNaN(num)
}
