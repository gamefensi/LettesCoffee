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
  // const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({})
  const [errors, setErrors] = useState({})

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value
    })
    //Check and see if errros exist, and remove them from the error object
    if ( !!errors[field]) setErrors({
      ...errors,
      [field]: null
    })
  }
  
  const findFormErrors = () => {
    const { firstName, lastName, email, password } = form
    const newErrors = {}
    // name errors
    if ( !firstName || firstName === '' ) newErrors.firstName = 'cannot be blank!'
    else if ( firstName.length > 30 ) newErrors.firstName = 'name is too long!'
    // food errors
    if ( !lastName || lastName === '' ) newErrors.lastName = 'cannot be blank!'
    else if ( lastName.length > 30 ) newErrors.lastName = 'name is too long!'
    // rating errors
    if ( !email || email === '' ) newErrors.email = 'cannot be blank!'
    else if (email.match(/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/)) newErrors.email = 'please enter a valid email address'
    // comment errors
    if ( !password || password === '' ) newErrors.password = 'cannot be blank!'
    else if (password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)) newErrors.password = 'password must be 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter'

    return newErrors
}

  const formSubmitHandler = e => {
    e.preventDefault()
    setIsSubmitting(true)
    const newErrors = findFormErrors()

//     const inputs = document.querySelectorAll('input');

// const patterns = {
//   password: /^[\d\w@-]{8,20}$/i,
//   email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
//   phone: /^\d{3}-\d{3}-\d{4}$/
// };

// inputs.forEach((input) => {
//   input.addEventListener('keyup', (e) => {
//     validate(e.target, patterns[e.target.attributes.id.value]);
//   });
// });

// function validate(field, regex) {
//   if (regex.test(field.value)) {
//     setValidated(true);
//   } else {
//     setValidated(false);
//   }
// }
    if ( Object.keys(newErrors).length > 0 ) {
      setIsSubmitting(false)
      setErrors(newErrors)
    } else {

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
    }
  };

  return (
    <>
      {error && <Alert intent="danger">{error}</Alert>}
      <form onSubmit={formSubmitHandler} className="auth-form">
        <Form.Group controlId="validationCustom01">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            // id="firstName"
            type='text'
            required
            onChange={e => setField('name', e.target.value)}
            // value={firstName}
            isInvalid={ !!errors.firstName}
          />
          <Form.Control.Feedback type="invalid">
            { errors.name }
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="validationCustom0w">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            // id="lastName"
            type='text'
            required
            onChange={e => setField('name', e.target.value)}
            // value={lastName}
            isInvalid={ !!errors.lastName}
          />
          <Form.Control.Feedback type="invalid">
            { errors.name }
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="validationCustom03">
          <Form.Label>Email</Form.Label>
          <Form.Control
            // id="email"
            type='text'
            required
            onChange={e => setField('name', e.target.value)}
            // value={email}
            isInvalid={ !!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            { errors.name }
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="validationCustom04">
          <Form.Label>Password</Form.Label>
          <Form.Control
            // id="password"
            type='text'
            required
            onChange={e => setField('name', e.target.value)}
            // value={password}
            isInvalid={ !!errors.password}
          />
          <Form.Control.Feedback type="invalid">
            { errors.name }
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