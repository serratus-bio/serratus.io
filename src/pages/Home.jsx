import React from 'react';

const Home = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <img src="/serratus.jpg" alt="serratus mountain" className="fixed z-0" style={{ objectFit: 'cover', minWidth: '100vh', minHeight: '100vh' }} />
            <div className="flex flex-col z-10 items-center text-white font-thin px-4">
                <h1 className="text-5xl font-light text-center mt-16 z-10">Welcome to Serratus</h1>
                <h2 className="text-xl text-center z-10">An open source, <strong> ultra-deep </strong> search for Novel Coronaviruses.</h2>
                <a href="/report" className="border z-10 border-white flex text-xl mt-16 justify-center items-center w-auto  px-4 py-2 rounded-md hover:text-blue-600 hover:bg-white">
                    <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" className="fill-current h-6 w-6  mr-3" viewBox="0 0 24 24" ><path d="M9,2 C5.146,2 2,5.146 2,9 C2,12.854 5.146,16 9,16 C10.748,16 12.345,15.348 13.574,14.281 L14,14.707 L14,16 L19.586,21.586 C20.138,22.138 21.034,22.138 21.586,21.586 C22.138,21.034 22.138,20.138 21.586,19.586 L16,14 L14.707,14 L14.281,13.574 C15.348,12.345 16,10.748 16,9 C16,5.146 12.854,2 9,2 z M9,4 C11.773,4 14,6.227 14,9 C14,11.773 11.773,14 9,14 C6.227,14 4,11.773 4,9 C4,6.227 6.227,4 9,4 z" /></svg>
                    Explore Data
                </a>
            </div>
        </div>
    )
}

export default Home;
