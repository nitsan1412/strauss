import React, { useEffect, useState } from "react";
import { useAuth } from "../context/auth-context";
import validateForm from "../helper/validations";
import { Row, Form, Col } from "react-bootstrap";

import InputField from "../components/form/InputField";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const arrayForValidation = ["username", "password"];

  const navigate = useNavigate();

  const { signIn, jwt } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (jwt) navigate("./dashboard");
  }, [jwt]);

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const gotFormErrors = await validateForm(arrayForValidation, formData);
    await setErrors(gotFormErrors.errors);
    if (Object.keys(gotFormErrors.errors).length === 0) {
      signIn(formData);
    }
  };

  return (
    <Col
      xs={{ span: 10, offset: 1 }}
      sm={{ span: 8, offset: 2 }}
      md={{ span: 6, offset: 3 }}
      lg={{ span: 4, offset: 4 }}
      xl={{ span: 4, offset: 4 }}
      className="login-container"
    >
      <Row className="inner-container">
        <h2>Sign In</h2>
        <h4>For Registered Users </h4>
        <Form
          noValidate
          validated={!!errors}
          onSubmit={handleSubmit}
          className="login_form"
        >
          <Form.Group
            as={Col}
            className="login_form_group"
            controlId="validationCustom01"
          >
            <InputField
              lable="User Name"
              fieldName="username"
              type="text"
              onChange={(field, value) => handleChange(field, value)}
              errors={errors}
            />
            <InputField
              lable="Password"
              fieldName="password"
              type="password"
              onChange={(field, value) => handleChange(field, value)}
              errors={errors}
            />
          </Form.Group>
          <button type="submit" className="submit_btn">
            Sign In
          </button>
        </Form>
      </Row>
      <Row className="small_text_in_sign-in">
        <span>not a member yet? you might want to </span>
        <span onClick={() => navigate("/signup")} className="underline_text">
          sign up
        </span>
        <span> first</span>
      </Row>
    </Col>
  );
}
