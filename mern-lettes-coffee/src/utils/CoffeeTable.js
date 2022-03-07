import { Button } from 'reactstrap';
import { Form } from 'react-bootstrap';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';


export default function CoffeeTable(props) {

  
  return (
    <div>
    {props.selectedCoffee.length === 0 ? 
      (<div>
        <h1 style={{textAlign:"center",marginBottom:"100px"}}>Please select an available date</h1>
      </div>
      ) : (
    <Table id="coffeeTable">
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Country</Th>
          <Th>Cupping Score</Th>
          <Th>Roast Levels</Th>
          <Th>Tasting Notes</Th>
          <Th>Price</Th>
          <Th>QTY</Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        <CreateRows
          listItemsInCart={props.listItemsInCart}
          addToCart={props.addToCart}
          removeFromCart={props.removeFromCart}
          cartTotal={props.cartTotal}
          handleWeight={props.handleWeight}
          handleCartQty={props.handleCartQty}
          selectedCoffee={props.selectedCoffee}
        />
      </Tbody>
    </Table>
  )}
  </div>
  )
}

const CreateRows = (props) => {

  const showAlert = () => alert("You must select a weight first!")
  // const coffeeList = Coffee.map(item => (item.weight = "0")

  // const addToCart = (newItem, qty, weight, i) => {
  //   let itemArray = []
  //   for (i = 0; i < qty; i++) {
  //     if (weight === "12") {
  //       newItem.qty12 += 1;
  //       itemArray.push(newItem)
  //     } if (weight === "24") {
  //       newItem.qty24 += 1;
  //       itemArray.push(newItem)
  //     }

  //  }

  //   setCart(currentCart => [...currentCart, ...itemArray]);
  // }

  return (
    props.selectedCoffee.map((item, index) => (
      <Tr key={item.id} >
        <Td>{item.name}</Td>
        <Td>{item.country}</Td>
        <Td>{item.cupping_score}</Td>
        <Td>{item.roast_level}</Td>
        <Td>{item.tasting_notes}</Td>
        <Td style={{ minWidth: '150px' }} className="align-middle">
          <Form.Select name="weight" aria-label="select weight" onChange={props.handleWeight(index)}>
            <option value="0">Select an option</option>
            <option value="12">${item.price12} (12oz)</option>
            <option value="24">${item.price24} (24oz)</option>
          </Form.Select>
        </Td>
        <Td className="qtyWrapper">
          <input
            id='qty'
            type='number'
            className='form-control'
            name='qty'
            defaultValue={item.cartQty}
            onChange={props.handleCartQty(index,'+')}
          />
        </Td>
        <Td>
          <Button
            variant="outline-light"
            type="button"
            className="addToCart"
            size="sm"
            onClick={() =>
              (item.weight === "0")
                ? showAlert() : props.addToCart(item, item.cartQty, item.selectedWeight, 0)}
          >
            Add <span className="hideBelowLg">to Cart</span>
          </Button>{' '}
        </Td>

      </Tr>
    ))
  )

}