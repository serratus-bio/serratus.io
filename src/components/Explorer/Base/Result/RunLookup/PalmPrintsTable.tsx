import * as React from 'react'
import * as Utils from 'common/utils'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { routes } from 'common/routes'

interface PalmPrintsTableProps {
    data: any[] | undefined
    header: { [key: string]: string }
}

export const PalmPrintsTable = ({ data, header }: PalmPrintsTableProps) => {
    const [filteredData, setFilteredData] = useState<any>([])
    useEffect(() => {
        if (data && data.length > 0) {
            setFilteredData(Utils.filterObject(data, Object.keys(header)))
        }
    }, [data])
    return (
        <>
            {data && data.length > 0 && (
                <div className='max-w-2xl mx-auto'>
                    <div className='flex flex-col'>
                        <div className='sm:rounded-lg'>
                            <div className='inline-block min-w-full align-middle'>
                                <div className='overflow-hidden'>
                                    <table className='min-w-full divide-y border-2 border-orange-200  divide-gray-200 table-fixed dark:divide-gray-700'>
                                        <thead className='bg-orange-200 dark:bg-gray-700'>
                                            <tr>
                                                {Object.values(header).map((e) => {
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
                                                                                        key={
                                                                                            index +
                                                                                            1
                                                                                        }
                                                                                        className='py-4 px-6 text-sm font-medium text-right whitespace-nowrap'>
                                                                                        <NavLink
                                                                                            className='text-blue-600 dark:text-blue-500 hover:underline'
                                                                                            to={`${routes.palmid.path}?fastaInput=%3E${data[eIndex]['run_id']}_${data[eIndex]['assembly_node']}_${data[eIndex]['palm_id']}%0A${data[eIndex]['q_sequence']}`}>
                                                                                            Analyse
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
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
