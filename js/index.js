//links
//http://eloquentjavascript.net/09_regexp.html
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
nlp = window.nlp_compromise;

var messages = [], //array that hold the record of each string in chat
  lastUserMessage = "", //keeps track of the most recent input string from the user
  botMessage = "", //var keeps track of what the chatbot is going to say
  botName = 'Chatbot', //name of the chatbot
  talking = true; //when false the speach function doesn't work
//
//
//****************************************************************
//edit this function to change what the chatbot says
function chatbotResponse() {
  talking = true;
  botMessage = "I'm confused"; //the default message

  if (lastUserMessage === 'hi') {
    botMessage = 'Howdy! <button>press me</button>';
  }

  if (lastUserMessage === 'name') {
    botMessage = 'My name is ' + botName;
  }

  var n = 0 // n is used to keep track of regular expressions
    //this is the basic syntax for a regular expression search
    //n = lastUserMessage.search('cat'); //regular
    //n = lastUserMessage.search(/cat/i);  //caps or lowercase
    //n = lastUserMessage.search(/\bcat\b/i);  //searches for cat as only a word
  n = lastUserMessage.search(/\b(cat|cats|kitten|feline)\b/i); //several different words
  if (n !== -1) {
    botMessage = 'I hate cats!';
  }
  /*	
  // this command will repeat back the results of the search
  var patt = /\b(dog(s|gies?|gy)?|pup(s|py|pies?)?|pooche?s?|hounds?|canines?)\b/i;
  var result = patt.exec(lastUserMessage);
  if (result) {
    botMessage = 'I love ' + result[0];
  }
  // this will check for both dog and cat
  //n = lastUserMessage.search(/(?=.*\bdog\b).*\bcat\b/i);
  n = lastUserMessage.search(/(?=.*\b(dog(s|gies?|gy)?|pup(s|py|pies?)?|pooche?s?|hounds?|canines?)\b).*\b(cat|cats|kitten|feline)\b/i);
  if (n !== -1) {
    botMessage = 'I like dogs, but I do not like cats';
  }

  //you can output html as a message!!!!
  n = lastUserMessage.search(/\bBMO\b/i);
  if (n !== -1) {
    Speech('Puppies! Puppies! Puppies!')
    talking = false;
    botMessage = '<img src="http://lilgreenland.github.io/images/BMO.jpg" width="100" align="middle"> Puppies! Puppies! Puppies!';
  }

  regExp(/\b(dog(s|gies?|gy)?|pup(s|py|pies?)?|pooche?s?|hounds?|canines?)\b/i, "Dogs are the best pets!");
  regExp(/\b(jacket|coat|cape|sweater|hoody)\b/i, "Are you cold?");
  regExp(/(?=.*\b(dog(s|gies?|gy)?|pup(s|py|pies?)?|pooche?s?|hounds?|canines?)\b).*\b(cat|cats|kitten|feline)\b/i, "I like dogs, but I do not like cats");
  regExp(/\b(ricks?|mortys?)\b/i, "Oh, do you watch Rick and Morty?");
  botMessage = nlp.statement(lastUserMessage).negate().text();
  */
} //****************************************************************
//
//this function simplifies some of the syntax for a regular expression word search
function regExp(input, output) {
  var result = input.exec(lastUserMessage);
  if (result) {
    botMessage = output;
  }
}
//
//
//this runs each time enter is pressed.
//It controls the overall input and output
function newEntry() {
  //if the message from the user isn't empty then run 
  if (document.getElementById("chatbox").value != "") {
    //pulls the value from the chatbox ands sets it to lastUserMessage
    lastUserMessage = document.getElementById("chatbox").value;
    //sets the chat box to be clear
    document.getElementById("chatbox").value = "";
    //adds the value of the chatbox to the array messages
    messages.push(lastUserMessage);
    //Speech(lastUserMessage);  //says what the user typed outloud
    //sets the variable botMessage in response to lastUserMessage
    chatbotResponse();
    //add the chatbot's name and message to the array messages
    messages.push("<b>" + botName + ":</b> " + botMessage);
    // says the message using the text to speech function written below
    Speech(botMessage);
    //outputs the last few array elements of messages to html
    for (var i = 1; i < 8; i++) {
      if (messages[messages.length - i])
        document.getElementById("chatlog" + i).innerHTML = messages[messages.length - i];
    }
  }
}

//text to Speech
//https://developers.google.com/web/updates/2014/01/Web-apps-that-talk-Introduction-to-the-Speech-Synthesis-API
function Speech(say) {
  if ('speechSynthesis' in window && talking) {
    var utterance = new SpeechSynthesisUtterance(say);
    //msg.voice = voices[10]; // Note: some voices don't support altering params
    //msg.voiceURI = 'native';
    //utterance.volume = 1; // 0 to 1
    //utterance.rate = 0.1; // 0.1 to 10
    //utterance.pitch = 1; //0 to 2
    //utterance.text = 'Hello World';
    //utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
  }
}

//runs the keypress() function when a key is pressed
document.onkeypress = keyPress;
//if the key pressed is 'enter' runs the function newEntry()
function keyPress(e) {
  var x = e || window.event;
  var key = (x.keyCode || x.which);
  if (key == 13 || key == 3) {
    //runs this function when enter is pressed
    newEntry();
  }
  if (key == 38) {
    console.log('hi')
      //document.getElementById("chatbox").value = lastUserMessage;
  }
}

//clears the placeholder text ion the chatbox
//this function is set to run when the users brings focus to the chatbox, by clicking on it
function placeHolder() {
  document.getElementById("chatbox").placeholder = "";
}