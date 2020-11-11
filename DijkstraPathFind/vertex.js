class Vertex {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.dist = Infinity;
    this.neighbours = [];
    this.wall = false;
    let isEnd = this.i == endI.c && this.j == endI.r;
    let isStart = this.i == startI.c && this.j == startI.r;
    if (random(1) < 0.19 && !isStart && !isEnd) this.wall = true;
  }

  show(col, grid, wall) {
    if (grid) stroke(0);
    else noStroke();

    fill(col);
    if (!wall) square(this.i * w, this.j * h, w);
    else ellipse(this.i * w + w / 2, this.j * h + h / 2, w / 2, h / 2);
  }

  addNeighbours(v) {
    for (let x = this.i - 1; x <= this.i + 1; x++)
      for (let y = this.j - 1; y <= this.j + 1; y++)
        if (v[x] !== undefined && v[x][y] !== undefined && v[x][y] !== this)
          this.neighbours.push(grid[x][y]);
  }
}
