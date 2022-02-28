import { Card } from "@blueprintjs/core"
import React, { useCallback, useContext, useEffect } from "react"
import { UserContext } from "./context/UserContext"
import Loader from "./utils/Loader"

const Welcome = () => {
  const [userContext, setUserContext] = useContext(UserContext)

  const fetchUserDetails = useCallback(() => {
    fetch(process.env.REACT_APP_API_ENDPOINT + "users/me", {
      method: "GET",
      credentials: "include",
      // Pass authentication token as bearer token in header
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      },
    }).then(async response => {
      //if ok, pass values to userContext.details
      if (response.ok) {
        const data = await response.json()
        setUserContext(oldValues => {
          return { ...oldValues, details: data }
        })
      } else {
        if (response.status === 401) {
          //Edge case: when token has expired.
          //This could happen if the refreshToken calls have failed due to network error or
          //User has had the tab open from previous day and tries to click on the Fetch button
          window.location.reload()
        } else {
          //if error, make null to show error message
          setUserContext(oldValues => {
            return { ...oldValues, details: null }
          })
        }
      }
    })
  }, [setUserContext, userContext.token])

  useEffect(() => {
    // fetch only when user details are not present
    if (!userContext.details) {
      fetchUserDetails()
    }
  }, [userContext.details, fetchUserDetails])

  const logoutHandler = () => {
    fetch(process.env.REACT_APP_API_ENDPOINT + "users/logout", {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      },
    }).then(async response => {
      //set token to null to remove from db & cookie to display login page 
      setUserContext(oldValues => {
        return { ...oldValues, details: undefined, token: null }
      })
      //save time of logout so we can logout user from all tabs
      window.localStorage.setItem("logout", Date.now())
    })
  }

  // const refetchHandler = () => {
  //   // set details to undefined so that spinner will be displayed and
  //   // fetchUserDetails will be invoked from useEffect
  //   setUserContext(oldValues => {
  //     return { ...oldValues, details: undefined }
  //   })
  // }

  return userContext.details === null ? (
    "Error Loading User details"
  ) : !userContext.details ? (
    <Loader />
  ) : (
    <div>
      <Card className="my-5" elevation="1">
      <div className="user-details">
        <div>
          <p>
            Welcome&nbsp;
            <strong>
              {userContext.details.firstName}
              {userContext.details.lastName &&
                " " + userContext.details.lastName}
            </strong>
          </p>
          <p>
            Have a seat and stay awhile ☕.
          </p>
        </div>
        {/* <div className="user-actions">
          <Button
            text="Logout"
            onClick={logoutHandler}
            minimal
            intent="primary"
          /> */}
          {/* <Button text="Refetch" intent="primary" onClick={refetchHandler} /> */}
        {/* </div> */}
      </div>
    </Card>
    </div>
  )
}

export default Welcome