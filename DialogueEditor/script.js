function id(arg) {
    return document.getElementById(arg);
}

var currentPage = 0;
var pages = 0;
var dialogue = [{
    condition: "",
    option: "",
    text: "",
    trigger: ""
        }];
var pageBtns;
pageBtns = document.getElementsByClassName("page");
pageBtns[pages].addEventListener("click", function () {
    switchPage(parseInt(this.id))
});
id("test").onclick = function () {
    id("editor").style.display = "none";
    id("tester").style.display = "block";
}

id("edit").onclick = function () {
    id("tester").style.display = "none";
    id("editor").style.display = "block";
}



id("new-page").onclick = function () {
    pages++;
    var newNode = document.createElement("BUTTON");
    var textNode = document.createTextNode(pages);
    newNode.appendChild(textNode);
    newNode.className = "page";
    newNode.id = pages;
    id("new-page").parentNode.insertBefore(newNode, id("new-page"));
    dialogue[pages] = {
        condition: "",
        option: "",
        text: "",
        trigger: ""
    }
    pageBtns[pages].addEventListener("click", function () {
        switchPage(parseInt(this.id));
    });

}





function switchPage(pageId) {
    id(pageId).classList += " selected";
    id(currentPage).classList.remove("selected");

    dialogue.splice(currentPage, 1, {
        condition: id("text1").value,
        option: id("text2").value,
        text: id("text3").value,
        trigger: id("text4").value
    });

    id("text1").value = dialogue[pageId].condition;
    id("text2").value = dialogue[pageId].option;
    id("text3").value = dialogue[pageId].text;
    id("text4").value = dialogue[pageId].trigger;
    currentPage = pageId;
}

function save() {
    dialogue.splice(currentPage, 1, {
        condition: id("text1").value,
        option: id("text2").value,
        text: id("text3").value,
        trigger: id("text4").value
    });
}

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
    eval(prompt("Insert the dialogue code here", ""));
    restock();
}

function restock() {
    pages = 0;
    for (var i = pageBtns.length - 1; i >= 0; i--) {
        pageBtns[i].parentNode.removeChild(pageBtns[i]);
    }
    for (var i = 0; i < dialogue.length; i++) {
        var newNode = document.createElement("BUTTON");
        var textNode = document.createTextNode(i);
        newNode.appendChild(textNode);
        newNode.className = "page";
        newNode.id = i;
        id("new-page").parentNode.insertBefore(newNode, id("new-page"));

        pageBtns[i].addEventListener("click", function () {
            switchPage(parseInt(this.id));
        });
        pages = i;
    }

    currentPage = 0;
    id("text1").value = dialogue[0].condition;
    id("text2").value = dialogue[0].option;
    id("text3").value = dialogue[0].text;
    id("text4").value = dialogue[0].trigger;

    id("0").classList.remove("selected");
    id("0").classList += " selected";
}









// DIALOGUE TESTING
var optionList = [];
id("testStart").onclick = function () {
    istanceVariables();
    validateOptions();
    generateOptions();
};

function istanceVariables() {
    eval(id("istances").value);
}

function validateOptions() {
    optionList = [];
    for (var i = 0; i < dialogue.length; i++) {
        if (eval(dialogue[i].condition) || eval(dialogue[i].condition.length == 0)) {
            optionList.push(i);
        }
    }
}

function generateOptions() {
    id("options").innerHTML = "";
    for (var i = 0; i < optionList.length; i++) {
        var newNode = document.createElement("BUTTON");
        var textNode = document.createTextNode(dialogue[optionList[i]].option);

        newNode.appendChild(textNode);
        newNode.className = "option";
        newNode.id = "option-" + i;
        newNode.number = optionList[i];
        id("options").appendChild(newNode);
        newNode.addEventListener("click", function () {
            id("output").innerHTML = dialogue[this.number].text;
            eval(dialogue[this.number].trigger);
            validateOptions();
            generateOptions();
        });
    }

}
