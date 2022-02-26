import { Button, ListGroup, Container } from "reactstrap"
import { Link } from "react-router-dom"

export default function Cart(props) {
  if (props.listItemsInCart()) {
    return (
      <Container className="my-5">
        <ListGroup>
          <h1 className="h1 mb-3">View Your Cart</h1>
          <DisplayCart listItemsInCart={props.listItemsInCart} />

        </ListGroup>

        <Link to="/Checkout">
          <Button
            id="checkOut"
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
        <button className="btn btn-dark m-5" href='/' type='button'>Back</button>
      </div>
    )
  }
}

function DisplayCart(props) {
  return (
    props.listItemsInCart()
  )
}