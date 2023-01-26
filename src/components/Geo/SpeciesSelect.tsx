import React from 'react'
import chroma from 'chroma-js'
import { SpeciesOption } from './types'
import Select, { StylesConfig } from 'react-select'

type Props = {
    speciesColors: { [key: string]: string } | undefined
    setSelectedSpecies: React.Dispatch<React.SetStateAction<string[] | undefined>>
}

/**
 * This component:
 * - Allows for multi-select of all species within the rdrpPosTsv file.
 * - Selecting any number of species is reflected in the MapPlot, TimePlot, and SelectionInfo components below.
 */

export const SpeciesSelect = ({ speciesColors, setSelectedSpecies }: Props) => {
    if (speciesColors) {
        const options: SpeciesOption[] = []
        for (const [scientific_name, hex_value] of Object.entries(speciesColors)) {
            options.push({
                value: scientific_name,
                label: scientific_name,
                color: hex_value,
            })
        }

        const colourStyles: StylesConfig<SpeciesOption, true> = {
            control: (styles) => ({ ...styles, backgroundColor: 'white' }),
            option: (styles, { data, isDisabled, isFocused, isSelected }) => {
                const color = chroma(data.color)
                return {
                    ...styles,
                    'backgroundColor': isDisabled
                        ? undefined
                        : isSelected
                        ? data.color
                        : isFocused
                        ? color.alpha(0.1).css()
                        : undefined,
                    'color': isDisabled
                        ? '#ccc'
                        : isSelected
                        ? chroma.contrast(color, 'white') > 2
                            ? 'white'
                            : 'black'
                        : 'black',
                    'cursor': isDisabled ? 'not-allowed' : 'default',

                    ':active': {
                        ...styles[':active'],
                        backgroundColor: !isDisabled
                            ? isSelected
                                ? data.color
                                : color.alpha(0.3).css()
                            : undefined,
                    },
                }
            },
            multiValue: (styles, { data }) => {
                const color = chroma(data.color)
                return {
                    ...styles,
                    color: 'black',
                    backgroundColor: color.alpha(0.1).css(),
                }
            },
            multiValueLabel: (styles) => ({
                ...styles,
                color: 'black',
            }),
            multiValueRemove: (styles, { data }) => ({
                ...styles,
                'color': 'data.color',
                ':hover': {
                    backgroundColor: data.color,
                    color: 'white',
                },
            }),
        }

        const handleChange = (e: any) => {
            if (e === null) setSelectedSpecies(() => [])
            else if (e && e.length > 0)
                setSelectedSpecies(() => e.map((i: SpeciesOption) => i.value))
        }

        return (
            <Select
                closeMenuOnSelect={false}
                placeholder={'Select by Scientific_name'}
                isMulti
                onChange={handleChange}
                options={options}
                styles={colourStyles}
            />
        )
    } else return null
}
