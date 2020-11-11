Matthew Martin - Creative Matterz
11.11.2020

Based on following the Coding Train A* tutorials:
https://www.youtube.com/watch?v=aKYlikFAV4k&list=PLRqwX-V7Uu6YJ3XfHhT2Mm4Y5I99nrIKX&index=11

The images do not belong to me and are just for test purposes.

What it does
- Has a start vertex and an end vertex on a grid.
- Has a set of unvisited vertexes that begin with only the start vertex.
- Adds the neighbours of the start vertex that are not a wall to the set and then removes the start vertex as it has now been visited.
- Finds the vertex in the unvisited set with the shortest distance to the start vertex and runs through its neighbours
- Continues this process until the vertex being checked is the end vertex.
- Then works backwards from end vertex to create a path, going onto each neighbour that has shortest distance to start vertex
- Draws line along path and spits out the shortest distance to get there.
