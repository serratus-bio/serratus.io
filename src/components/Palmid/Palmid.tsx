import React, { useEffect, useState } from 'react'
import Iframe from 'react-iframe'
import { useFasta } from './hooks/useFasta'
import { useFastaParse } from './hooks/useFastaParse'
// Global variables for webpage
const s3Url = 'https://s3.amazonaws.com/openvirome.com'

export const Palmid = () => {
    const REQUEST_INTERVAL = 5000 // 5 sec

    const {
        fastaHash,
        loadUrlHash,
        isReportReady,
        isCheckReportTimedOut,
        checkReport,
        postFasta,
        clear,
    } = useFasta()
    const [fastaInput, setFastaInput] = useState<string>('')
    const [showIframe, setShowIframe] = useState<boolean>(false)
    const { parsedFasta, parsedFastaSequenceHeader, parsedFastaSequenceText } = useFastaParse(
        fastaInput
    )
    const [isFastaCollapsed, setIsFastaCollapsed] = React.useState<boolean>(true)

    useEffect(() => {
        let interval: any

        if (fastaHash) {
            // Change URL to display hash search. No Refresh
            window.history.replaceState({}, 'RdRP Report', '?hash=' + fastaHash)
            if (!isReportReady && !isCheckReportTimedOut) {
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
    }, [fastaHash, isReportReady, isCheckReportTimedOut])

    // Request timeout after 5 minutes
    useEffect(() => {
        if (isCheckReportTimedOut && !isReportReady) {
            setShowIframe(false)
        }
    }, [isCheckReportTimedOut, isReportReady])

    useEffect(() => {
        let hashExists = false
        hashExists = loadUrlHash()
        if (hashExists) {
            setShowIframe(true)
            setIsFastaCollapsed(!isFastaCollapsed)
        }
    }, [])

    return (
        <>
            <h1 className='text-3xl m-2 font-bold text-center '>palmID: Viral-RdRP Analysis</h1>

            <button
                className='m-auto rounded bg-blue-500 hover:bg-blue-700 text-white font-bold py-0.5 collapse-button'
                onClick={() => setIsFastaCollapsed(!isFastaCollapsed)}>
                Sequence Submission
            </button>
            <div
                id='fastaSubmission'
                className={`m-4 p-4 collapse-content ${
                    !isFastaCollapsed ? 'collapsed' : 'expanded'
                }`}
                aria-expanded={isFastaCollapsed}>
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
                    <code> hash: {fastaHash}</code>
                </div>
                <br></br>
                <div>
                    <button
                        className='w-300 m-auto rounded bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-200'
                        disabled={!fastaInput}
                        onClick={async () => {
                            setShowIframe(true)
                            setIsFastaCollapsed(!isFastaCollapsed)
                            await postFasta(parsedFasta)
                        }}>
                        Analyze Sequence
                    </button>
                    <button
                        className='ml-4 w-300 m-auto rounded bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4'
                        onClick={async () => {
                            window.location.search = '?hash=3xample'
                        }}>
                        Load Example
                    </button>
                    <button
                        className='ml-4 w-300 m-auto rounded bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-4'
                        onClick={async () => {
                            window.history.replaceState({}, '', '')
                            setShowIframe(false)
                            setFastaInput('')
                            clear()
                        }}>
                        Clear
                    </button>
                </div>
            </div>
            {isCheckReportTimedOut && !isReportReady && (
                <div className='m-4 p-4 flex flex-col items-center justify-center'>
                    <p className='text-yellow-900 text-xl animate-pulse'>Request timed out...</p>
                    <p> No viral RdRP identified in input sequence (or a server error occured). </p>
                    <br />
                    <p>
                        If you think this is an error, please{' '}
                        <a
                            href='https://github.com/serratus-bio/serratus.io/issues'
                            className='text-blue-500'>
                            open an issue
                        </a>{' '}
                        with the following details to help improve palmID:
                    </p>
                    <br />
                    <p>{`Hash: ${fastaHash}`}</p>
                    <p>{`Submission time (ISO): ${new Date().toISOString()}`}</p>
                </div>
            )}
            {showIframe && (
                <div className='min-h-screen flex-col m-8 p-4 b order-2 rounded flex justify-center items-center'>
                    {isReportReady ? (
                        <Iframe
                            url={`${s3Url}/${fastaHash}.html`}
                            width='100%'
                            id='myId'
                            className='min-h-screen'
                            position='relative'
                        />
                    ) : (
                        <>
                            <div id='myLoad' className='justify-center'>
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
