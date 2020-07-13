import React from 'react';
import { withFauxDOM } from 'react-faux-dom'
import * as d3 from 'd3';
import { renderD3 } from '../SDK/testChart.js';

const Test = (props) => {

    React.useEffect(() => {
        var faux = props.connectFauxDOM('div', 'chart');
        var data = [30, 35, 45, 55, 70];
        var title = props.title;
        renderD3(d3, faux, data, title);
    }, []);

    return (
        <div>
            {props.chart}
        </div>
    )
}

const FauxChart = withFauxDOM(Test)

export default FauxChart
