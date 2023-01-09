/* eslint-disable react/no-unused-prop-types */
import React, { useState } from "react";
import { useQuery } from "react-query";
import PropTypes from "prop-types";

import AppService from "@/services/api/app-service";

import Custom from "./custom";

const CampusDropDown = ({
  defaultValue,
  disabled,
  error,
  isClearable,
  isMulti,
  onChange,
  value,
}) => {
  const [fetchingData, setFetchingData] = useState(false);
  const [current, setCurrent] = useState(1);
  const [inputValue, setinputValue] = useState("");
  const [options, setOptions] = useState([{ name: "all", _id: "all" }]);

  const fetchSearch = (c) =>
    AppService.searchCompanies({ search: c, status: true });
  const fetchPaginatedCampuses = (currentPage, pageSize = 10) =>
    AppService.getAllCampusesOfCompany({
      page: currentPage,
      limit: pageSize,
      status: true,
    });
  useQuery(
    ["fetchPaginatedCampuses", current],
    () => fetchPaginatedCampuses(current),
    {
      enabled: !disabled,
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
        disabled={disabled}
        error={error}
        fetchingData={fetchingData}
        isClearable={isClearable}
        isMulti={isMulti}
        isObject={false}
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
  disabled: PropTypes.bool,
  error: PropTypes.string,
  isClearable: PropTypes.bool,
  isMulti: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

CampusDropDown.defaultProps = {
  defaultValue: "",
  disabled: false,
  error: "",
  isClearable: true,
  onChange: () => {},
  value: "",
};

export default CampusDropDown;
