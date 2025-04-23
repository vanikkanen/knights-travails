function knightMoves(fromSquare, toSquare) {
    const boardSize = 8;

    //Save visited nodes and their parent nodes
    const visited = new Map();
    //Set a node and its parent node to the queue
    const queue = [[fromSquare, null]];

    const serialize = ([x, y]) => `${x},${y}`;

    const possibleMoves = [
        [2, 1],
        [2, -1],
        [1, -2],
        [-1, -2],
        [-2, 1],
        [-2, -1],
        [-1, 2],
        [1, 2],
    ];

    const availableSquare = ([x, y]) => {
        const squares = [];
        for (let [dx, dy] of possibleMoves) {
            const nx = x + dx;
            const ny = y + dy;
            const key = serialize([nx, ny]);
            if (nx >= 0 && nx < boardSize && ny >= 0 && ny < boardSize && !visited.has(key))
                squares.push([nx, ny]);
        }
        return squares;
    };

    while (queue.length > 0) {
        const [curr, par] = queue.shift();
        const currKey = serialize(curr);
        visited.set(currKey, par);
        if (currKey === serialize(toSquare)) break;

        //Add possible squares to queue
        queue.push(...availableSquare(curr).map(square => [square, curr]));
    }

    const path = [toSquare];
    let prev = visited.get(serialize(toSquare));
    while (prev !== null) {
        path.push(prev);
        prev = visited.get(serialize(prev));
    }
    console.log(`Made in ${path.length - 1} moves! Here's your path:`);
    [...path].reverse().forEach(square => console.log(square));
}

knightMoves([0, 0], [3, 3]);
knightMoves([3, 3], [4, 3]);
knightMoves([0, 0], [7, 7]);
