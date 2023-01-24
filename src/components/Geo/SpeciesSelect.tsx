import React from 'react'
import { Multiselect } from 'multiselect-react-dropdown'

type Props = {
    allUniqueSpecies: string[] | undefined
    setSelectedSpecies: React.Dispatch<React.SetStateAction<String[] | undefined>>
}

export const SpeciesSelect = ({ allUniqueSpecies, setSelectedSpecies }: Props) => {
    const handleAddSpecies = (selectedList: String[], selectedItem: String) => {
        setSelectedSpecies((prevSpeciesList) => [...(prevSpeciesList || []), selectedItem])
    }

    const handleRemoveSpecies = (selectedList: String[], selectedItem: String) => {
        setSelectedSpecies((prevSpeciesList) =>
            prevSpeciesList.filter((species) => species !== selectedItem)
        )
    }

    return (
        <Multiselect
            placeholder={'Select by species'}
            hidePlaceholder={true}
            showArrow={true}
            isObject={false}
            onRemove={handleRemoveSpecies}
            onSelect={handleAddSpecies}
            selectedValues={[]}
            options={allUniqueSpecies || undefined}
        />
    )
}
