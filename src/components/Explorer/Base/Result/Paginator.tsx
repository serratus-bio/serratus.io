import React from 'react'
import { ResultPagination } from './types'

const resultTotalKey = 'total'

type Props = {
    pageNumber: number
    perPage: number
    setPageNumber: React.Dispatch<React.SetStateAction<number>>
    dataPromise: Promise<ResultPagination> | undefined
}

export const Paginator = ({ pageNumber, perPage, setPageNumber, dataPromise }: Props) => {
    const [numPages, setNumPages] = React.useState(0) // from dataPromise later
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        if (!dataPromise) return
        dataPromise
            .then((data) => {
                const total = data[resultTotalKey]
                const numPages = Math.ceil(total / perPage)
                setNumPages(numPages)
            })
            .catch((_error) => {
                setNumPages(0)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [pageNumber, numPages, dataPromise, perPage])

    if (loading || numPages === 0) return null

    const visibleButton =
        'bg-gray-300 hover:bg-gray-500 mx-2 py-1 px-4 rounded inline-flex items-center'
    const invisibleButton = 'invisible ' + visibleButton

    return (
        <div className='flex flex-row justify-center items-center'>
            {pageNumber === 1 ? (
                <button className={invisibleButton}></button>
            ) : (
                <button className={visibleButton} onClick={() => setPageNumber(pageNumber - 1)}>
                    prev
                </button>
            )}
            Page {pageNumber} out of {numPages}
            {pageNumber === numPages ? (
                <button className={invisibleButton}></button>
            ) : (
                <button className={visibleButton} onClick={() => setPageNumber(pageNumber + 1)}>
                    next
                </button>
            )}
        </div>
    )
}
