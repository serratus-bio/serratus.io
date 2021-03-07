import React from 'react'
import { Helmet } from 'react-helmet';
import GeoReactPlotly from './GeoReactPlotly';
// import GeoPlotlyJs, { renderChart } from './GeoPlotlyJs';

const Geo = () => {
    const headTags = (
        <Helmet>
            <title>Serratus | Geo</title>
        </Helmet>
    )

    // React.useEffect(() => {
    //     renderChart();
    // })

    return (
        <GeoReactPlotly />
    )
}

export default Geo;
