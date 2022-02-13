import { Card, Tab, Tabs } from "@blueprintjs/core"
import { useCallback, useContext, useEffect, useState } from "react"
import { UserContext } from "./context/UserContext"
import Loader from "./Loader"
import Login from "./Login"
import Register from "./Register"
import Welcome from "./Welcome"
import Footer from "./Footer"
import 'bootstrap/dist/css/bootstrap.min.css'
import NavMenu from "./Nav"
import { Container } from "react-bootstrap"
import MainCarousel from './utils/Carousel';

function App() {
  //local state to determine active tab
  const [currentTab, setCurrentTab] = useState("login")
  const [userContext, setUserContext] = useContext(UserContext)

  //verifyUser enclosed w/in useCallback to avoid redeclaration when component re-renders
  //will be called on page load (useEffect) and will make call to /refreshToken
  //if success, then saves token from response body to context
  //if err, then token set to null in context (i.e. user not authenticated) 
  const verifyUser = useCallback(() => {
    fetch(process.env.REACT_APP_API_ENDPOINT + "users/refreshToken", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    }).then(async response => {
      if (response.ok) {
        const data = await response.json()
        setUserContext(oldValues => {
          return { ...oldValues, token: data.token }
        })
      } else {
        setUserContext(oldValues => {
          return { ...oldValues, token: null }
        })
      }
      // call refreshToken every 5 minutes to renew the authentication token
      setTimeout(verifyUser, 5 * 60 * 1000)
    })
  }, [setUserContext])

  useEffect(() => {
    verifyUser()
  }, [verifyUser])

  /**
   * Sync logout across tabs
   */
  const syncLogout = useCallback(event => {
    if (event.key === "logout") {
      //If using react-router-dom, you may call history.push("/")
      window.location.reload()
    }
  }, [])

  useEffect(() => {
    window.addEventListener("storage", syncLogout)
    return () => {
      window.removeEventListener("storage", syncLogout)
    }
  }, [syncLogout])

  return userContext.token === null ? (

    <Container fluid>
      <NavMenu />
      <MainCarousel />
      {/* TODO: Make this into a button modal in the nav */}
      <Card elevation="1">
        <Tabs id="Tabs" onChange={setCurrentTab} selectedTabId={currentTab}>
          <Tab id="login" title="Login" panel={<Login />} />
          <Tab id="register" title="Register" panel={<Register />} />
          <Tabs.Expander />
        </Tabs>
      </Card>
      <Footer />
    </Container>

  ) : userContext.token ? (
    <Container fluid>
      <Welcome />
    </Container>
  ) : (
    //display spinner using Loader component
    <Loader />
  )
}


export default App;
