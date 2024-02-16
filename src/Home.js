import Header from "./Header";
import NavBar from "./NavBar";

import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";

//Imports for ag-grid Table
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

function Home() {
  //Setup Stock Table using Ag-Grid
  const gridRef = useRef();

  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    { field: "symbol" },
    { field: "name" },
    { field: "industry" },
    { field: "open", filter: "agNumberColumnFilter" },
    { field: "high", filter: "agNumberColumnFilter" },
    { field: "low", filter: "agNumberColumnFilter" },
    { field: "close", filter: "agNumberColumnFilter" },
    { field: "volumes", filter: "agNumberColumnFilter" },
    { field: "timestamp", filter: "agNumberColumnFilter" },
  ]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
    }),
    []
  );

  //Setup quick filter searchbox
  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setQuickFilter(
      document.getElementById("filter-text-box").value
    );
  }, []);

  const onPrintQuickFilterTexts = useCallback(() => {
    gridRef.current.api.forEachNode(function(rowNode, index) {
      console.log(
        "Row " +
          index +
          " quick filter text is " +
          rowNode.quickFilterAggregateText
      );
    });
  }, []);

  //fetch API
  useEffect(() => {
    fetch(
      "https://finnhub.io/api/v1/stock/symbol?exchange=US&token=cn7g6ehr01qgjtj4jil0cn7g6ehr01qgjtj4jilg"
    )
      .then((result) => result.json())
      //.then((json) => console.log(json))
      .then((rowData) => setRowData(rowData));
    //.then((json) => console.log(json));
  }, []);

  // useEffect(() => {
  //   fetch(
  //     `https://finnhub.io/api/v1/quote?symbol=${rowData.symbol}&token=cn7g6ehr01qgjtj4jil0cn7g6ehr01qgjtj4jilg`
  //   )
  //     .then((result) => result.json())
  //     .then((columnDefs) => setRowData(columnDefs));
  // }, []);

  return (
    <div className="container">
      <NavBar />
      <div className="container">
        <Header title="Daily Stock Market Statistics" />
      </div>
      <div className="container">
        <p>
          Filter stocks using the <b>"quick filter"</b> search box below to
          search all columns simultaneously, or{" "}
          <b>click on the column headers</b> to search by columns only.
        </p>
      </div>
      <div className="example-wrapper">
        <div className="example header">
          <input
            type="text"
            id="filter-text-box"
            placeholder="Quick Filter..."
            onInput={onFilterTextBoxChanged}
            style={{
              marginBottom: "20px",
              display: "flex",
              marginLeft: "auto",
            }}
          />
        </div>
      </div>
      <div
        className="ag-theme-balham mx-auto"
        style={{
          height: "500px",
          width: "auto",
        }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          rowSelection="multiple"
          animateRows={true}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={20}
          cacheQuickFilter={true}
          ref={gridRef}
        />
      </div>
    </div>
  );
}

export default Home;
