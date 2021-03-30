import {useContext} from 'react';
import {useHistory, Link} from 'react-router-dom';
import {UserContext} from '../context/userContext';
import {CartContext} from '../context/cartContext';
import {NavDropdown, Nav, Alert} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus, faUser, faSignOutAlt, faBoxes, faTruck } from '@fortawesome/free-solid-svg-icons'

function UserActive(props) {

  const [userState, dispatch] = useContext(UserContext);
  const [cartState] = useContext(CartContext);

  const logoutHandler = (event) => {
    dispatch({
      type: "LOGOUT"
    })
  }
  
  let qty = [];
  if(cartState.carts !== null){
    const carts = cartState.carts.map(cart => {
      qty.push(cart.qty);
    })
  }

  console.log(`${props.rule} from user`)

  let total = (qty.length != 0 ? qty.reduce((a, b) => a + b) : 0 )
 
  return(
    <>
      <NavDropdown
        title={
        <div className="pull-left">
          <img className="user-icon" src={process.env.PUBLIC_URL + '/user.png'} alt="user pic" />
        </div>
        } id="basic-nav-dropdown" className="float-right custom-dropdown">

        {(props.role == 'partner') ? (
          <div>
        <Nav.Link as={Link} to="/partner">
          <NavDropdown.Item href="/partner" className="p-2 font-weight-bold">
            <span style={{marginRight: "15px"}}>
              <FontAwesomeIcon icon={faTruck} className="text-dark font-standart" />
            </span>
            <span>
              Transactions
            </span>
          </NavDropdown.Item>
        </Nav.Link>
        <Nav.Link as={Link} to="/partner/profile-partner">
          <NavDropdown.Item href="/partner/profile-partner" className="p-2 font-weight-bold">
            <span style={{marginRight: "15px"}}>
              <FontAwesomeIcon icon={faUser} className="text-dark font-standart" />
            </span>
            <span>
              Profile
            </span>
          </NavDropdown.Item>
        </Nav.Link>
        </div>
        ) : (
        <Nav.Link as={Link} to="/profile">
          <NavDropdown.Item href="/profile" className="p-2 font-weight-bold">
            <span style={{marginRight: "15px"}}>
              <FontAwesomeIcon icon={faUser} className="text-dark font-standart" />
            </span>
            <span>
              Profile
            </span>
          </NavDropdown.Item>
        </Nav.Link>
        )}

        { props.role == 'partner' && 
        <Nav.Link as={Link} to="/partner/products">
          <NavDropdown.Item href="/partner/products" className="p-2 font-weight-bold">
            <span style={{marginRight: "11px"}}>
              <FontAwesomeIcon icon={faBoxes} className="text-dark font-standart" />
            </span>
            <span>
              Product
            </span>
          </NavDropdown.Item> 
        </Nav.Link>
        }

        <NavDropdown.Divider className="m-0" />

        <NavDropdown.Item className="p-2 font-weight-bold" onClick={logoutHandler}>
        <span style={{marginRight: "15px"}}>
          <FontAwesomeIcon icon={faSignOutAlt} className="text-dark font-standart" />
        </span>
        <span>
          Logout
        </span>
          
        </NavDropdown.Item>

      </NavDropdown>
      
      {props.role == 'user' &&
        <Nav.Link as={Link} to="/carts" className="float-right">
          <FontAwesomeIcon icon={faCartPlus} className="text-dark font-big mt-1" />
          {(total > 0 ) ? (
          <span className="position-absolute bg-danger rounded-circle badge text-white" style={{right: "60px"}}>
            {total}
          </span>
            ) : (null)}

        </Nav.Link>
      }
    </>
  );

}

export default UserActive
