import React from 'react';

export default (props) => {
    const searchOnKeyUp = (e) => {
        if (e.keyCode === 13) {
            props.onEnter(e.target.value);
        }
        else {
            props.setRun(e.target.value);
        }
    };

    return (
        <input className="rounded border border-gray-400 h-8 w-full px-2 m-1 focus:border-blue-600 focus:outline-none"
            type="text"
            placeholder="e.g. ERR2756788"
            defaultValue={props.run}
            onKeyUp={searchOnKeyUp} />
    )
}