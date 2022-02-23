import { useCallback, useContext, useEffect, useState } from "react"
import MainCarousel from './utils/Carousel';
import {Container,Button,Modal,Row,Col} from "react-bootstrap"
import { UserContext } from "./context/UserContext"
import Login from "./Login"
import Register from "./Register"
import Welcome from "./Welcome"
import Loader from "./utils/Loader"


export default function Home(props) {
  //local state to determine active tab
  const [userContext, setUserContext] = useContext(UserContext)
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  const handleClose = () => setShow(false);
  const handleClose1 = () => setShow1(false);
  const handleShow = () => setShow(true);
  const handleShow1 = () => setShow1(true);

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
    <div>

    <MainCarousel />
    <div class="p-5 mb-4 bg-light rounded-3">
      <Container fluid className="py-5">
        <h1 class="display-5 fw-bold">Welcome. Grab a seat and stay awhile.</h1>
        <p class="col-md-8 fs-4">While you're here, explore our selection of roast-to-order coffees from around the world. Taste fresh, Ethiopia, Colombia, Kenya, Honduras and Indonesia.</p>
        <Row>
        <Col className="col-sm-12 col-lg-2">
          <Button variant="success" className="btn my-4 btn-lg px-5" onClick={handleShow1}>
          Register
        </Button>
          </Col>
          <Col className="col-sm-12 col-lg-3">
          <Button variant="primary" className="btn my-4 btn-lg px-5 ms-lg-4" onClick={handleShow}>
          Sign In
        </Button>
          </Col>


        </Row>
      </Container>
    </div>


    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Sign In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Login />
      </Modal.Body>
      <Modal.Footer style={{display:"none"}}>
      </Modal.Footer>
    </Modal>
    <Modal show={show1} onHide={handleClose1}>
      <Modal.Header closeButton>
        <Modal.Title>Register</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Register />
      </Modal.Body>
      <Modal.Footer style={{display:"none"}}>
      </Modal.Footer>
    </Modal>
          
    </div>
  ) : userContext.token ? (
    <Container fluid>
      <Welcome />
    </Container>
  ) : (
    //display spinner using Loader component
    <Loader />
  )
}