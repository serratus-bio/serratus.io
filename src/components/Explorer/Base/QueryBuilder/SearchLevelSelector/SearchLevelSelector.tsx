import React from 'react'
import { Dropdown } from './Dropdown'
import { SearchRun } from './SearchRun'
import { SearchLevelOption } from './SearchLevelOption'
import { BaseContext } from 'components/Explorer/Base/BaseContext'

type Props = {
    searchLevel: string
    setSearchLevel: React.Dispatch<React.SetStateAction<string>>
    searchLevelValue: string
    setSearchLevelValue: React.Dispatch<React.SetStateAction<string>>
    viewMatches: (_run: string) => void
}

export const SearchLevelSelector = ({
    searchLevel,
    setSearchLevel,
    searchLevelValue,
    setSearchLevelValue,
    viewMatches,
}: Props) => {
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

    const searchLevelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
                        checked={searchLevel === type}
                        onChange={searchLevelChange}
                    />
                ))}
            </div>
            {searchLevel === 'run' ? (
                <SearchRun
                    run={values['run']}
                    setRun={(newValue: string) => {
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
                    setSearchLevelValue={(newValue: string) => {
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
