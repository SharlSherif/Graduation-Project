import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Index from './components/Index';
import Offers from './components/Offers';
import MyAccount from './components/MyAccount';
import List from './components/List';
import NotFound from './components/NotFound';
import Thanks from './components/Thanks';
import Extra from './components/Extra';
import Login from './components/Login';
import Register from './components/Register';
import TrackOrder from './components/TrackOrder';
import Invoice from './components/Invoice';
import Checkout from './components/Checkout';
import Detail from './components/Detail';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'react-select2-wrapper/css/select2.css';
import './App.css';
// ? admin components
import AdminLogin from './components/Admin/Login';
import AdminDashboard from './components/Admin/Dashboard';
import SellerRegisterForm from './components/SellerRegisterForm';

const SellerRoute = ({ component: Component, ...rest }) => {
  let token = localStorage.getItem('token')
  let user = localStorage.getItem('user')

  return (
    <Route {...rest} render={(props) => (
      !!token && !user.isSeller // logged in and not a seller
        ? <Component {...props} />
        : <Redirect to='/listing' />
    )} />
  )
}
const AdminRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={(props) => (
      !!localStorage.user && JSON.parse(localStorage.user).isAdmin// user exists in the cache and is also an admin
        ? <Component {...props} />
        : <Redirect to='/login' />
    )} />
  )
}

const PublicRoute = ({ component: Component, ...rest }) => {
  let token = localStorage.getItem('token')

  return (
    <Route {...rest} render={(props) => (
      !!token // not undefined
        ? <Redirect to='/listing' />
        : <Component {...props} />
    )} />
  )
}


class App extends React.Component {
  render() {
    return (
      <>
        {
          (this.props.location.pathname !== '/login' && this.props.location.pathname !== '/admin/login' && this.props.location.pathname !== '/register') ? <Header /> : ''
        }
        <Switch>
          {/* admin dashboard route */}
          <PublicRoute path="/admin/login" exact component={AdminLogin} />
          <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
          {/* admin dashboard route */}

          {/* seller dashboard routes */}
          <SellerRoute path="/myaccount/becomeseller" exact component={SellerRegisterForm} />
          {/* <SellerRoute path="/myaccount/seller/dashboard" exact component={SellerDashboardHome} /> */}
          {/* seller dashboard routes */}

          {/* regular users login page route */}
          <PublicRoute path="/login" exact component={Login} />

          <Route path="/" exact component={Index} />
          <Route path="/offers" exact component={Offers} />
          <Route path="/listing" exact component={List} />
          <Route path="/myaccount" component={MyAccount} />
          <Route path="/404" exact component={NotFound} />
          <Route path="/extra" exact component={Extra} />
          <Route path="/register" exact component={Register} />
          <Route path="/track-order" exact component={TrackOrder} />
          <Route path="/invoice" exact component={Invoice} />
          <Route path="/checkout" exact component={Checkout} />
          <Route path="/thanks" exact component={Thanks} />
          <Route path="/detail" exact component={Detail} />
          <Route exact component={NotFound} />
        </Switch>
        {
          (this.props.location.pathname !== '/login' && this.props.location.pathname !== '/register') ? <Footer /> : ''
        }
      </>
    );
  }
}

export default App;
