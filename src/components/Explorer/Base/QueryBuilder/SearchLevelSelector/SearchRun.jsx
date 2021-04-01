import React from 'react'

export const SearchRun = ({ run, setRun, onEnter }) => {
    const searchOnKeyUp = (e) => {
        if (e.keyCode === 13) {
            onEnter(e.target.value)
        } else {
            setRun(e.target.value)
        }
    }

    return (
        <input
            className='rounded border border-gray-400 h-8 w-full px-2 m-1 focus:border-blue-600 focus:outline-none'
            type='text'
            placeholder='e.g. ERR2756788'
            defaultValue={run}
            onKeyUp={searchOnKeyUp}
        />
    )
}
