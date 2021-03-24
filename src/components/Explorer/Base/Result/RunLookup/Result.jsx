import React from 'react';
import FamilyResult from './FamilyResult';


// for run -> family/sequence lookup
const RunLookupResult = ({runId}) => {
    function drilldownCallback(family) { console.log(`${family}`) };

    return <>
        <FamilyResult
            runId={runId}
            drilldownCallback={drilldownCallback}
        />
    </>
}

export default RunLookupResult;
