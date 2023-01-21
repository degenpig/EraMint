import React, { useState } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import ColumnNewThreeCol from "../components/ColumnNewThreeCol";
import { createGlobalStyle } from "styled-components";
import Select from "react-select";
import { Search } from "react-router-dom";

const GlobalStyles = createGlobalStyle`
  .navbar {
    border-bottom: solid 1px rgba(255, 255, 255, .1) !important;
  }
`;
const customStyles = {
  option: (base, state) => ({
    ...base,
    background: "#9f9fef",
    color: "#333",
    borderRadius: state.isFocused ? "0" : 0,
    "&:hover": {
      background: "#8364e2",
    },
  }),
  menu: (base) => ({
    ...base,
    borderRadius: 0,
    marginTop: 0,
  }),
  menuList: (base) => ({
    ...base,
    padding: 0,
  }),
  control: (base, state) => ({
    ...base,
    background: "#9f9fef",
    padding: 2,
  }),
};

const options = [
  { value: "sortA", label: "Sort by TokenID ASC" },
  { value: "sortD", label: "Sort by TokenID DSC" },
  { value: "rarity", label: "Sort by Rarity" },
];

const Collection = () => {
  const [value, setValue] = useState("");
  const [sort, setSort] = useState("sortA");
  const [filter, setFilter] = useState("");

  const filterChange = (e) => {
    setValue(e.target.value);
  };

  const sortChange = (e) => {
    setSort(e.value);
    console.log(e.value);
  };

  return (
    <div>
      <Header />
      <GlobalStyles />
      <section className="container">
        <div className="row">
          <div className="items_filter">
            <div
              className="row form-dark"
              id="form_quick_search"
              name="form_quick_search"
            >
              <div className="col">
                <input
                  className="form-control"
                  id="name_1"
                  name="name_1"
                  value={value}
                  onChange={(e) => filterChange(e)}
                  placeholder="search item here..."
                  type="text"
                />{" "}
                <button id="btn-submit" onClick={() => setFilter(value)}>
                  <i className="fa fa-search bg-color-secondary"></i>
                </button>
                <div className="clearfix"></div>
              </div>
            </div>
            <div className="dropdownSelect one">
              <Select
                isSearchable={false}
                styles={customStyles}
                menuContainerStyle={{ zIndex: 999 }}
                defaultValue={sort}
                onChange={(e) => sortChange(e)}
                options={options}
              />
            </div>
          </div>
          <div className="col-md-12">
            <ColumnNewThreeCol filter={filter} sort={sort} />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
export default Collection;
