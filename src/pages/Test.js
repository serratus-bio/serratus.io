import React from 'react';
import { withFauxDOM } from 'react-faux-dom'
import * as d3 from 'd3';

const Test = (props) => {

    React.useEffect(() => {
        var data = [30, 35, 45, 55, 70];
        renderD3(data);
    }, []);

    function renderD3(data) {
    
        // This will create a faux div and store its virtual DOM in state.chart
        var faux = props.connectFauxDOM('div', 'chart')
    
        /*
           D3 code below by Alan Smith, http://bl.ocks.org/alansmithy/e984477a741bc56db5a5
           The only changes made for this example are...
           1) feeding D3 the faux node created above
           2) calling this.animateFauxDOM(duration) after each animation kickoff
           3) move data generation and button code to parent component
           4) data and title provided as props by parent component
           5) reattach to faux dom for updates
           6) move rejoining of data and chart updates to updateD3()
           7) code update for D3 version 4
        */
    
        var xBuffer = 50
        var yBuffer = 150
        var lineLength = 400
    
        var svgDoc = d3.select(faux).append('svg')
            .attr("width", 500)
            .attr("height", 500)
    
        svgDoc
          .append('text')
          .attr('x', xBuffer + lineLength / 2)
          .attr('y', 50)
          .text(props.title)
    
        // create axis line
        svgDoc
          .append('line')
          .attr('x1', xBuffer)
          .attr('y1', yBuffer)
          .attr('x1', xBuffer + lineLength)
          .attr('y2', yBuffer)
    
        // create basic circles
        svgDoc
          .append('g')
          .selectAll('circle')
          .data(data)
          .enter()
          .append('circle')
          .attr('cx', function (d, i) {
            var spacing = lineLength / data.length
            return xBuffer + i * spacing
          })
          .attr('cy', yBuffer)
          .attr('r', function (d, i) {
            return d
          })
      };

    return (
        <div>
            {props.chart}
        </div>
    )
}

const FauxChart = withFauxDOM(Test)

export default FauxChart
