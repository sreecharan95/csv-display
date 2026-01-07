import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import CsvTable from "./CsvTable";
import { tablePageStyles } from "../allStyles";
import { useCsvStore } from "../utils/csvStore";
import { TreeTable } from "./TreeTable";
import { buildCsvTree, buildAggregatedTree } from "../utils/commonUtils";

const TablePage: React.FC = () => {
  const navigate = useNavigate();
  const { data, headers, clearCsv, tableType } = useCsvStore();
  const treeData = useMemo(() => {
    const tree = buildCsvTree(data);
    return tree.map(buildAggregatedTree);
  }, [data]);

  if (!data.length || !headers.length) {
    return (
      <div style={tablePageStyles.emptyState}>
        <div style={tablePageStyles.emptyCard}>
          <h2 style={tablePageStyles.title}>No CSV Data Found</h2>
          <p style={tablePageStyles.subtitle}>
            Please upload a CSV file to view the supplier table.
          </p>
          <button
            style={{ ...tablePageStyles.secondaryButton, marginTop: "16px" }}
            onClick={() => navigate("/")}
          >
            Go Back to Upload
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={tablePageStyles.page}>
      <div style={tablePageStyles.header}>
        <div>
          <h2 style={tablePageStyles.title}>Supplier Comparison Table</h2>
          <p style={tablePageStyles.subtitle}>
            Review and compare supplier pricing from your uploaded CSV file
          </p>
        </div>
        <button
          style={tablePageStyles.secondaryButton}
          onClick={() => {
            navigate("/");
            clearCsv();
          }}
        >
          Go Back
        </button>
      </div>
      <div style={tablePageStyles.tableCard}>
        {tableType === "flat" ? (
          <CsvTable data={data} headers={headers} />
        ) : (
          <TreeTable data={treeData} />
        )}
      </div>
    </div>
  );
};

export default TablePage;
