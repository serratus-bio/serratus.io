import React from 'react'

type Props = {
    link: string
    text: string
    icon?: React.ReactElement
    download?: string | boolean
    newTab?: boolean
    show?: boolean
}

export const LinkButton = ({
    link,
    text,
    icon = undefined,
    download = false,
    newTab = false,
    show = true,
}: Props) => {
    let aAttrs = {}
    if (newTab) {
        aAttrs = {
            target: '_blank',
            rel: 'noopener noreferrer',
        }
    }
    if (!show) return <div />
    return (
        <button className='bg-gray-100 hover:bg-gray-300 mx-2 py-1 px-4 rounded inline-flex items-center'>
            <a className='text-blue-500' {...aAttrs} href={link} download={download}>
                {text}
                {icon}
            </a>
        </button>
    )
}
