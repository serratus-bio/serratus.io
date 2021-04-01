import React, { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import * as d3 from 'd3'
import { createD3RangeSlider } from './d3RangeSlider'

export const FilterSlider = ({
    onChange,
    onTouchEnd,
    sliderLimsRef,
    id: idProp,
    sliderDomain: sliderDomainProp,
    linearGradientString: linearGradientStringProp,
}) => {
    // required props: id, sliderDomain, sliderLimsRef (mutable ref)
    // optional props: linearGradientString, onChange:callback, onTouchEnd:callback

    const slider = useRef(null)
    const sliderLabelL = useRef(null)
    const sliderLabelR = useRef(null)

    // immutables
    const [id] = useState(idProp)
    const [sliderDomain] = useState(sliderDomainProp)
    const [linearGradientString] = useState(linearGradientStringProp)

    useEffect(() => {
        const updateLims = (begin, end) => {
            sliderLabelL.current.text(begin)
            sliderLabelR.current.text(end)
            sliderLimsRef.current = [begin, end]
        }

        const drawSlider = () => {
            const sliderDiv = d3.select(`#${id}`)
            slider.current = createD3RangeSlider(d3, sliderDomain[0], sliderDomain[1], sliderDiv)
            slider.current.onChange((range) => updateLims(range.begin, range.end))
            if (linearGradientString) {
                const colorGradient = `background-image: ${linearGradientString};`
                const newSliderDivStyle = sliderDiv.attr('style') + colorGradient
                sliderDiv.attr('style', newSliderDivStyle)
                sliderDiv.select('.slider-container').attr('style', colorGradient)
                sliderDiv.select('.slider').attr('style', 'background: rgba(0,0,0, 0.2)')
            }

            sliderLabelL.current = sliderDiv
                .select('.WW')
                .append('span')
                .attr('style', 'float: left; transform: translate(0px,20px)')
            sliderLabelR.current = sliderDiv
                .select('.EE')
                .append('text')
                .attr('style', 'float: left; transform: translate(-5px,20px)')
        }

        drawSlider()
    }, [id, sliderDomain, linearGradientString, sliderLimsRef])

    useEffect(() => {
        slider.current && slider.current.range(...sliderLimsRef.current)
        onChange && slider.current.onChange(() => onChange())
        onTouchEnd && slider.current.onTouchEnd(onTouchEnd)
    }, [sliderLimsRef, onChange, onTouchEnd])

    return (
        <div>
            <Helmet>
                <link
                    href='https://cdn.rawgit.com/RasmusFonseca/d3RangeSlider/master/d3RangeSlider.css'
                    rel='stylesheet'></link>
            </Helmet>
            <div id={id} className='relative' style={{ height: 30 }} />
        </div>
    )
}
