import * as d3 from 'd3';
import { createD3RangeSlider } from '../SDK/d3RangeSlider.js';

export var sliderIdentity;
export var sliderCoverage;

var identityLims = [75, 100];
var coverageLims = [25, 100];
var coverageColorLims = ["#3d5088", "#fce540"];

var sliderIdentityLabelL;
var sliderIdentityLabelR;
var sliderCoverageLabelL;
var sliderCoverageLabelR;

export const drawSliders = (sliderIdentityElementId, sliderCoverageElementId) => {
    var sliderIdentityDiv = d3.select(`#${sliderIdentityElementId}`);
    var sliderCoverageDiv = d3.select(`#${sliderCoverageElementId}`);

    sliderIdentity = createD3RangeSlider(d3, identityLims[0], identityLims[1], sliderIdentityDiv);
    sliderIdentity.onChange((range) => updateIdentityLims(range.begin, range.end));

    var coverageColorGradient = `background-image: linear-gradient(to right, ${coverageColorLims[0]} , ${coverageColorLims[1]});`;
    var newCoverageSliderDivStyle = sliderCoverageDiv.attr("style") + coverageColorGradient;
    sliderCoverage = createD3RangeSlider(d3, coverageLims[0], coverageLims[1], sliderCoverageDiv);
    sliderCoverage.onChange((range) => updateCoverageLims(range.begin, range.end));
    sliderCoverageDiv.attr("style", newCoverageSliderDivStyle)
    sliderCoverageDiv.select(".slider-container")
        .attr("style", coverageColorGradient);
    sliderCoverageDiv.select(".slider")
        .attr("style", "background: rgba(0,0,0, 0.2)");

    sliderIdentityLabelL = sliderIdentityDiv.select(".WW").append("span")
        .attr("style", "float: left; transform: translate(0px,20px)");
    sliderIdentityLabelR = sliderIdentityDiv.select(".EE").append("text")
        .attr("style", "float: left; transform: translate(-5px,20px)");
    sliderCoverageLabelL = sliderCoverageDiv.select(".WW").append("span")
        .attr("style", "float: left; transform: translate(0px,20px)");
    sliderCoverageLabelR = sliderCoverageDiv.select(".EE").append("text")
        .attr("style", "float: left; transform: translate(-5px,20px)");
};

export const updateIdentityLims = (begin, end) => {
    sliderIdentityLabelL.text(begin);
    sliderIdentityLabelR.text(end);
};
export const updateCoverageLims = (begin, end) => {
    sliderCoverageLabelL.text(begin);
    sliderCoverageLabelR.text(end);
};
