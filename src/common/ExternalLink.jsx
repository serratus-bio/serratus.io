import React from 'react'

export const ExternalLink = ({ children, ...props }) => {
    return (
        <a {...props} target='_blank' rel='noopener noreferrer'>
            {children}
        </a>
    )
}
