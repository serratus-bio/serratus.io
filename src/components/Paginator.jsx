import React from "react";

const Paginator = ( {pageNumber, setPageNumber, numberOfPages, getNumberOfPages} ) => {
  const visibleButton = "bg-gray-300 hover:bg-gray-500 mx-2 py-1 px-4 rounded inline-flex items-center";
  const invisibleButton = "invisible" + visibleButton;
  const centerButtons = "flex flex-row justify-center items-center";

  const nextPage = () => setPageNumber(pageNumber + 1);
  
  const prevPage = () => setPageNumber(pageNumber - 1);
  
  const FirstPagePaginator = () => {
    return (
      <div>
        <button className={invisibleButton}></button>
          Page {pageNumber} out of ...
        <button className={visibleButton} onClick={nextPage}>next</button>
      </div>
    )
  }

  const MiddlePagePaginator = () => {
    return (
      <div> 
        <button className={visibleButton} onClick={prevPage}>prev</button>         
          Page {pageNumber} out of {numberOfPages}
        <button className={visibleButton} onClick={nextPage}>next</button>
      </div>
    )
  }

  const LastPagePaginator = () => {
    return ( 
      <div> 
        <button className={visibleButton} onClick={prevPage}>prev</button>
          Page {pageNumber} out of {numberOfPages}
        <button className={invisibleButton}></button>
      </div> 
    )
  }

  React.useEffect(() => {
    getNumberOfPages();
  }, [pageNumber, getNumberOfPages]);

  return (
    <div className={centerButtons}>
      {pageNumber === 1 ? 
        <FirstPagePaginator/>
      : <div className={centerButtons}>
          {pageNumber === numberOfPages ?
            <LastPagePaginator/>
            : <MiddlePagePaginator/>}
        </div> 
      }
    </div>
  )
}

export default Paginator;