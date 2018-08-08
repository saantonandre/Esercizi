// DIALOGUE TESTING
var optionList = [];

function validateOptions(charDialogue) {
    dialogueMode = 1;

    id("options").innerHTML = "";
    id("dialogue-ui").style.display = "block";
    optionList = [];
    //guarda tra i dialoghi quale soddisfa le condizioni
    //gli indici li pusha nell'option list

    for (var i = 0; i < charDialogue.length; i++) {
        if (eval(charDialogue[i].condition) || charDialogue[i].condition.length == 0) {
            optionList.push(i);
        }
    }
    //chiama la funzione che si occuperà di mostrare le opzioni disponibili
    generateOptions(charDialogue);
}

function generateOptions(charDialogue) {
    for (var i = 0; i < optionList.length; i++) {
        var newNode = document.createElement("BUTTON");
        newNode.number = optionList[i];
        var textNode = document.createTextNode(charDialogue[newNode.number].option);

        newNode.appendChild(textNode);
        newNode.className = "option";
        newNode.id = "option-" + i;
        id("options").appendChild(newNode);
        newNode.onclick = function () {
            letters(charDialogue[this.number].text, id("output"), true)
            id("output")
            eval(charDialogue[this.number].trigger);
            validateOptions(charDialogue);
        };
    }

}
