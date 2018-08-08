function id(arg) {
    return document.getElementById(arg);
}
var characters = ["guy"];
var dialogues = [
    function () {
        letters("Obsessed with your sins, you travel looking for a distant friend, Sophie, who promised to save you.", id("storytext"), false)
            }
            ]
id("start").onclick = function () {
    id("main-menu").style.display = "none";
    id("game-screen").style.display = "block";
}
id("closeDialogue").onclick = function () {
    id("dialogue-ui").style.display = "none";
    dialogueMode = false;
    requestAnimationFrame(loop);
}
