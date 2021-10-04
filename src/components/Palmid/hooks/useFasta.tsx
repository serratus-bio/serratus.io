import { useState } from 'react'
interface FastaHook {
    fastaHash: string
    loadUrlHash: () => boolean
    isPostFastaLoading: boolean
    isPostFastaError: boolean
    isReportReady: boolean
    checkReport: () => void
    postFasta: (rnaSequence: string) => void
    clear: () => void
}
export function useFasta(): FastaHook {
    const [isPostFastaLoading, setIsPostFastaLoading] = useState<boolean>(false)
    const [isPostFastaError, setIsPostFastaError] = useState<boolean>(false)
    const [isReportReady, setIsReportReady] = useState<boolean>(false)
    const [fastaHash, setFastaHash] = useState<string>('')

    function clear() {
        setFastaHash('')
        setIsReportReady(false)
        setIsPostFastaError(false)
        setIsPostFastaLoading(false)
        window.history.replaceState({}, 'RdRP Report', '')
    }

    async function postFasta(rnaSequence: string) {
        try {
            setIsReportReady(false)
            const response = await fetch(
                'https://3niuza5za3.execute-api.us-east-1.amazonaws.com/default/api-lambda',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        sequence: rnaSequence,
                    }),
                }
            )
            if (response.status === 200) {
                const result = await response.text()
                setFastaHash(result)
            }
        } catch (error) {
            setIsPostFastaError(error)
        }
    }

    async function checkReport() {
        try {
            const response = await fetch(
                `https://s3.amazonaws.com/openvirome.com/${fastaHash}.html`
            )
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
            checkReport()
            return true
        } else {
            return false
        }
    }

    return {
        fastaHash,
        loadUrlHash,
        isPostFastaLoading,
        isPostFastaError,
        isReportReady,
        checkReport,
        postFasta,
        clear,
    }
}
