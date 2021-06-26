import React from 'react'
import { ResultPagination } from './types'

type Props = {
    page: number
    setPage: React.Dispatch<React.SetStateAction<number>>
    perPage: number
    dataPromise: Promise<ResultPagination> | undefined
}

export const Paginator = ({ page, perPage, setPage, dataPromise }: Props) => {
    const [numPages, setNumPages] = React.useState(0)
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        dataPromise
            ?.then((data) => {
                setNumPages(Math.ceil(data.total / perPage))
            })
            .catch((_error) => {
                setNumPages(0)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [page, dataPromise, perPage])

    if (loading || numPages === 0) return null

    const buttonStyle =
        'bg-gray-200 hover:bg-gray-500 mx-2 py-1 px-4 rounded inline-flex items-center'

    const prevButtonProps =
        page === 1
            ? { className: `invisible ${buttonStyle}` }
            : { className: buttonStyle, onClick: () => setPage(page - 1) }
    const nextButtonProps =
        page === numPages
            ? { className: `invisible ${buttonStyle}` }
            : { className: buttonStyle, onClick: () => setPage(page + 1) }

    return (
        <div className='flex flex-row justify-center items-center'>
            <button {...prevButtonProps}>prev</button>
            Page {page} out of {numPages}
            <button {...nextButtonProps}>next</button>
        </div>
    )
}
