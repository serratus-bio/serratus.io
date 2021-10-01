import { useState } from "react";
export type PostFastaHook = [string, boolean,boolean, (param:string)=>void]
export function usePostFasta():PostFastaHook{
    const x = ">SRR9968562_waxsystermes_virus_microassembly\nPIWDRVLEPLMRASPGIGRYMLTDVSPVGLLRVFKEKVDTTPHMPPEGMEDFKKASKEVE\nKTLPTTLRELSWDEVKEMIRNDAAVGDPRWKTALEAKESEEFWREVQAEDLNHRNGVCLR\nGVFHTMAKREKKEKNKWGQKTSRMIAYYDLIERACEMRTLGALNADHWAGEENTPEGVSG\nIPQHLYGEKALNRLKMNRMTGETTEGQVFQGDIAGWDTRVSEYELQNEQRICEERAESED\nHRRKIRTIYECYRSPIIRVQDADGNLMWLHGRGQRMSGTIVTYAMNTITNAIIQQAVSKD\nLGNTYGRENRLISGDDCLVLYDTQHPEETLVAAFAKYGKVLKFEPGEPTWSKNIENTWFC\nSHTYSRVKVGNDIRIMLDRSEIEILGKARIVLGGYKTGEVEQAMAKGYANYLLLTFPQRR\nNVRLAANMVRAIVPRGLLPMGRAKDPWWREQPWMSTNNMIQAFNQIWEGWPPISSMKDIK\nYVGRAREQMLDST"
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError,setIsError] = useState<boolean>(false);
    const [hash, setHash] = useState<string>('');

    async function postPasta(rnaSequence:string){
        try {
            const response = await fetch(
              'https://3niuza5za3.execute-api.us-east-1.amazonaws.com/default/api-lambda',{
                  method: 'POST',
                  body: JSON.stringify({
                      sequence: rnaSequence
                  })
              }
            );
            if(response.status === 200){
            const result = await response.text();
            setHash(result)
            }
          } catch (error) {
            setIsError(error);
          }
    }

return [hash,isLoading,isError,postPasta]
}