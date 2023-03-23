import React from 'react'
import { SpeciesOption } from './types'
import { getColorFromSelectedIndex } from './GeoHelpers'
import chroma from 'chroma-js'
import WindowedSelect, { StylesConfig, createFilter } from 'react-windowed-select'

type Props = {
    speciesOptions: string[]
    selectedSpecies: string[]
    setSelectedSpecies: React.Dispatch<React.SetStateAction<string[]>>
}

export const SpeciesSelect = ({ speciesOptions, selectedSpecies, setSelectedSpecies }: Props) => {
    const handleChange = (e: any) => {
        if (!e || e?.length === 0) {
            setSelectedSpecies(() => [])
        }
        setSelectedSpecies(e.map((i: SpeciesOption) => i.value))
    }

    const getOptions = () => {
        if (!speciesOptions.length) {
            return undefined
        }
        return speciesOptions.map((scientificName) => {
            return {
                value: scientificName,
                label: scientificName,
            }
        })
    }

    const getSelectedColorFromIndex = (data: SpeciesOption) => {
        const color = getColorFromSelectedIndex(data?.value, selectedSpecies, 'white')
        return chroma(color)
    }

    const getStyles = (): StylesConfig<SpeciesOption, true> => ({
        multiValue: (styles, { data }) => {
            const colorObj = getSelectedColorFromIndex(data)
            const textColor = chroma.contrast(colorObj, 'white') > 2 ? 'white' : 'black'
            return {
                ...styles,
                color: textColor,
                backgroundColor: colorObj.alpha(0.1).css(),
            }
        },
        multiValueLabel: (styles) => ({
            ...styles,
            color: 'black',
        }),
        multiValueRemove: (styles, { data }) => {
            const colorObj = getSelectedColorFromIndex(data)
            return {
                ...styles,
                'color': colorObj.css(),
                ':hover': {
                    backgroundColor: colorObj.css(),
                    color: 'white',
                },
            }
        },
    })

    return (
        <WindowedSelect
            windowThreshold={100}
            closeMenuOnSelect={false}
            placeholder={'Select by scientific name'}
            isMulti
            onChange={handleChange}
            options={getOptions()}
            styles={getStyles() as StylesConfig}
            filterOption={createFilter({ ignoreAccents: false })}
        />
    )
}
