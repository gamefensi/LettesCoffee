import React from 'react';
import { Button, Table } from 'reactstrap';
import { Coffee } from '../data/coffeelist';
import { Form } from 'react-bootstrap';

export default function CoffeeTable(props) {

    return (
      <Table striped hover borderless responsive="sm" id="coffeeTable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Country</th>
            <th>Coffee Type</th>
            <th>Cupping Score</th>
            <th>Roast Levels</th>
            <th>Tasting Notes</th>
            <th>Price</th>
            <th>QTY</th>
          </tr>
        </thead>
        <tbody>
          <CreateRows 
            coffeeList={Coffee}
            listItemsInCart = {props.listItemsInCart}
            addToCart = {props.addToCart}
            removeFromCart = {props.removeFromCart}
            cartTotal = {props.cartTotal}  
            handleWeight={props.handleWeight}
            handleCartQty={props.handleCartQty}
          />
        </tbody>
      </Table>
    )
  }

const CreateRows = (props) => {
  return (
    props.coffeeList.map((item, index) => (
    <tr key={item.id} >
      <td>{item.name}</td>
      <td>{item.country}</td>
      <td>{item.type}</td>
      <td>{item.cupping_score}</td>
      <td>{item.roast_level}</td>
      <td>{item.tasting_notes}</td>
      <td style={{minWidth:'150px'}} className="align-middle">
      <Form.Select name="weight" aria-label="select weight" onChange={props.handleWeight(index)}>
                      <option value="0">Select an option</option>
                      <option value="12">12oz (${item.price12})</option>
                      <option value="24">24oz (${item.price24})</option>
                    </Form.Select>
      </td>
      <td style={{maxWidth:'80px'}}>
        <input 
          id='qty' 
          type='number' 
          className='form-control' 
          name='qty' 
          defaultValue="0"
          onChange={props.handleCartQty(index)}
        />
      </td>
      <td>
      <Button
                        variant="outline-light"
                        type="button"
                        onClick={() => props.addToCart(item,item.cartQty,item.selectedWeight,0)}
                      >
                        Add to Cart
                      </Button>{' '}
      </td>
      
    </tr>
  )))

}