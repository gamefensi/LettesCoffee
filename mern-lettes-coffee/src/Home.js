import { useCallback, useContext, useEffect, useState } from "react";
import MainCarousel from './utils/Carousel';
import { Container, Button, Row, Col, Toast } from "react-bootstrap"
import { UserContext } from "./context/UserContext"
import Welcome from "./Welcome"
import Loader from "./utils/Loader"
import { LoginModal, RegisterModal } from "./utils/Modals";



export default function Home(props) {
  //local state to determine active tab
  const [show1, setShow1] = useState(false);
  const [userContext, setUserContext] = useContext(UserContext)
  const [showToast, setShowToast] = useState(false);

  const handleShow1 = () => setShow1(true);
  const handleShow = () => props.setShow(true);


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
      {props.logout === true && (
      <Row>
        <Col xs={6}>
          <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
            <Toast.Header>
              <img
                src="holder.js/20x20?"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">Bootstrap</strong>
              <small>11 mins ago</small>
            </Toast.Header>
            <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
          </Toast>
        </Col>
      </Row>
      ) }
      <MainCarousel />
      <div className="p-md-5 p-xs-1 bg-light rounded-3">
        <Container fluid className="py-5">
          <h1 className="display-5 fw-bold">Welcome. Grab a seat and stay awhile.</h1>
          <p className="col-md-8 fs-4">While you're here, explore our selection of roast-to-order coffees from around the world. Taste fresh, Ethiopia, Colombia, Kenya, Honduras and Indonesia.</p>
          <Row>
            <Col sm="2" xxl="1">
              <Button variant="success" className="btn my-4 btn-lg " onClick={handleShow1}>
                Register
              </Button>
            </Col>
            <Col sm="10" xxl="11">
              <Button variant="primary" className="btn my-4 btn-lg ms-sm-2" onClick={handleShow}>
                Sign In
              </Button>
            </Col>


          </Row>
        </Container>
      </div>

      <LoginModal setShow={props.setShow} show={props.show} />
      <RegisterModal setShow1={setShow1} show1={show1} />

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