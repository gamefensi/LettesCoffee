import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import CoffeeTable from '../utils/CoffeeTable';
import { Col, Row } from 'reactstrap';
import { Coffee } from '../data/coffeelist';

export default function Schedule(props) {
  const [value, onChange] = useState(new Date());
  const [data, setData] = useState([Coffee])
  const [selected, setSelected] = useState([])

  console.log(value)


  // Source: http://stackoverflow.com/questions/497790
  var dates = {
    convert: function (d) {
      // Converts the date in d to a date-object. The input can be:
      //   a date object: returned without modification
      //  an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
      //   a number     : Interpreted as number of milliseconds
      //                  since 1 Jan 1970 (a timestamp) 
      //   a string     : Any format supported by the javascript engine, like
      //                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
      //  an object     : Interpreted as an object with year, month and date
      //                  attributes.  **NOTE** month is 0-11.
      return (
        d.constructor === Date ? d :
          d.constructor === Array ? new Date(d[0], d[1], d[2]) :
            d.constructor === Number ? new Date(d) :
              d.constructor === String ? new Date(d) :
                typeof d === "object" ? new Date(d.year, d.month, d.date) :
                  NaN
      );
    },
    compare: function (a, b) {
      // Compare two dates (could be of any type supported by the convert
      // function above) and returns:
      //  -1 : if a < b
      //   0 : if a = b
      //   1 : if a > b
      // NaN : if a or b is an illegal date
      // NOTE: The code inside isFinite does an assignment (=).
      return (
        isFinite(a = this.convert(a).valueOf()) &&
          isFinite(b = this.convert(b).valueOf()) ?
          (a > b) - (a < b) :
          NaN
      );
    },
    inRange: function (d, start, end) {
      // Checks if date in d is between dates in start and end.
      // Returns a boolean or NaN:
      //    true  : if d is between start and end (inclusive)
      //    false : if d is before start or after end
      //    NaN   : if one or more of the dates is illegal.
      // NOTE: The code inside isFinite does an assignment (=).
      return (
        isFinite(d = this.convert(d).valueOf()) &&
          isFinite(start = this.convert(start).valueOf()) &&
          isFinite(end = this.convert(end).valueOf()) ?
          start <= d && d <= end :
          NaN
      );
    }
  }


  const handleConvertDates = (array) => {
    return (
      array.forEach((d) => {
        var index = array.indexOf(d);
        if (index !== -1) {
          array[index] = dates.convert(d)
      }})
    )
  }

  const selectedCoffee = () => {
    let itemArray = []
    let i = 0
    // console.log(Coffee.map(x => x.roast_dates))
    // const convertedCoffees = Coffee.forEach((c) => handleConvertDates(c.roast_dates))
    // console.log(convertedCoffees)

    const filteredCoffee = Coffee.filter(d => d.roast_dates.some(r => dates.compare(r, value) === 0))

      return setSelected(array => [...itemArray, ...filteredCoffee])

            // for (i = 0; i < Coffee.length; i++) {
    //   if (convertedCoffees[i].roast_dates.includes(selectedDates)) {
    //     itemArray.push(convertedCoffees[i])
    //   }
    }
    console.log(selected)

    useEffect(() => {
      selectedCoffee()
    },[value])

  return (
    <div id='roastSchedule'>
      <h2 className='h1'>Roast Schedule</h2>
      <div className="desc-box mt-md-3" style={{ padding: "10px", backgroundColor: "#f5ebff" }}>
        Please select an upcoming roast date. The table will show which coffees are available for roasting on the selected date.
      </div>

      <Calendar onChange={onChange} value={value} />

      <Row>
        <Col>
          <CoffeeTable
            listItemsInCart={props.listItemsInCart}
            addToCart={props.addToCart}
            removeFromCart={props.removeFromCart}
            cartTotal={props.cartTotal}
            handleWeight={props.handleWeight}
            handleCartQty={props.handleCartQty}
            selectedCoffee={selected}
          />

        </Col>

      </Row>
    </div>
  );
}
