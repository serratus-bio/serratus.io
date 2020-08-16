import React from "react";
import { Helmet } from 'react-helmet';
import * as d3 from 'd3';
import { createD3RangeSlider } from '../SDK/d3RangeSlider.js';

export default (props) => {
    // required props: id, sliderLims, setSliderLims
    // optional props: colorGradientLims, instantUpdate:bool, onTouchEnd:callback

    var slider;
    var sliderLabelL;
    var sliderLabelR;
    var sliderLims = props.sliderLims;

    const drawSlider = () => {
        var sliderDiv = d3.select(`#${props.id}`);
        slider = createD3RangeSlider(d3, sliderLims[0], sliderLims[1], sliderDiv);
        slider.onChange((range) => {
            updateLimLabels(range.begin, range.end);
            props.instantUpdate && updateSliderLims();
        });
        slider.onTouchEnd(() => {
            !props.instantUpdate && updateSliderLims();
            // TODO: call props.onTouchEnd() after slider update
        });
        // props.onTouchEnd && slider.onTouchEnd(props.onTouchEnd);
        // props.instantUpdate ?
        //     slider.onChange(updateSliderLims) :
        //     slider.onTouchEnd(updateSliderLims)

        if (props.colorGradientLims) {
            var colorGradient = `background-image: linear-gradient(to right, ${props.colorGradientLims[0]} , ${props.colorGradientLims[1]});`;
            var newSliderDivStyle = sliderDiv.attr("style") + colorGradient;
            sliderDiv.attr("style", newSliderDivStyle)
            sliderDiv.select(".slider-container")
                .attr("style", colorGradient);
            sliderDiv.select(".slider")
                .attr("style", "background: rgba(0,0,0, 0.2)");
        }

        sliderLabelL = sliderDiv.select(".WW").append("span")
            .attr("style", "float: left; transform: translate(0px,20px)");
        sliderLabelR = sliderDiv.select(".EE").append("text")
            .attr("style", "float: left; transform: translate(-5px,20px)");
    };

    const updateLimLabels = (begin, end) => {
        sliderLabelL.text(begin);
        sliderLabelR.text(end);
        sliderLims = [begin, end];
    };

    const updateSliderLims = () => {
        props.setSliderLims(sliderLims);
    };

    React.useEffect(() => {
        drawSlider();
        slider.range(...props.sliderLims);
    }, []);

    return (
        <div>
            <Helmet>
                <link href="https://cdn.rawgit.com/RasmusFonseca/d3RangeSlider/master/d3RangeSlider.css" rel="stylesheet"></link>
            </Helmet>
            <div id={props.id} className="relative" style={{ height: 30 }} />
        </div>
    )
}
