/* eslint-disable no-return-assign */
import React, { Component } from "react";
import Slider from "react-slick";
import PropTypes from "prop-types";

import * as S from "./styled";

export default class AsNavFor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nav1: null,
      nav2: null,
      changeBorder: null,
    };
  }

  componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2,
    });
  }

  afterChangeEvent = (afterChange) => {
    this.setState({
      changeBorder: afterChange,
    });
  };

  noOfImagesShow = () => {
    if (this.props?.data?.length <= 2) {
      return this.props?.data?.length;
    }
    return 3;
  };

  render() {
    return (
      <S.Wrapper>
        <div className="slider-wrapper">
          <div className="media">
            <Slider
              ref={(slider) => (this.slider1 = slider)}
              arrows
              asNavFor={this.state.nav2}
            >
              {this.props?.data?.map((item) => (
                <div>
                  <img
                    alt=""
                    className="rm-img"
                    height="165px"
                    src={`${process.env.AWS_BUCKET_URL}${item?.key}`}
                    width="100%"
                  />
                </div>
              ))}
            </Slider>
          </div>
          <div className="nav">
            <Slider
              ref={(slider) => (this.slider2 = slider)}
              afterChange={this.afterChangeEvent}
              asNavFor={this.state.nav1}
              draggable
              focusOnSelect
              onSwipe={this.onSwipeEvent}
              slidesToShow={this.noOfImagesShow()}
              swipeToSlide
              touchThreshold={50}
            >
              {this.props?.data?.map((item, i) => (
                <div>
                  <img
                    alt=""
                    className={`inner-nav  ${
                      this.state.changeBorder === i ? "blue" : ""
                    }`}
                    src={`${process.env.AWS_BUCKET_URL}${item?.key}`}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </S.Wrapper>
    );
  }
}

AsNavFor.propTypes = {
  data: PropTypes.arrayOf(PropTypes.node),
};
