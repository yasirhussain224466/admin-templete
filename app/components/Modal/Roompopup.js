import React from "react";
import PropTypes from "prop-types";
import { Breadcrumb, Col, Row } from "antd";
import moment from "moment";

import Dropdown from "@/components/Dropdown";
import Carousel from "@/components/Carousel";
import { REPORT_TYPES } from "@/utils/constants";

import * as S from "./styled";

const options = Object.values(REPORT_TYPES);
console.log("options", options);
const Company = ({ breadCrumb, data, rowData, title }) => {
  const [values, setValues] = React.useState(REPORT_TYPES.FIXTURE);

  function beforeImage() {
    if (values.toString() === REPORT_TYPES.FIXTURE) {
      return data?.data && data?.data?.fixture_before_images;
    }
    if (values.toString() === REPORT_TYPES.POU_SINKS_AND_SHOWERS) {
      return data?.data && data?.data?.pou_sink_and_shower_before_images;
    }
    return data?.data && data?.data?.pou_ice_machine_before_images;
  }

  function afterImage() {
    if (values.toString() === REPORT_TYPES.FIXTURE) {
      return data?.data && data?.data?.fixture_after_images;
    }
    if (values.toString() === REPORT_TYPES.POU_SINKS_AND_SHOWERS) {
      return data?.data && data?.data?.pou_sink_and_shower_after_images;
    }
    return data?.data && data?.data?.pou_ice_machine_after_images;
  }

  function ExpireIn() {
    if (values.toString() === REPORT_TYPES.FIXTURE) {
      return data?.data && data?.data?.last_service_fixture;
    }
    if (values.toString() === REPORT_TYPES.POU_SINKS_AND_SHOWERS) {
      return data?.data && data?.data?.last_service_pou_sink_and_shower;
    }
    return data?.data && data?.data?.last_service_ice_machine;
  }

  const getRemainingDays = Math.round(
    (Date.parse(ExpireIn()) - Date.parse(new Date())) / 86400000,
  );

  const lastDate = data?.data && moment(ExpireIn()).format("DD-MM-YYYY");
  return (
    <S.Room>
      <div className="title">{title}</div>
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>{breadCrumb?.company}</Breadcrumb.Item>
          <Breadcrumb.Item>{breadCrumb?.campus}</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <br />
      <p>
        Room
        {`: ${rowData?.room_no?.value ? rowData?.room_no?.value : "-"}`}
      </p>
      <p>
        Jamb
        {`: ${data?.data && data?.data?.jamb_id?.value}`}
      </p>
      <br />
      <p>
        Last:
        {` ${lastDate}`}
      </p>
      <p>
        By:
        {data?.data && data?.data?.created_by?.fullName}
      </p>
      <p>
        Exp In
        {`: ${!Number.isNaN(getRemainingDays) ? getRemainingDays : 0} days`}
      </p>
      <br />
      <Row>
        <Col span={9}>
          <Dropdown
            defaultValue={REPORT_TYPES.FIXTURE}
            handleDropDownChange={(v) => {
              setValues(options[v - 1]);
            }}
            isUseArrayIndex
            options={options}
            state="Report Type"
          />
        </Col>
      </Row>
      <br />

      {afterImage()?.length > 0 || beforeImage()?.length > 0 ? (
        <Row className="row">
          {beforeImage()?.length === 0 ? (
            "No Images Found"
          ) : (
            <Col span={10}>
              <span>After</span>
              <div className="beforeAfter">
                <p style={{ color: "black" }}>After</p>
              </div>
              <Carousel data={beforeImage()} />
            </Col>
          )}

          {afterImage()?.length === 0 ? (
            "No Images Found"
          ) : (
            <Col span={10}>
              <span>Before</span>
              <div className="beforeAfter">
                <p style={{ color: "black" }}>Before</p>
              </div>
              <Carousel data={afterImage()} />
            </Col>
          )}
        </Row>
      ) : (
        ""
      )}
    </S.Room>
  );
};

export default Company;

Company.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  // eslint-disable-next-line react/forbid-prop-types
  breadCrumb: PropTypes.objectOf(PropTypes.any),
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.objectOf(PropTypes.any),
  // eslint-disable-next-line react/forbid-prop-types
  rowData: PropTypes.objectOf(PropTypes.any),
  title: PropTypes.string,
};
