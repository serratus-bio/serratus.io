import React from "react";
import {
    LinkButton,
    downloadIcon,
} from 'common';
import {
    tryGetGenBankTitle,
    tryGetSraStudyName,
} from './EntrezApiCalls';
import {
    getMatchesDownloadUrl,
} from './MatchingRuns/SerratusApiCalls';
import { BaseContext } from 'components/Explorer/Base/BaseContext';

export const getTitle = async (searchLevel, searchLevelValue, searchLevelValueCorrected) => {
    console.log("Fetching Entrez data...");
    let title = null;
    switch (searchLevel) {
        case "family":
            if (searchLevelValue === "AMR") {
                title = "The Comprehensive Antibiotic Resistance Database (CARD)";
            }
            break;
        case "sequence":
            if (searchLevelValue !== searchLevelValueCorrected) {
                title = await tryGetGenBankTitle(searchLevelValueCorrected);
                title = `[AMR] ${title}`;
            }
            else {
                title = await tryGetGenBankTitle(searchLevelValue);
            }
            break;
        case "run":
            title = await tryGetSraStudyName(searchLevelValue);
            break;
        default:
    }
    console.log(title ? "Done fetching Entrez data." : "Could not load Entrez data.");
    return title;
}

export const DownloadButton = ({searchLevel, searchLevelValue, identityLims, scoreLims}) => {
    const context = React.useContext(BaseContext);
    const downloadUrl = getMatchesDownloadUrl(context.searchType, searchLevel, searchLevelValue, identityLims, scoreLims);
    return (
        <div className="flex justify-center">
            <LinkButton
                link={downloadUrl}
                text="Download Matches"
                icon={downloadIcon}
                download={true} />
        </div>
    )
}
