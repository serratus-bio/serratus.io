import React, { useEffect } from 'react'
import { Multiselect } from 'multiselect-react-dropdown'
import rdrpPosTsv from './rdrp_pos.tsv'
import { RunData } from './types'
import { tsv } from 'd3'

type Props = {
    setSelectedSpecies: React.Dispatch<React.SetStateAction<String[] | undefined>>
}

export const SpeciesSelect = ({ setSelectedSpecies }: Props) => {
    const [uniqueSpecies, setUniqueSpecies] = React.useState<String[]>()

    async function getUniqueSpecies(dataSet) {
        let rows = ((await tsv(dataSet)) as object) as RunData[]
        const uniqueSpecies = [...new Set(rows.map((d) => d.scientific_name))].sort()
        setUniqueSpecies(uniqueSpecies)
    }

    getUniqueSpecies(rdrpPosTsv)

    const handleAddSpecies = (selectedList: String[], selectedItem: String) => {
        console.log('handleAddSpecies selectedList', selectedList)

        setSelectedSpecies((prevSpeciesList) => [...(prevSpeciesList || []), selectedItem])
    }

    const handleRemoveSpecies = (selectedList: String[], selectedItem: String) => {
        console.log('handleRemoveSpecies selectedList', selectedList)

        setSelectedSpecies((prevSpeciesList) =>
            prevSpeciesList.filter((species) => species !== selectedItem)
        )
    }

    return (
        <Multiselect
            isObject={false}
            onKeyPressFn={function noRefCheck() {}}
            onRemove={handleRemoveSpecies}
            onSelect={handleAddSpecies}
            selectedValues={[]}
            options={uniqueSpecies}
        />
    )
}
