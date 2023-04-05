import React from 'react'
import { NavLink } from 'react-router-dom'
import { routes } from 'common/routes'
import { filterObjects } from 'common/utils'
import { externalLinkIcon } from 'common'

interface PalmPrintsTableProps {
    data: any[] | undefined
    header: { [key: string]: string }
}

export const PalmPrintsTable = ({ data, header }: PalmPrintsTableProps) => {
    const [filteredData, setFilteredData] = React.useState<any>([])
    React.useEffect(() => {
        if (data && data.length > 0) {
            setFilteredData(filterObjects(data, Object.keys(header)))
        }
    }, [data])
    return (
        <>
            {data && data.length > 0 && (
                <div className='max-w-4xl m-auto'>
                    <div className='min-w-full align-middle overflow-auto'>
                        <table className='min-w-full divide-y border-2 border-orange-200 overflow-x-scroll  divide-gray-200 table-fixed dark:divide-gray-700'>
                            <thead className='bg-orange-200 dark:bg-gray-700'>
                                <tr>
                                    {Object.values(header).map((e, _i) => {
                                        return (
                                            <>
                                                <th
                                                    scope='col'
                                                    className='py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400'>
                                                    {e}
                                                </th>
                                            </>
                                        )
                                    })}
                                    {
                                        <th
                                            scope='col'
                                            className='py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400'></th>
                                    }
                                </tr>
                            </thead>
                            <tbody className='bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700'>
                                {filteredData &&
                                    filteredData.map((e: any, eIndex: number) => {
                                        return (
                                            <>
                                                <tr
                                                    key={eIndex}
                                                    className='hover:bg-gray-100 dark:hover:bg-gray-700'>
                                                    {Object.entries(e).map(
                                                        (entry: any, index: number) => {
                                                            if (
                                                                index + 1 ==
                                                                Object.keys(e).length
                                                            ) {
                                                                return (
                                                                    <>
                                                                        <td
                                                                            key={index}
                                                                            className='py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white text-center'>
                                                                            {entry[1]}
                                                                        </td>
                                                                        <td
                                                                            key={index + 1}
                                                                            className='py-4 px-6 text-sm font-medium text-right whitespace-nowrap'>
                                                                            <NavLink
                                                                                className='text-blue-600 dark:text-blue-500 hover:underline'
                                                                                to={`${routes.palmid.path}?fastaInput=%3E${data[eIndex]['run_id']}_${data[eIndex]['assembly_node']}_${data[eIndex]['palm_id']}%0A${data[eIndex]['q_sequence']}`}
                                                                                target='_blank'>
                                                                                palmID
                                                                                {externalLinkIcon}
                                                                            </NavLink>
                                                                        </td>
                                                                        <td
                                                                            key={index + 2}
                                                                            className='py-4 px-6 text-sm font-medium text-right whitespace-nowrap'>
                                                                            <NavLink
                                                                                className='text-blue-600 dark:text-blue-500 hover:underline'
                                                                                to={{
                                                                                    pathname: `https://blast.ncbi.nlm.nih.gov/Blast.cgi?PAGE_TYPE=BlastSearch&USER_FORMAT_DEFAULTS=on&SET_SAVED_SEARCH=true&PAGE=Proteins&PROGRAM=blastp&QUERY=${data[eIndex]['q_sequence']}&JOB_TITLE=palmID_${data[eIndex]['palm_id']}&GAPCOSTS=11%201&DATABASE=nr&BLAST_PROGRAMS=blastp&MAX_NUM_SEQ=100&SHORT_QUERY_ADJUST=on&EXPECT=0.05&WORD_SIZE=6&MATRIX_NAME=BLOSUM62&COMPOSITION_BASED_STATISTICS=2&PROG_DEFAULTS=on&SHOW_OVERVIEW=on&SHOW_LINKOUT=on&ALIGNMENT_VIEW=Pairwise&MASK_CHAR=2&MASK_COLOR=1&GET_SEQUENCE=on&NEW_VIEW=on&NUM_OVERVIEW=100&DESCRIPTIONS=100&ALIGNMENTS=100&FORMAT_OBJECT=Alignment&FORMAT_TYPE=HTML`,
                                                                                }}
                                                                                target='_blank'>
                                                                                BLAST
                                                                                {externalLinkIcon}
                                                                            </NavLink>
                                                                        </td>
                                                                    </>
                                                                )
                                                            } else {
                                                                return (
                                                                    <>
                                                                        <td
                                                                            key={index}
                                                                            className='py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white text-center'>
                                                                            {entry[1]}
                                                                        </td>
                                                                    </>
                                                                )
                                                            }
                                                        }
                                                    )}
                                                </tr>
                                            </>
                                        )
                                    })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    )
}
