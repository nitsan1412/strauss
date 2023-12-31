import React, { useEffect, useState } from "react";
import { useAuth } from "../context/auth-context";
import validateForm from "../helper/validations";
import { Row, Form, Col } from "react-bootstrap";
import InputField from "../components/form/InputField";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const fieldsArray = ["username", "email", "password"];
  const navigate = useNavigate();
  const { signup, jwt } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (jwt) {
      navigate("../dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jwt]);

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resoponse = await validateForm(fieldsArray, formData);
    await setErrors(resoponse.errors);
    if (Object.keys(resoponse.errors).length === 0) {
      try {
        await signup(formData);
      } catch (error) {
        if (error.includes("username")) {
          setErrors({ username: error });
        } else if (error.includes("email")) {
          setErrors({ email: error });
        }
      }
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
        <h2>Sign Up</h2>
        <h4>For Unregistered Users </h4>
        <Form
          noValidate
          validated={!!errors}
          onSubmit={handleSubmit}
          className="signup_form"
        >
          <Form.Group
            as={Col}
            className="signup_form_group"
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
              lable="Email"
              fieldName="email"
              type="email"
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
            Sign Up
          </button>{" "}
        </Form>
      </Row>
      <Row className="small_text_in_sign-in">
        <span>allready registered? you can </span>
        <span onClick={() => navigate("/")} className="underline_text">
          sign in
        </span>
      </Row>
    </Col>
  );
}
