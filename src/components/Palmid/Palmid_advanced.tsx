import React, { useState } from 'react'
import Iframe from 'react-iframe'
import { SpinningCircles } from 'react-loading-icons'
import { useFasta } from './hooks/useFasta'

export const Palmid_advanced = () => {
    const { fastaHash, isPostFastaLoading, isPostFastaError, getReport, postFasta } = useFasta()
    const [fastaInput, setFastaInput] = useState<string>('')

    console.log('fastaHash', fastaHash)
    return (
        <>
            <div className='m-4 p-4'>
                <textarea
                    className='border-2 focus:ring-1 rounded focus: outline-none resize-none  mb-2 p-2'
                    id='fastaInput'
                    value={fastaInput}
                    rows={4}
                    cols={72}
                    placeholder='Enter your sequence (DNA / Protein)'
                    aria-required='true'
                    onChange={(e) => {
                        setFastaInput(e.target.value)
                    }}></textarea>

                <br></br>
                <button
                    className='w-300 m-auto rounded bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4'
                    onClick={async () => {
                        await postFasta(fastaInput)
                    }}>
                    Analyze Sequence
                </button>
            </div>

            <div className='min-h-screen m-8 p-4 border-2 rounded flex justify-center items-center'>
                {fastaHash && !isPostFastaLoading ? (
                    <Iframe
                        url={`https://s3.amazonaws.com/openvirome.com/${fastaHash}.html`}
                        width='100%'
                        id='myId'
                        className='min-h-screen'
                        position='relative'
                    />
                ) : (
                    <div className=''>
                        <SpinningCircles
                            fill='#0EA5FD'
                            fillOpacity={1}
                            width={200}
                            speed={1}
                            stroke='#0EA5FD'
                            strokeOpacity={1}
                            strokeWidth={2}
                        />
                    </div>
                )}
            </div>
        </>
    )
}
