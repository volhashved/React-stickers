import React from "react";

const TextNote = (props) => {
    return (
        <div className="textNote" style={{display: props.view ? "block" : "none"}}>
            {props.text}
        </div>
    )
}

export default TextNote;