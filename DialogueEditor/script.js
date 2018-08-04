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
        switchPage(parseInt(this.id))
    });

}





function switchPage(pageId) {
    id(pageId).classList += " selected";
    id(currentPage).classList.remove("selected");
    console.log(dialogue[pageId]);

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




function exportDialogue() {
    dialogue = [];
    for (i = 0; i < pages.length; i++) {
        dialogue.push({
            condition: id("text1").value,
            option: id("text2").value,
            text: id("text3").value,
            trigger: id("text4").value
        })
    }
}
