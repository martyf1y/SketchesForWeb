let cols = 50;
let rows = 50;
let grid = new Array(cols);
let openSet = [];
let closedSet = [];
let startI = { c: 0, r: 0 };
let endI = { c: cols - 1, r: rows - 1 };
let start, end;
let w, h;
let path = [];

function setup() {
  createCanvas(650, 650);
  //frameRate(1);
  w = width / cols;
  h = height / rows;
  console.log("Dijkstra");
  startI.c = floor(random(cols));
  startI.r = floor(random(rows));
  endI.c = floor(random(cols));
  endI.r = floor(random(rows));

  createGrid();

  start = grid[startI.c][startI.r];
  start.dist = 0;
  openSet.push(start);

  end = grid[endI.c][endI.r];
  end.show(color(255, 0, 0), false, true);
}

function draw() {
  if (openSet.length > 0) {
    let minDistI = getMinDistFromStart(openSet);
    let cVertex = openSet[minDistI];
    cVertex.show(color(0, 255, 0, 160), false, false);

    for (n of cVertex.neighbours) {
      if (!closedSet.includes(n) && !n.wall) {
        let tempD = cVertex.dist + 1;
        if (n.dist == Infinity) addNeighbourToSet(n, tempD);
        else if (tempD < n.dist) n.dist = tempD;
      }
    }
    updateSets(minDistI); // Remove from check set

    if (chechReachedDestination(cVertex)) {
      updatePath(cVertex);
      drawPath();
      noLoop();
    }
  } else {
    console.log("No Possible Path");
    noLoop();
  }
}

function createGrid() {
  for (let i = 0; i < cols; i++) grid[i] = new Array(rows);
  for (let i = 0; i < cols; i++)
    for (let j = 0; j < rows; j++) grid[i][j] = addSpot(i, j);
  for (c of grid) for (r of c) r.addNeighbours(grid);
}

function addSpot(i, j) {
  let g = new Vertex(i, j);
  g.show(color(255, 100, 0, 80), true, false);
  if (g.wall) g.show(color(0, 0, 0), false, true);
  return g;
}

function addNeighbourToSet(n, tempD) {
  n.dist = tempD;
  openSet.push(n);
  n.show(color(40, 40, 240, 200), false, false);
}

function updateSets(i) {
  closedSet.push(openSet[i]);
  openSet.splice(i, 1);
}

function getMinDistFromStart(set, min = 0) {
  for (let i = 0; i < set.length; i++) if (set[i].dist < set[min].dist) min = i;
  return min;
}

function updatePath(end) {
  path = [];
  let temp = end;
  path.push(temp);
  while (temp != start) {
    let i = getMinDistFromStart(temp.neighbours);
    path.push(temp.neighbours[i]);
    temp = temp.neighbours[i];
  }
}

function drawPath() {
  beginShape();
  noFill();
  stroke(255, 0, 200);
  strokeWeight(w / 2);
  for (p of path) vertex(p.i * w + w / 2, p.j * h + h / 2);
  endShape();
}

function chechReachedDestination(current) {
  if (current == end) {
    console.log("Completed Path");
    console.log("Distance is " + end.dist + "!");
    end.show(color(0, 255, 0), false, true);
    return true;
  }
}
