import React from 'react'

export const ExternalLink = (props) => {
    return (
        <a {...props} target='_blank' rel='noopener noreferrer'>
            {props.children}
        </a>
    )
}
