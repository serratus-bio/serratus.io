import React from 'react'
import { Helmet } from 'react-helmet'
import { classesBoxBorder, ExternalLink } from 'common'

export const Palmid = () => {
    const headTags = (
        <Helmet>
            <title>Serratus | palmID</title>
        </Helmet>
    )

    const parseFasta = () => {
        var fastaInput = document.getElementById("fastaInput") as HTMLInputElement
        var fastaText = fastaInput.value

        // Parse first sequence in case of multiple fasta
        fastaText = fastaText.split('>')[1]

        // first element is header
        if (fastaText.split('\n')[0] == undefined){
            var header_text = ">Serratus_palmid"
        } else {
            header_text = ">" + fastaText.split('\n')[0]
        }
            
        // rest is protein sequence
        var seq_text = fastaText.split('\n')
        seq_text.shift()
        var parsed_seq_text = seq_text.join()

        // remove all non alpha-characters
        parsed_seq_text = parsed_seq_text.replace(/[^A-Za-z]/g, '').toUpperCase()

        // Parsed Fasta Testing (Visual)
        document.getElementById('faHeader')!.innerHTML = header_text
        document.getElementById('faSeq')!.innerHTML = parsed_seq_text

    }

    return (
        <div className='min-h-screen w-full sm:bg-gray-100 py-4'>
            {headTags}
            <div className={`py-4 px-6 mx-4 ${classesBoxBorder}`}>
                <h1 className='text-3xl font-bold text-center'>palmID: Viral-RdRP Analysis </h1>
                <p className='my-3'>Sequence, in FASTA format</p>

                <form id='submissionForm'>
                    <div id='sequenceSec' className='form-item field textarea required'>
                        <textarea
                            id='fastaInput'
                            rows={4}
                            cols={72}
                            className='field-element'
                            placeholder='>Enter your sequence (DNA / Protein)'
                            aria-required='true'></textarea>
                    </div>
                </form>

                <button
                    className='w-300 m-auto rounded bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4'
                    onClick={parseFasta}>
                    Analyze Sequence
                </button>

                <p>Parsed Fasta:</p>
                <p id='faHeader'> </p>
                <p id='faSeq'> </p>


            </div>
        </div>
    )
}
