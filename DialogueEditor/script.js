function id(arg) {
    return document.getElementById(arg);
}




// The array of pages buttons
var pageBtns = document.getElementsByClassName("page");
// Current page
var currentPage = 0;
// Number of pages
var pages = 0;
// The dialogues array, the empty start is because of the first page
var dialogue = [{
    condition: "",
    option: "",
    text: "",
    trigger: ""
        }];

// The first page gets immediately its event listener
pageBtns[pages].addEventListener("click", function () {
    // By clicking page buttons you are saving the current page and replacing it with this one
    switchPage(parseInt(this.id))
});

// Delete this button(and the equivalent dialogue) by right clicking it
pageBtns[pages].addEventListener("contextmenu",
    function (e) {
        e.preventDefault();
        deletePage(this.id);
    });






function switchPage(pageId) {
    // The currentPage is the page from which you clicked another
    id(currentPage).classList.remove("selected");
    // While the pageId is the one you want to move to
    id(pageId).classList += " selected";


    // This basically saves in the dialogue array the page you're leaving behind
    save();

    // Changes the displayed text into the target page dialogue 
    id("text1").value = dialogue[pageId].condition;
    id("text2").value = dialogue[pageId].option;
    id("text3").value = dialogue[pageId].text;
    id("text4").value = dialogue[pageId].trigger;
    // Now the target page is the new current page
    currentPage = parseInt(pageId);
}

function save() {
    dialogue.splice(currentPage, 1, {
        condition: id("text1").value,
        option: id("text2").value,
        text: id("text3").value,
        trigger: id("text4").value
    });
}
document.addEventListener("dblclick", function () {
    console.log(currentPage + "  " + pages);
})

function deletePage(pageId) {
    if (pages > 0) {
        console.log("deleting page " + pageId);
        dialogue.splice(pageId, 1);
        pageBtns[pages].parentNode.removeChild(pageBtns[pages]);
        pages--;
        if (currentPage > pages) {
            currentPage--;
        }
        refresh();
    } else {
        console.log("you cant delete your only page");
    }
}

function refresh() {

    console.log("now showing dialogue[" + currentPage + "]");
    id("text1").value = dialogue[currentPage].condition;
    id("text2").value = dialogue[currentPage].option;
    id("text3").value = dialogue[currentPage].text;
    id("text4").value = dialogue[currentPage].trigger;


    for (i = 0; i < pageBtns; i++) {
        pageBtns[i].classList.remove("selected");
    }
    pageBtns[currentPage].classList += " selected";
}



// Generates a new page (Pages are huge abstractions)
id("new-page").onclick = function () {
    // Increases page counter
    pages++;
    // A page consist in a button, a new object and its position in the dialogue array( which is the same as page number), and its click listener
    var newNode = document.createElement("BUTTON");
    var textNode = document.createTextNode(pages);
    newNode.appendChild(textNode);
    newNode.className = "page";
    newNode.id = pages;
    // Inserts the page button just before the new-page button
    id("new-page").parentNode.insertBefore(newNode, id("new-page"));
    // Creates an empty dialogue
    dialogue[pages] = {
        condition: "",
        option: "",
        text: "",
        trigger: ""
    }
    // The click listener will swap pages
    pageBtns[pages].addEventListener("click", function () {
        switchPage(parseInt(this.id));
    });
    pageBtns[pages].addEventListener("contextmenu",
        function (e) {
            e.preventDefault();
            deletePage(this.id);
        });

}



// Saves the current page and outputs the dialogue
id("export").onclick = function () {
    save();
    var output = "dialogue=[";
    for (var i = 0; i < dialogue.length; i++) {
        output += "{condition: \"" + dialogue[i].condition + "\", option: \"" + dialogue[i].option + "\", text: \"" + dialogue[i].text + "\", trigger: \"" + dialogue[i].trigger + "\"}";
        if (!(i + 1 === dialogue.length))
            output += ",";
    }
    output += "]";
    prompt("Copy this dialogue code and save it wherever possible", output);
}

id("import").onclick = function () {
    // Reads and executes the imported dialogue object, overwriting the previous one
    eval(prompt("Insert the dialogue code here", ""));
    restock();
}

function restock() {
    // Rearranges the pages once imported
    pages = 0;

    // Removes all the buttons (from last to first)
    for (var i = pageBtns.length - 1; i >= 0; i--) {
        pageBtns[i].parentNode.removeChild(pageBtns[i]);
    }

    // Creates a new button for each dialogue object
    for (var i = 0; i < dialogue.length; i++) {

        var newNode = document.createElement("BUTTON");
        var textNode = document.createTextNode(i);
        newNode.appendChild(textNode);
        newNode.className = "page";
        // The id is a number useful to point at the equivalent dialogue index
        newNode.id = i;
        id("new-page").parentNode.insertBefore(newNode, id("new-page"));

        // On click the button will point to the dialogue index position equivalent to its id and switches the current page with it
        pageBtns[i].addEventListener("click", function () {
            switchPage(parseInt(this.id));
        });
        pageBtns[i].addEventListener("contextmenu",
            function (e) {
                e.preventDefault();
                deletePage(this.id);
            });
        pages = i;
    }
    // Sets the on-screen page as the first object of the dialogue array
    currentPage = 0;
    id("text1").innerHTML = dialogue[currentPage].condition;
    id("text2").innerHTML = dialogue[currentPage].option;
    id("text3").innerHTML = dialogue[currentPage].text;
    id("text4").innerHTML = dialogue[currentPage].trigger;

    // Graphic purposes
    id("0").classList.remove("selected");
    id("0").classList += " selected";
}









// DIALOGUE TESTING
var optionList = [];
id("testStart").onclick = function () {
    save();
    istanceVariables();
    validateOptions();
};

function istanceVariables() {
    eval(id("istances").value);
}

function validateOptions() {
    optionList = [];
    //guarda tra i dialoghi quale soddisfa le condizioni
    //gli indici li pusha nell'option list

    for (var i = 0; i < dialogue.length; i++) {
        if (eval(dialogue[i].condition) || dialogue[i].condition.length == 0) {
            optionList.push(i);
        }
    }
    //chiama la funzione che si occuperà di mostrare le opzioni disponibili
    generateOptions();
}

function generateOptions() {
    id("options").innerHTML = "";
    for (var i = 0; i < optionList.length; i++) {
        var newNode = document.createElement("BUTTON");
        newNode.number = optionList[i];
        var textNode = document.createTextNode(dialogue[newNode.number].option);

        newNode.appendChild(textNode);
        newNode.className = "option";
        newNode.id = "option-" + i;
        id("options").appendChild(newNode);
        newNode.onclick = function () {
            id("output").innerHTML = dialogue[this.number].text;
            eval(dialogue[this.number].trigger);
            validateOptions();
        };
    }

}



// Switches to test mode
id("test").onclick = function () {
    id("editor").style.display = "none";
    id("tester").style.display = "block";
}

// Switches to edit mode
id("edit").onclick = function () {
    id("tester").style.display = "none";
    id("editor").style.display = "block";
}
