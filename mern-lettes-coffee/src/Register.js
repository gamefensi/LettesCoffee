import { Alert, Button, Form } from "react-bootstrap"
import React, { useContext, useState } from "react"
import { UserContext } from "./context/UserContext"


const Register = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [userContext, setUserContext] = useContext(UserContext)
  // const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({})
  const [errors, setErrors] = useState({})

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value
    })
    //Check and see if errros exist, and remove them from the error object
    if (!!errors[field]) setErrors({
      ...errors,
      [field]: null
    })
  }

  const findFormErrors = () => {
    const { firstName, email, password } = form
    const newErrors = {}
    // firstname errors
    if (!firstName || firstName === '') newErrors.firstName = 'required'
    else if (firstName.length > 30) newErrors.firstName = 'name is too long!'
    // lastname errors
    // if (!lastName || lastName === '') newErrors.lastName = 'required'
    // else if (lastName.length > 30) newErrors.lastName = 'name is too long!'
    // email errors
    if (!email || email === '') newErrors.email = 'required'
    else if (email.match(/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/) === null) newErrors.email = 'please enter a valid email address'
    // password errors
    if (!password || password === '') newErrors.password = 'required'
    else if (password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/) === null) newErrors.password = 'password must be 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter'

    return newErrors
  }

  const formSubmitHandler = e => {
    e.preventDefault()
    setIsSubmitting(true)
    const newErrors = findFormErrors()

    if (Object.keys(newErrors).length > 0) {
      setIsSubmitting(false)
      setErrors(newErrors)
    } else {

      const genericErrorMessage = "Something went wrong! Please try again later."
      const {firstName, lastName, email, password} = form
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
    }
  };

  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
      <form onSubmit={formSubmitHandler} className="auth-form" noValidate>
        <Form.Group controlId="validationCustom01">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            // id="firstName"
            type='text'
            required
            onChange={e => setField('firstName', e.target.value)}
            // value={firstName}
            isInvalid={!!errors.firstName}
          />
          <Form.Control.Feedback type="invalid">
            {errors.firstName}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="validationCustom0w">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            // id="lastName"
            type='text'
            onChange={e => setField('lastName', e.target.value)}
            // value={lastName}
            isInvalid={!!errors.lastName}
          />
          <Form.Control.Feedback type="invalid">
            {errors.lastName}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="validationCustom03">
          <Form.Label>Email</Form.Label>
          <Form.Control
            // id="email"
            type='text'
            required
            onChange={e => setField('email', e.target.value)}
            // value={email}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="validationCustom04">
          <Form.Label>Password</Form.Label>
          <Form.Control
            // id="password"
            type='text'
            required
            onChange={e => setField('password', e.target.value)}
            // value={password}
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          variant="primary"
          disabled={isSubmitting}
          type="submit"
          className="mt-3"
        >
          {`${isSubmitting ? "Registering" : "Register"}`}
        </Button>
      </form>
    </>
  )
}

export default Register