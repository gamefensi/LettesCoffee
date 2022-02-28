import React, { useContext, useState} from 'react';
import FacebookLogin from 'react-facebook-login';
import { Card } from 'react-bootstrap';

function Checkout() {
  const [login, setLogin] = useState(false); //set up login
  const [data, setData] = useState({}); //set up fb data
  const [picture, setPicture] = useState(''); //set up fb profile image


  const responseFacebook = (response) => {
    console.log(response);
    setData(response);
    setPicture(response.picture.data.url);
    if (response.accessToken) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }
  return (
    <div className="container">
      {!login &&
        <Card style={{ width: '800px' }} className="mx-auto mt-5">
          <Card.Header className="pb-4">
            <h1>Sign In</h1>
          </Card.Header>
          <Card.Body>
            <Card.Text>
              <h3>Please login using one of the following:</h3>
              {/**Login Form */}
              <LoginForm />
              {/**FB Login Button */}
              <FacebookLogin
                appId="3146630185664482"
                autoLoad={false}
                fields="name,email,picture"
                score="public_profile,user_friends"
                callback={responseFacebook}
                icon="fa-facebook"
              />
            </Card.Text>
          </Card.Body>
        </Card>
      }

      {login &&
        <Card style={{ width: '800px' }} className="mx-auto mt-5">
          <Card.Header className="pb-4">
            <h1>Check Out</h1>
          </Card.Header>
          <Card.Body>
            <Home fbpic={picture} fbdata={data} />
          </Card.Body>
        </Card>
      }

    </div >
  );
}

function LoginForm() {
  return (
    <form className="border mt-3 mb-5 p-3 bg-white">
      <label className="m-2">Name:</label>
      <input type="text" name="name" placeholder="Your name" />
      <label className="m-2">Email:</label>
      <input type="email" name="email" placeholder="Your Email" />
      <input type="submit" value="Login" className="btn bg-success text-white my-3" />
    </form>
  )
}

function Home({ fbpic, fbdata }) {
  return (
    <Card.Text>
      <React.Fragment>
        <img src={fbpic} alt={fbdata.name} />
        <h3 className="d-inline text-success mx-2">
          Welcome back {fbdata.name}!
        </h3>
        <p className="my-3">Time to check out?</p>
      </React.Fragment>
    </Card.Text>
  )
}

export default Checkout;