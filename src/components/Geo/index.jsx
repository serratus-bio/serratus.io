import React from 'react'
import ReactDOM from "react-dom";
import { Helmet } from 'react-helmet';
import MapPlot from './MapPlot';
import SelectionInfo from './SelectionInfo';
import {
    ExternalLink,
    helpIcon
} from '../../common/Helpers';


function Details({ defaultOpen = false, title, children }) {
  function handleKey({ key }) {
    [" ", "return"].includes(key) && setOpen(o => !o);
  }
  const [open, setOpen] = React.useState(defaultOpen);
  console.log(open);
  return (
    <details
      open={defaultOpen}
      onKeyDown={handleKey}
      onClick={() => setOpen(o => !o)}
    >
      <summary>{title}</summary>
      {open && children}
    </details>
  );
}

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


        <div><Details title={helpIcon} defaultOpen={false}>
        <p>We searched 5.7 million public sequencing libraries for the RNA virus hallmark gene, RNA-dependent RNA Polymerase (RdRP).</p>
        
        <p>This map shows the location of BioSamples from which an intact RdRP sequence could be recovered and geographical meta-data was present.</p>
        
        <p> A 100-meter randomization is applied to all points to prevent overplotting.</p>
        </Details></div>

        <div className="my-2">
            <MapPlot setSelectedPoints={setSelectedPoints} />
        </div>

        <div class="text-left text-gray-500">Use the `Box Select` or `Lasso Select` icons in the top-right to retrieve a list of sample details below the map.</div>

        <div className="text-center">Beta Version. Feedback is welcome.</div>

        <SelectionInfo selectedPoints={selectedPoints} />
    </div>
}

export default Geo;
