import React from "react";

export default function Search({ setSearch, closeSearch }) {
  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000
    }}>
      <div style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "10px"
      }}>
        <button onClick={closeSearch}>X</button>

        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "10px", width: "250px" }}
        />
      </div>
    </div>
  );
}