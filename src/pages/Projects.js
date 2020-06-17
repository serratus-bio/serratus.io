import React from 'react'

function Projects() {
    return (
      <div>
        <div className="flex absolute w-full h-screen justify-center items-center">
          <img src="/japancity.jpg" className="opacity-50 sm:fixed" style={{objectFit: 'cover', minWidth: '100vh', minHeight: '100vh'}} />
              <div className="flex flex-col sm:flex-row absolute mt-40 sm:mt-10 p-10 sm:p-0">
                <div class="sm:max-w-sm rounded overflow-hidden bg-white shadow-2xl mt-64 pt-64 sm:m-10 sm:pt-0">
                  <img class="w-full" src="/muserlogo.png" alt="Muzer Logo"/>
                    <div class="px-6 py-4">
                      <div class="font-bold text-xl mb-2 text-center">Muzer</div>
                        <p class="text-gray-700 text-base">
                        Muzer is a native app that serves as a music discovery tool, wrapped in a family swiper-style UI.
                        'Muzers' connect their spotify profile and load their discover weekly playlists to start swiping.
                        Songs are played as the 'muzer' swipes, and likes are saved in a database to be used as future seeds for new music recommendations.
                        </p>
                      </div>
                      <div class="px-4 py-2">
                        <span class="inline-block bg-gray-300 hover:bg-gray-500 hover:text-white rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#TypeScript</span>
                        <span class="inline-block bg-gray-300 hover:bg-gray-500 hover:text-white rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#ReactNative</span>
                        <span class="inline-block bg-gray-300 hover:bg-gray-500 hover:text-white rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#Node.js</span>
                        <span class="inline-block bg-gray-300 hover:bg-gray-500 hover:text-white rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mt-2">#Express</span>
                        <span class="inline-block bg-gray-300 hover:bg-gray-500 hover:text-white rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mt-2">#PostGreSQL</span>
                        <span class="inline-block bg-gray-300 hover:bg-gray-500 hover:text-white rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mt-2">#SpotifyAPI</span>
                      </div>
                      <div className="flex flex-row p-4 justify-center">
                        <a target="_blank" rel="noopener noreferrer" href="https://github.com/lohrd" ><img src="/gh.png" className=""></img></a>
                      </div>
                    </div>        
                <div class="invisible sm:visible sm:max-w-sm rounded overflow-hidden bg-white shadow-2xl m-10">
                  <img class="w-full" src="serratus.png" alt="Serratus Logo"/>
                    <div class="px-6 py-4">
                        <div class="font-bold text-xl mb-2 text-center">Serratus</div>
                          <p class="text-gray-700 text-base">
                          Serratus is an open-source ultra-deep coronavirus homology search that is seeking to re-analyze all RNA-seq, meta-genomics, meta-transcriptomics,
                          and environmental sequencing data in the NCBI Short Read Archive to find undiscovered species of coronavirus. I have developed their website and am in the procces
                          of implementing a backend database.
                          </p>
                      </div>
                      <div class="px-4 py-2">
                        <span class="inline-block bg-gray-300 hover:bg-gray-500 hover:text-white rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#Vue</span>
                        <span class="inline-block bg-gray-300 hover:bg-gray-500 hover:text-white rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#TailwindCSS</span>
                        <span class="inline-block bg-gray-300 hover:bg-gray-500 hover:text-white rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#AWS</span>
                        <span class="inline-block bg-gray-300 hover:bg-gray-500 hover:text-white rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#GitHub</span>
                        <span class="inline-block bg-gray-300 hover:bg-gray-500 hover:text-white rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mt-2">#Docker</span>
                      </div>
                      <div className="flex flex-row p-4 justify-center">
                      <a target="_blank" rel="noopener noreferrer" href="https://github.com/ababaian/serratus" ><img src="/gh.png" className=""></img></a>
                      </div>
                  </div>
                </div>
            </div>
      </div>
    )
}

export default Projects
