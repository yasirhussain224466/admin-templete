import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import PropTypes from "prop-types";

const Form = ({ errors, onSubmit, ...rest }) => {
  const methods = useForm();
  const { handleSubmit, setError } = methods;

  useEffect(() => {
    if (errors) {
      Object.entries(errors).forEach(([name, message]) => {
        setError(name, {
          message,
          types: "mannual",
        });
      });
    }
  }, [errors]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} {...rest} />
    </FormProvider>
  );
};

Form.propTypes = {
  errors: PropTypes.shape(),
  onSubmit: PropTypes.func.isRequired,
  rest: PropTypes.shape(),
};

Form.defaultProps = {
  errors: {},
  rest: {},
};

export default Form;
