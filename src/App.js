import React, { useState } from "react";
import { useTable } from "react-table";
import { countriesData } from "./countries";

const App = () => {
  // Sample data for the table

  const [data, setData] = useState(countriesData);

  const [filterInput, setFilterInput] = useState("");
  const [populationFilter, setpopulationFilter] = useState("");

  // Name Filter function
  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilterInput(value);

    if (!e.target.value) {
      console.log("===e", e.target.value);
      setData(countriesData);
    } else {
      const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );

      setData(filteredData);
    }
  };

  const handlePopulationFilterChange = (e) => {
    const value = e.target.value;
    setFilterInput(value);

    if (e.target.value) {
      const filteredData = data.filter((item) => item.population < value);
      setData(filteredData);
    }
  };

  // Column configuration
  const columns = React.useMemo(
    () => [
      { Header: "Country Name", accessor: "name" },
      { Header: "Code", accessor: "abbreviation" },
      { Header: "Capital", accessor: "capital" },
      { Header: "Phone Code", accessor: "phone" },
      { Header: "Population", accessor: "population" },
    ],
    []
  );

  // Create an instance of the table
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div
      style={{
        padding: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          value={filterInput}
          onChange={handleFilterChange}
          placeholder="Country Name"
        />
        <select onChange={handlePopulationFilterChange}>
          <option value={""}>POPULATION FILTER</option>
          <option value={1000000}>{"< 1M"}</option>
          <option value={5000000}>{"< 5M"}</option>
          <option value={10000000}>{"< 10M"}</option>
        </select>
        <button
          onClick={() => {
            setFilterInput("");
            setpopulationFilter("");
            setData(countriesData);
          }}
        >
          <p>Clear filters</p>
        </button>
      </div>

      <table {...getTableProps()} style={{ borderCollapse: "collapse" }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    borderBottom: "1px solid black",
                    padding: "8px",
                    fontWeight: "bold",
                  }}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      border: "1px solid black",
                      padding: "8px",
                    }}
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default App;
