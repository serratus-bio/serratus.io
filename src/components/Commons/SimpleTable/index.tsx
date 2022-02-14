import * as React from 'react'

interface SimpleTableProps {
    data: JSON[] | undefined
    header: { [key: string]: string }
}

const SimpleTable = ({ data, header }: SimpleTableProps) => {
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
                                                {/* <th
                                                scope='col'
                                                className='py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400'>
                                                run_id
                                            </th>
                                            <th
                                                scope='col'
                                                className='py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400'>
                                                node
                                            </th>
                                            <th
                                                scope='col'
                                                className='py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400'>
                                                palmprint
                                            </th>
                                            <th
                                                scope='col'
                                                className='py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400'>
                                                identity
                                            </th>
                                            <th
                                                scope='col'
                                                className='py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400'>
                                                evalue
                                            </th>
                                            <th
                                                scope='col'
                                                className='py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400'>
                                                coverage
                                            </th>
                                            <th scope='col' className='p-4'>
                                                <span className='sr-only'>Edit</span>
                                            </th> */}
                                            </tr>
                                        </thead>
                                        <tbody className='bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700'>
                                            {data &&
                                                data.map((e: any) => {
                                                    return (
                                                        <>
                                                            <tr className='hover:bg-gray-100 dark:hover:bg-gray-700'>
                                                                {Object.entries(e).map(
                                                                    (entry: any, index: number) => {
                                                                        if (
                                                                            index + 1 ==
                                                                            Object.keys(e).length
                                                                        ) {
                                                                            return (
                                                                                <>
                                                                                    <td className='py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white text-center'>
                                                                                        {entry[1]}
                                                                                    </td>
                                                                                    <td className='py-4 px-6 text-sm font-medium text-right whitespace-nowrap'>
                                                                                        <a
                                                                                            href='#'
                                                                                            onClick={() => {
                                                                                                alert(
                                                                                                    e[
                                                                                                        'palm_id'
                                                                                                    ]
                                                                                                )
                                                                                            }}
                                                                                            className='text-blue-600 dark:text-blue-500 hover:underline'>
                                                                                            Analyze
                                                                                        </a>
                                                                                    </td>
                                                                                </>
                                                                            )
                                                                        } else {
                                                                            return (
                                                                                <>
                                                                                    <td className='py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white text-center'>
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
                                            {/* <tr className='hover:bg-gray-100 dark:hover:bg-gray-700'>
                                            <td className='py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white text-center'>
                                                ERR2756788
                                            </td>
                                            <td className='py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white text-center'>
                                                1
                                            </td>
                                            <td className='py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white text-center'>
                                                u12405
                                            </td>
                                            <td className='py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white text-center'>
                                                100
                                            </td>
                                            <td className='py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white text-center'>
                                                6.99E-102
                                            </td>
                                            <td className='py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white text-center'>
                                                26.32
                                            </td>
                                            <td className='py-4 px-6 text-sm font-medium text-right whitespace-nowrap'>
                                                <a
                                                    href='#'
                                                    className='text-blue-600 dark:text-blue-500 hover:underline'>
                                                    Analyze
                                                </a>
                                            </td>
                                        </tr> */}
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

export default SimpleTable
