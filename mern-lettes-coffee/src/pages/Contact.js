import React, { useState } from "react";
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import logo from '../images/logo/logo_960x500.jpg';

const FORM_ENDPOINT = "https://public.herotofu.com/v1/4a0cf490-96db-11ec-bdf8-dd9c99f898ec";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = () => {
    setTimeout(() => {
      setSubmitted(true);
    }, 100);
  };

  if (submitted) {
    return (
      <Container style={{ textAlign: "center" }}>
        <div style={{ margin: "auto", backgroundColor: "#ffe6f2", padding: "100px", width: "75%" }}>
          <h2>Thank you!</h2>
          <div>We'll be in touch soon.</div>
        </div>
      </Container>
    );
  }

  return (
    <Container fluid>
      <div style={{ backgroundColor: "rgb(33,37,41)", padding: "20px", marginTop: "50px" }}>
        <h1 style={{ color: "white" }}>Contact Us</h1>
      </div>
      {/* NOTE TO SELF: add header picture */}
      <Row className="mx-5">
        <Col className="my-4 col-sm-6 col-lg-4">
          <Form

            action={FORM_ENDPOINT}
            onSubmit={handleSubmit}
            method="POST"
            target="_blank"
          >
            <h1 className="h2">Send us a Message</h1>
            <FormGroup>
              <Label for="name">Your Name</Label>
              <Input type="text" placeholder="Your name" name="name" required />
            </FormGroup>
            <FormGroup>
              <Label for="email">Your Email</Label>
              <Input type="email" placeholder="Email" name="email" required />
            </FormGroup>
            <FormGroup>
              Your Message
              <Input type="textarea" placeholder="Your message" name="message" required />
            </FormGroup>
            <div>
              <Button type="submit"> Send a message </Button>
            </div>
          </Form>
        </Col>
        <Col className="my-4 px-md-5 col-sm-6 col-lg-8">
          <h1 className="h2">Contact Details </h1>
          <p>1-877-GET-CAFE</p>
          <p>info@lettescoffee.com</p>
          <img src={logo} width="400px"></img>
        </Col>

      </Row>
    </Container>
  );
};

export default Contact;