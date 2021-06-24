import React from 'react'
import { ValueType } from 'react-select'
import AsyncSelect from 'react-select/async'
import { getLoadOptions, getSelectedObject, Selection } from './GetValues'

type Props = {
    searchType: string
    searchLevel: string
    searchLevelValue: string
    setSearchLevelValue: (_value: string) => void
}

export const Dropdown = ({
    searchType,
    searchLevel,
    searchLevelValue,
    setSearchLevelValue,
}: Props) => {
    const emptySelection = { label: '', value: '' }
    const [selected, setSelected] = React.useState(emptySelection)

    React.useEffect(() => {
        async function setSelectionAsync() {
            setSelected(await getSelectedObject(searchType, searchLevel, searchLevelValue))
        }
        setSelectionAsync()
    }, [searchType, searchLevel, searchLevelValue])

    function selectOnChange(newSelection: ValueType<Selection, false>) {
        if (!newSelection) return
        setSelected(newSelection)
        setSearchLevelValue(newSelection.value)
    }

    function onMenuOpen() {
        setSelected(emptySelection)
    }

    async function onMenuClose() {
        setSelected(await getSelectedObject(searchType, searchLevel, searchLevelValue))
    }

    return (
        <AsyncSelect
            key={JSON.stringify(searchLevel)} // https://github.com/JedWatson/react-select/issues/1581#issuecomment-408625770
            cacheOptions
            defaultOptions
            value={selected}
            loadOptions={getLoadOptions(searchType, searchLevel)}
            onChange={selectOnChange}
            onMenuOpen={onMenuOpen}
            onMenuClose={onMenuClose}
            placeholder={`Type to search`}
        />
    )
}
