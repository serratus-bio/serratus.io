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
        const fastaInput = document.getElementById('fastaInput') as HTMLInputElement
        let fastaText = fastaInput.value

        var header_text = '>Serratus_palmid'
        var seq_text
        var parsed_seq_text
        var parsedFasta = '---'

        if ( fastaText.search(">") >= 0) {
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
        parsedFasta = header_text.concat('\n', parsed_seq_text)

        document.getElementById('faHeader')!.innerHTML = header_text
        document.getElementById('faSeq')!.innerHTML = parsed_seq_text
        document.getElementById('parsedFa')!.innerHTML = parsedFasta
    }

/*    const postFasta = () => {
        var newSrc="placeholder_for_response"

        var data_call = { ["sequence"]: sequence_text_right };
        postData('https://3niuza5za3.execute-api.us-east-1.amazonaws.com/default/api-lambda', data_call)
        .then(data => {
        newSrc = "https://s3.amazonaws.com/openvirome.com/" + SHA1(sequence_text_right) + ".html";
        document.getElementById("iframe").src=newSrc;
        document.getElementById("download_button").href=newSrc;
        document.getElementById('iframe').contentWindow.location.reload()}
      );   

    }
*/

    const postFasta = () => {
        var hashResponse="placeholder_for_response"
        //var fastaData = { ["sequence"]: parsedFasta };

    }

    const getHash = () => {
        var hash = document.getElementById('parsedFa')!.innerHTML
        var hashUrl = '?hash='
        hashUrl = hashUrl.concat(hash)
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
                            aria-required='true'
                            onChange={parseFasta}></textarea>
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
                <p> ============ </p>
                <p> API Submission Fasta: </p>
                <p id='parsedFa' ></p>
                <p> ============ </p>

                <button
                className='w-300 m-auto rounded bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4'
                onClick={postFasta}>
                Post Fasta
                </button>
                <p>Post API:</p>
                <p id='postApi'> </p>

            </div>

            <div className={`py-4 px-6 mx-4 ${classesBoxBorder}`}>
            <a className='text-blue-600' href='?hash=ERR2756788'>
            Frank the Bat (ERR2756788)</a>
            <p> ---------------------- </p>
            <button
                className='w-300 m-auto rounded bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4'
                onClick={postFasta}>
                Retrieve Report
            </button>
            <iframe id="palmReport"
                title="Inline Frame Example"
                width="100%"
                height="400"
                //src="https://s3.amazonaws.com/openvirome.com/3xample.html"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-0.004017949104309083%2C51.47612752641776%2C0.00030577182769775396%2C51.478569861898606&layer=mapnik">
            </iframe>
            </div>



        </div>
    )
}
