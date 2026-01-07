import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Papa from "papaparse";
import {
  CsvRowSchema,
  HierarchyRowSchema,
  type CsvRow,
  type csvTreeType,
} from "../utils/schema";
import { tableStyles, uploadPageStyles } from "../allStyles";
import { headers } from "../utils/commonUtils";
import { useCsvStore } from "../utils/csvStore";

const UploadPage: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [csvType, setCsvType] = useState<"flat" | "tree">("flat");
  const setCsv = useCsvStore((state) => state.setCsv);

  const onCSVFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setFileName(file.name);
    const rows: CsvRow[] = [];
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      chunkSize: 1024 * 1024,
      chunk: (results) => {
        for (const row of results.data as []) {
          const schema = csvType === "tree" ? HierarchyRowSchema : CsvRowSchema;
          const parsed = schema.safeParse(row);
          if (parsed.success) rows.push(parsed.data);
        }
      },
      complete: () => {
        if (!rows.length) {
          setError("CSV validation failed. Please check the format.");
          return;
        }
        setCsv(rows, headers, csvType);
        navigate("/table");
      },
      error: () => setError("Failed to parse CSV"),
    });
  };

  const handleRemoveFile = () => {
    setFileName(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div style={uploadPageStyles.page}>
      <div style={uploadPageStyles.left}>
        <div style={uploadPageStyles.card}>
          <h1 style={uploadPageStyles.title}>Upload CSV</h1>
          <p style={uploadPageStyles.subtitle}>
            Upload your supplier comparison file
          </p>
          <div style={{ marginBottom: "12px", marginRight: "60px" }}>
            <label style={{ fontWeight: 600 }}>CSV Type</label>
            <select
              value={csvType}
              onChange={(e) => setCsvType(e.target.value as csvTreeType)}
              style={tableStyles.freezeSelect}
            >
              <option value="flat">Supplier Comparison</option>
              <option value="tree">Category Tree</option>
            </select>
          </div>
          <label style={uploadPageStyles.uploadBox}>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={onCSVFileUpload}
              style={{ display: "none" }}
            />
            <span style={uploadPageStyles.uploadText}>
              {fileName ? "Change file" : "Click to upload CSV"}
            </span>
            <span style={uploadPageStyles.helperText}>
              Only .csv files are supported
            </span>
          </label>
          {fileName && (
            <div style={uploadPageStyles.fileName}>
              <span style={{ fontWeight: 600, color: "black" }}>
                {fileName}
              </span>
              <button
                onClick={handleRemoveFile}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#dc2626",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: "13px",
                }}
              >
                Remove
              </button>
            </div>
          )}
          {error && <div style={uploadPageStyles.errorBox}>{error}</div>}
        </div>
      </div>
      <div style={uploadPageStyles.right}>
        <div style={uploadPageStyles.info}>
          <h2 style={uploadPageStyles.infoTitle}>What this application does</h2>
          <p style={uploadPageStyles.infoText}>
            The CSV is used to compare supplier pricing for materials or
            category tree. Once uploaded, the data will be shown in a table.
          </p>
          <h3 style={uploadPageStyles.sectionTitle}>
            Supplier Comparision CSV:
          </h3>
          <h3 style={uploadPageStyles.sectionTitle}>Required Columns</h3>
          <ul style={uploadPageStyles.list}>
            <li>Item Code</li>
            <li>Material</li>
            <li>Quantity</li>
            <li>Estimated Rate</li>
            <li>Supplier Rate</li>
          </ul>
          <h3 style={uploadPageStyles.sectionTitle}>Tips</h3>
          <ul style={uploadPageStyles.list}>
            <li>Headers must match exactly</li>
            <li>Rates should be numeric</li>
          </ul>
          <>
            <h3 style={uploadPageStyles.sectionTitle}>Category Tree CSV:</h3>
            <ul style={uploadPageStyles.list}>
              <li>
                Include "Category" and "Sub Category" columns for hierarchy.
              </li>
              <li>Ensure all rates are numeric for accurate calculations.</li>
            </ul>
          </>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
