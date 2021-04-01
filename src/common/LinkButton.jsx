import React from 'react'

export const LinkButton = ({ link, text, icon, download = undefined, newTab = false }) => {
    let aAttrs = {}
    if (newTab) {
        aAttrs = {
            target: '_blank',
            rel: 'noopener noreferrer',
        }
    }
    return (
        <button className='bg-gray-200 hover:bg-gray-400 mx-2 py-1 px-4 rounded inline-flex items-center'>
            <a className='text-blue-500' {...aAttrs} href={link} download={download}>
                {text}
                {icon}
            </a>
        </button>
    )
}
