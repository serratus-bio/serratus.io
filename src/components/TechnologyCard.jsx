import React from 'react'

const TechnologyCard = (props) => {
    return (
        <div className="rounded-lg bg-white max-w-xl mt-40 py-4
            md:shadow-2xl md:m-10 sm:py-10
            lg:max-w-sm">
            <img className="h-24 w-24 mt-4 m-auto" src={props.imgTop} alt={props.imgTopAlt} />
            <div className="m-6">
                <div className="font-bold text-xl mb-2 text-center">{props.title}</div>
                <p className="text-gray-700 text-base">{props.text}</p>
            </div>
            <div>
                <a target="_blank" rel="noopener noreferrer" href={props.imgBottomLink} >
                    <span className="inline-block align-middle h-full"></span>
                    <img className="align-middle m-auto h-20" src={props.imgBottom} alt={props.imgBottomAlt} />
                </a>
            </div>
        </div>
    )
}

export default TechnologyCard;
