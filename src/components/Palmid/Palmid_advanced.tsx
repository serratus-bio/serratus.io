import React, { useEffect, useState } from 'react'
import Iframe from 'react-iframe'
//import { SpinningCircles } from 'react-loading-icons'
import { useFasta } from './hooks/useFasta'
import { useFastaParse } from './hooks/useFastaParse'

export const Palmid_advanced = () => {
    const REQUEST_INTERVAL = 5000 // 5 sec

    const { fastaHash, loadUrlHash, isReportReady, checkReport, postFasta, clear } = useFasta()
    const [fastaInput, setFastaInput] = useState<string>('')
    const [showIframe, setShowIframe] = useState<boolean>(false)
    const { parsedFasta, parsedFastaSequenceHeader, parsedFastaSequenceText } = useFastaParse(
        fastaInput
    )

    useEffect(() => {
        let interval: any
        if (fastaHash) {
            // Change URL to display hash search. No Refresh
            window.history.replaceState({}, 'RdRP Report', '?hash=' + fastaHash)
            if (!isReportReady) {
                // first call
                checkReport()

                //later calls
                interval = setInterval(() => {
                    checkReport()
                }, REQUEST_INTERVAL)
                return () => clearInterval(interval)
            } else {
                // stop the api call to check for report
                clearInterval(interval)
            }
        }
    }, [fastaHash, isReportReady])

    window.onload = function () {
        let hashExists = false
        hashExists = loadUrlHash()

        if (hashExists) {
            setShowIframe(true)
        }
    }

    return (
        <>
            <h1 className='text-3xl m-2 font-bold text-center '>palmID: Viral-RdRP Analysis</h1>
            <div className='m-4 p-4'>
                <p className='my-3'>Sequence, in FASTA format</p>
                <textarea
                    className='border-2 focus:ring-1 rounded focus: outline-none resize-none  mb-2 p-2'
                    id='fastaInput'
                    value={fastaInput}
                    rows={4}
                    cols={72}
                    placeholder='>Enter your sequence (DNA / Protein)'
                    aria-required='true'
                    onChange={(e) => {
                        setFastaInput(e.target.value)
                    }}></textarea>
                <div className='white-space: pre-line'>
                    <p>{`Parsed FASTA: `}</p>
                    <pre>
                        {parsedFastaSequenceHeader}
                        <br></br>
                        {parsedFastaSequenceText}
                    </pre>
                </div>
                <br></br>
                <div>
                    <button
                        className='w-300 m-auto rounded bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4'
                        onClick={async () => {
                            setShowIframe(true)
                            await postFasta(parsedFasta)
                        }}>
                        Analyze Sequence
                    </button>
                    <button
                        className='ml-4 w-300 m-auto rounded bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4'
                        onClick={async () => {
                            window.history.replaceState({}, '', '')
                            setShowIframe(false)
                            setFastaInput('')
                            clear()
                        }}>
                        Clear
                    </button>
                    <code> hash: {fastaHash}</code>
                </div>
            </div>
            {showIframe && (
                <div className='min-h-screen flex-col m-8 p-4 border-2 rounded flex justify-center items-center'>
                    {isReportReady ? (
                        <Iframe
                            url={`https://s3.amazonaws.com/openvirome.com/${fastaHash}.html`}
                            width='100%'
                            id='myId'
                            className='min-h-screen'
                            position='relative'
                        />
                    ) : (
                        <>
                            <div className='justify-center'>
                                {/*<SpinningCircles
                                    fill='#0EA5FD'
                                    fillOpacity={1}
                                    width={200}
                                    speed={1}
                                    stroke='#0EA5FD'
                                    strokeOpacity={1}
                                    strokeWidth={2}
                                />*/}
                                <img
                                    src='/load_palmid.gif'
                                    alt='Loading gif'
                                    width='100%'
                                    height='100%'></img>
                            </div>
                            <div className='text-blue-500 text-lg m-2 animate-pulse'>
                                Analyzing RdRP...
                            </div>
                        </>
                    )}
                </div>
            )}
        </>
    )
}
