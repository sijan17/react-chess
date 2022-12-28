
function RookMoves(x, y, pieces, color) {
    const arr = [];
    for (let i = x + 1; i < 8; i++) {
        let index = pieces.findIndex(object => {
            return object.x === i && object.y == y;
        });


        if (index != -1) {
            if (pieces[index].key[1] !== color) {
                arr.push([i, y])
            }
            break;
        } else {
            arr.push([i, y])
        }
    }
    for (let i = x - 1; i >= 0; i--) {
        let index = pieces.findIndex(object => {
            return object.x === i && object.y == y;
        });
        console.log(index)
        if (index != -1) {
            if (pieces[index].key[1] !== color) {
                arr.push([i, y])
            }
            break;
        } else {
            arr.push([i, y])
        }
    }
    for (let i = y + 1; i < 8; i++) {
        let index = pieces.findIndex(object => {
            return object.x === x && object.y == i;
        });
        // console.log(index)
        if (index != -1) {
            if (pieces[index].key[1] !== color) {
                arr.push([x, i])
            }
            break;
        } else {
            arr.push([x, i])
        }
    }
    for (let i = y - 1; i >= 0; i--) {
        let index = pieces.findIndex(object => {
            return object.x === x && object.y == i;
        });
        // console.log(index)
        if (index != -1) {
            if (pieces[index].key[1] !== color) {
                arr.push([x, i])
            }
            break;
        } else {
            arr.push([x, i])
        }
    }
    return arr;

}


export  { RookMoves };