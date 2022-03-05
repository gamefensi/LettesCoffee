import { Alert, Button, Form } from "react-bootstrap"
import React, { useContext, useState } from "react"
import { UserContext } from "./context/UserContext"


const Register = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userContext, setUserContext] = useContext(UserContext)
  const [validated, setValidated] = useState(false);

  const formSubmitHandler = e => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")


    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);



    const genericErrorMessage = "Something went wrong! Please try again later."

    fetch(process.env.REACT_APP_API_ENDPOINT + "users/signup", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, username: email, password }),
    })
      .then(async response => {
        setIsSubmitting(false)
        if (!response.ok) {
          if (response.status === 400) {
            setError("Please fill all the fields correctly!")
          } else if (response.status === 401) {
            setError("Invalid email and password combination.")
          } else if (response.status === 500) {
            console.log(response)
            const data = await response.json()
            if (data.message) setError(data.message || genericErrorMessage)
          } else {
            setError(genericErrorMessage)
          }
        } else {
          // on success, save token value to user context
          const data = await response.json()
          setUserContext(oldValues => {
            return { ...oldValues, token: data.token }
          })
          props.setShow(false)
        }
      })
      .catch(error => {
        setIsSubmitting(false)
        setError(genericErrorMessage)
      })

  };

  return (
    <>
      <form onSubmit={formSubmitHandler} className="auth-form" validated={validated} noValidate>
        <Form.Group controlId="validationCustom01">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            id="firstName"
            required
            onChange={e => setFirstName(e.target.value)}
            value={firstName}
          />
          <Form.Control.Feedback type="invalid">
            Please enter first name.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="validationCustom0w">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            id="lastName"
            required
            onChange={e => setLastName(e.target.value)}
            value={lastName}
          />
          <Form.Control.Feedback type="invalid">
            Please enter last name.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="validationCustom03">
          <Form.Label>Email</Form.Label>
          <Form.Control
            id="email"
            required
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a valid email.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="validationCustom04">
          <Form.Label>Password</Form.Label>
          <Form.Control
            id="password"
            required
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a password.
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          variant="primary"
          disabled={isSubmitting}
          type="submit"
        >
          {`${isSubmitting ? "Registering" : "Register"}`}
        </Button>
      </form>
    </>
  )
}

export default Register