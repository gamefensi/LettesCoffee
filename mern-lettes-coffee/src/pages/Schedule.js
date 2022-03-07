import React from 'react';
import Calendar from 'react-calendar';
import CoffeeTable from '../utils/CoffeeTable';
import { Col, Row } from 'reactstrap';


// import {isWithinInterval, Interval, min, max } from 'date-fns';

export default function Schedule(props) {




  return (
    <div id='roastSchedule'>
      <h2 className='h1'>Roast Schedule</h2>
      <div className="desc-box mt-md-3" style={{ padding: "10px", backgroundColor: "#f5ebff" }}>
        Please select an upcoming roast date. The table will show which coffees are available for roasting on the selected date.
      </div>

      <Calendar
        onChange={props.onChange}
        value={props.value}
        tileDisabled={props.tileDisabled}
        tileClassName={props.tileClassName}
      />

      <Row>
        <Col>
          <CoffeeTable
            listItemsInCart={props.listItemsInCart}
            addToCart={props.addToCart}
            removeFromCart={props.removeFromCart}
            cartTotal={props.cartTotal}
            handleWeight={props.handleWeight}
            handleCartQty={props.handleCartQty}
            selectedCoffee={props.selected}
          />

        </Col>

      </Row>
    </div>
  );
}
