import React from 'react';
import { Helmet } from 'react-helmet';
import { withFauxDOM } from 'react-faux-dom'
import * as d3 from 'd3';
import { drawExploreFamilyChart } from '../SDK/drawExploreFamilyChart.js';
import { createD3RangeSlider } from '../SDK/d3RangeSlider.js';

import data from '../data/CoV_scoreID.json';

const Explore = (props) => {
    const headTags = (
        <Helmet>
            <title>Serratus | Explore</title>
            <script src="https://cdn.rawgit.com/RasmusFonseca/d3RangeSlider/master/d3RangeSlider.js"></script>
            <link href="https://cdn.rawgit.com/RasmusFonseca/d3RangeSlider/master/d3RangeSlider.css" rel="stylesheet"></link>
        </Helmet>
    )
    React.useEffect(() => {
        var faux = props.connectFauxDOM('div', 'chart');

        // var script = document.createElement('script');
        // script.src = "https://cdn.rawgit.com/RasmusFonseca/d3RangeSlider/master/d3RangeSlider.js";
        // script.async = true;
        // script.defer = true;
        // document.body.appendChild(script);
        // script.onload = () => {
        //     var d3 = d3;
        //     drawExploreFamilyChart(d3, window.createD3RangeSlider, faux, data);
        //   };
        var familyData = data["Coronaviridae"];
        drawExploreFamilyChart(d3, createD3RangeSlider, faux, familyData);
    }, []);

    return (
        <div>
            {headTags}
            {props.chart}
        </div>
    )
}

export default withFauxDOM(Explore);
