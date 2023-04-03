import React from 'react'
import { Geo } from 'components/Geo'
import { BaseContext } from 'components/Explorer/Base/BaseContext'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { Filters } from 'components/Explorer/types'
import { fetchMatches } from './SerratusApiCalls'
import 'react-tabs/style/react-tabs.css'

type Props = {
    component: React.ReactElement
    searchLevel: string
    searchLevelValue: string
    filters: Filters
}

export const withTabs = ({ component, searchLevel, searchLevelValue, filters }: Props) => {
    const context = React.useContext(BaseContext)
    const [runIds, setRunIds] = React.useState<string[]>([])

    React.useEffect(() => {
        async function onMount() {
            const runIds = await fetchMatches(
                context.searchType,
                searchLevel,
                searchLevelValue,
                filters,
                ['run_id']
            )
            setRunIds(runIds.map((row: any) => row.run_id))
        }
        onMount()
    }, [])

    const loading = <div className='text-center'>Loading... (this might take a while)</div>

    return (
        <Tabs>
            <TabList>
                <Tab>Sequence</Tab>
                <Tab disabled={runIds.length === 0}>Geo</Tab>
            </TabList>
            <TabPanel>{component}</TabPanel>
            <TabPanel>{runIds.length ? <Geo runIds={runIds} /> : loading}</TabPanel>
        </Tabs>
    )
}
