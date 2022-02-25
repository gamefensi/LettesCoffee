

export default function Cart(props) {
  if (props.listItemsInCart) {
    return props.listItemsInCart
  } else {
      return (
      <div>
        <h1 className="m-5">Nothing in Cart!</h1>
        <button className="btn btn-dark m-5" href='/' type='button'>Back</button>
      </div>
      )
    }
  }