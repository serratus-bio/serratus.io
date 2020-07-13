import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import DataSdk from '../SDK/DataSdk';

const Visual = (props) => {
    const [data, setData] = useState([100, 25, 35, 45, 85]);
    const [summaryJson, setSummaryJson] = useState({});
    const [heatMap, setHeatMap] = useState("");
    const dataSdk = new DataSdk();

    // These are the refs we can hook into for d3
    const canvasRef = useRef();
    const svgRef = useRef();

    //hardcode api test
    async function draw() {
        const sraHeatMap = await dataSdk.getSraHeatMapByName("DRR000746")
        const heatMap = URL.createObjectURL(sraHeatMap)
        setHeatMap(heatMap)
        console.log(heatMap)
        // drawHeatmap(summaryJson, svgRef.current);
    }

    //Hardcode api test
    const getJson = async () => {
        const summaryJsonFromAPI = await dataSdk.getSraByName("DRR000745");
        setSummaryJson(summaryJsonFromAPI);
        console.log(summaryJsonFromAPI)
    }

    function drawHeatmap(summary, selector) {
        var cvgCartoonMap = {
            '_': 0,
            '.': 0.25,
            'o': 0.5,
            'O': 1
        }
    
        function getFamilyCoverageData(family) {
            var familyCoverageData = [];
            [...family.cvg].forEach(function(bit, i) {
                familyCoverageData.push({
                    family: family.family,
                    bin: i,
                    cartoonChar: bit
                })
            })
            return familyCoverageData;
        }
    
        function getAllAccessionCoverageData(summary) {
          var accessionCoverageData = [];
          summary["accessionSections"].forEach(function(accession, i) {
              [...accession.cvg].forEach(function(bit, i) {
                  accessionCoverageData.push({
                      accession: accession.acc,
                      family: accession.fam,
                      bin: i,
                      cartoonChar: bit
                  })
              })
          });
          return accessionCoverageData;
        }
    
        // adapted from http://bl.ocks.org/syntagmatic/e8ccca52559796be775553b467593a9f
        function drawLegend(colorscale) {
            var legendheight = 200,
                legendwidth = 80,
                margin = {top: 10, right: 60, bottom: 10, left: 2};
    
            var canvas = legendDiv
                .style("height", legendheight + "px")
                .style("width", legendwidth + "px")
                .style("position", "relative")
                .append("canvas")
                .attr("height", legendheight - margin.top - margin.bottom)
                .attr("width", 1)
                .style("height", (legendheight - margin.top - margin.bottom) + "px")
                .style("width", (legendwidth - margin.left - margin.right) + "px")
                .style("border", "1px solid #000")
                .style("position", "absolute")
                .style("top", (margin.top) + "px")
                .style("left", (margin.left) + "px")
                .node();
    
            var legendscale = d3.scaleLinear()
                .range([1, legendheight - margin.top - margin.bottom])
                .domain(colorscale.domain().reverse());
    
            var ctx = canvas.getContext("2d");
            d3.range(legendheight).forEach(function(i) {
                ctx.fillStyle = colorscale(legendscale.invert(i));
                ctx.fillRect(0,i,1,1);
            });
    
            var legendaxis = d3.axisRight()
                .scale(legendscale)
                .tickSize(6)
                .ticks(4);
    
            var svg = legendDiv
                .append("svg")
                .attr("height", (legendheight) + "px")
                .attr("width", (legendwidth) + "px")
                .style("position", "absolute")
                .style("left", "0px")
                .style("top", "0px")
    
            svg
                .append("g")
                .attr("class", "axis")
                .attr("transform", "translate(" + (legendwidth - margin.left - margin.right + 3) + "," + (margin.top) + ")")
                .call(legendaxis);
        };
    
        function drawAccessionHeatmap(family) {
    
        }
    
        function drawFamilyHeatmap(family) {
            var infoSectionVisible = false;
            function toggleInfoSection() {
                infoSection.attr("visibility", infoSectionVisible ? "hidden" : "visible");
                infoSectionVisible = !infoSectionVisible;
                familySvg.attr("height", infoSectionVisible ? sectionHeight + infoSectionHeight : sectionHeight);
            }
    
            var familySvg = chartG.append("svg")
                .attr("width", sectionWidth)
                .attr("height", sectionHeight)
                .attr("border", barBorder.size)
                .style("display", "block")
    
            var heatBar = familySvg.append("g")
                .attr("transform",
                      `translate(${sectionMargin.left}, ${sectionMargin.top})`);
    
            var x = d3.scaleBand()
                .range([ 0, barWidth ])
                .domain(genomeBins)
                .padding(0.01);
    
            var y = d3.scaleBand()
                .range([ 0, barHeight ])
                .domain([family.family])
                .padding(0.01);
            var yAxis = heatBar.append("g")
                .call(d3.axisLeft(y));
            yAxis.select("path").remove();
            yAxis.select("line").remove();
            yAxis.select("text").style('cursor', 'pointer').on("click", function() {
                toggleInfoSection()
            });
    
            var heatSquares = heatBar.selectAll()
                .data(getFamilyCoverageData(family))
                .enter()
                .append("rect")
                .attr("x", d => x(d.bin) )
                .attr("y", d => y(d.family) )
                .attr("width", x.bandwidth() )
                .attr("height", y.bandwidth() )
                .style("fill", d => colorMap(cvgCartoonMap[d.cartoonChar]) )
    
            var barBorderPath = heatBar
                .append("rect")
                .attr("width", barWidth)
                .attr("height", barHeight)
                .style("stroke", barBorder.color)
                .style("fill", "none")
                .style("stroke-width", barBorder.size);
    
            var infoSection = heatBar.append("g")
                .attr("visibility", "hidden")
                .attr("transform",
                      `translate(0, ${sectionMargin.top + barHeight + 15})`);
    
            infoSection.append("text")
                .text(`TODO: display additional data for ${family.family}.`);
    
            // uncomment to pre-load as expanded
            // toggleInfoSection();
        }
    
        var sectionWidth = 600;
        var sectionHeight = 20;
        var infoSectionHeight = 50;
    
        var sectionMargin = {top: 2, right: 100, bottom: 2, left: 100};
        var barWidth = sectionWidth - sectionMargin.left - sectionMargin.right;
        var barHeight = sectionHeight - sectionMargin.top - sectionMargin.bottom;
        var barBorder = {size: 1, color: '#999'};
    
        var colorMap = d3.scaleSequential(d3.interpolateYlOrRd)
            .domain([0, 1]);
    
        var cvgLength = summary["familySections"][0]["cvg"].length;
        var genomeBins = [...Array(cvgLength).keys()];
        var accessionCoverageData = getAllAccessionCoverageData(summary); // n=8725
    
        var chartDiv = d3.select(selector)
            .append("div")
            .style("display", "inline-block");
        var chartG = chartDiv.append("g");
        var legendDiv = d3.select(selector)
            .append("div")
            .style("display", "inline-block");
        drawLegend(colorMap);
    
        summary["familySections"].forEach(family => {
            drawFamilyHeatmap(family);
        });
    }
      
    // Leaving here for a place holder
    useEffect(() => {
        // const svg = select(svgRef.current)
        // svg.selectAll("circle").data(data)
        //     .join("circle")
        //         .attr("r", value => value)
        //         .attr("cx", value => value * 2)
        //         .attr("cy", value => value * 2)
        //         .attr("stroke", "red")   
        // Read the data
        // draw();
    }, []);

    return (
        <div className="flex flex-col justify-center items-center">
            {/* React ref hooks could go here?
                <svg ref={svgRef}></svg> 
            <canvas ref={canvasRef}></canvas>  */}
            <img src={heatMap} className="p-6 w-4/5"></img>  
            <br/>
            <div className="flex flex-row">
                <button className="p-2" onClick={() => getJson()}>
                    Get JSON
                </button>
                <button className="p-2" onClick={() => draw()}>
                    Make Map
                </button>
            </div>
        </div>
    )
}


export default Visual