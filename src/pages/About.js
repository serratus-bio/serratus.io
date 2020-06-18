import React from 'react'

const About = () => {
    return (
        <div className="flex md:absolute w-screen flex-col h-screen justify-center items-center p-4 sm:p-0">
            <img src="/japanDan.jpg" className="opacity-75 fixed" style={{objectFit: 'cover', minWidth: '100vh', minHeight: '100vh', left: 0}} />
            <div className="sm:absolute sm:w-1/3 sm:ml-64 z-10 bg-gray-200 opacity-75 sm:opacity-100 border border-gray-400 shadow-2xl rounded-lg p-4">
            <p style={{fontFamily: 'Merriweather', fontStyle: 'bold', fontSize: '25px', textAlign: 'center', marginBottom: 10, textDecoration: 'underline'}}>About Me</p>
            <p className="font-sans sm:text-gray-700 sm:text-gray-700 text-s sm:text-xl sm:mt-4">   Hello! My name is Daniel, but you can call me Dan. I am a Full Stack Developer residing in Atlanta, GA.
            I am very passionate about the process of creating and enjoy exploring many different mediums.
            I had a breakthrough when I realized the creative effort involved in developing software; I've had the 'bug' since.</p>
            <p className="font-sans sm:text-gray-700 text-s sm:text-xl mt-4">Currently, I am working on several different native applications as personal projects and am also contributing to an open source project that researches the Coronavirus.</p>
            <p className="font-sans sm:text-gray-700 text-s sm:text-xl mt-4">Here are some of the technologies I am proficient in:</p>
            <div className="flex flex-row justify-center sm:text-gray-700 items-center text-s mt-2">
            <ul className="list-disc">
            <li>JavaScript (ES6+) & TypeScript</li>
            <li>React/React Native</li>
            <li>HTML & CSS</li>
            <li>Node.js</li>
            </ul>
            </div>
            </div>
        </div>
    )
}

export default About
