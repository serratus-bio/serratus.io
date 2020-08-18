import React from "react";
import { data } from "autoprefixer";

const Paginator = ( {pageNumber, setPageNumber, dataPromise} ) => {
  const [numPages, setNumPages] = React.useState();
  const [loading, setLoading] = React.useState(true);
  
  const visibleButton = "bg-gray-300 hover:bg-gray-500 mx-2 py-1 px-4 rounded inline-flex items-center";
  const invisibleButton = "invisible" + visibleButton;
  const centerButtons = "flex flex-row justify-center items-center";

  const nextPage = () => setPageNumber(pageNumber + 1);
  
  const prevPage = () => setPageNumber(pageNumber - 1);

  const readDataPromise = async (dataPromise) => {
    if (!dataPromise) return;
    dataPromise.then((data) => {
      data = data.numberOfPages;
      setLoading(false);
      setNumPages(data);
    })
  }
  
  const OnePagePaginator = () => {
    return (
      <div>
        <button className={invisibleButton}></button>
          Page 1 out of 1
        <button className={invisibleButton} onClick={nextPage}>next</button>
    </div>
    )
  }

  const FirstPagePaginator = () => {
    return (
      <div>
        <button className={invisibleButton}></button>
          Page {pageNumber} out of {numPages}
        <button className={visibleButton} onClick={nextPage}>next</button>
      </div>
    )
  }

  const MiddlePagePaginator = () => {
    return (
      <div> 
        <button className={visibleButton} onClick={prevPage}>prev</button>         
          Page {pageNumber} out of {numPages}
        <button className={visibleButton} onClick={nextPage}>next</button>
      </div>
    )
  }

  const LastPagePaginator = () => {
    return ( 
      <div> 
        <button className={visibleButton} onClick={prevPage}>prev</button>
          Page {pageNumber} out of {numPages}
        <button className={invisibleButton}></button>
      </div> 
    )
  }

  const FullPaginator = () => {
    return (
      <div className={centerButtons}>
      {pageNumber == 1 ? 
        numPages == 1 ? 
          <OnePagePaginator/> : 
            <FirstPagePaginator/>
          : <div className={centerButtons}>
            {pageNumber == numPages ?
              <LastPagePaginator/>
            : <MiddlePagePaginator/>}
        </div> 
      }
    </div>
    )
}

  React.useEffect(() => {
    if(!dataPromise) return;
    readDataPromise(dataPromise);
  }, [pageNumber, numPages, dataPromise]);

  return (
    <div> 
      {loading ? <div></div> : <FullPaginator/> }
    </div>
  )
}

export default Paginator;