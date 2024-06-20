import React, { useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";

const Drugname = () => {
  const [drugs, setDrugs] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredRes, setFilteredRes] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const loadData = async () => {
    const url = `https://rxnav.nlm.nih.gov/REST/drugs.json?name=${encodeURIComponent(searchText)}`;
    try {
      const res = await axios.get(url);
      console.log(res);

      const drugsData = res.data.drugGroup.conceptGroup || [];
      setDrugs(drugsData);
      const filtered = drugsData.flatMap(group =>
        (group.conceptProperties || []).filter(property =>
          property.name.toLowerCase().includes(searchText.toLowerCase())
        )
      );
      setFilteredRes(filtered);
      setShowResults(true);
    } catch (error) {
      console.error("Error fetching data:", error);
      setShowResults(false);
    }
  };

  const onTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearch = () => {
    loadData();
  };

  const handleSearchByEnter = (e) => {
    if (e.key === "Enter") {
      loadData();
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1>SEARCH DRUGS</h1>
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={onTextChange}
          onKeyDown={handleSearchByEnter}
          style={{ marginRight: "10px" }}
        />
        <FaSearch
          style={{ cursor: "pointer" }}
          onClick={handleSearch}
        />
      </div>
      {showResults && (
        <div style={{ marginTop: "20px", width: "100%" }}>
          {filteredRes.length > 0 ? (
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {filteredRes.map((drug, index) => (
                <li key={index} style={{ marginBottom: "10px", backgroundColor: "#f0f0f0", padding: "10px" }}>
                  {drug.name}
                </li>
              ))}
            </ul>
          ) : (
            <p>No results found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Drugname;
