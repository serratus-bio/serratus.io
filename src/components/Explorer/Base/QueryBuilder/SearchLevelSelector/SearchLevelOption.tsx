import React from 'react'

type Props = {
    className: string
    value: string
    checked: boolean
    onChange: (_e: React.ChangeEvent<HTMLInputElement>) => void
}

export const SearchLevelOption = ({ className, value, checked, onChange }: Props) => {
    return (
        <div className={className}>
            <input
                type='radio'
                name='searchLevel'
                value={value}
                checked={checked}
                onChange={onChange}
            />
            <span className='ml-1'>{displayName[value]}</span>
        </div>
    )
}

const displayName: { [key: string]: string } = {
    phylum: 'Phylum',
    family: 'Family',
    genbank: 'GenBank',
    sequence: 'GenBank',
    run: 'SRA Run',
}
