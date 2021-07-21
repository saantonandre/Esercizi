/*
  CLASS LIST:

  class Meta

  class MapObject

  class Entity

  class Portal

  class Block

  class Enemy

  class Slime

  class Player

  class Mouse

 */
const SHEET = id("sheet");
class Meta {
  constructor() {
    this.fps = 0;
    this.loopType = 0;
    this.ratio = 2;
    this.deltaTime = 1;
    this.targetFrames = 60;
    this.tileSize = 16;
    this.tilesWidth = 32;
    this.tilesHeight = 20;
    this.terminalVel = 0.5;
    // Delta Time Computing
    this.perfectFrameTime = 1000 / this.targetFrames;
    this.lastTimestamp = Date.now();
    this.timestamp = Date.now();
    this.bulletTime = false;
  }
  updateDeltaTime() {
    this.lastTimestamp = this.timestamp;
    this.timestamp = Date.now();
    this.deltaTime =
      (this.timestamp - this.lastTimestamp) / this.perfectFrameTime;

    // Forces the max slowness as half the fps target
    if (this.deltaTime > 2) {
      this.deltaTime = 2;
    }
  }
}
// Generate the map
// Generate the levels / Populate the rooms

class UserInterface {
  constructor() {
    this.source = player;
    this.fontSize = 5;
    this.hpIcon = {
      spriteX: [[5]],
      spriteY: [[11]],
      x: 1,
      y: 0.5,
      w: 1,
      h: 1,
    };
    this.hpBar = {
      spriteX: [[6], [9]],
      spriteY: [[11], [11]],
      x: 2,
      y: 0.5,
      w: 3,
      h: 1,
    };

    this.manaIcon = {
      spriteX: [[5]],
      spriteY: [[13]],
      x: 5,
      y: 0.5,
      w: 1,
      h: 1,
    };
    this.manaBar = {
      spriteX: [[6], [9]],
      spriteY: [[13], [13]],
      x: 6,
      y: 0.5,
      w: 3,
      h: 1,
    };
  }
  render() {
    this.renderHpBar();
    this.renderManaBar();
  }
  renderHpBar() {
    // variables
    let hpRatio = this.source.hp / this.source.maxHp;
    // renders icon
    c.drawImage(
      SHEET,
      this.hpIcon.spriteX[0][0] * meta.tileSize,
      this.hpIcon.spriteY[0][0] * meta.tileSize,
      this.hpIcon.w * meta.tileSize,
      this.hpIcon.h * meta.tileSize,
      this.hpIcon.x * meta.tileSize * meta.ratio,
      this.hpIcon.y * meta.tileSize * meta.ratio,
      this.hpIcon.w * meta.tileSize * meta.ratio,
      this.hpIcon.h * meta.tileSize * meta.ratio
    );
    // renders container
    c.drawImage(
      SHEET,
      this.hpBar.spriteX[0][0] * meta.tileSize,
      this.hpBar.spriteY[0][0] * meta.tileSize,
      this.hpBar.w * meta.tileSize,
      this.hpBar.h * meta.tileSize,
      this.hpBar.x * meta.tileSize * meta.ratio,
      this.hpBar.y * meta.tileSize * meta.ratio,
      this.hpBar.w * meta.tileSize * meta.ratio,
      this.hpBar.h * meta.tileSize * meta.ratio
    );
    // renders bar
    c.drawImage(
      SHEET,
      this.hpBar.spriteX[1][0] * meta.tileSize,
      this.hpBar.spriteY[1][0] * meta.tileSize,
      this.hpBar.w * meta.tileSize * hpRatio,
      this.hpBar.h * meta.tileSize,
      this.hpBar.x * meta.tileSize * meta.ratio,
      this.hpBar.y * meta.tileSize * meta.ratio,
      this.hpBar.w * meta.tileSize * meta.ratio * hpRatio,
      this.hpBar.h * meta.tileSize * meta.ratio
    );
    // renders text
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillStyle = "#df3e23";
    c.font =
      "bold " + Math.round(this.fontSize * meta.ratio) + "px" + " Verdana";
    c.fillText(
      this.source.hp + "/" + this.source.maxHp,
      (this.hpBar.x + this.hpBar.w / 2) * meta.tileSize * meta.ratio,
      this.hpBar.y * meta.tileSize * meta.ratio
    );
  }
  renderManaBar() {
    // variables
    let manaRatio = this.source.mana / this.source.maxMana;
    // renders icond
    c.drawImage(
      SHEET,
      this.manaIcon.spriteX[0][0] * meta.tileSize,
      this.manaIcon.spriteY[0][0] * meta.tileSize,
      this.manaIcon.w * meta.tileSize,
      this.manaIcon.h * meta.tileSize,
      this.manaIcon.x * meta.tileSize * meta.ratio,
      this.manaIcon.y * meta.tileSize * meta.ratio,
      this.manaIcon.w * meta.tileSize * meta.ratio,
      this.manaIcon.h * meta.tileSize * meta.ratio
    );
    // renders container
    c.drawImage(
      SHEET,
      this.manaBar.spriteX[0][0] * meta.tileSize,
      this.manaBar.spriteY[0][0] * meta.tileSize,
      this.manaBar.w * meta.tileSize * manaRatio,
      this.manaBar.h * meta.tileSize,
      this.manaBar.x * meta.tileSize * meta.ratio,
      this.manaBar.y * meta.tileSize * meta.ratio,
      this.manaBar.w * meta.tileSize * meta.ratio * manaRatio,
      this.manaBar.h * meta.tileSize * meta.ratio
    );
    // renders bar
    c.drawImage(
      SHEET,
      this.manaBar.spriteX[1][0] * meta.tileSize,
      this.manaBar.spriteY[1][0] * meta.tileSize,
      this.manaBar.w * meta.tileSize,
      this.manaBar.h * meta.tileSize,
      this.manaBar.x * meta.tileSize * meta.ratio,
      this.manaBar.y * meta.tileSize * meta.ratio,
      this.manaBar.w * meta.tileSize * meta.ratio,
      this.manaBar.h * meta.tileSize * meta.ratio
    );

    // renders text
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillStyle = "#249fde";
    c.font =
      "bold " + Math.round(this.fontSize * meta.ratio) + "px" + " Verdana";
    c.fillText(
      this.source.mana + "/" + this.source.maxMana,
      (this.manaBar.x + this.manaBar.w / 2) * meta.tileSize * meta.ratio,
      this.manaBar.y * meta.tileSize * meta.ratio
    );
  }
}
class MapObject {
  constructor() {
    this.w = 11;
    this.h = 11;
    this.rooms = 6;
    this.roomsW = 21;
    this.roomsH = 15;

    this.x = (canvas.width / meta.tileSize / meta.ratio - this.roomsW) / 2;
    this.y = (canvas.height / meta.tileSize / meta.ratio - this.roomsH) / 2;
    this.map = [];
    this.entities = [];
    this.start = [0, 0];
    this.currentLevel = [0, 0];
    this.initialize();
  }
  // Generate the map
  initialize() {
    // Generate the map
    this.map = mapGen.generate(this.w, this.h, this.rooms);
    // Iterate the rooms inside the map
    for (let i = 0; i < this.w; i++) {
      for (let j = 0; j < this.h; j++) {
        if (!this.map[i][j]) {
          continue;
        }
        this.map[i][j].entities = this.parseRoom(
          levelGen.generate(this.roomsW, this.roomsH, this.map[i][j].links)
        );
        if (this.map[i][j].type === 1) {
          this.currentLevel = [i, j];
          this.map[this.currentLevel[0]][this.currentLevel[1]].revealed = true;
          this.entities =
            this.map[this.currentLevel[0]][this.currentLevel[1]].entities;
        }
      }
    }
  }
  // Translates the level to game entities
  parseRoom(room) {
    let entities = [];
    let entity;
    for (let x = 0; x < room.length; x++) {
      for (let y = 0; y < room[x].length; y++) {
        switch (room[x][y].type) {
          case 0:
            continue;
          case 1:
            entity = new Block(x, y);
            entity.tile = room[x][y].tile;
            entities.push(entity);
            break;
          case 2:
            entity = new Portal(x, y, room[x][y].dir);
            entities.push(entity);
            break;
        }
      }
    }
    return entities;
  }
  render() {
    for (let i = 0; i < this.roomsW; i++) {
      for (let j = 0; j < this.roomsH; j++) {
        //renders the floor
        c.drawImage(
          SHEET,
          1 * meta.tileSize,
          1 * meta.tileSize,
          meta.tileSize,
          meta.tileSize,
          ((i + this.x) * meta.tileSize * meta.ratio) | 0,
          ((j + this.y) * meta.tileSize * meta.ratio) | 0,
          meta.tileSize * meta.ratio,
          meta.tileSize * meta.ratio
        );
      }
    }
  }
  changeLevel(dir) {
    //clears the vfxs
    vfxsManager.removeAll();

    this.currentLevel = [
      this.currentLevel[0] + dir[0],
      this.currentLevel[1] + dir[1],
    ];
    if (!dir[0]) {
      //down-up
      dir[1] > 0 ? (player.y = 1) : (player.y = this.roomsH - 2);
    } else {
      //right-left
      dir[0] > 0 ? (player.x = 1) : (player.x = this.roomsW - 2);
    }
    this.entities =
      this.map[this.currentLevel[0]][this.currentLevel[1]].entities;
    this.map[this.currentLevel[0]][this.currentLevel[1]].revealed = true;
  }
  renderMinimap() {
    let size = 15;
    let room;
    c.save();
    c.translate(canvas.width - this.w * size, 0);
    c.globalAlpha = 0.5;
    c.fillStyle = "gray";
    c.fillRect(0, 0, this.w * size, this.h * size);
    for (let i = 0; i < this.w; i++) {
      for (let j = 0; j < this.h; j++) {
        room = this.map[i][j];
        if (room == 0) {
          continue;
        }
        if (!room.revealed) {
          continue;
        }
        // Draws rooms
        switch (this.map[i][j].type) {
          case 0:
            c.fillStyle = "black";
            break;
          case 1:
            c.fillStyle = "blue";
            break;
          case 2:
            c.fillStyle = "yellow";
            break;
          case 3:
            c.fillStyle = "red";
            break;
        }
        c.fillRect(
          i * size + size / 10,
          j * size + size / 10,
          size - size / 5,
          size - size / 5
        );
        // Draws links
        for (let k = 0; k < room.links.length; k++) {
          c.fillStyle = "white";
          c.fillRect(
            (i + room.links[k][0] / 2) * size + size / 2 - size / 10,
            (j + room.links[k][1] / 2) * size + size / 2 - size / 10,
            size / 5,
            size / 5
          );
        }

        if (this.currentLevel[0] === i && this.currentLevel[1] === j) {
          c.globalAlpha = 0.8;
          c.fillStyle = "pink";
          c.fillRect(
            i * size + size / 3,
            j * size + size / 3,
            size - size / 1.5,
            size - size / 1.5
          );
        }
      }
    }
    c.globalAlpha = 1;
    c.restore();
  }
  checkCollisions(obj, returnColliders, simpleCol) {
    let t = this.entities;
    let col = "none";
    obj.col.L = 0;
    obj.col.R = 0;
    obj.col.T = 0;
    obj.col.B = 0;
    let collidersChunk = [];
    for (let i = 0; i < t.length; i++) {
      //isOutOfScreen(t[i]) || t[i].notSolid
      if (t[i].notSolid) {
        continue;
      }
      if (t[i].removed) {
        continue;
      }
      if (obj === t[i]) {
        continue;
      }
      if (collided(obj, t[i])) {
        //adds item to colliders array
        if (simpleCol) {
          col = colCheck(obj, t[i]);
        } else {
          collidersChunk.push(t[i]);
        }
      }
    }

    if (collidersChunk.length > 1) {
      collidersChunk = assembleChunk(collidersChunk, obj);
    }
    for (let i = 0; i < collidersChunk.length; i++) {
      col = colCheck(obj, collidersChunk[i]);
    }

    if (obj.col.R - obj.col.L !== 0) {
      obj.x -= obj.col.R - obj.col.L;
    }
    if (obj.col.B - obj.col.T !== 0) {
      obj.y -= obj.col.B - obj.col.T;
    }
    if (returnColliders) {
      return collidersChunk;
    }
  }
}

// Texts
class DmgText {
  constructor(entity, text) {
    let args = ["DmgText", entity, text];
    this.initialize(args);
  }
  initialize(args) {
    //args[0] is the type
    let entity = args[1];
    let text = args[2];
    this.x = entity.x + entity.w / 2 + Math.random() * 0.5 - 0.25;
    this.y = entity.y + entity.h / 3 + Math.random() * 0.5 - 0.25;
    this.text = text;
    this.size = 14;
    this.color = "white";
    if (entity.type == "player") {
      this.color = "red";
    }
    this.color2 = "black";
    this.type = "DmgText";
    this.removed = false;
    this.solid = false;
    this.yVel = -0.015;
    this.sizeChange = 0.99;
    this.lifeSpan = 40; //duration (in frames) of the text appearence
  }
  compute() {
    this.size *= Math.pow(this.sizeChange, meta.deltaTime);
    this.y += this.yVel * meta.deltaTime;
    this.lifeSpan -= meta.deltaTime;
    if (this.lifeSpan <= 0) {
      this.removed = true;
    }
  }
  render() {
    //c.font = Math.round(this.size * meta.ratio) + "px" + " 'Press Start 2P'";
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.lineWidth = this.size / 10;
    c.font = "bold " + Math.round(this.size * meta.ratio) + "px" + " Verdana";
    c.fillStyle = this.color;
    c.fillText(
      this.text,
      (this.x + map.x) * meta.tileSize * meta.ratio,
      (this.y + map.y) * meta.tileSize * meta.ratio
    );
    c.strokeStyle = this.color2;
    c.strokeText(
      this.text,
      (this.x + map.x) * meta.tileSize * meta.ratio,
      (this.y + map.y) * meta.tileSize * meta.ratio
    );
  }
}
// Texts
class DmgVfx {
  constructor(entity, which) {
    let args = ["DmgVfx", entity, which];
    this.initialize(args);
  }
  initialize(args) {
    //args[0] is the type
    let entity = args[1];
    let which = args[2] || (Math.random() * 2) | 0;
    this.x = entity.x + entity.w / 2 + Math.random() * 0.5 - 0.25;
    this.y = entity.y + entity.h / 2 + Math.random() * 0.5 - 0.25;
    this.type = "DmgVfx";

    this.removed = false;
    this.solid = false;

    this.action = which;
    this.actionX = [
      [17, 17, 17, 17],
      [18, 18, 18, 18],
    ];
    this.actionY = [
      [0, 1, 2, 3],
      [0, 1, 2, 3],
    ];

    this.w = 1;
    this.h = 1;
    this.x -= this.w / 2;
    this.y -= this.h / 2;
    this.frame = 0;
    this.frameCounter = 0;
    this.slowness = 6;
  }
  compute() {}
  onActionEnded() {
    switch (this.action) {
      default:
        this.removed = true;
    }
  }
  render() {
    this.frameCounter += meta.deltaTime;
    if (this.frameCounter >= this.slowness) {
      this.frame++;
      this.frameCounter = 0;
    }
    if (this.frame >= this.actionX[this.action].length) {
      this.frame = 0;
      this.onActionEnded();
      if (this.removed) {
        return;
      }
    }
    c.drawImage(
      SHEET,
      this.actionX[this.action][this.frame] * meta.tileSize,
      this.actionY[this.action][this.frame] * meta.tileSize,
      this.w * meta.tileSize,
      this.h * meta.tileSize,
      (this.x + map.x) * meta.tileSize * meta.ratio,
      (this.y + map.y) * meta.tileSize * meta.ratio,
      this.w * meta.tileSize * meta.ratio,
      this.h * meta.tileSize * meta.ratio
    );
  }
}
class VfxsManager {
  constructor() {
    this.vfxs = [];
    this.maxVfxCount = 20;
    this.maxTxtCount = 20;
    this.initialize();
  }
  create() {
    let args = arguments;
    for (let i = 0; i < this.vfxs.length; i++) {
      if (this.vfxs[i].removed && this.vfxs[i].type == args[0]) {
        this.vfxs[i].initialize(args);
        break;
      }
    }
  }
  removeAll() {
    for (let i = 0; i < this.vfxs.length; i++) {
      this.vfxs[i].removed = true;
    }
  }
  initialize() {
    this.vfxs = [];
    let vfx;
    for (let i = 0; i < this.maxTxtCount; i++) {
      vfx = new DmgText(0, 0);
      vfx.removed = true;
      this.vfxs.push(vfx);
    }
    for (let i = 0; i < this.maxVfxCount; i++) {
      vfx = new DmgVfx(0, 0);
      vfx.removed = true;
      this.vfxs.push(vfx);
    }
  }
  compute() {
    for (let i = 0; i < this.vfxs.length; i++) {
      if (this.vfxs[i].removed) {
        continue;
      }
      this.vfxs[i].compute();
    }
  }
  render() {
    for (let i = 0; i < this.vfxs.length; i++) {
      if (this.vfxs[i].removed) {
        continue;
      }
      this.vfxs[i].render();
    }
  }
}
class Entity {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.xVel = 0;
    this.yVel = 0;
    this.w = 1;
    this.h = 1;
    this.type = "null";
    this.immovable = false;
    this.damaged = false;
    this.state = IDLE;

    this.notSolid = false;
    this.removed = false;
    this.left = 0;

    this.sheet = id("sheet");
    this.action = 0;
    this.frame = 0;
    this.frameCounter = 0;
    this.slowness = 6;

    this.col = {
      L: 0,
      R: 0,
      T: 0,
      B: 0,
    };
    this.col = {
      L: 0,
      R: 0,
      T: 0,
      B: 0,
    };
  }
  compute() {}
  render() {}
}
class Portal extends Entity {
  // A portal which takes you to another room
  constructor(x, y, dir) {
    super(x, y);
    this.dir = dir;
    this.notSolid = true;
    this.type = "portal";
    this.hitbox = {
      x: 0,
      y: 0,
      w: 1,
      h: 1,
    };
    this.hitbox.x = this.x + this.dir[0];
    this.hitbox.y = this.y + this.dir[1];
  }
  compute() {
    if (collided(this, player)) {
      // Move player to the linked level
      map.changeLevel(this.dir);
    }
  }
  render() {
    /*
    c.fillStyle = "blue";
    c.fillRect(
      (this.x + map.x) * meta.tileSize * meta.ratio,
      (this.y + map.y) * meta.tileSize * meta.ratio,
      this.w * meta.tileSize * meta.ratio,
      this.h * meta.tileSize * meta.ratio
    );
    */
  }
}

// Collidable
class Block extends Entity {
  // A normal, collidable block
  constructor(x, y) {
    super(x, y);
    this.type = "wall";
    this.immovable = false;
    this.tile = 0;
  }
  compute() {}
  render() {
    c.fillStyle = "black";
    c.fillRect(
      (this.x + map.x) * meta.tileSize * meta.ratio,
      (this.y + map.y) * meta.tileSize * meta.ratio,
      this.w * meta.tileSize * meta.ratio,
      this.h * meta.tileSize * meta.ratio
    );

    c.drawImage(
      SHEET,
      tiles[this.tile][0] * meta.tileSize,
      tiles[this.tile][1] * meta.tileSize,
      meta.tileSize,
      meta.tileSize,
      ((this.x + map.x) * meta.tileSize * meta.ratio) | 0,
      ((this.y + map.y) * meta.tileSize * meta.ratio) | 0,
      this.w * meta.tileSize * meta.ratio,
      this.h * meta.tileSize * meta.ratio
    );
  }
}

// Basic Enemy class
class Enemy extends Entity {
  constructor(x, y) {
    super(x, y);
    this.type = "enemy";
    this.maxHp = 5;
    this.hp = this.maxHp;
    this.dmgFrames = 0;
    this.dead = false;

    this.action = 0;
    this.actionX = [[16], [16]];
    this.actionY = [[0], [1]];

    this.hpBar = new HpBar(this);
  }
  onHit(source) {
    this.state = DAMAGED;
    this.damaged = source.attackID;
    this.dmgFrames = 5;
    this.hp -= source.damage;
    // damage text
    vfxsManager.create("DmgText", this, source.damage | 0);
    vfxsManager.create("DmgVfx", this);
    if (this.hp <= 0) {
      this.dead = true;
      this.removed = true;
    }
  }
  brain() {}
  computeAction() {}
  onActionEnded() {}
  compute() {
    this.brain();
    this.x += this.xVel * meta.deltaTime;
    this.y += this.yVel * meta.deltaTime;

    map.checkCollisions(this);
    this.hpBar.compute();
  }
  render() {
    this.frameCounter += meta.deltaTime;
    if (this.frameCounter >= this.slowness) {
      this.frame++;
      this.frameCounter = 0;
    }
    if (this.frame >= this.actionX[this.action].length) {
      this.frame = 0;
      this.onActionEnded();
    }
    c.drawImage(
      SHEET,
      this.actionX[this.action + this.left][this.frame] * meta.tileSize,
      this.actionY[this.action + this.left][this.frame] * meta.tileSize,
      this.w * meta.tileSize,
      this.h * meta.tileSize,
      (this.x + map.x) * meta.tileSize * meta.ratio,
      (this.y + map.y) * meta.tileSize * meta.ratio,
      this.w * meta.tileSize * meta.ratio,
      this.h * meta.tileSize * meta.ratio
    );
    this.hpBar.render();
  }
}
canvas.addEventListener("mousedown", function (e) {
  let x = (e.clientX - canvas.offsetLeft) / meta.ratio / meta.tileSize - map.x;
  let y = (e.clientY - canvas.offsetTop) / meta.ratio / meta.tileSize - map.y;
  console.log(e.which)
  switch (e.which){
    case 1:
      map.entities.push(new Bat(x, y));
    break;
    case 3:
      map.entities.push(new Slime(x, y));
      break;
  }
});

const IDLE = "IDLE",
  SEEK = "SEEK",
  WINDUP = "WINDUP",
  CHASE = "CHASE",
  DAMAGED = "DAMAGED",
  ATTACK = "ATTACK",
  FLEE = "FLEE";

class Slime extends Enemy {
  constructor(x, y) {
    super(x, y);
    this.state = IDLE;
    this.attackRange = 3;
    this.windupFrames = 60;
    this.left = (Math.random() * 2) | 0;
    this.baseSpeed = 0.03;
    this.speed = this.baseSpeed;
    this.damage = 3;

    this.action = 0;
    this.aggroRange = 10;
    this.targetRot = 0;
    this.dashSpeed = 4;
    this.fleeing = 0;
    /* 
      0 = idle
      2 = moving
      4 = damaged
      6 = windup
      8 = attack
    */
    this.actionX = [
      [0],
      [1],
      [0, 0, 0],
      [1, 1, 1],
      [0],
      [1],
      [0, 0],
      [1, 1],
      [0],
      [1],
    ];
    this.actionY = [
      [15],
      [15],
      [15, 16, 17],
      [15, 16, 17],
      [18],
      [18],
      [16, 19],
      [16, 19],
      [20],
      [20],
    ];
  }
  computeState() {
    if (this.xVel > 0) {
      this.left = false;
    } else if (this.xVel < 0) {
      this.left = true;
    }
    let rotation, xTarget, yTarget;
    switch (this.state) {
      case IDLE:
        this.action = 2;
        this.xVel = 0;
        this.yVel = 0;
        if (distance(this, player) < this.aggroRange) {
          this.state = CHASE;
        }
        break;
      case FLEE:
        rotation = getRotation(this, player);
        xTarget = -Math.cos(rotation);
        yTarget = -Math.sin(rotation);

        this.xVel = xTarget * this.speed;
        this.yVel = yTarget * this.speed;
        this.action = 2;
        this.fleeing -= meta.deltaTime;
        if (
          distance(this, player) > this.attackRange * 2 ||
          this.fleeing <= 0
        ) {
          this.fleeing = 0;
          this.state = IDLE;
        }
        break;
      case CHASE:
        rotation = getRotation(this, player);
        xTarget = Math.cos(rotation);
        yTarget = Math.sin(rotation);

        this.xVel = xTarget * this.speed;
        this.yVel = yTarget * this.speed;
        this.action = 2;
        if (distance(this, player) < this.attackRange) {
          this.state = WINDUP;
        }
        break;
      case WINDUP:
        this.action = 6;
        this.xVel = 0;
        this.yVel = 0;
        this.windupFrames -= meta.deltaTime;
        if (this.windupFrames <= 0) {
          this.state = ATTACK;
          this.windupFrames = 30;
          this.attackFrames = 30;
          this.targetRot = getRotation(this, player);
        }
        break;
      case DAMAGED:
        this.action = 4;
        this.xVel = 0;
        this.yVel = 0;
        this.windupFrames = 30;
        if (this.dmgFrames > 0) {
          this.dmgFrames -= meta.deltaTime;
        } else {
          this.state = IDLE;
        }
        break;
      case ATTACK:
        this.action = 8;
        rotation = this.targetRot;
        xTarget = Math.cos(rotation);
        yTarget = Math.sin(rotation);

        this.xVel = xTarget * this.speed * this.dashSpeed;
        this.yVel = yTarget * this.speed * this.dashSpeed;
        if (this.attackFrames > 0) {
          this.attackFrames -= meta.deltaTime;
        } else {
          this.state = IDLE;
          this.speed = this.baseSpeed;
        }
        break;
    }
  }
  brain() {
    if (this.state == IDLE) {
      // player in range?
    }

    // compute state
    this.computeState();
  }
  compute() {
    this.brain();
    this.x += this.xVel * meta.deltaTime;
    this.y += this.yVel * meta.deltaTime;
    if (this.state == ATTACK && collided(this, player)) {
      player.onHit(this);

      this.fleeing = 120;
      this.state = FLEE;
    }
    map.checkCollisions(this);
    this.hpBar.compute();
  }
}

class Bat extends Enemy {
  constructor(x, y) {
    super(x, y);
    this.state = IDLE;
    this.attackRange = 3;
    this.windupFrames = 60;
    this.left = (Math.random() * 2) | 0;
    this.baseSpeed = 0.05;
    this.speed = this.baseSpeed;
    this.damage = 1;

    this.action = 0;
    this.aggroRange = 5;
    this.targetRot = 0;
    this.dashSpeed = 4;
    this.fleeing = 0;

    this.movRotation = 0;
    this.rotX = 0;
    this.rotY = 0;
    /* 
      0 = idle
    */
    this.actionX = [
      [2, 2, 2, 2],
      [2, 2, 2, 2],
    ];
    this.actionY = [
      [15, 16, 17, 18],
      [15, 16, 17, 18],
    ];
  }
  computeState() {
    let rotation, xTarget, yTarget;
    switch (this.state) {
      case IDLE:
        this.xVel = this.rotX * this.speed;
        this.yVel = this.rotY * this.speed;
        if (distance(this, player) < this.aggroRange) {
          this.state = CHASE;
        }
        break;
      case CHASE:
        rotation = getRotation(this, player);
        xTarget = Math.cos(rotation);
        yTarget = Math.sin(rotation);

        this.xVel = (xTarget + this.rotX) * this.speed;
        this.yVel = (yTarget + this.rotY) * this.speed;
        break;
      case FLEE:
        rotation = getRotation(this, player);
        xTarget = -Math.cos(rotation);
        yTarget = -Math.sin(rotation);

        this.xVel = xTarget * this.speed;
        this.yVel = yTarget * this.speed;
        this.fleeing -= meta.deltaTime;
        if (
          distance(this, player) > this.attackRange * 2 ||
          this.fleeing <= 0
        ) {
          this.fleeing = 0;
          this.state = IDLE;
        }
        break;
      case DAMAGED:
        this.xVel = 0;
        this.yVel = 0;
        if (this.dmgFrames > 0) {
          this.dmgFrames -= meta.deltaTime;
        } else {
          this.state = IDLE;
        }
        break;
    }
  }
  brain() {
    if (this.state !== DAMAGED) {
      this.movRotation += meta.deltaTime / 10;
      this.rotX = Math.cos(this.movRotation);
      this.rotY = Math.sin(this.movRotation);
    }
    // compute state
    this.computeState();
  }
  compute() {
    this.brain();
    this.x += this.xVel * meta.deltaTime;
    this.y += this.yVel * meta.deltaTime;
    if (collided(this, player)) {
      player.onHit(this);

      this.fleeing = 120;
      this.state = FLEE;
    }
    map.checkCollisions(this);
    this.hpBar.compute();
  }
}

class HpBar {
  constructor(source) {
    this.spriteX = [[13, 14]];
    this.spriteY = [[0, 0]];
    this.source = source;
    this.w = 1;
    this.h = 1;
    this.wRatio = 1;
  }
  compute() {
    this.x = this.source.x + this.source.w / 2 - this.w / 2;
    this.y = this.source.y - this.h;
    this.wRatio = this.source.hp / this.source.maxHp;
  }
  render() {
    // Renders the bar
    c.drawImage(
      SHEET,
      this.spriteX[0][1] * meta.tileSize,
      this.spriteY[0][1] * meta.tileSize,
      this.w * meta.tileSize * this.wRatio,
      this.h * meta.tileSize,
      (this.x + map.x) * meta.tileSize * meta.ratio,
      (this.y + map.y) * meta.tileSize * meta.ratio,
      this.w * meta.tileSize * meta.ratio * this.wRatio,
      this.h * meta.tileSize * meta.ratio
    );

    // Renders the contour
    c.drawImage(
      SHEET,
      this.spriteX[0][0] * meta.tileSize,
      this.spriteY[0][0] * meta.tileSize,
      this.w * meta.tileSize,
      this.h * meta.tileSize,
      (this.x + map.x) * meta.tileSize * meta.ratio,
      (this.y + map.y) * meta.tileSize * meta.ratio,
      this.w * meta.tileSize * meta.ratio,
      this.h * meta.tileSize * meta.ratio
    );
  }
}
class Player extends Entity {
  constructor(x, y) {
    super(x, y);
    this.w = 1;
    this.h = 1;
    this.facing = "r";
    this.baseSpeed = 0.1;
    this.speed = this.baseSpeed;
    this.type = "player";

    this.equipment = {
      head: "none",
    };
    this.maxHp = 40;
    this.hp = 23;

    this.maxMana = 10;
    this.mana = 10;

    this.action = 0;
    this.actionX = [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
    ];
    this.actionY = [
      [6, 7, 8, 9],
      [6, 7, 8, 9],
    ];

    this.weapon = new Sword(this);
    this.attacking = false;
    this.reloading = false;

    this.dummy = {
      x: 0,
      y: 0,
      w: 0,
      h: 0,
    };
  }
  renderEquipment() {
    //this.equipment.head.render();
  }
  dash() {
    controls.spacebar = false;
    let moveX = 0;
    let moveY = 0;
    if (controls.right) {
      moveX += 1;
    }
    if (controls.left) {
      moveX -= 1;
    }
    if (controls.down) {
      moveY += 1;
    }
    if (controls.up) {
      moveY -= 1;
    }
    if (moveX && moveY) {
      moveX /= 2;
      moveY /= 2;
    }
    moveX *= this.speed * 10 * meta.deltaTime;
    moveY *= this.speed * 10 * meta.deltaTime;
    this.dummy.x = this.x + moveX;
    this.dummy.y = this.y + moveY;
    this.dummy.w = this.w;
    this.dummy.h = this.h;
    let col = false;
    let out = false;
    for (let i = 0; i < map.entities.length; i++) {
      if (collided(this.dummy, map.entities[i])) {
        col = true;
        break;
      }
    }
    if (
      this.dummy.x > map.roomsW - 1 ||
      this.dummy.y > map.roomsH - 1 ||
      this.dummy.x < 0 ||
      this.dummy.y < 0
    ) {
      out = true;
    }
    if (!out && !col) {
      this.x = this.dummy.x;
      this.y = this.dummy.y;
    }
  }
  onHit(source) {
    if (this.damaged > 0) {
      return;
    }
    this.damaged = 20; //iFrames
    this.hp -= source.damage;
    if (this.hp <= 0) {
      this.hp = 0;
    }
    vfxsManager.create("DmgText", this, source.damage | 0);
  }
  computeInput() {
    if (this.attacking) {
      this.speed = 0.05;
    } else {
      this.speed = this.baseSpeed;
    }
    if (controls.spacebar) {
      this.dash();
    }
    // Moves
    if (controls.left && !controls.right) {
      this.facing = "l";
      this.xVel = -this.speed;
      this.left = true;
    } else if (this.xVel < 0) {
      this.xVel = 0;
    }
    if (controls.right && !controls.left) {
      this.facing = "r";
      this.xVel = this.speed;
      this.left = false;
    } else if (this.xVel > 0) {
      this.xVel = 0;
    }
    if (controls.up && !controls.down) {
      this.facing = "t";
      this.yVel = -this.speed;
    } else if (this.yVel < 0) {
      this.yVel = 0;
    }
    if (controls.down && !controls.up) {
      this.facing = "b";
      this.yVel = this.speed;
    } else if (this.yVel > 0) {
      this.yVel = 0;
    }
    if (!controls.left && !controls.right && !controls.up && !controls.down) {
      this.xVel = 0;
      this.yVel = 0;
    }
    if (controls.left + controls.right + controls.up + controls.down > 1) {
      this.xVel /= 1.42;
      this.yVel /= 1.42;
    }
  }
  compute() {
    if (this.damaged > 0) {
      this.damaged -= meta.deltaTime;
      return;
    }
    this.computeInput();
    this.x += this.xVel;
    this.y += this.yVel;
    map.checkCollisions(this);
    this.weapon.compute();
  }
  onAnimationEnded() {
    switch (this.action) {
      default:
    }
  }
  render() {
    if (this.damaged > 0 && (this.damaged | 0) % 2) {
      return;
    }
    this.frameCounter += meta.deltaTime;
    if (this.frameCounter >= this.slowness) {
      this.frame++;
      this.frameCounter = 0;
    }
    if (this.frame >= this.actionX[this.action].length) {
      this.frame = 0;
      this.onAnimationEnded();
      if (this.removed) {
        return;
      }
    }
    c.drawImage(
      SHEET,
      this.actionX[this.action + this.left][this.frame] * meta.tileSize,
      this.actionY[this.action + this.left][this.frame] * meta.tileSize,
      this.w * meta.tileSize,
      this.h * meta.tileSize,
      (this.x + map.x) * meta.tileSize * meta.ratio,
      (this.y + map.y) * meta.tileSize * meta.ratio,
      this.w * meta.tileSize * meta.ratio,
      this.h * meta.tileSize * meta.ratio
    );
    c.drawImage(
      SHEET,
      (3 + this.left) * meta.tileSize,
      6 * meta.tileSize,
      this.w * meta.tileSize,
      this.h * meta.tileSize,
      (this.x + map.x) * meta.tileSize * meta.ratio,
      (this.y + map.y - this.h / 2) * meta.tileSize * meta.ratio,
      this.w * meta.tileSize * meta.ratio,
      this.h * meta.tileSize * meta.ratio
    );
    c.drawImage(
      SHEET,
      (3 + this.left) * meta.tileSize,
      7 * meta.tileSize,
      this.w * meta.tileSize,
      this.h * meta.tileSize,
      (this.x + map.x) * meta.tileSize * meta.ratio,
      (this.y + map.y) * meta.tileSize * meta.ratio,
      this.w * meta.tileSize * meta.ratio,
      this.h * meta.tileSize * meta.ratio
    );
    this.weapon.render();
  }
}
class Sword extends Entity {
  constructor(owner) {
    super(owner.x, owner.y);
    this.actionX = [[11], [11], [11], [11]];
    this.actionY = [[2], [3], [4], [5]];
    this.offsetX = 0;
    this.offsetY = 0;
    this.targetX = 0;
    this.targetY = 0;
    this.rot = 0;
    this.dir = "left";
    this.owner = owner;

    this.damage = 2;
    this.attackDuration = 160;
    this.attackCounter = 0;
    this.attackSpeed = 1;
    this.attackRange = 2;

    this.reloadSpeed = 5;
    //the attackID will change every attack, the purpose is hitting targets only ONCE
    this.attackID = 0;
    this.hitbox = {
      x: 0,
      y: 0,
      w: 0,
      h: 0,
    };
  }
  checkCollisions() {
    switch (this.dir) {
      case "up":
      case "down":
        this.hitbox.x = this.x + 0.25;
        this.hitbox.y = this.y;
        this.hitbox.w = 0.5;
        this.hitbox.h = this.h;
        break;
      case "left":
      case "right":
        this.hitbox.x = this.x;
        this.hitbox.y = this.y + 0.25;
        this.hitbox.w = this.w;
        this.hitbox.h = 0.5;
        break;
    }
    for (let i = 0; i < map.entities.length; i++) {
      if (map.entities[i].type !== "enemy") {
        continue;
      }
      if (map.entities[i].damaged === this.attackID) {
        continue;
      }
      if (map.entities[i].removed) {
        continue;
      }
      if (collided(this.hitbox, map.entities[i])) {
        map.entities[i].onHit(this);
      }
    }
  }
  attack(dir) {
    if (this.owner.attacking || this.owner.reloading) {
      return;
    }
    this.attackID = Math.random();
    this.dir = dir;

    switch (dir) {
      case "up":
        this.rot = 45;
        this.targetY = -this.attackRange;
        this.targetX = 0;
        break;
      case "right":
        this.rot = 135;
        this.targetX = this.attackRange;
        this.targetY = 0;
        break;
      case "down":
        this.rot = 225;
        this.targetY = this.attackRange;
        this.targetX = 0;
        break;
      case "left":
        this.rot = 315;
        this.targetX = -this.attackRange;
        this.targetY = 0;
        break;
    }
    this.owner.attacking = true;
  }
  computeInput() {
    if (controls.upR) {
      this.attack("up");
    }
    if (controls.rightR) {
      this.attack("right");
    }
    if (controls.downR) {
      this.attack("down");
    }
    if (controls.leftR) {
      this.attack("left");
    }
  }
  computeAttack() {
    if (!this.owner.attacking) {
      return;
    }
    this.action = 2;
    if (this.attackCounter === this.attackDuration) {
      this.owner.attacking = false;
      this.owner.reloading = true;
      this.action = 0;
    }
    this.attackCounter +=
      (this.attackDuration - this.attackCounter) / 5 +
      this.attackSpeed * meta.deltaTime * 2;
    if (this.attackCounter > this.attackDuration) {
      this.attackCounter = this.attackDuration;
    }
    this.offsetX = (this.targetX / this.attackDuration) * this.attackCounter;
    this.offsetY = (this.targetY / this.attackDuration) * this.attackCounter;
    this.checkCollisions();
  }
  computeReload() {
    if (!this.owner.reloading) {
      return;
    }
    if (this.attackCounter === 0) {
      this.rot = 0;
      this.owner.reloading = false;
    }
    this.attackCounter -=
      ((this.attackCounter - this.attackDuration) * -1) / 5 +
      this.attackSpeed * meta.deltaTime * this.reloadSpeed;
    if (this.attackCounter < 0) {
      this.attackCounter = 0;
    }
    this.offsetX = (this.targetX / this.attackDuration) * this.attackCounter;
    this.offsetY = (this.targetY / this.attackDuration) * this.attackCounter;
    this.checkCollisions();
  }
  compute() {
    this.computeInput();
    this.computeReload();
    this.computeAttack();
    this.x = this.owner.x + this.offsetX;
    this.y = this.owner.y + this.offsetY;
    this.left = this.owner.left;
  }
  render() {
    this.frameCounter += meta.deltaTime;
    if (this.frameCounter >= this.slowness) {
      this.frame++;
      this.frameCounter = 0;
    }
    if (this.frame >= this.actionX[this.action].length) {
      this.frame = 0;
    }
    if (this.rot) {
      c.save();
      c.translate(
        (this.x + this.w / 2 + map.x) * meta.tileSize * meta.ratio,
        (this.y + this.h / 2 + map.y) * meta.tileSize * meta.ratio
      );
      //
      c.rotate((this.rot * Math.PI) / 180);
      c.drawImage(
        this.sheet,
        this.actionX[this.action][this.frame] * meta.tileSize,
        this.actionY[this.action][this.frame] * meta.tileSize,
        this.w * meta.tileSize,
        this.h * meta.tileSize,
        ((-this.w / 2) * meta.tileSize * meta.ratio) | 0,
        ((-this.h / 2) * meta.tileSize * meta.ratio) | 0,
        (this.w * meta.tileSize * meta.ratio) | 0,
        (this.h * meta.tileSize * meta.ratio) | 0
      );
      c.restore();
    } else {
      c.drawImage(
        SHEET,
        this.actionX[this.action + this.left][this.frame] * meta.tileSize,
        this.actionY[this.action + this.left][this.frame] * meta.tileSize,
        this.w * meta.tileSize,
        this.h * meta.tileSize,
        (this.x + map.x - 0.5 + this.left) * meta.tileSize * meta.ratio,
        (this.y + map.y) * meta.tileSize * meta.ratio,
        this.w * meta.tileSize * meta.ratio,
        this.h * meta.tileSize * meta.ratio
      );
    }
  }
}
class Mouse {
  constructor() {
    this.x = 0;
    this.y = 0;
    document.addEventListener("mousemove", this.update);
    document.addEventListener("click", this.onClick);
  }
  update(event) {
    this.x = event.clientX - canvas.offsetLeft;
    this.y = event.clientY - canvas.offsetTop;
  }
  onClick() {}
}
