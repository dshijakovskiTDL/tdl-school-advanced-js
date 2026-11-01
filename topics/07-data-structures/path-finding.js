// * Path Finding

// ? We'll look at just a very very basic path-finding algorithm - Breadth-first searching

// ? Let's say we have a SQUARE GRID in which:
// ? A - Starting position
// ? B - Goal
// ? 𝕏 - Wall
// ? ● - Unexplored spot

// ? We need to get from point A to point B as fast as possible.
// ? Note: We cannot go diagonally. We can only go UP, DOWN, LEFT or RIGHT.

//   0,0                 0,5
// *  ●   ●   ●   ●   ●   ●
// *  ●   A   ●   ●   ●   ●
// *  ●   ●   ●   ●   ●   ●
// *  ●   ●   ●   ●   ●   ●
// *  ●   ●   ●   B   ●   ●
// *  ●   ●   ●   ●   ●   ●
//   5,0                 5,5

// ? Now, we can look at this and just say, okay:
// ? 1. What are our coordinates?
// * - We are at (1,1)
// ? 2. What are the Goal's coordinates?
// * - The goal is at (4,3)

// ? Okay, this means I need to go:
// ? 1. 4-1 => 3 spots down
// ? 2. 3-1 => 2 spots right

// ? Okay, fair enough but what if we introduced a Wall into the mix

//   0,0                 0,5
// *  ●   ●   ●   ●   ●   ●
// *  ●   A   ●   ●   ●   ●
// *  ●   ●   ●   ●   ●   ●
// *  ●   𝕏   𝕏   𝕏   𝕏   𝕏
// *  ●   ●   ●   B   ●   ●
// *  ●   ●   ●   ●   ●   ●
//   5,0                 5,5

// ? Now I need to be a little more smart about it...

// ? Well, in this lesson we are only going to be kinda smart about it and implement
// ? pure Breadth-first searching...

// * How's that gonna work?
// ? We will start from our position and FAN OUT (left, right, up, down)
// ? and we will mark those positions as "seen"

//   0,0                 0,5
// *  ●   1   ●   ●   ●   ●
// *  1   A   1   ●   ●   ●
// *  ●   1   ●   ●   ●   ●
// *  ●   𝕏   𝕏   𝕏   𝕏   𝕏
// *  ●   ●   ●   B   ●   ●
// *  ●   ●   ●   ●   ●   ●
//   5,0                 5,5

// ? A's seen: [(0,1), (1,0), (1,2)]
// ? B's seen: []

// ? We will do the same thing, now starting from the Goal's position: FAN OUT (left, right, up, down)
// ? and again mark those positions as "seen". Careful not to hit a wall

//   0,0                 0,5
// *  ●   1   ●   ●   ●   ●
// *  1   A   1   ●   ●   ●
// *  ●   1   ●   ●   ●   ●
// *  ●   𝕏   𝕏   𝕏   𝕏   𝕏
// *  ●   ●   1   B   1   ●
// *  ●   ●   ●   1   ●   ●
//   5,0                 5,5

// ? A's seen: [(0,1), (1,0), (1,2)]
// ? B's seen: [(4,2), (4,4), (5,3)]

// ? These marks represent us going one step forward.
// ? Now let's do that again, starting at each of those steps.
// ? A's turn first: FAN OUT

//   0,0                 0,5
// *  2   1   2   ●   ●   ●
// *  1   A   1   2   ●   ●
// *  2   1   2   ●   ●   ●
// *  ●   𝕏   𝕏   𝕏   𝕏   𝕏
// *  ●   ●   1   B   1   ●
// *  ●   ●   ●   1   ●   ●
//   5,0                 5,5

// ? A's seen: [(0,1), (1,0), (1,2), (0,0), (0,2), (1,3), (2,0), (2,2)]
// ? B's seen: [(4,2), (4,4), (5,3)]

// ? And now B's turn:

//   0,0                 0,5
// *  2   1   2   ●   ●   ●
// *  1   A   1   2   ●   ●
// *  2   1   2   ●   ●   ●
// *  ●   𝕏   𝕏   𝕏   𝕏   𝕏
// *  ●   2   1   B   1   2
// *  ●   ●   2   1   2   ●
//   5,0                 5,5

// ? A's seen: [(0,1), (1,0), (1,2), (0,0), (0,2), (1,3), (2,0), (2,2)]
// ? B's seen: [(4,2), (4,4), (5,3), (4,1), (4,5), (5,2), (5,4)]

// ? Alright, now we're cooking... A's turn again:

//   0,0                 0,5
// *  2   1   2   3   ●   ●
// *  1   A   1   2   3   ●
// *  2   1   2   3   ●   ●
// *  3   𝕏   𝕏   𝕏   𝕏   𝕏
// *  ●   2   1   B   1   2
// *  ●   ●   2   1   2   ●
//   5,0                 5,5

// ? A's seen: [(0,1), (1,0), (1,2), (0,0), (0,2), (1,3), (2,0), (2,2), (0,3), (1,4), (2,3), (3,0)]
// ? B's seen: [(4,2), (4,4), (5,3), (4,1), (4,5), (5,2), (5,4)]

// ? And now finally, B again:

//   0,0                 0,5
// *  2   1   2   3   ●   ●
// *  1   A   1   2   3   ●
// *  2   1   2   3   3   ●
// *  3   𝕏   𝕏   𝕏   𝕏   𝕏
// *  3   2   1   B   1   2
// *  ●   3   2   1   2   3
//   5,0                 5,5

// ? A's seen: [(0,1), (1,0), (1,2), (0,0), (0,2), (1,3), (2,0), (2,2), (0,3), (1,4), (2,3), (3,0)]
// ? B's seen: [(4,2), (4,4), (5,3), (4,1), (4,5), (5,2), (5,4), (4,0), (5,1), (5,5)]

// ? Now, during A's next turn
// ? We want to add (4,0) but B has already seen that - PATHS CROSSING - we found a path through!

// ? Notice where A and B's paths touch:

//   0,0                 0,5
// *  2   1   2   3   ●   ●
// * (1) (A)  1   2   3   ●
// * (2)  1   2   3   3   ●
// * (3)  𝕏   𝕏   𝕏   𝕏   𝕏
// * (3) (2) (1) (B)  1   2
// *  ●   3   2   1   2   3
//   5,0                 5,5

// ? That A -> 1 -> 2 -> 3 -> 3 -> 2 -> 1 -> B path is our way through.
// ? Now, in our case, we only need to calculate the DISTANCE between the 2 points.
// ? In this case specifically - that distance is 7.

// * 1.     A -> 1(A)
// * 2.  1(A) -> 2(A)
// * 3.  2(A) -> 3(A)
// * 4.  3(A) -> 3(B)
// * 5.  3(B) -> 2(B)
// * 6.  2(B) -> 1(B)
// * 7.  1(B) -> B

// ? An important thing to notice here is that
// ? each FAN OUT step (1, 2, 3 etc) needs to be marked with the information of "Who did that step (A or B)?"
// ? We need to do this in order to know when A and B's paths cross - which is our "end condition"
// ? that tells us that we have found a path.

// ? ...Now with all of this said, can you implement this algorithm yourself?
