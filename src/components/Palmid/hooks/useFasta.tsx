import { useEffect, useState } from 'react'
// Global variables for webpage
const s3Url = 'https://s3.amazonaws.com/openvirome.com'
const apiUrl = 'https://3niuza5za3.execute-api.us-east-1.amazonaws.com/default/api-lambda'

interface FastaHook {
    fastaHash: string
    isPostFastaLoading: boolean
    isPostFastaError: boolean
    isReportReady: boolean
    isCheckReportTimedOut: boolean
    checkReport: () => void
    loadUrlHash: () => boolean
    postFasta: (_rnaSequence: string) => void
    clear: () => void
}
export function useFasta(): FastaHook {
    const [isPostFastaLoading, setIsPostFastaLoading] = useState<boolean>(false)
    const [isPostFastaError, setIsPostFastaError] = useState<boolean>(false)
    const [isReportReady, setIsReportReady] = useState<boolean>(false)
    const [fastaHash, setFastaHash] = useState<string>('')
    const [checkReportRequestCount, setCheckReportRequestCount] = useState<number>(0)
    const [isCheckReportTimedOut, setIsCheckReportTimedOut] = useState<boolean>(false)

    function clear() {
        setFastaHash('')
        setIsReportReady(false)
        setIsPostFastaError(false)
        setIsPostFastaLoading(false)
        setCheckReportRequestCount(0)
        setIsCheckReportTimedOut(false)
        window.history.replaceState({}, 'RdRP Report', '')
    }

    useEffect(() => {
        // This translates to 120 requests * 5 seconds per request = 10 minutes.
        // This should represent the maximum execution time of the Lambda function.
        if (checkReportRequestCount >= 120) {
            setIsCheckReportTimedOut(true)
        }
    }, [checkReportRequestCount])

    async function postFasta(rnaSequence: string) {
        try {
            setIsReportReady(false)
            setCheckReportRequestCount(0)
            setIsCheckReportTimedOut(false)

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sequence: rnaSequence,
                }),
            })
            if (response.status === 200) {
                const result = await response.text()
                setFastaHash(result)
            }
        } catch (error: any) {
            setIsPostFastaError(error)
        }
    }

    async function checkReport() {
        try {
            const response = await fetch(`${s3Url}/${fastaHash}.html`)
            setCheckReportRequestCount((count) => count + 1)
            if (response.status === 200) {
                setIsReportReady(true)
            } else {
                setIsReportReady(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    function loadUrlHash() {
        // Parse URL-Search & Display Report
        let urlParams = new URLSearchParams(document.location.search.substring(1))
        let urlHash = urlParams.get('hash')

        if (urlHash != null) {
            setFastaHash(urlHash)
            return true
        } else {
            return false
        }
    }

    return {
        fastaHash,
        loadUrlHash,
        isCheckReportTimedOut,
        isPostFastaLoading,
        isPostFastaError,
        isReportReady,
        checkReport,
        postFasta,
        clear,
    }
}
