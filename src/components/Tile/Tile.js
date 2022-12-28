import React from 'react'
import './Tile.css'

export default function Tile(props) {  
  return (
    <>
    <div  className={`tile tile-${props.color} ${props.activePiece === props.id ? "active" : "" }  `} onClick={props.onclick}   id={props.id}  >
      {props.legal && <div className='legal'></div>}  
        
        {/* {props.image && <div className="piece" style={{backgroundImage: `url(${props.image})`}} key={props.id} src={props.image}  id={props.id} onMouseDown={props.grabPiece} onMouseMove={props.movePiece} onMouseUp={props.dropPiece} ></div>} */}
        {props.image && <div className="piece" style={{backgroundImage: `url(${props.image})`}} key={props.id} src={props.image}  id={props.id}    ></div>}
    </div>
    </>
  )
}
