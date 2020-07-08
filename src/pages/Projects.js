import React from 'react'

function Projects() {
    return (
      // <section class="text-blue-700 bg-blue-300 body-font h-screen flex flex-col justify-center">
            <div>
        <div className="bg-gray-700 sm:bg-blue-300 flex absolute w-full h-screen justify-center items-center overflow-y-visible sm:overflow-y-hidden overflow-x-hidden">
          <img src="/serratus.jpg" className="invisible sm:visible opacity-75 sm:fixed" style={{objectFit: 'cover', minWidth: '100vh', minHeight: '100vh'}} />
              <div className="flex flex-col sm:flex-row absolute mt-48 mb-40 pt-56 pb-32 sm:mt-10 p-6 sm:p-0">
                <div class="sm:max-w-sm rounded-lg overflow-hidden bg-white shadow-2xl mt-40 sm:m-10 sm:pt-0">
                <div class="w-full flex flex-col justify-center items-center p-10">
                <img class="h-24 w-24" src="/db.png" alt="Muzer Logo"/>
                </div>
                    <div class="px-6 py-4">
                      <div class="font-bold text-xl mb-2 text-center">NCBI SRA Database</div>
                        <p class="text-gray-700 text-base">
                        The NCBI SRA database contains over 1 million RNA-seq libraries amounting to a whopping 5.72 petabytes (yes, that prefix is right, peta-bytes) of data. It is our goal to reanalyze all of these sequences utilizing our ultra-high throughput analysis pipeline hosted on Aamazon Web Service's (AWS) Cloud Computing.
                        </p>
                      </div>
                      {/* <div class="px-4 py-2">
                        <span class="inline-block bg-gray-300 hover:bg-gray-500 hover:text-white rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#TypeScript</span>
                        <span class="inline-block bg-gray-300 hover:bg-gray-500 hover:text-white rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#ReactNative</span>
                        <span class="inline-block bg-gray-300 hover:bg-gray-500 hover:text-white rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#Node.js</span>
                        <span class="inline-block bg-gray-300 hover:bg-gray-500 hover:text-white rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mt-2">#Express</span>
                        <span class="inline-block bg-gray-300 hover:bg-gray-500 hover:text-white rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mt-2">#Postgres</span>
                        <span class="inline-block bg-gray-300 hover:bg-gray-500 hover:text-white rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mt-2">#SpotifyAPI</span>
                        <span class="inline-block bg-gray-300 hover:bg-gray-500 hover:text-white rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mt-2">#AWSCognito</span>
                      </div> */}
                  <div className="flex flex-col p-4 justify-center items-center ml-20 pl-8 h-32 w-48">
                        <a target="_blank" rel="noopener noreferrer" href="https://www.ncbi.nlm.nih.gov/sra" ><img src="/ncbi.png" className=""></img></a>
                      </div>
                    </div>        
                <div class=" sm:max-w-sm rounded-lg overflow-hidden bg-white shadow-2xl mt-10 sm:m-10">
                <div class="w-full flex flex-col justify-center items-center p-6">
                  <img class="w-32 h-32" src="cloud.png" alt="Serratus Logo"/>
                  </div>
                    <div class="px-6 py-4">
                        <div class="font-bold text-xl mb-2 text-center">Cloud Architecture</div>
                          <p class="text-gray-700 text-base">
                          Since there is a lot of data, we need a lot of computers. AWS allows us to spin up hundreds of them at a single time to process data in parallel, utilizing the same bioinformatics pipeline on each of them. Serratus is currently operational, scaling up to 250 nodes with real time tracking and cluster performance analysis, but we are not stopping there...
                          </p>
                      </div>
                      {/* <div class="px-4 py-2">
                        <span class="inline-block bg-gray-300 hover:bg-gray-500 hover:text-white rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#Vue</span>
                        <span class="inline-block bg-gray-300 hover:bg-gray-500 hover:text-white rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#TailwindCSS</span>
                        <span class="inline-block bg-gray-300 hover:bg-gray-500 hover:text-white rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#AWS</span>
                        <span class="inline-block bg-gray-300 hover:bg-gray-500 hover:text-white rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#Postgres</span>
                        <span class="inline-block bg-gray-300 hover:bg-gray-500 hover:text-white rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mt-2">#CSharp</span>
                        <span class="inline-block bg-gray-300 hover:bg-gray-500 hover:text-white rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mt-2">#.NETCore</span>
                        <span class="inline-block bg-gray-300 hover:bg-gray-500 hover:text-white rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mt-2">#EFCore</span>
                      </div> */}
                      <div className="flex flex-col p-4 justify-center items-center ml-32 h-32 w-32">
                      <a target="_blank" rel="noopener noreferrer" href="https://github.com/ababaian/serratus/wiki/Architecture-and-Pipeline" ><img src="/gh.png" className=""></img></a>
                      </div>
                  </div>
                  <div class="sm:max-w-sm rounded-lg overflow-hidden bg-white shadow-2xl mt-40 sm:m-10 sm:pt-0">
                <div class="w-full flex flex-col justify-center items-center p-10">
                <img class="h-24 w-24" src="/dbcloud.png" alt="cloud db image"/>
                </div>
                    <div class="px-6 py-4">
                      <div class="font-bold text-xl mb-2 text-center">CoV Sequence Database</div>
                        <p class="text-gray-700 text-base">
                        Once serratus is done, all resulting alignment files will be stored in a free, immediate access public database. It is our goal to provide accurate, honest data in order to continue the collaborative effort in fighting Covid-19.                        </p>
                      </div>
                      {/* <div class="px-4 py-2">
                        <span class="inline-block bg-gray-300 hover:bg-gray-500 hover:text-white rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#TypeScript</span>
                        <span class="inline-block bg-gray-300 hover:bg-gray-500 hover:text-white rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#ReactNative</span>
                        <span class="inline-block bg-gray-300 hover:bg-gray-500 hover:text-white rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#Node.js</span>
                        <span class="inline-block bg-gray-300 hover:bg-gray-500 hover:text-white rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mt-2">#Express</span>
                        <span class="inline-block bg-gray-300 hover:bg-gray-500 hover:text-white rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mt-2">#Postgres</span>
                        <span class="inline-block bg-gray-300 hover:bg-gray-500 hover:text-white rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mt-2">#SpotifyAPI</span>
                        <span class="inline-block bg-gray-300 hover:bg-gray-500 hover:text-white rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mt-2">#AWSCognito</span>
                      </div> */}
                      <div className="flex flex-row p-4 justify-center mt-16 pt-6 ml-32 h-32 w-32">
                        <a target="_blank" rel="noopener noreferrer" href="https://github.com/ababaian/serratus/wiki/Access-Data-Release" ><img src="/gh.png" className=""></img></a>
                      </div>
                    </div>        
                </div>
                
            </div>
      </div>
    )
}

export default Projects
