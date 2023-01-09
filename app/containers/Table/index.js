import React from "react";
import { Input } from "antd";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

import TableComponent from "@/components/Table";

import * as S from "./styled";

const Table = ({
  columns,
  data,
  handleSearch,
  isTeam,
  limit,
  loading,
  onChange,
  onRow,
  page,
  placeholder,
  total,
  value,
}) => (
  <>
    <S.Wrapper isTeam={isTeam}>
      <div>
        <Input
          allowClear={{ clearIcon: <CloseOutlined /> }}
          onChange={handleSearch}
          placeholder={`Search ${placeholder}`}
          prefix={<SearchOutlined style={{ paddingRight: "20px" }} />}
          size="large"
          style={{ width: "30vw", margin: "20px 20px 20px 0px" }}
          value={value}
        />
        {/* {customLoading ? ( */}
        <TableComponent
          columns={columns}
          dataSource={data}
          limit={limit}
          loading={loading}
          onChange={onChange}
          onRow={onRow}
          page={page}
          total={total}
        />
        {/* ) */}
      </div>
    </S.Wrapper>
  </>
);

export default Table;
Table.propTypes = {
  columns: PropTypes.arrayOf,
  data: PropTypes.arrayOf,
  handleSearch: PropTypes.func,
  isTeam: PropTypes.bool,
  limit: PropTypes.number,
  loading: PropTypes.bool,
  onChange: PropTypes.func,
  onRow: PropTypes.func,
  page: PropTypes.number,
  placeholder: PropTypes.string,
  total: PropTypes.number,
  value: PropTypes.string,
};
