import React from 'react'

type Props = {
    run: string
    setRun: (_run: string) => void
    onEnter: (_run: string) => void
}

export const SearchRun = ({ run, setRun, onEnter }: Props) => {
    const searchOnKeyUp = (e: React.KeyboardEvent & React.ChangeEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onEnter(e.target.value)
        } else {
            setRun(e.target.value)
        }
    }

    return (
        <input
            className='rounded border border-gray-300 h-8 w-full px-2 m-1 focus:border-blue-600 focus:outline-none'
            type='text'
            placeholder='e.g. ERR2756788'
            defaultValue={run}
            onKeyUp={searchOnKeyUp}
        />
    )
}
