import React from 'react';
import { Button, Table } from 'reactstrap';
import { Coffee } from '../data/coffeelist';


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
            {/* NOTE TO SELF: update later with 24oz */}
            <th>Price (12oz)</th>
            <th>Weight</th>
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
          />
        </tbody>
      </Table>
    )
  }

const CreateRows = (props) => {
  return (
    props.coffeeList.map((item) => (
    <tr key={item.id} >
      <td>{item.name}</td>
      <td>{item.country}</td>
      <td>{item.type}</td>
      <td>{item.cupping_score}</td>
      <td>{item.roast_level}</td>
      <td>{item.tasting_notes}</td>
      <td>${item.price12}</td>
      <td style={{minWidth:'150px'}} className="align-middle">
        <select id="weight" className='form-select ' name="weight" aria-label='select weight' >
          <option>Select option</option>
          <option value="12">12oz</option>
          <option value="24">24oz</option>
          <option value="48">48oz</option>
        </select>
      </td>
      <td style={{maxWidth:'50px'}}>
        <input id='qty' className='form-control' name='qty' disabled ></input>
      </td>
      <td>
        <Button type="button" onClick={() => props.addToCart(item)}>+</Button>
      </td>
      <td>
        <Button type="button" onClick={() => props.removeFromCart(item)}>-</Button>
      </td>
      
    </tr>
  )))

}