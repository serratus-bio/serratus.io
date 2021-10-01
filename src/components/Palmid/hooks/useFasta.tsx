import { useState } from 'react'
interface FastaHook {
    fastaHash: string
    isPostFastaLoading: boolean
    isPostFastaError: boolean
    getReport: (fastafastaHash: string) => void
    postFasta: (rnaSequence: string) => void
}
export function useFasta(): FastaHook {
    const x =
        '>SRR9968562_waxsystermes_virus_microassembly\nPIWDRVLEPLMRASPGIGRYMLTDVSPVGLLRVFKEKVDTTPHMPPEGMEDFKKASKEVE\nKTLPTTLRELSWDEVKEMIRNDAAVGDPRWKTALEAKESEEFWREVQAEDLNHRNGVCLR\nGVFHTMAKREKKEKNKWGQKTSRMIAYYDLIERACEMRTLGALNADHWAGEENTPEGVSG\nIPQHLYGEKALNRLKMNRMTGETTEGQVFQGDIAGWDTRVSEYELQNEQRICEERAESED\nHRRKIRTIYECYRSPIIRVQDADGNLMWLHGRGQRMSGTIVTYAMNTITNAIIQQAVSKD\nLGNTYGRENRLISGDDCLVLYDTQHPEETLVAAFAKYGKVLKFEPGEPTWSKNIENTWFC\nSHTYSRVKVGNDIRIMLDRSEIEILGKARIVLGGYKTGEVEQAMAKGYANYLLLTFPQRR\nNVRLAANMVRAIVPRGLLPMGRAKDPWWREQPWMSTNNMIQAFNQIWEGWPPISSMKDIK\nYVGRAREQMLDST'
    const [isPostFastaLoading, setIsPostFastaLoading] = useState<boolean>(false)
    const [isPostFastaError, setIsPostFastaError] = useState<boolean>(false)
    const [fastaHash, setFastaHash] = useState<string>('')

    async function postFasta(rnaSequence: string) {
        try {
            const response = await fetch(
                'https://3niuza5za3.execute-api.us-east-1.amazonaws.com/default/api-lambda',
                {
                    method: 'POST',
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

    async function getReport(fastafastaHash: string) {
        const response = await fetch(
            `https://s3.amazonaws.com/openvirome.com/${fastafastaHash}.html`
        )
        console.log(response)
    }

    return { fastaHash, isPostFastaLoading, isPostFastaError, getReport, postFasta }
}
