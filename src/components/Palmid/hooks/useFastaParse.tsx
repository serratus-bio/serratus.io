import { useEffect } from 'react'
import { useState } from 'react'
interface FastaParse {
    parsedFasta: string
    parsedFastaSequenceHeader: string
    parsedFastaSequenceText: string
}

export function wrap(s: string) {
    return s.replace(/(.{50})/g, '$1\n')
}

export function useFastaParse(fastaText: string): FastaParse {
    const [parsedFasta, setParsedFasta] = useState<string>('')
    const [parsedFastaSequenceHeader, setParsedFastaSequnceHeader] = useState<string>('')
    const [parsedFastaSequenceText, setparsedFastaSequenceText] = useState<string>('')
    const header_text = '>Serratus_palmid'

    useEffect(() => {
        if (fastaText) {
            parseFasta(fastaText)
        } else {
            setParsedFasta('')
            setParsedFastaSequnceHeader('')
            setparsedFastaSequenceText('')
        }
    }, [fastaText])

    function parseFasta(fastaText: string) {
        let header_text = '>Serratus_palmid'
        let seq_text
        let parsed_seq_text

        if (fastaText.search('>') >= 0) {
            // Parse with header
            // Parse first sequence in case of multiple fasta
            fastaText = fastaText.split('>')[1]

            header_text = fastaText.split('\n')[0]
            header_text = '>' + header_text

            // rest is protein sequence
            seq_text = fastaText.split('\n')
            seq_text.shift()
            parsed_seq_text = seq_text.join()
        } else {
            // Parse without header
            //header_text = '>Serratus_palmid'

            // All is protein sequence
            parsed_seq_text = fastaText
        }

        // Parse Fasta Sequenceg
        // remove all non alpha-characters
        parsed_seq_text = parsed_seq_text.replace(/[^A-Za-z]/g, '').toUpperCase()

        // Parsed Fasta Testing (Visual)
        setParsedFasta(header_text.concat('\n', parsed_seq_text))
        setParsedFastaSequnceHeader(header_text)
        setparsedFastaSequenceText(wrap(parsed_seq_text))
    }

    return { parsedFasta, parsedFastaSequenceHeader, parsedFastaSequenceText }
}
