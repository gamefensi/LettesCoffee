import Login from "../Login";
import Register from "../Register";
import { Modal } from "react-bootstrap";

export function LoginModal(props) {

  const handleClose = () => props.setShow(false)
  return (

    <div>
      <Modal show={props.show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Login show={props.show} setShow={props.setShow} />
        </Modal.Body>
        <Modal.Footer style={{ display: "none" }}>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export function RegisterModal(props) {

  const handleClose1 = () => props.setShow1(false)

  return (

    <div>
      <Modal show={props.show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Register show={props.show1} setShow={props.setShow1} />
        </Modal.Body>
        <Modal.Footer style={{ display: "none" }}>
        </Modal.Footer>
      </Modal>
    </div>
  )
}


