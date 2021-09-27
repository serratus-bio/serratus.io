import React from 'react'
import { Helmet } from 'react-helmet'
import { classesBoxBorder, ExternalLink } from 'common'


export const Palmid = () => {
    const headTags = (
        <Helmet>
            <title>Serratus | palmID</title>
        </Helmet>
    )

    return (
        <div className='min-h-screen w-full sm:bg-gray-100 py-4'>
            {headTags}
            <div className={`py-4 px-6 mx-4 ${classesBoxBorder}`}>
                <h1 className='text-3xl font-bold text-center'>palmID: Viral-RdRP Analysis </h1>
                <p className='my-3'>
                    Sequence, in FASTA format
                </p>

                <form>
                  <div id="sequence submission" className="form-item field textarea required">
                    <textarea
                        id="fasta_sequence"
                        rows={4}
                        cols={72}
                        className="field-element"
                        placeholder=">Enter your sequence (DNA / Protein)"
                        aria-required="true"> 
                    </textarea>
                  </div>
                </form>

                <button
                    className='w-300 m-auto rounded bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4'>
                    Analyze Sequence
                </button>

            </div>
        </div>
    )

}
