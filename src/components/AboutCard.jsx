import React from 'react'
import {
    classesBoxBorder,
    ExternalLink
} from '../CommonHelpers';

// assumes 3 instances

const AboutCard = (props) => {
    return (
        <div className={`m-4 sm:py-10 lg:w-1/3 ${classesBoxBorder}`}>
            <img className="h-24 w-24 mt-4 m-auto" src={props.imgTop} alt={props.imgTopAlt} />
            <div className="m-6">
                <div className="font-bold text-xl mb-2 text-center">{props.title}</div>
                <p className="text-gray-700 text-base">{props.text}</p>
            </div>
            <div>
                <ExternalLink href={props.imgBottomLink} >
                    <span className="inline-block align-middle h-full"></span>
                    <img className="align-middle m-auto h-20" src={props.imgBottom} alt={props.imgBottomAlt} />
                </ExternalLink>
            </div>
        </div>
    )
}

export default AboutCard;
