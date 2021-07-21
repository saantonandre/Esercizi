class Cell {
  constructor(posX, posY, type, dir) {
    this.x = posX;
    this.y = posY;
    // Types: 0 - null, 1 - wall
    this.type = type || 0;
    this.dir = dir || 0;
    this.tile = 0;
  }
}

var tiles = [
  [1, 1], // 0 - tile
  [0, 0],
  [1, 0],
  [2, 0], // 1 - 2 - 3 upper walls
  [0, 1],
  [2, 1], // 4 - 5 side walls
  [0, 2],
  [1, 2],
  [2, 2], // 6 - 7 - 8 down walls
  [3, 0],
  [4, 0], // 9 - 10 right/left breaks (up)
  [3, 1],
  [4, 1], // 11 - 12  right/left breaks (down)
  [3, 2],
  [3, 3], // 13 - 14  up/down breaks (left)
  [4, 2],
  [4, 3], // 15 - 16  up/down breaks (right)
];
class LevelGenerator {
  constructor(links) {
    this.level = [];
    this.w = 11;
    this.h = 11;
    this.revealed = false;
    this.cleared = false;
    this.links = links || [];
  }
  generate(w, h, links) {
    if (w) {
      this.w = w;
    }
    if (h) {
      this.h = h;
    }
    if (links) {
      this.links = links;
    }
    // Fills the level with stuff
    this.level = [];
    for (let i = 0; i < this.w; i++) {
      this.level.push([]);
      for (let j = 0; j < this.h; j++) {
        this.level[i].push(0);
      }
    }
    this.makeWalls();
    this.makeDoors();
    this.assignTiles();
    //this.consoleRender();
    return this.level;
  }
  assignTiles() {
    for (let i = 0; i < this.h; i++) {
      for (let j = 0; j < this.w; j++) {
        if (this.level[j][i].type !== 1) {
          continue;
        }
        if (i == 0) {
          // top row
          if (j == 0) {
            this.level[j][i].tile = 1;
          } else if (j == this.w - 1) {
            this.level[j][i].tile = 3;
          } else {
            this.level[j][i].tile = 2;
            if (this.level[j + 1][i].type == 2) {
              this.level[j][i].tile = 9;
            } else if (this.level[j - 1][i].type == 2) {
              this.level[j][i].tile = 10;
            }
          }
        }

        if (i == this.h - 1) {
          // bottom row
          if (j == 0) {
            this.level[j][i].tile = 6;
          } else if (j == this.w - 1) {
            this.level[j][i].tile = 8;
          } else {
            this.level[j][i].tile = 7;
            if (this.level[j + 1][i].type == 2) {
              this.level[j][i].tile = 11;
            } else if (this.level[j - 1][i].type == 2) {
              this.level[j][i].tile = 12;
            }
          }
        }

        if (j == 0 && i !== 0 && i !== this.h-1) {
          // left column
          this.level[j][i].tile = 4;
          if (this.level[j][i + 1].type == 2) {
            this.level[j][i].tile = 13;
          } else if (this.level[j][i - 1].type == 2) {
            this.level[j][i].tile = 14;
          }
        }

        if (j == this.w-1 && i !== 0 && i !== this.h-1) {
          // right column
          this.level[j][i].tile = 5;
          if (this.level[j][i + 1].type == 2) {
            this.level[j][i].tile = 15;
          } else if (this.level[j][i - 1].type == 2) {
            this.level[j][i].tile = 16;
          }
        }


      }
    }
  }
  makeWalls() {
    // up wall
    let y = 0;
    let cell;
    for (let i = 0; i < this.w; i++) {
      cell = new Cell(i, y, 1);
      this.level[i].splice(y, 1, cell);
    }
    // down wall
    y = this.h - 1;
    for (let i = 0; i < this.w; i++) {
      cell = new Cell(i, y, 1);
      this.level[i].splice(y, 1, cell);
    }
    // left wall
    let x = 0;
    for (let i = 0; i < this.h; i++) {
      cell = new Cell(x, i, 1);
      this.level[x].splice(i, 1, cell);
    }
    // right wall
    x = this.w - 1;
    for (let i = 0; i < this.h; i++) {
      cell = new Cell(x, i, 1);
      this.level[x].splice(i, 1, cell);
    }
  }
  makeDoors() {
    let halfW = (this.w / 2) | 0;
    let halfH = (this.h / 2) | 0;
    let hor = false;
    let x = 0;
    let y = 0;
    let doorType = 2;
    for (let i = 0; i < this.links.length; i++) {
      if (this.links[i][0] == 0) {
        // Vertical
        hor = false;
        x = halfW;
        this.links[i][1] > 0 ? (y = this.h - 1) : (y = 0);
      } else {
        // Horizontal
        hor = true;
        y = halfH;
        this.links[i][0] > 0 ? (x = this.w - 1) : (x = 0);
      }

      this.level[x].splice(y, 1, new Cell(x, y, doorType, this.links[i]));
      hor ? y++ : x++;
      this.level[x].splice(y, 1, new Cell(x, y, doorType, this.links[i]));

      hor ? (y -= 2) : (x -= 2);
      if ((!hor && this.w % 2) || (hor && this.h % 2)) {
        this.level[x].splice(y, 1, new Cell(x, y, doorType, this.links[i]));
      }
    }
  }
  consoleRender() {
    let line = "";
    for (let i = 0; i < this.h; i++) {
      for (let j = 0; j < this.w; j++) {
        line += this.level[j][i].type > 0 ? this.level[j][i].type : "-";
        line += " ";
      }
      line += "\n";
    }
    console.log(line);
  }
  render() {
    let size = 20;
    canvas.width = size * this.w;
    canvas.height = size * this.h;
    for (let i = 0; i < this.w; i++) {
      for (let j = 0; j < this.h; j++) {
        if (this.level[i][j] == 0) {
          continue;
        }
        // Draws rooms
        switch (this.level[i][j].type) {
          case 0:
            continue;
            break;
          case 1:
            c.fillStyle = "black";
            break;
          case 2:
            c.fillStyle = "blue";
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
      }
    }
  }
}
