/*
  CLASS LIST:

  class Meta

  class MapObject

  class Entity

  class Portal

  class Block

  class Enemy

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

class MapObject {
  constructor() {
    this.w = 11;
    this.h = 11;
    this.x = -(canvas.width / meta.tileSize / meta.ratio - this.w) / 2; // For rendering purposes
    this.y = -(canvas.height / meta.tileSize / meta.ratio - this.h) / 2; // For rendering purposes
    this.rooms = 16;
    this.roomsW = 21;
    this.roomsH = 15;
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
class Entity {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.xVel = 0;
    this.yVel = 0;
    this.y = y;
    this.w = 1;
    this.h = 1;
    this.type = "null";

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
class Block extends Entity {
  // A normal, collidable block
  constructor(x, y) {
    super(x, y);
    this.type = "wall";
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
class Enemy extends Entity {
  constructor(x, y) {
    super(x, y);
    this.type = "enemy";
    this.color="darkred";
  }
  followPlayer() {}
  onHit() {
    this.color="lightred";
  }
  compute() {}
  render() {
    c.fillStyle = this.color;
    c.fillRect(
      (this.x + map.x) * meta.tileSize * meta.ratio,
      (this.y + map.y) * meta.tileSize * meta.ratio,
      this.w * meta.tileSize * meta.ratio,
      this.h * meta.tileSize * meta.ratio
    );
    c.fillStyle = "black";
  }
}
canvas.addEventListener("click", function (e) {
  let x = (e.clientX - canvas.offsetLeft) / meta.ratio / meta.tileSize - map.x;
  let y = (e.clientY - canvas.offsetTop) / meta.ratio / meta.tileSize - map.y;
  map.entities.push(new Enemy(x, y));
});
class Player extends Entity {
  constructor(x, y) {
    super(x, y);
    this.w = 1;
    this.h = 1;
    this.facing = "r";
    this.speed = 0.1;
    this.type = "player";

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
  computeInput() {
    if (this.attacking || this.reloading) {
      this.xVel = 0;
      this.yVel = 0;
      return;
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
    this.attackDuration = 160;
    this.attackCounter = 0;
    this.attackSpeed = 1;
    this.attackRange = 2;
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
        this.hitbox.x = this.owner.x;
        this.hitbox.y = this.owner.y-this.attackRange;
        this.hitbox.w = this.w;
        this.hitbox.h = this.attackRange;
        break;
      case "down":
        this.hitbox.x = this.owner.x;
        this.hitbox.y = this.owner.y+this.h;
        this.hitbox.w = this.w;
        this.hitbox.h = this.attackRange;
        break;
      case "left":
        this.hitbox.x = this.owner.x-this.attackRange;
        this.hitbox.y = this.owner.y;
        this.hitbox.w = this.attackRange;
        this.hitbox.h = this.h;
        break;
      case "right":
        this.hitbox.x = this.owner.x+this.w;
        this.hitbox.y = this.owner.y;
        this.hitbox.w = this.attackRange;
        this.hitbox.h = this.h;
        break;
    }
    for(let i = 0;i < map.entities.length;i++){
      if(map.entities[i].type!=="enemy"){
        continue;
      }
      if(collided(this.hitbox,map.entities[i])){
        map.entities[i].onHit(this);
      }
    }
  }
  attack(dir) {
    if (this.owner.attacking || this.owner.reloading) {
      return;
    }
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
      this.checkCollisions();
    }
    this.attackCounter +=
      (this.attackDuration - this.attackCounter) / 5 +
      this.attackSpeed * meta.deltaTime * 2;
    if (this.attackCounter > this.attackDuration) {
      this.attackCounter = this.attackDuration;
    }
    this.offsetX = (this.targetX / this.attackDuration) * this.attackCounter;
    this.offsetY = (this.targetY / this.attackDuration) * this.attackCounter;
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
      this.attackSpeed * meta.deltaTime;
    if (this.attackCounter < 0) {
      this.attackCounter = 0;
    }
    this.offsetX = (this.targetX / this.attackDuration) * this.attackCounter;
    this.offsetY = (this.targetY / this.attackDuration) * this.attackCounter;
  }
  compute() {
    this.computeInput();
    this.computeAttack();
    this.computeReload();
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
