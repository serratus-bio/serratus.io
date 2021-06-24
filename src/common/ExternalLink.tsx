import React from 'react'

type Props = {
    children: any
    [key: string]: any
}

export const ExternalLink = ({ children, ...props }: Props) => {
    return (
        <a {...props} target='_blank' rel='noopener noreferrer'>
            {children}
        </a>
    )
}
