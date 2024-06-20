import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";

const Drugname = () => {
  const [drugs, setDrugs] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredRes, setFilteredRes] = useState([]);

  const url = `https://rxnav.nlm.nih.gov/REST/drugs.json?name=${searchText}`;
  useEffect(() => {
    loadData();
  }, [searchText]);

  const loadData = async () => {
    try {
      const res = await axios.get(url);
      console.log(res);

      setDrugs(res.data.drugGroup.conceptGroup);
      const filtered = await drugs.filter((i) =>
        i.toLowerCase().includes(searchText)
      );
      setFilteredRes(filtered);
    } catch (error) {
        console.log("Nothing could be found for that term");
    }
  };

  const onTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearch = () => {
      const newDrug= [...drugs,{}]
  };

  const handleSearchByEnter = (e) => {
    if (e.key === "Enter") {
        
    }
  };

  return (
    <div>
      <h1>SEARCH DRUGS</h1>
      <div>
        <h3>Search for Drugs !</h3>
        <input
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={onTextChange}
          onKeyDown={handleSearchByEnter}
        />
        <FaSearch
          style={{ justifyContent: "cneter", alignItems: "center" }}
          onClick={handleSearch}
        />
      </div>
      
      {}
    </div>
  );
};

export default Drugname;
