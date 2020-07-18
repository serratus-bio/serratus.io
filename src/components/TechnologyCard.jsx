import React from 'react'

const TechnologyCard = (props) => {
    return (
        <div className="md:max-w-sm rounded-lg overflow-hidden bg-white shadow-2xl mt-40 md:m-10 md:pt-0">
            <img className="h-24 w-24 mt-4 m-auto" src={props.imgTop} alt={props.imgTopAlt} />
            <div className="m-6">
                <div className="font-bold text-xl mb-2 text-center">{props.title}</div>
                <p className="text-gray-700 text-base">{props.text}</p>
            </div>
            <div className="p-4 mx-10 justify-center items-center">
                <a target="_blank" rel="noopener noreferrer" href={props.imgBottomLink} >
                    <img className="m-auto h-20" src={props.imgBottom} alt={props.imgBottomAlt} />
                </a>
            </div>
        </div>
    )
}

export default TechnologyCard;