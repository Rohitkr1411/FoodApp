import React,{useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cart from '../Screens/Cart';
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Modal from '../Modal';
import { useCart } from './ContextReducer';
export default function NavbarBoot() {

  const navigate = useNavigate();
  const [cartView, setCartView] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    navigate("/login")
  }

  const loadCart = () => {
    setCartView(true)
}
let items = useCart();

  return (
     <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">RkFoodApp</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="#collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
              </li>
              {(localStorage.getItem("authToken")) ?
                <li className="nav-item">
                  <Link className="nav-link active fs-5 mx-3 active" aria-current="page" to="/myOrders">My Orders</Link>
                </li>
                : ""
              }
            </ul>

            {!(localStorage.getItem("authToken")) ?

              <form className="d-flex">
                <Link className="btn bg-white text-success mx-2 " to="/signup">SignUp</Link>
                <Link className="btn bg-white text-success mx-2" to="/login">Login</Link>
                </form>
                  :
                  <div>
                   <div className="btn bg-white text-success mx-2 " onClick={loadCart}>
                                    <Badge color="secondary" badgeContent={items?items.length:0} >
                                        <ShoppingCartIcon />
                                    </Badge>
                                    Cart
                                </div>
                    
                                {cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : ""}
                    <div className="btn bg-white text-danger mx-2" onClick={handleLogout}>
                      Logout
                    </div>

                  </div>
      }
                </div>
              </div>

</nav>
    </>
        );
}


