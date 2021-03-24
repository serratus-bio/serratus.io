import React from "react";

const resultTotalKey = "total";

const Paginator = ( {pageNumber, perPage, setPageNumber, dataPromise} ) => {
  const [numPages, setNumPages] = React.useState(); // from dataPromise later
  const [loading, setLoading] = React.useState(true);
  
  const visibleButton = "bg-gray-300 hover:bg-gray-500 mx-2 py-1 px-4 rounded inline-flex items-center";
  const invisibleButton = "invisible " + visibleButton;
  const centerButtons = "flex flex-row justify-center items-center";

  const nextPage = () => setPageNumber(pageNumber + 1);
  
  const prevPage = () => setPageNumber(pageNumber - 1);

  const readDataPromise = async (dataPromise, perPage) => {
    if (!dataPromise) return;
    dataPromise.then((data) => {
      var total = data[resultTotalKey];
      var numPages = Math.ceil(total / perPage);
      setLoading(false);
      setNumPages(numPages);
    })
  }

  React.useEffect(() => {
    if(!dataPromise) return;
    readDataPromise(dataPromise, perPage);
  }, [pageNumber, numPages, dataPromise, perPage]);

  return (
      (!loading && numPages !== 0) &&
      <div className={centerButtons}>
        {pageNumber === 1 ?
          <button className={invisibleButton}></button>
          : <button className={visibleButton} onClick={prevPage}>prev</button>
        }
            Page {pageNumber} out of {numPages}
        {pageNumber === numPages ?
          <button className={invisibleButton}></button>
          : <button className={visibleButton} onClick={nextPage}>next</button>
        }
      </div>
    )
}

export default Paginator;
