import React, { useState } from 'react'
import './Board.css'
import Tile from '../Tile/Tile';
import useSound from 'use-sound';
import start from '../../sounds/startSound.mp3'
import move from '../../sounds/moveSound.mp3'
import capture from '../../sounds/captureSound.mp3'
const Board = () => {

    const [startSound] = useSound(start);
    const [moveSound] = useSound(move);
    const [captureSound] = useSound(capture);
    // startSound();
    const vAxix = ["1", "2", "3", "4", "5", "6", "7", "8"];
    const hAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const board = [];



    // Initial Pieces 
    const [pieces, setPieces] = useState([

        {
            key: "pw1",
            x: 0,
            y: 1
        },
        {
            key: "pw2",
            x: 1,
            y: 1
        },
        {
            key: "pw3",

            x: 2,
            y: 1
        },
        {
            key: "pw4",

            x: 3,
            y: 1
        },
        {
            key: "pw5",
            x: 4,
            y: 1
        },
        {
            key: "pw6",
            x: 5,
            y: 1
        },
        {
            key: "pw7",
            x: 6,
            y: 1
        },
        {
            key: "pw8",
            x: 7,
            y: 1
        },

        {
            key: "pb1",
            x: 0,
            y: 6
        },
        {
            key: "pb2",
            x: 1,
            y: 6
        },
        {
            key: "pb3",
            x: 2,
            y: 6
        },
        {
            key: "pb4",
            x: 3,
            y: 6
        },
        {
            key: "pb5",
            x: 4,
            y: 6
        },
        {
            key: "pb6",
            x: 5,
            y: 6
        },
        {
            key: "pb7",
            x: 6,
            y: 6
        },
        {
            key: "pb8",
            x: 7,
            y: 6
        },

        {
            key: "rw1",
            x: 0,
            y: 0
        },
        {
            key: "rw2",
            x: 7,
            y: 0
        },
        {
            key: "rb1",
            x: 0,
            y: 7
        },
        {
            key: "rb2",
            x: 7,
            y: 7
        },
        {
            key: "nw1",
            x: 1,
            y: 0
        },
        {
            key: "nw2",
            x: 6,
            y: 0
        },
        {
            key: "nb1",
            x: 1,
            y: 7
        },
        {
            key: "nb2",
            x: 6,
            y: 7
        },
        {
            key: "bw1",
            x: 2,
            y: 0
        },
        {
            key: "bw2",
            x: 5,
            y: 0
        },
        {
            key: "bb1",
            x: 2,
            y: 7
        },
        {
            key: "bb2",
            x: 5,
            y: 7
        },
        {
            key: "qw1",
            x: 4,
            y: 0
        },
        {
            key: "qb1",
            x: 4,
            y: 7
        },
        {
            key: "kw1",
            x: 3,
            y: 0
        },
        {
            key: "kb1",
            x: 3,
            y: 7
        },


    ]);

    const [pawnHasMoved, setPawnHasMoved] = useState([]);


    // Selected Piece 

    const [activePiece, setActivePiece] = useState();
    const [active, setActive] = useState();
    const [turn, setTurn] = useState("w");

    // Legal Moves for Pieces 

    const [legalMoves, setLegalMoves] = useState();

    const checkIndex = (x, y, color) => {
        if (x < 8 && x >= 0 && y < 8 && y >= 0) {
            let index = pieces.findIndex(object => {
                return object.x === x && object.y == y;
            });
            if (index === -1) {
                return true;
            } else {
                if (pieces[index].key[1] !== color) {
                    return true;
                }
            }
        }
    }

    const checkIndexPawn = (x, y, color) => {
        if (x < 8 && x >= 0 && y < 8 && y >= 0) {
            let index = pieces.findIndex(object => {
                return object.x === x && object.y == y;
            });
            if (index === -1) {
                return true;
            } else {
                return false;
            }
        }
    }


    const checkPawnCapture = (x, y, color) => {
        if (color === "w") {
            let index = pieces.findIndex(object => {
                return object.x === x + 1 && object.y == y + 1;
            });
            if (index !== -1 && pieces[index].key[1] !== color) {
                return [x + 1, y + 1];
            }

            let index1 = pieces.findIndex(object => {
                return object.x === x - 1 && object.y == y + 1;
            });
            if (index1 !== -1 && pieces[index1].key[1] !== color) {
                return [x - 1, y + 1];
            }

        } else {
            let index = pieces.findIndex(object => {
                return object.x === x - 1 && object.y == y - 1;
            });
            if (index !== -1 && pieces[index].key[1] !== color) {
                return [x - 1, y - 1];
            }

            let index1 = pieces.findIndex(object => {
                return object.x === x + 1 && object.y == y - 1;
            });
            if (index1 !== -1 && pieces[index1].key[1] !== color) {
                return [x + 1, y - 1];
            }

        }


    }

    const legalMovesPawn = (color, a, b, id) => {
        let arr = []
        let x = parseInt(a);
        let y = parseInt(b);

        if (color == "w") {
            if ((checkIndexPawn(x, y + 1, color))) {
                arr.push([x, y + 1]);
            }
            if (pawnHasMoved.indexOf(id) === -1) {
                arr.push([x, y + 2]);
            }
        } else {
            if ((checkIndexPawn(x, y - 1, color))) {
                arr.push([x, y - 1]);
            }
            if (pawnHasMoved.indexOf(id) === -1) {
                arr.push([x, y - 2])
            }
        }
        if (checkPawnCapture(x, y, color)) {
            arr.push(checkPawnCapture(x, y, color))
        }
        setLegalMoves(arr);
        return arr;
    }




    const legalMovesRook = (x, y, color) => {
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
            // console.log(index)
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


    const legalMovesBishop = (x, y, color) => {
        let arr = [];
        for (let i = 1; i < 8; i++) {
            let index = pieces.findIndex(object => {
                return object.x === x + i && object.y == y + i;
            });
            if (index != -1) {
                if (pieces[index].key[1] !== color) {
                    arr.push([x + i, y + i]);
                }
                break;
            } else {
                arr.push([x + i, y + i]);
            }
        }

        for (let i = 1; i < 8; i++) {

            let index = pieces.findIndex(object => {
                return object.x === x - i && object.y == y - i;
            });
            if (index != -1) {
                if (pieces[index].key[1] !== color) {
                    arr.push([x - i, y - i]);
                }
                break;
            } else {
                arr.push([x - i, y - i]);
            }

        }

        for (let i = 1; i < 8; i++) {

            let index = pieces.findIndex(object => {
                return object.x === x - i && object.y == y + i;
            });
            if (index != -1) {
                if (pieces[index].key[1] !== color) {
                    arr.push([x - i, y + i]);
                }
                break;
            } else {
                arr.push([x - i, y + i]);
            }

        }
        for (let i = 1; i < 8; i++) {

            let index = pieces.findIndex(object => {
                return object.x === x + i && object.y == y - i;
            });
            if (index != -1) {
                if (pieces[index].key[1] !== color) {
                    arr.push([x + i, y - i]);
                }
                break;
            } else {
                arr.push([x + i, y - i]);
            }
        }
        return arr
    }


    const legalMovesQueen = (x, y, color) => {
        let arr = legalMovesRook(x, y, color).concat(legalMovesBishop(x, y, color));
        return arr;
    }





    const legalMovesKnight = (x, y, color) => {
        let arr = [];
        if (checkIndex(x + 1, y + 2, color)) {
            arr.push([x + 1, y + 2])
        }

        if (checkIndex(x + 1, y - 2, color)) {
            arr.push([x + 1, y - 2])
        }

        if (checkIndex(x - 1, y + 2, color)) {
            arr.push([x - 1, y + 2])
        }

        if (checkIndex(x - 1, y - 2, color)) {
            arr.push([x - 1, y - 2])
        }

        if (checkIndex(x + 2, y - 1, color)) {
            arr.push([x + 2, y - 1])
        }

        if (checkIndex(x + 2, y + 1, color)) {
            arr.push([x + 2, y + 1])
        }

        if (checkIndex(x - 2, y - 1, color)) {
            arr.push([x - 2, y - 1])
        }

        if (checkIndex(x - 2, y + 1, color)) {
            arr.push([x - 2, y + 1])
        }
        return arr;
    }


    const legalMovesKing = (x, y, color) => {
        let arr = [];
        if (checkIndex(x, y + 1, color)) {
            arr.push([x, y + 1])
        }

        if (checkIndex(x, y - 1, color)) {
            arr.push([x, y - 1])
        }

        if (checkIndex(x - 1, y, color)) {
            arr.push([x - 1, y])
        }

        if (checkIndex(x - 1, y + 1, color)) {
            arr.push([x - 1, y + 1])
        }

        if (checkIndex(x - 1, y - 1, color)) {
            arr.push([x - 1, y - 1])
        }

        if (checkIndex(x + 1, y, color)) {
            arr.push([x + 1, y])
        }

        if (checkIndex(x + 1, y + 1, color)) {
            arr.push([x + 1, y + 1])
        }

        if (checkIndex(x + 1, y - 1, color)) {
            arr.push([x + 1, y - 1])
        }
        return arr;
    }





    const findLegalMoves = (piece, color, x, y, id) => {
        parseInt(x);
        parseInt(y);
        switch (piece) {
            case "p":
                return legalMovesPawn(color, x, y, id)

            case "r":
                return legalMovesRook(x, y, color)

            case "b":
                return legalMovesBishop(x, y, color);

            case "n":
                return legalMovesKnight(x, y, color);

            case "q":
                return legalMovesQueen(x, y, color)

            case "k":
                return legalMovesKing(x, y, color)
        }
    }



    const pieceClicked = (e) => {
        let id = e.target.id;

        let pieceKey = id[4] + id[5] + id[6];

        if (!activePiece) {
            if (id[5] === turn) {
                if (pieceKey) {
                    setActivePiece(id);

                    let activeObj = {
                        key: id[4] + id[5] + id[6],
                        x: id[0],
                        y: id[2]
                    }


                    let color = activeObj.key[1];
                    // console.log(color)
                    let pieceType = activeObj.key[0];
                    let x = id[0];
                    let y = id[2];
                    let tomove = {
                        key: activeObj.key,
                        x: parseInt(x),
                        y: parseInt(y)
                    }


                    let moves = findLegalMoves(pieceType, color, parseInt(activeObj.x), parseInt(activeObj.y), activeObj.key);
                    setLegalMoves(moves)





                }

            }
        } else {
            let activeObj = {
                key: activePiece[4] + activePiece[5] + activePiece[6],
                x: activePiece[0],
                y: activePiece[2]
            }


            let color = activeObj.key[1];
            let pieceType = activeObj.key[0];
            let x = id[0];
            let y = id[2];
            let tomove = {
                key: activeObj.key,
                x: parseInt(x),
                y: parseInt(y)
            }

            if (activeObj.key != pieceKey) {
                let moves = findLegalMoves(pieceType, color, parseInt(activeObj.x), parseInt(activeObj.y));
                if (JSON.stringify(moves).indexOf(JSON.stringify([tomove.x, tomove.y])) != -1) {

                    if (pieceKey) {
                        const index = pieces.findIndex(object => {
                            return object.key === pieceKey;
                        });
                        pieces.splice(index, 1);
                        captureSound()


                    } else {
                        moveSound();
                    }
                    const index = pieces.findIndex(object => {
                        return object.key === activeObj.key;
                    });
                    pieces.splice(index, 1);
                    setPieces(current => [...current, tomove]);
                    turn == "w" ? setTurn("b") : setTurn("w");
                    // console.log(activeObj.key[0])
                    if (activeObj.key[0] === "p") {
                        if (pawnHasMoved.indexOf(activeObj.key) === -1) {
                            setPawnHasMoved(current => [...current, activeObj.key]);
                        }
                        // console.log(pawnHasMoved)
                    }






                }


            }

            setActivePiece()
            setLegalMoves()

        }







    }


    const grabPiece = (e) => {
        e.stopPropagation();
        const element = e.target;
        // const x = e.clientX -50;
        // const y = e.clientY-50;
        element.style.position = "absolute";
        // element.style.left = `${x}px`;
        // element.style.top = `${y}px`;

        setActive(element);
        setActivePiece(e.target.id);
        pieceClicked(e)
    }

    const movePiece = (e) => {
        if (active) {
            const element = e.target;
            const x = e.clientX - 40;
            const y = e.clientY - 40;
            active.style.position = "absolute";
            active.style.left = `${x}px`;
            active.style.top = `${y}px`;
        }
    }

    const dropPiece = (e) => {
        const x = Math.floor((e.clientX-80)/60) ;
        const y = Math.abs(Math.floor((e.clientY -420 )/60));
        console.log(x,y);
        pieceClicked(e)

        setActive()


    }

    const piecetoImg = {
        pw: "pawn-white",
        pb: "pawn-black",
        rw: "rook-white",
        rb: "rook-black",
        nw: "knight-white",
        nb: "knight-black",
        bw: "bishop-white",
        bb: "bishop-black",
        qw: "queen-white",
        qb: "queen-black",
        kw: "king-white",
        kb: "king-black"
    }

    for (let j = hAxis.length - 1; j >= 0; j--) {

        for (let i = 0; i < vAxix.length; i++) {

            let image = undefined;
            let legal = undefined;
            let key = `${i},${j}`
            let arr = [i, j];
            if (legalMoves && JSON.stringify(legalMoves).indexOf(JSON.stringify(arr)) !== -1) {
                legal = true;

            }

            pieces.forEach(p => {
                if (p.x === i && p.y === j) {
                    let piece = p.key[0] + p.key[1];
                    let img = piecetoImg[piece];
                    image = "pieces/" + img + ".png";
                    key = `${i},${j},${p.key}`
                }

            });
            if ((i + j + 2) % 2 == 0) {
                board.push(<Tile color="light" image={image} onclick={pieceClicked} id={key} activePiece={activePiece} grabPiece={grabPiece} movePiece={movePiece} dropPiece={dropPiece} legal={legal} />);
            } else {
                board.push(<Tile color="dark" image={image} onclick={pieceClicked} id={key} activePiece={activePiece} grabPiece={grabPiece} movePiece={movePiece} dropPiece={dropPiece} legal={legal} />)
            }
        }
    }





    return (
        <div>
            <div className='board'>
                {board}

            </div>
            <div> {turn === 'w' ? "White's Turn" : "Black's Turn"}</div>
        </div>
    )
}

export default Board