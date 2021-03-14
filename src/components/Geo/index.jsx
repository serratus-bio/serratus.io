import React from 'react'
import { Helmet } from 'react-helmet';
import MapPlot from './MapPlot';
import SelectionInfo from './SelectionInfo';
import {
    ExternalLink,
    helpIcon
} from '../../common/Helpers';
const Geo = () => {
    const [selectedPoints, setSelectedPoints] = React.useState();

    const headTags = (
        <Helmet>
            <title>Serratus | Planetary RNA Virome</title>
        </Helmet>
    )

    return <div className="mx-4 my-2">
        {headTags}
        <div className="text-center text-xl">The Planetary RNA Virome</div>

        <ExternalLink className='ml-2 mb-1' title="We searched 5.7 million public sequencing libraries for the RNA virus hallmark gene, RNA-dependent RNA Polymerase (RdRP). This map shows the location of BioSamples from which an intact RdRP sequence could be recovered and geographical meta-data was present.">{helpIcon}</ExternalLink>

        <button class="addMore" title="Use the <b>Box Select</b> or <b>Lasso Select</b> icons in the top-right to retrieve a detailed sample list below the map.">select data</button>


        <div className="my-2">
            <MapPlot setSelectedPoints={setSelectedPoints} />
        </div>

        <div className="text-center">Beta Version. Feedback is welcome.</div>

        <SelectionInfo selectedPoints={selectedPoints} />
    </div>
}

export default Geo;
