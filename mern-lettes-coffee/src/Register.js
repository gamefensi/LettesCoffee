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

  const formSubmitHandler = e => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")
    props.setShow(false)

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
            if(data.message) setError(data.message || genericErrorMessage)
          } else {
            setError(genericErrorMessage)
          }
        } else {
          // on success, save token value to user context
          const data = await response.json()
          setUserContext(oldValues => {
            return { ...oldValues, token: data.token }
          })
        }
      })
      .catch(error => {
        setIsSubmitting(false)
        setError(genericErrorMessage)
      })
  }

  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
      <form onSubmit={formSubmitHandler} className="auth-form">
        <Form.Group>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            id="firstName"
            placeholder="First Name"
            onChange={e => setFirstName(e.target.value)}
            value={firstName}
          />
        </Form.Group>
        <Form.Group>
        <Form.Label>Last Name</Form.Label>
          <Form.Control
            id="lastName"
            placeholder="Last Name"
            onChange={e => setLastName(e.target.value)}
            value={lastName}
          />
        </Form.Group>
        <Form.Group>
        <Form.Label>Email</Form.Label>
          <Form.Control
            id="email"
            placeholder="Email"
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
        </Form.Group>
        <Form.Group>
        <Form.Label>Password</Form.Label>
          <Form.Control
            id="password"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
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