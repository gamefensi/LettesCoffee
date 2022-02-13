import { Card, Tab, Tabs } from "@blueprintjs/core"
import { useCallback, useContext, useEffect, useState } from "react"
import { UserContext } from "./context/UserContext"
import Loader from "./Loader"
import Login from "./Login"
import Register from "./Register"
import Welcome from "./Welcome"
import Footer from "./Footer"
import NavMenu from "./Nav"
import { Container,Button,Modal,Row,Col } from "react-bootstrap"

import MainCarousel from './utils/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss';

function App() {
  //local state to determine active tab
  const [currentTab, setCurrentTab] = useState("login")
  const [userContext, setUserContext] = useContext(UserContext)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      <div class="p-5 mb-4 bg-light rounded-3">
        <Container fluid className="py-5">
          <h1 class="display-5 fw-bold">Welcome. Grab a seat and stay a while.</h1>
          <p class="col-md-8 fs-4">Using a series of utilities, you can create this jumbotron, just like the one in previous versions of Bootstrap. Check out the examples below for how you can remix and restyle it to your liking.</p>
          <Row>
            <Col className="col-1">
            <Button variant="primary" className="btn my-4 btn-lg" onClick={handleShow}>
            Sign In
          </Button>
            </Col>
            <Col className="col-1">
            <Button variant="primary" className="btn my-4 btn-lg" onClick={handleShow}>
            Register
          </Button>
            </Col>

          </Row>
        </Container>
      </div>
      {/* TODO: Make this into a button modal in the nav */}


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Login />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Register />
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
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
