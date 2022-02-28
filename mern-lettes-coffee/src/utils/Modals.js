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
        <Login />
      </Modal.Body>
      <Modal.Footer style={{ display: "none" }}>
      </Modal.Footer>
    </Modal>
    </div>
  )
}

export function RegisterModal(props) {
  
  return (

    <div>
<Modal show={props.show1} onHide={props.handleClose1}>
<Modal.Header closeButton>
  <Modal.Title>Register</Modal.Title>
</Modal.Header>
<Modal.Body>
  <Register />
</Modal.Body>
<Modal.Footer style={{ display: "none" }}>
</Modal.Footer>
</Modal>
    </div>
  )
}


