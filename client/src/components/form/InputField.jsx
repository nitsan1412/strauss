import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "../../styles/form.css";
export default function InputField({
  lable,
  fieldName,
  type,
  onChange,
  errors,
}) {
  const [localErrors, setLocalErrors] = useState(errors[fieldName] || "");
  useEffect(() => {
    setLocalErrors(errors[fieldName] || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);
  return (
    <Row className="input-row">
      <Form.Label>{lable}</Form.Label>
      <Form.Control
        type={type}
        size="lg"
        onChange={(e) => onChange(fieldName, e.target.value)}
        isInvalid={!!localErrors}
      />
      <Form.Control.Feedback type="invalid">
        {localErrors}
      </Form.Control.Feedback>
    </Row>
  );
}
