import React from 'react'

export const LoadIcon = () => {
    const elementRef = React.useRef(null)

    React.useEffect(() => {
        if (!elementRef?.current) {
            return
        }
        const divElement = elementRef?.current as HTMLElement
        divElement?.classList.add('opacity-100')
    }, [elementRef])

    return (
        <div
            ref={elementRef}
            className='flex flex-col items-center content-center justify-center w-full h-full opacity-0 transition-opacity ease-in duration-700'>
            <div className='text-center my-4'>Loading... (this might take a while)</div>
            <img className='w-36 h-36' src='/load_palmid.gif' alt='Loading gif' />
        </div>
    )
}
