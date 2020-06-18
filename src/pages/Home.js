import React from 'react';

const Home = () => {
    return (
            
            <div className="flex md:absolute w-screen flex-col h-screen justify-center items-center" >
            <img src="/background.jpg" className="opacity-75" style={{objectFit: 'cover', minWidth: '100vh', minHeight: '100vh'}} />
            <div className="flex absolute w-full flex-col h-screen justify-center items-center">
                <p className="ml-20 sm:p-6 sm:ml-6" style={{marginTop: 50, fontFamily: 'Merriweather', fontStyle: 'bold', fontSize: '60px'}}>Hi, my name is Dan. </p>
                <p className=" font-sans text-2xl sm:text-5xl ml-2 pl-10 sm:pl-8">I am a Full Stack Developer with a <em>passion</em> to <u>create</u>.</p>
                <a target="_blank" rel="noopener noreferrer" href="mailto:danlohra@gmail.com" className="mt-10 font-mono text-3xl border-2 border-black rounded-lg px-4 py-2 hover:bg-gray-100 hover:text-blue-600 hover:border-white">Get In Touch</a>
            </div>
        </div>


    )
}

export default Home
