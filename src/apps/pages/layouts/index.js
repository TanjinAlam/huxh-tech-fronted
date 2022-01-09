import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Cookies from "universal-cookie";
import AuthApi from "../../Context/AuthApi";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import NavBar from "./Header";
import Footer from "./Footer";

import { ProtectedRoute } from "../../route/routes";

import LoginPage from "../Auth/Login";
import SignUp from "../Auth/Registration";

//Importing Admin Pages
import ItemAddPage from "../Items/ItemAddPage";
import ItemListPage from "../Items/ItemListPage";
import ItemDeployedListPage from "../Items/ItemDeployedListPage";
import ItemRequestedListPage from "../Items/ItemRequestedListPage";
import ItemUpdatePage from "../Items/ItemUpdatePage";

import HomePage from '../HomePage'
import ItemList from '../user/ItemList'

const cookies = new Cookies();

function Index() {
  let auth_status;
  const get_cookies = cookies.get("data");
  console.log("get", get_cookies);
  // set true, if get cookies info
  if (get_cookies) {
    auth_status = true;
  } else {
    auth_status = false;
  }

  // set auth status
  const [auth, setAuth] = useState(auth_status);
  const authControl = () => setAuth(auth ? true : false);

  return (
    <>
      <AuthApi.Provider value={{ auth, authControl }}>
        <Router>
          <Switch>
            <Route path="/signup" component={SignUp} />

            {
                    get_cookies && get_cookies.userType === 2?
                    <Route
              exact
              path="/"
              auth={auth}
              component={() => {
                return auth ? <Redirect to="home" /> : <LoginPage />;
              }}
            />
                    :
            <Route
              exact
              path="/"
              auth={auth}
              component={() => {
                return auth ? <Redirect to="item/list" /> : <LoginPage />;
              }}
            />
}

            <Route>
                
                {
                    get_cookies && get_cookies.userType === 2?
                    <NavBar />
                    :
                    <>
                    <TopBar />
              <SideBar />
              </>

                }
              
              {
                    get_cookies && get_cookies.userType === 2?
                  <Routes />
              :<div className="main-wrapper">
              <div className="page-wrapper">
                <Routes />
              </div>
            </div>

              }
              
              {
                    get_cookies && get_cookies.userType === 2?
                    <Footer />
                    :null
              }
            </Route>

            <Route render={() => <h1> 404: Page not found. </h1>} />
          </Switch>
        </Router>
      </AuthApi.Provider>
    </>
  );
}

const Routes = () => {
  const Auth = React.useContext(AuthApi);
  
  const get_cookies = cookies.get("data");
  console.log("get", get_cookies);
  return (
    <Switch>
      {/* Admin Route Path */}
      {
          get_cookies && get_cookies.userType === 2?
          <ProtectedRoute
        path="/home"
        auth={Auth.auth}
        component={HomePage}
      />
      :null
      }
      {
          get_cookies && get_cookies.userType === 2?
          <ProtectedRoute
        path="/item-list/"
        auth={Auth.auth}
        component={ItemList}
      />
      :null
      }
      {
          get_cookies && get_cookies.userType === 1?
      <ProtectedRoute
        path="/item/add"
        auth={Auth.auth}
        component={ItemAddPage}
      />
      :
      null}
      {
          get_cookies && get_cookies.userType === 1?
      <ProtectedRoute
        path="/item/list"
        auth={Auth.auth}
        component={ItemListPage}
      />
      :
      null}
      
      {
          get_cookies && get_cookies.userType === 1?
      <ProtectedRoute
        path="/item/deployed-list"
        auth={Auth.auth}
        component={ItemDeployedListPage}
      />
      :null}
      
      {
          get_cookies && get_cookies.userType === 1?
      <ProtectedRoute
        path="/item/requested-list"
        auth={Auth.auth}
        component={ItemRequestedListPage}
      />
      :null 
      }
      <ProtectedRoute
        path="/item/update"
        auth={Auth.auth}
        component={ItemUpdatePage}
      />

      <ProtectedRoute
        path="*"
        auth={Auth.auth}
        component={() => "404 Page Not Found"}
      />
    </Switch>
  );
};

export default Index;
