import React from 'react'
import { Helmet } from 'react-helmet';
import GeoReactPlotly from './GeoReactPlotly';

const Geo = () => {
    const headTags = (
        <Helmet>
            <title>Serratus | Geo</title>
        </Helmet>
    )

    return <>
        {headTags}
        <GeoReactPlotly />
    </>
}

export default Geo;
