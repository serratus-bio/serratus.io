import React from "react";

const Paginator = ( {pageNumber, setPageNumber, numberOfPages, getNumberOfPages} ) => {
  const buttonClasses = "bg-gray-300 hover:bg-gray-500 mx-2 py-1 px-4 rounded inline-flex items-center";
  const invisibleButton = "invisible bg-gray-300 hover:bg-gray-500 mx-2 py-1 px-4 rounded inline-flex items-center";
  
  React.useEffect(() => {
    getNumberOfPages();
  }, [pageNumber]);

  return (
    <div className="flex flex-row justify-center items-center">
        {pageNumber == 1 
        ? <div>
            <button className={invisibleButton} onClick={() => setPageNumber(pageNumber - 1)}>prev</button>
            {pageNumber}
            <button className={buttonClasses} onClick={() => setPageNumber(pageNumber + 1)}>next</button>
          </div> 
        : <div>
            <button className={buttonClasses} onClick={() => setPageNumber(pageNumber - 1)}>prev</button>
            {pageNumber}
            <button className={buttonClasses} onClick={() => setPageNumber(pageNumber + 1)}>next</button>
          </div> 
          }
    </div>
    )
}

export default Paginator;