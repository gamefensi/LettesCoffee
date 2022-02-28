import { ListGroup, Container } from "reactstrap";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function Cart(props) {
  if (props.cartTotal > 0) {
    return (
      <Container className="my-5">
        <ListGroup>
          <h1 className="h1 mb-3">View Your Cart</h1>
          <DisplayCart listItemsInCart={props.listItemsInCart} />

        </ListGroup>

        <Link to="/Checkout">
          <Button
            id="checkOut"
            variant="success"
            href="/Checkout"
            className="btn btn-primary my-3 me-xs-2 me-lg-3"
          >
            Check Out
          </Button>
        </Link>
        <Link to="/">
          <Button
            id="backToHome"
            href="/"
            className="btn btn-dark"
          >
            Back
          </Button>
        </Link>
      </Container>

    )
  } else {
    return (
      <div>
        <h1 className="m-5">Nothing in Cart!</h1>
        <Link to="/">
          <button
            className="btn btn-dark m-5"
            type='button'
          >
            Back
          </button>
        </Link>
      </div>
    )
  }
}

function DisplayCart(props) {
  return (
    props.listItemsInCart()
  )
}