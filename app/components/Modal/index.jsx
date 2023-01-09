import React from "react";
import { Modal } from "antd";
import PropTypes from "prop-types";

import Button from "@/components/Button";

import * as S from "./styled";

const Index = ({
  buttontitle,
  cancelTitle,
  handleCancel,
  handleClick,
  handleVisible,
  modalContent,
  noButton,
  setVisible,
  showCancelBtn,
  title,
  visible,
  width,
  ...props
}) => {
  const cancel = () => {
    if (handleCancel && typeof handleCancel === "function") {
      handleCancel();
    } else {
      setVisible(false);
    }
  };
  return (
    <S.Wrapper>
      {!noButton || props?.isReport ? (
        <Button
          onClick={handleVisible}
          size="small"
          type="primary"
          value={buttontitle || title}
        />
      ) : (
        ""
      )}
      {/*  */}
      <Modal
        centered
        className="Modal"
        footer={[
          <div style={{ display: "flex", justifyContent: "end" }}>
            {showCancelBtn && (
              <Button
                onClick={cancel}
                type="link"
                value={cancelTitle ?? "Cancel"}
              />
            )}
            <Button onClick={handleClick} type="link" value={title} />
          </div>,
        ]}
        maskClosable
        onCancel={() => setVisible(false)}
        visible={visible}
        width={width || 400}
      >
        {modalContent}
      </Modal>
    </S.Wrapper>
  );
};

export default Index;

Index.propTypes = {
  buttontitle: PropTypes.string,
  cancelTitle: PropTypes.string,
  handleCancel: PropTypes.func,
  handleClick: PropTypes.func,
  handleVisible: PropTypes.func,
  isReport: PropTypes.bool,
  modalContent: PropTypes.func,
  noButton: PropTypes.bool,
  setVisible: PropTypes.func,
  showCancelBtn: PropTypes.func,
  title: PropTypes.string,
  visible: PropTypes.bool,
  width: PropTypes.number,
};

Index.defaultProps = {
  isReport: false,
  showCancelBtn: true,
};
