import React from "react"

function Die(props) {
    return (
        <div className="die-face" onClick={props.onClick} >
            <h2 className={props.className}>{props.value}</h2>
        </div>
    )
}

export default Die