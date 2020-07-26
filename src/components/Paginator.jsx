import React from "react";

const Paginator = ( {pageNumber, setPageNumber} ) => {

    return (
    <div>
        {pageNumber}
        {pageNumber == 1 
        ? <div><button className="bg-gray-300 hover:bg-gray-500 mx-2 py-1 px-4 rounded inline-flex items-center" onClick={() => setPageNumber(pageNumber + 1)}>next</button></div> 
        : <div><button className="bg-gray-300 hover:bg-gray-500 mx-2 py-1 px-4 rounded inline-flex items-center" onClick={() => setPageNumber(pageNumber - 1)}>prev</button>
          <button className="bg-gray-300 hover:bg-gray-500 mx-2 py-1 px-4 rounded inline-flex items-center" onClick={() => setPageNumber(pageNumber + 1)}>next</button></div> 
          }
    </div>
    )
}

export default Paginator;