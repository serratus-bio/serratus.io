import React from 'react';
import {
    getPageLinks,
    getTitle,
} from "../../helpers/ExplorerHelpers";

export default (props) => {
    const queryType = props.queryType;
    const queryValue = props.queryValue;
    const identityLims = props.identityLims;
    const coverageLims = props.coverageLims;
    const [pageTitle, setPageTitle] = React.useState();
    const [queryValueCorrected, setQueryValueCorrected] = React.useState(queryValue);
    const links = getPageLinks(queryType, queryValueCorrected);

    React.useEffect(() => {
        if (!queryValue) {
            return;
        }
        console.log(`Loading query result page for ${queryType}=${queryValue}.`);
        // check for AMR accession
        let valueCorrected = queryValue;
        if (queryType === "genbank") {
            let patternForAMR = /.*_\d{7}/g;
            let isFromAMR = queryValue.match(patternForAMR);
            if (isFromAMR) {
                valueCorrected = valueCorrected.slice(0, valueCorrected.lastIndexOf("_"));
                setQueryValueCorrected(valueCorrected);
            }
        }
        getTitle(queryType, queryValue, valueCorrected).then(setPageTitle);
    }, [queryType, queryValue]);

    return (
        <div>
            <div>
                <div className="w-full text-center">
                    <div>
                        <div className="text-xl font-bold">{queryValue}</div>
                        {pageTitle && <div className="text-lg italic">{pageTitle}</div>}
                    </div>
                </div>
                <div className="flex justify-center items-center my-2">
                    {links}
                </div>
            </div>
            <div>identity: {identityLims}</div>
            <div>coverage: {coverageLims}</div>
        </div>
    )
}