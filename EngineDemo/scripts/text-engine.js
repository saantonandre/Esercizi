var oneSentence = false;
var specials = "?!.,;-";
var sentence = 0;

var sentence = 0;

var t1 = new Audio("resources/sfx/talk1.wav"),
    t2 = new Audio("resources/sfx/talk2.wav"),
    t3 = new Audio("resources/sfx/talk3.wav");
var talk = [t3, t2, t3];

function letters(string, div, audio) {
    clearTimeout(oneSentence);
    div.innerHTML = "";
    endTrigger = false;
    var i = 0,
        j = 0,
        pause = 40;
    next();


    function next() {
        if (pause >= 40) {
            if (audio) {
                var rand = Math.floor(Math.random() * 2);
                talk[rand].play();
            }
        }

        div.innerHTML += string[i];
        i++;
        if (i < string.length) {
            pause = 40;
            //checks for longer pauses
            for (j = 0; j < specials.length; j++) {
                if (string[i - 1] === specials[j]) {
                    pause = 125;
                    break;
                }
            }
            if (string[i - 1] === " ") {
                pause = 20;
            }
            oneSentence = setTimeout(next, pause);
        }

    }
}
