import React from 'react'
import { Helmet } from 'react-helmet';
import GeoReactPlotly from './GeoReactPlotly';
import SelectionInfo from './SelectionInfo';

const Geo = () => {
    const [selectedPoints, setSelectedPoints] = React.useState();

    const headTags = (
        <Helmet>
            <title>Serratus | Geo</title>
        </Helmet>
    )

    return <>
        {headTags}
        <GeoReactPlotly setSelectedPoints={setSelectedPoints} />
        <SelectionInfo selectedPoints={selectedPoints} />
    </>
}

export default Geo;
