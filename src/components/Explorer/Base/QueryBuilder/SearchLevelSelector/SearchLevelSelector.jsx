import React from 'react'
import { Dropdown } from './Dropdown'
import { SearchRun } from './SearchRun'
import { BaseContext } from 'components/Explorer/Base/BaseContext'

export const SearchLevelSelector = ({
    searchLevel,
    setSearchLevel,
    searchLevelValue,
    setSearchLevelValue,
    viewMatches,
}) => {
    const context = React.useContext(BaseContext)
    const [values, setValues] = React.useState(context.defaultSearchLevelValues)

    const willMount = React.useRef(true)
    if (willMount.current) {
        let newValues = values
        newValues[searchLevel] = searchLevelValue
        setValues(newValues)
        willMount.current = false
    }

    // update search value
    React.useEffect(() => {
        setSearchLevelValue(values[searchLevel])
    }, [values, searchLevel, setSearchLevelValue])

    const searchLevelChange = (e) => {
        const newSearchLevel = e.target.value
        setSearchLevel(newSearchLevel)
        setSearchLevelValue(values[newSearchLevel])
    }

    return (
        <div>
            <div className='flex flex-row justify-center'>
                {Object.keys(values).map((type) => (
                    <SearchLevelOption
                        className='mx-2'
                        key={type}
                        value={type}
                        displayText={displayName[type]}
                        checked={searchLevel === type}
                        onChange={searchLevelChange}
                    />
                ))}
            </div>
            {searchLevel === 'run' ? (
                <SearchRun
                    run={values['run']}
                    setRun={(newValue) => {
                        setValues((oldValues) => ({
                            ...oldValues,
                            run: newValue,
                        }))
                    }}
                    onEnter={viewMatches}
                />
            ) : (
                <Dropdown
                    searchType={context.searchType}
                    searchLevel={searchLevel}
                    searchLevelValue={values[searchLevel]}
                    setSearchLevelValue={(newValue) => {
                        setValues((oldValues) => ({
                            ...oldValues,
                            [searchLevel]: newValue,
                        }))
                    }}
                />
            )}
        </div>
    )
}

const SearchLevelOption = ({ className, value, checked, onChange, displayText }) => {
    return (
        <div className={className}>
            <input
                type='radio'
                name='searchLevel'
                value={value}
                checked={checked}
                onChange={onChange}
            />
            <span className='ml-1'>{displayText}</span>
        </div>
    )
}

const displayName = {
    phylum: 'Phylum',
    family: 'Family',
    genbank: 'GenBank',
    sequence: 'GenBank',
    run: 'SRA Run',
}
