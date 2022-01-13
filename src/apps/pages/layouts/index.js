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
import AssignItemListPage from "../Items/AssignCourerItemListPage";
import ItemDeployedListPage from "../Items/ItemDeployedListPage";
import ItemRequestedListPage from "../Items/ItemRequestedListPage";
import ItemUpdatePage from "../Items/ItemUpdatePage";
import AdminOrderProcessing from "../Items/AdminOrderProcessing";
import OrderProcessing from "../Items/OrderProcessing";


import HomePage from '../HomePage'
import ItemList from '../user/ItemList'
import OrderProcess from '../user/OrderProcess'
import SafePaymeny from '../user/SafePayment'

import CourerList from '../Courer/ItemListPage'
import CourerOrderProcessingList from "../Courer/OrderProcessing";
import CourerOrderProcessing from "../Courer/CourerOrderProcessing";



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
                    get_cookies && get_cookies.userType === 1?
            <Route
              exact
              path="/"
              auth={auth}
              component={() => {
                return auth ? <Redirect to="/item/list" /> : <LoginPage />;
              }}
            />
            :
            <Route
              exact
              path="/"
              auth={auth}
              component={() => {
                return auth ? <Redirect to="/order/pending" /> : <LoginPage />;
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
          get_cookies && get_cookies.userType === 2?
          <ProtectedRoute
        path="/order-process"
        auth={Auth.auth}
        component={OrderProcess}
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
        path="/item/order-processing"
        auth={Auth.auth}
        component={OrderProcessing}
      />
      :null
      }
      {
          get_cookies && get_cookies.userType === 1?
          <ProtectedRoute
        path="/admin/order-processing"
        auth={Auth.auth}
        component={AdminOrderProcessing}
      />
      :null
      }
      {
          get_cookies && get_cookies.userType === 2?
          <ProtectedRoute
        path="/safe-payment/"
        auth={Auth.auth}
        component={SafePaymeny}
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
        path="/item/assign-courer"
        auth={Auth.auth}
        component={AssignItemListPage}
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
      {
          get_cookies && get_cookies.userType === 3?
      <ProtectedRoute
        path="/order/pending"
        auth={Auth.auth}
        component={CourerList}
      />
      :null 
      }
      {
          get_cookies && get_cookies.userType === 3?
          <ProtectedRoute
        path="/courer/processing-list"
        auth={Auth.auth}
        component={CourerOrderProcessingList}
      />
      :null
      }
      {
          get_cookies && get_cookies.userType === 3?
          <ProtectedRoute
        path="/courer/order-processing"
        auth={Auth.auth}
        component={CourerOrderProcessing}
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
