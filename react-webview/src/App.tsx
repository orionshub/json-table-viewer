import { useEffect, useState, createRef } from "react";
import { TabulatorFull as Tabulator } from "tabulator-tables";
// import { ReactTabulator } from "react-tabulator";
import "./App.css";

const App = () => {

  const tableRef = createRef<HTMLDivElement>();
  const [jsonData, setJsonData] = useState<any>([]);
  const [tableData, setTableData] = useState<any>({
    headers: {},
    data: [],
  });

  let table: any;

  function getTheJSONData(event: any) {
    if (event.data.type === 'jsonData') {
      setJsonData(event.data.data);
      console.log("jsonData", event.data.data);
    }
  }

  useEffect(() => {
    // listen to the event from the vscode
    window.addEventListener('message', getTheJSONData);

    return () => {
      // remove the event listener
      window.removeEventListener('message', getTheJSONData);
    };
  }, []);

  useEffect(() => {
    if (jsonData.length === 0) {
      return;
    }
    const headers = Object.keys(jsonData[0] || {}).map((key) => ({
      title: key,
      field: key,
      width: 150,
      resizable: true,
      headerFilter: true,
    }));
    const data = [...jsonData];
    setTableData({ headers, data });
  }, [jsonData]);

  useEffect(() => {
    if (tableRef.current === null || tableData.data.length === 0) {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    table = new Tabulator(tableRef.current, {
      data: tableData.data,
      columns: tableData.headers,
      layout: "fitData"
    })
    console.log("table", table);
  }, [tableData]);

  return (
    <>
      <h2>Data in the tabular format:</h2>
      {(jsonData.length === 0 || tableData.data.length === 0) ? (
        <div className="no-data">
          <h3>No valid data received from the extension</h3>
        </div>
      ) : (
        // <ReactTabulator
        //   data={tableData.data}
        //   columns={tableData.headers}
        //   layout={"fitData"}
        // />
        <div ref={tableRef} id="tabulator" />
      )}
    </>
  );
};

export default App;
