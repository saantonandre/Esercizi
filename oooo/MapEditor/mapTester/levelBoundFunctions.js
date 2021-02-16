// Variables related to the events
var eventsVariables = {
    // If you took all the photos with Esther
    tookPhotos: false,
    interactedWithBed: false
}

// All the level bound functions(events) will be stored here
var LevelBoundFunctions = [];
var stage_0 = []
var stage_1 = []
var stage_2 = []
// level 0 (bedroom)
var level_0 = [];

let backHome = {
    removed: false,
    compute: function () {
        if (eventsVariables.tookPhotos) {
            dialogueEngine.loadDialogueQueue([{
                speaker: 0,
                emotion: 0,
                cameraFocus: officer,
                text: "Damn, I'm not even tired...I would have played a bit more if it wasn't for Jay."
                        }])
            this.removed = true;

            function goToSleep() {
                screenShake.duration = 10;
                dialogueEngine.loadDialogueQueue([{
                    speaker: 0,
                    emotion: 1,
                    cameraFocus: officer,
                    text: "W-what was that?!"
                        }])
                eventsVariables.interactedWithBed = true;
            }
            entities.push(new Interaction(15, 10, goToSleep, false));
        }
    }
}
let earthquake = {
    removed: false,
    compute: function () {
        if (eventsVariables.interactedWithBed) {
            setTimeout(function () {
                screenShake.duration = 10
            }, 500)
            setTimeout(function () {
                screenShake.duration = 20
            }, 1500)
            setTimeout(function () {
                screenShake.duration = 30
            }, 3000)
            this.removed = true;
        }
    }
}
level_0.push(backHome, earthquake)
stage_0.push(level_0);
// level 1 (street)
var level_1 = [];
//Jaymee scolds you for being out that late at night
let jaymeeAsksWhatYouDoing = {
    removed: false,
    compute: function () {
        if (collided(officer, player)) {
            dialogueEngine.loadDialogueQueue([{
                speaker: 2,
                emotion: 0,
                cameraFocus: officer,
                text: "Beck. Not again. Where you think you're going?"
                        }, {
                speaker: 0,
                emotion: 1,
                text: "O- officer Jaymee"
                        }, {
                speaker: 2,
                emotion: 0,
                cameraFocus: officer,
                text: "Speak up"
                        }, {
                speaker: 0,
                emotion: 0,
                text: "I gotta get back the skateboard I lent to Esther, he's waiting just ahead..."
                        }, {
                speaker: 2,
                emotion: 0,
                cameraFocus: officer,
                text: "...fine. I'll see you there within two minutes, or you'll be in trouble this time."
                        }])
            this.removed = true;
        }
    }
}
let meetEsther = {
    removed: false,
    compute: function () {
        console.log(esther)

        function getYourSkate() {
            dialogueEngine.loadDialogueQueue([{
                speaker: 1,
                emotion: 0,
                cameraFocus: esther,
                text: "Here it is!"
                        }, {
                speaker: 0,
                emotion: 0,
                cameraFocus: player,
                text: "yo Esther"
                        }, {
                speaker: 1,
                emotion: 0,
                cameraFocus: esther,
                text: "Been doing some SIIIIICK kickflips. My knees feels so weak now"
                        }, {
                speaker: 1,
                emotion: 0,
                cameraFocus: esther,
                text: "Oh! I've almost forgot... I've got a new camera!!!"
                        }, {
                speaker: 0,
                emotion: 3,
                cameraFocus: player,
                text: "Wooow! that looks so professional!"
                        }, {
                speaker: 1,
                emotion: 0,
                cameraFocus: esther,
                text: "Heh. I've spent a year long of savings. Wanna make some photoshoots? "
                }, {
                speaker: 0,
                emotion: 3,
                cameraFocus: player,
                text: "YEAH!!!"
                        }, {
                speaker: 1,
                emotion: 0,
                cameraFocus: esther,
                text: "Ok then, go ahead, I'll be right behind you. Make sure to land your craaaziest tricks!"
                }, ])
            player.onSkate = true;
            player.xVel = 0;

            function goOn() {
                if (eventsVariables.tookPhotos) {
                    dialogueEngine.loadDialogueQueue([{
                        speaker: 0,
                        emotion: 0,
                        cameraFocus: esther,
                        text: "Can I take a look at those photos?",
                        }, {
                        speaker: 1,
                        emotion: 0,
                        cameraFocus: esther,
                        text: "Yeah, aren't those the most EPIC pics?",
                        }, {
                        speaker: 0,
                        emotion: 1,
                        cameraFocus: esther,
                        text: "I mean... they look kinda pixelated",
                        }, ])
                    this.removed = true;
                } else {
                    dialogueEngine.loadDialogueQueue([{
                        speaker: 1,
                        emotion: 0,
                        cameraFocus: esther,
                        text: "Go on, this camera roll can hold a lot of pics!",
                        }])
                }
            }
            entities.push(new Interaction(esther.x, esther.y - 1, goOn, true));

        }
        entities.push(new Interaction(esther.x, esther.y - 1, getYourSkate, false));
        this.removed = true;

    }

}
let afterPhotoshoot = {
    removed: false,
    compute: function () {
        if (eventsVariables.tookPhotos) {
            dialogueEngine.loadDialogueQueue([{
                speaker: 1,
                emotion: 0,
                cameraFocus: esther,
                text: "That's enough Beck! my camera's internal storage is full"
                        }])
            this.removed = true;
            officer.x = esther.x + 2;
        }
    }
}
let jaymeeScoldsYou = {
    removed: false,
    compute: function () {
        if (eventsVariables.tookPhotos && collided(officer, player)) {
            dialogueEngine.loadDialogueQueue([{
                speaker: 2,
                emotion: 0,
                cameraFocus: officer,
                text: "Ok kids. I have A job to do. Go back home right NOW."
                        }, {
                speaker: 1,
                emotion: 0,
                cameraFocus: esther,
                text: "Sure officer!"
                        }, {
                speaker: 0,
                emotion: 1,
                cameraFocus: player,
                text: "Sure"
                        }])
            this.removed = true;
            player.onSkate = false;
        }
    }
}
let satelliteAppears = {
    removed: false,
    compute: function () {
        if (eventsVariables.interactedWithBed) {
            entities.push(new Boss_1(-19, -3));
            for (let i = 0; i < entities.length; i++) {
                if (entities[i].type == "interaction") {
                    entities[i].removed = true;
                }
            }
            player.onSkate = true;
            this.removed = true;
        }
    }
}
level_1.push(jaymeeAsksWhatYouDoing, meetEsther, afterPhotoshoot, jaymeeScoldsYou,satelliteAppears)
stage_0.push(level_1);


LevelBoundFunctions.push(stage_0)
LevelBoundFunctions.push(stage_1)
LevelBoundFunctions.push(stage_2)
