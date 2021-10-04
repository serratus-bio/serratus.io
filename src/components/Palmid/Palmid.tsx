import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { classesBoxBorder } from 'common'
import axios from 'axios'
// Global variables for webpage
let PARSEDFASTA = 'no_fasta_input'
let FAHASH = 'no_api_response'
let REPORTURL = 'NA'
const OV = 'https://s3.amazonaws.com/openvirome.com/'

// API
const apiUrl = 'https://3niuza5za3.execute-api.us-east-1.amazonaws.com/default/api-lambda'

export async function submitFasta(faSubmit: string) {
    const response = await axios.post(`${apiUrl}`, {
        sequence: faSubmit,
    })
    return response.data
}

// Fake API call because I'm a newb
export function fakeSubmit(faSubmit: string) {
    // An API call which returns the hash of submit sequence
    // goes here
    faSubmit = '3xample'

    return faSubmit
}

export function wrap(s: string) {
    return s.replace(/(.{50})/g, '$1<br>')
}

// Webpage
export const Palmid = () => {
    const [isCollapsed, setIsCollapsed] = React.useState<boolean>(true)

    const headTags = (
        <Helmet>
            <title>Serratus | palmID</title>
        </Helmet>
    )
    const parseFasta = () => {
        const fastaInput = document.getElementById('fastaInput') as HTMLInputElement
        let fastaText = fastaInput.value

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
        PARSEDFASTA = header_text.concat('\n', parsed_seq_text)

        //return(PARSEDFASTA)

        document.getElementById('faHeader')!.innerHTML = header_text
        document.getElementById('faSeq')!.innerHTML = wrap(parsed_seq_text)
        //document.getElementById('faSubmit')!.innerHTML = PARSEDFASTA
    }

    const postFasta = () => {
        //PARSEDFASTA = parseFasta()
        FAHASH = fakeSubmit(PARSEDFASTA)
        document.getElementById('postApi')!.innerHTML = FAHASH

        //Redirect to hash search page
        window.location.search = '?hash='
    }

    // Parse URL-Search & Display Report
    let urlParams = new URLSearchParams(document.location.search.substring(1))
    let pageHash = urlParams.get('hash')

    const showReport = () => {
        if (pageHash == null) {
            // Show Fasta Submission Form
            // Default

            // Hide PalmID Report window
            document.getElementById('palmReport')!.style.height = '0'
            document.getElementById('palmReport')!.style.width = '0%'

            REPORTURL = '/Frank_Ginger.png'
            document.getElementById('reportUrl')!.innerHTML = REPORTURL
            document.getElementById('palmReport')!.setAttribute('src', REPORTURL)
        } else {
            // Hide Fasta Submission Form
            setIsCollapsed(!isCollapsed)

            // Show PalmID Report window
            document.getElementById('palmReport')!.style.height = '400'
            document.getElementById('palmReport')!.style.width = '100%'

            REPORTURL = OV.concat(pageHash, '.html')
            // FOR DEV USE STATIC IMAGE
            REPORTURL = '/Frank_Ginger.png'
            document.getElementById('reportUrl')!.innerHTML = REPORTURL
            document.getElementById('palmReport')!.setAttribute('src', REPORTURL)
        }
    }

    window.onload = function () {
        showReport()
    }

    return (
        <div className='min-h-screen w-full sm:bg-gray-100 py-4'>
            {headTags}
            {/*HEADER*/}
            <h1 className='text-3xl font-bold text-center'>palmID: Viral-RdRP Analysis</h1>

            <p> [DEV] URL hash : {pageHash} </p>

            {/*FASTA Submission Box*/}
            <div id='faSubmissionBox' className={`py-4 px-6 mx-4 ${classesBoxBorder}`}>
                <button
                    className='text-left collapse-button'
                    onClick={() => setIsCollapsed(!isCollapsed)}>
                    [Sequence Submission]
                </button>

                <div
                    id='faSubmissionForm'
                    className={`collapse-content ${!isCollapsed ? 'collapsed' : 'expanded'}`}
                    aria-expanded={isCollapsed}>
                    {/*Fasta parsing and submission form*/}
                    <p className='my-3'>Sequence, in FASTA format</p>

                    <form id='submissionForm'>
                        <div id='sequenceSec' className='form-item field textarea required'>
                            <textarea
                                id='fastaInput'
                                rows={4}
                                cols={72}
                                className='field-element'
                                placeholder='>Enter your sequence (DNA / Protein)'
                                aria-required='true'
                                onChange={parseFasta}></textarea>
                        </div>

                        <p>Parsed Fasta:</p>
                        <code id='faHeader'> </code>
                        <p></p>
                        <code id='faSeq'> </code>
                        <p></p>

                        <button
                            className='w-300 m-auto rounded bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4'
                            onClick={postFasta}>
                            Analyze Sequence
                        </button>
                    </form>
                </div>
                <p>[DEV] Post API:</p>
                <p id='postApi'> </p>
            </div>

            <div className={`py-4 px-6 mx-4 ${classesBoxBorder}`}>
                <p>[DEV] Report URL: </p>
                <p id='reportUrl'></p>
                <iframe
                    id='palmReport'
                    title='Inline Frame Example'
                    width='25%'
                    height='400'
                    src='/load_palmid.gif'></iframe>
            </div>
        </div>
    )
}
