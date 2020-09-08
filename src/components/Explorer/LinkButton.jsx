import React from "react";

const LinkButton = (props) => {
    let aAttrs = {};
    if (props.newTab) {
        aAttrs = {
            target: "_blank",
            rel: "noopener noreferrer"
        };
    }
    return (
        <button className="bg-gray-200 hover:bg-gray-400 mx-2 py-1 px-4 rounded inline-flex items-center">
            <a className="text-blue-500" {...aAttrs}
                href={props.link} download={props.download}>
                {props.text}
                {props.icon}
            </a>
        </button>
    )
}

export default LinkButton;
