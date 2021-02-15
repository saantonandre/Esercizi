var stages = [];
var stage_1 = [];


// S1 L0 (bedroom)
stage_1.push({
    map: [{
        x: 8,
        y: 11,
        w: 14,
        h: 2,
        type: 0
    }, {
        x: 22,
        y: 6,
        w: 3,
        h: 8,
        type: 0
    }, {
        x: 6,
        y: 5,
        w: 2,
        h: 9,
        type: 0
    }, {
        x: 4,
        y: 4,
        w: 21,
        h: 2,
        type: 0
    }, {
        x: 12,
        y: 9,
        w: 1,
        h: 1,
        type: 6,
        event: function () {
            dialogueEngine.loadDialogueQueue([{
                speaker: 0,
                emotion: 0,
                text: "No need to turn off the pc, it'll be just few minutes until I'll be back.",
            }])
        },
    }, {
        x: 21,
        y: 9,
        w: 1,
        h: 1,
        type: 6,
        event: function () {
            stages[savePoint.stage][savePoint.level].spawnPoint.x = player.x;
            stages[savePoint.stage][savePoint.level].spawnPoint.y = player.y;
            savePoint.level = 1;
            //calls the load function at the end of the loop
            load()
        },
    }, ],
    spawnPoint: {
        x: 16,
        y: 10
    },
    biome: 1,
    camBoxes: [],
    levelImage: id("level-0"),
    background: 0
})

/// S1 L1 ()
stage_1.push({
    map: [{
        x: 0,
        y: 14,
        w: 100,
        h: 4,
        type: 0
    }, {
        x: -1,
        y: 0,
        w: 1,
        h: 30,
        type: 0
    }, {
        x: 29,
        y: 13,
        w: 71,
        h: 1,
        type: 0
    }, {
        x: 0,
        y: 10,
        w: 1,
        h: 4,
        type: 0
    }, {
        x: 1,
        y: 11,
        w: 1,
        h: 3,
        type: 0
    }, {
        x: 2,
        y: 13,
        w: 1,
        h: 1,
        type: 0
    }, {
        x: 42,
        y: 12,
        w: 4,
        h: 1,
        type: 0
    }, {
        x: 41,
        y: 9,
        w: 6,
        h: 1,
        type: 0
    }, {
        x: 57,
        y: 11,
        w: 2,
        h: 2,
        type: 0
    }, {
        x: 29,
        y: 12,
        w: 5,
        h: 1,
        type: 0
    }, {
        x: 13,
        y: 13,
        w: 1,
        h: 1,
        type: 0
    }, {
        x: 18,
        y: 12,
        w: 1,
        h: 1,
        type: 7
    }, {
        x: 39,
        y: 12,
        w: 1,
        h: 1,
        type: 8
    }, {
        x: 6,
        y: 12,
        w: 1,
        h: 1,
        type: 6,
        event: function () {
            savePoint.level = 0;
            load();
        },
    }, {
        x: 1,
        y: 12,
        w: 1,
        h: 1,
        type: 6,
        event: function () {
            dialogueEngine.loadDialogueQueue([{
                speaker: 0,
                emotion: 0,
                text: "What a mess... the sidewalk is blocked because of all those boxes",
            }])
        },
    }, {
        x: 23,
        y: 13,
        w: 4,
        h: 1,
        type: 0
    }, {
        x: 24,
        y: 12,
        w: 2,
        h: 1,
        type: 0
    }, {
        x: 51,
        y: 11,
        w: 1,
        h: 1,
        type: 9
    }, {
        x: 99,
        y: 0,
        w: 1,
        h: 20,
        type: 0
    }, {
        x: 45,
        y: 13,
        w: 54,
        h: 7,
        type: 0
    }, {
        x: 84,
        y: 11,
        w: 1,
        h: 2,
        type: 0
    }, {
        x: 85,
        y: 10,
        w: 1,
        h: 3,
        type: 0
    }, {
        x: 87,
        y: 12,
        w: 4,
        h: 1,
        type: 0
    }, {
        x: 86,
        y: 9,
        w: 6,
        h: 1,
        type: 0
    }, {
        x: 97,
        y: 10,
        w: 2,
        h: 3,
        type: 0
    }, {
        x: 98,
        y: 9,
        w: 1,
        h: 1,
        type: 0
    }, {
        x: 64,
        y: 12,
        w: 4,
        h: 1,
        type: 0
    }, {
        x: 59,
        y: 12,
        w: 1,
        h: 1,
        type: 3
    }, {
        x: 68,
        y: 12,
        w: 1,
        h: 1,
        type: 3
    }, {
        x: 78,
        y: 12,
        w: 1,
        h: 1,
        type: 3
    }, {
        x: 79,
        y: 12,
        w: 1,
        h: 1,
        type: 3
    }, {
        x: 95,
        y: 12,
        w: 1,
        h: 1,
        type: 3
    }, {
        x: 59,
        y: 11,
        w: 1,
        h: 1,
        type: 4
    }, {
        x: 64,
        y: 11,
        w: 1,
        h: 1,
        type: 4
    }, {
        x: 73,
        y: 9,
        w: 1,
        h: 1,
        type: 4
    }, {
        x: 78,
        y: 7,
        w: 1,
        h: 1,
        type: 4
    }, {
        x: 79,
        y: 11,
        w: 1,
        h: 1,
        type: 4
    }, {
        x: 88,
        y: 11,
        w: 1,
        h: 1,
        type: 4
    }, {
        x: 89,
        y: 6,
        w: 1,
        h: 1,
        type: 4
    }, {
        x: 96,
        y: 8,
        w: 1,
        h: 1,
        type: 4
    }, {
        x: 75,
        y: 5,
        w: 1,
        h: 1,
        type: 4
    }, ],
    spawnPoint: {
        x: 6,
        y: 13
    },
    biome: 1,
    camBoxes: [],
    levelImage: id("level-1"),
    background: id("city-bg")
})

stages.push(stage_1);
