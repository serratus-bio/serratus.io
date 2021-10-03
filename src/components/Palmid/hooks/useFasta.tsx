import { useState } from 'react'
interface FastaHook {
    fastaHash: string
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
            if (!isReportReady) {
                const response = await fetch(
                    `https://s3.amazonaws.com/openvirome.com/${fastaHash}.html`
                )
                if (response.status === 200) {
                    setIsReportReady(true)
                } else {
                    setIsReportReady(false)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    return {
        fastaHash,
        isPostFastaLoading,
        isPostFastaError,
        isReportReady,
        checkReport,
        postFasta,
        clear,
    }
}