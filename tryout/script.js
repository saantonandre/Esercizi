window.onload = function () {
    function id(arg) {
        return document.getElementById(arg);
    }
    var text1 = id('text1');
    //var hello = "Hello! How can I help you?";
    var hello = "Hello! What are you here for?";
    var endTrigger = true;
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
        }, 1000);
    }
    var oneSentence = false;

    // Displays letters 1 by 1, with audio too
    function letters(string, div) {
        clearTimeout(oneSentence);
        div.innerHTML = "";
        endTrigger = false;
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
                oneSentence = setTimeout(next, pause);
            } else {
                if (string == hello) {
                    id("options").style.display = "block";
                } else if (string == letssee) {
                    id("musicPlayer").style.display = "block";
                    playMusic();
                }
            }

        }
    }

    // Options listeners

    var getout = "What are you even talking about? get outta here",
        guessfine = "K guess its fine... have fun",
        metoo = "me too! :3",
        letssee = "Lets see what I've got";

    id("op1").onclick = function () {
        letters(getout, text1);
    }
    id("op2").onclick = function () {
        letters(guessfine, text1);
    }
    id("op3").onclick = function () {
        letters(metoo, text1);
    }
    id("op4").onclick = function () {
        letters(letssee, text1);
    }

    // Music Player START
    var songs = ['anotherSong.wav', 'creep.wav', 'creep2.wav', 'creep3.wav', 'doggo_theme.wav', 'sillymusic.mp3', 'something.wav'];

    var songCount = Math.floor(Math.random() * songs.length);
    var song = false;
    setInterval(function () {
        var time = new Date().toLocaleTimeString();
        id("musicSpan").innerHTML = "currently playing: \"" + songs[songCount] + "\" - current time: " + time;
    }, 1000);

    function playMusic() {
        if (song) {
            song.pause();
        }
        song = new Audio('music/' + songs[songCount]);
        song.loop = false;
        song.onended = playMusic;
        song.play();
        id("stop").onclick = function () {
            song.pause();
            id("musicPlayer").style.display = "none";
        }
        id("prev").onclick = function () {
            if (songCount - 2 < 0) {
                songCount = songs.length - 1 - songCount - 2;
            } else {
                songCount -= 2;
            }
            playMusic();
        }
        id("next").onclick = function () {
            playMusic();
        }
        songCount++;
        if (songCount > songs.length - 1) {
            songCount = 0;
        }

    }
    //Music Player END



}
