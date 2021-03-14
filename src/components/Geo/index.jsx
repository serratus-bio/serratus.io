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

       <button className="We searched 5.7 million public sequencing libraries for the RNA virus hallmark gene, RNA-dependent RNA Polymerase (RdRP). This map shows the location of BioSamples from which an intact RdRP sequence could be recovered and geographical meta-data was present. A 100-meter randomization is added to all points to avoid overplotting.">
            Info
        </button>

        <button className="w-full m-auto rounded bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4"
             title="Use the `Box Select` or `Lasso Select` icons in the top-right to retrieve a detailed sample list below the map.">
            Selecting Data
        </button>


        <div className="my-2">
            <MapPlot setSelectedPoints={setSelectedPoints} />
        </div>

        <div className="text-center">Beta Version. Feedback is welcome.</div>

        <SelectionInfo selectedPoints={selectedPoints} />
    </div>
}

export default Geo;
