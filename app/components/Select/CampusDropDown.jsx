import React, { useState } from "react";
import { useQuery } from "react-query";
import PropTypes from "prop-types";

import AppService from "@/services/api/app-service";

import Custom from "./custom";

const CampusDropDown = ({
  companyId,
  defaultValue,
  error,
  isClearable,
  isMulti,
  onChange,
  value,
}) => {
  const [fetchingData, setFetchingData] = useState(false);
  const [current, setCurrent] = useState(1);
  const [inputValue, setinputValue] = useState("");
  const [options, setOptions] = useState([]);

  const fetchSearch = (c) =>
    AppService.searchCampuses({ search: c, status: true });
  const fetchPaginatedCampuses = (currentPage, pageSize = 10) =>
    AppService.getAllCampusesOfCompany({
      page: currentPage,
      companyId,
      limit: pageSize,
      status: true,
    });
  useQuery(
    ["fetchPaginatedCampuses", current],
    () => fetchPaginatedCampuses(current),
    {
      onSettled: (data) => {
        setOptions((prev) => [...prev, ...data?.data] || []);
      },
    },
  );

  const changeOptionsData = () => {
    setCurrent((prev) => prev + 1);
    setFetchingData(true);
    setTimeout(() => {
      if (inputValue.length > 0) {
        fetchSearch(inputValue).then((data) => {
          setOptions(data);
          setFetchingData(false);
        });
      }
      setFetchingData(false);
    }, 1000);
  };

  const filterNames = () =>
    fetchSearch(inputValue)
      .then((data) => {
        setOptions(data);
        return data;
      })
      .catch((err) => {
        console.log(`error`, err);
      });

  const promiseOptions = () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterNames(inputValue));
      }, 1000);
    });

  return (
    <div>
      <Custom
        changeOptionsData={changeOptionsData}
        defaultValue={defaultValue}
        error={error}
        fetchingData={fetchingData}
        isClearable={isClearable}
        isMulti={isMulti}
        loadOptions={promiseOptions}
        onChange={onChange}
        onInputChangeHandler={(val) => {
          setinputValue(val);
        }}
        options={options}
        value={value}
      />
    </div>
  );
};

CampusDropDown.propTypes = {
  companyId: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  error: PropTypes.string,
  isClearable: PropTypes.bool,
  isMulti: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

CampusDropDown.defaultProps = {
  defaultValue: "",
  error: "",
  isClearable: true,
  onChange: () => {},
  value: "",
};

export default CampusDropDown;
