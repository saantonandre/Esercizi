window.onload = function () {
    function id(arg) {
        return document.getElementById(arg);
    }
    var text1 = id('text1');
    //var hello = "Hello! How can I help you?";
    var hello = "Hello! What are you here for?";
    var specials = "?!.,;-";
    var t1 = id('t1'),
        t2 = id('t2'),
        t3 = id('t3');
    var talk = [t1, t2, t3];
    id('door').onclick = function () {
        talk[2].play();
    }
    id('door').ondblclick = function () {
        id('door').style.display = "none";
        setTimeout(function () {
            id('welcome').style.display = "block";
            id('welcome').style.animation = "options 1s forwards";
            letters(hello, text1);
        }, 1500);
    }
    // Displays letters 1 by 1, with audio too
    function letters(string, div) {
        var i = 0,
            j = 0,
            pause = 80;
        next();


        function next() {
            if (pause >= 80)
                talk[Math.floor(Math.random() * 2)].play();

            div.innerHTML += string[i];
            i++;
            if (i < string.length) {
                pause = 80;
                //checks for longer pauses
                for (j = 0; j < specials.length; j++) {
                    if (string[i - 1] === specials[j]) {
                        pause = 250;
                        break;
                    }
                }
                if (string[i - 1] === " ") {
                    pause = 40;
                }
                setTimeout(next, pause);
            }

        }
    }





}
