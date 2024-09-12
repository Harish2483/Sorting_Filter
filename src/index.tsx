"use strict";

import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  StrictMode,
} from "react";
import { createRoot } from "react-dom/client";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import {
  ColDef,
  ColGroupDef,
  GridApi,
  GridOptions,
  GridReadyEvent,
  ISetFilterParams,
  SideBarDef,
  createGrid,
} from "ag-grid-community";
import "ag-grid-charts-enterprise";

var filterParams: ISetFilterParams = {
  comparator: (a: string | null, b: string | null) => {
    var valA = a == null ? 0 : parseInt(a);
    var valB = b == null ? 0 : parseInt(b);
    if (valA === valB) return 0;
    return valA > valB ? 1 : -1;
  },
};

function getRowData() {
  var rows = [];
  for (var i = 1; i < 117; i++) {
    rows.push({ age: i });
  }
  return rows;
}

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState<any[]>(getRowData());
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      headerName: "Age (No Comparator)",
      field: "age",
      filter: "agSetColumnFilter",
    },
    {
      headerName: "Age (With Comparator)",
      field: "age",
      filter: "agSetColumnFilter",
      filterParams: filterParams,
    },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      filter: true,
      cellDataType: false,
    };
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    params.api.getToolPanelInstance("filters")!.expandFilters();
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className={"ag-theme-quartz"}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          sideBar={"filters"}
          onGridReady={onGridReady}
        />
      </div>
    </div>
  );
};

const root = createRoot(document.getElementById("root")!);
root.render(
  <StrictMode>
    <GridExample />
  </StrictMode>
);
