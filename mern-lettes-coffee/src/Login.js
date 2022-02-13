import { Button, Callout, FormGroup, InputGroup } from "@blueprintjs/core"
import React, { useContext, useState } from "react"
import { UserContext } from "./context/UserContext"

const Login = () => {
  //disables sign-in btn when user already pressed, displaying "Signing In" to inform user of what is happening
  const [isSubmitting, setIsSubmitting] = useState(false)
  //errorState to display message when login fails
  const [error, setError] = useState("")
  //local states will store email and password, wired to onchange handlers
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userContext, setUserContext] = useContext(UserContext)

  const formSubmitHandler = e => {
    //disable default submission of form
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    const genericErrorMessage = "Something went wrong! Please try again later."

    //make a POST call to endpoint /users/login with username and password params in req body
    fetch(process.env.REACT_APP_API_ENDPOINT + "users/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: email, password }),
    })
      .then(async response => {
        setIsSubmitting(false)
        if (!response.ok) {
          if (response.status === 400) {
            setError("Please fill all the fields correctly!")
          } else if (response.status === 401) {
            setError("Invalid email and password combination.")
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
      {error && <Callout intent="danger">{error}</Callout>}
      <form onSubmit={formSubmitHandler} className="auth-form">
        <FormGroup label="Email" labelFor="email">
          <InputGroup
            id="email"
            placeholder="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup label="Password" labelFor="password">
          <InputGroup
            id="password"
            placeholder="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </FormGroup>
        <Button
          intent="primary"
          disabled={isSubmitting}
          text={`${isSubmitting ? "Signing In" : "Sign In"}`}
          fill
          type="submit"
        />
      </form>
    </>
  )
}

export default Login

