import {useState, useContext} from 'react'
import {CartContext} from '../context/cartContext';
import {Button, Modal, Row, Col} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons'

import {Link} from 'react-router-dom'

function Order(props) {
	const [state, dispatch] = useContext(CartContext);
	const [show, setShow] = useState(false);

	const order = (carts, newResto) => {
	    dispatch({
			type: "ORDER",
			payload: carts,
			newResto: newResto
	    });
	};

	const handleClose = () => setShow(false);
  	const handleShow = () => setShow(true);

	return (
    <>
    <Button variant="dark" onClick={handleShow} className="btn-sm mr-2" style={{width: "250px"}}>
        <FontAwesomeIcon icon={faShoppingBag} className="text-white font-standart mr-2" /> Checkout
    </Button>
    <Modal 
    	show={show} 
    	onHide={handleClose} 
    	backdrop="static" 
    	size="lg"
    	centered>
        <Modal.Header closeButton>
	        <Modal.Title className="text-warning">Your Order</Modal.Title>
	    </Modal.Header>
        <Modal.Body className="px-4">
	        
			{props.carts.map(cart => (
			<div className="border-bottom border-muted py-2 ">
			<Row key={cart.id}>
				<Col md={2}>
					<img src={cart.image} alt={cart.name} 
					style={{
						width: "120%"
					}} />
				</Col>
				<Col md={5}>
					<div className="mt-2">
						<h5>{cart.name}</h5>
					</div>
					<div className="d-flex counter mt-3">
						<span style={{background: "rgba(246, 230, 218, 1)"}}>{cart.qty}x</span>
					</div>
				</Col>
				<Col md={5} className="text-right">
					<div className="mt-2">
						<h6 className="text-danger">Rp. {cart.price}</h6>
					</div>
				</Col>
			</Row>
			</div>
			))}

			<Row className="mt-3">
				<Col md={10}>
					<div className="text-right">
						<h5>Subtotal :</h5>
						<h5>Ongkir :</h5>
						<h5>Total :</h5>
					</div>
				</Col>
				<Col md={2}>
					<div className="text-right">
						<h5>Rp. {props.subtotal}</h5>
						<h5>Rp. {props.ongkir}</h5>
						<h5 className="text-danger">Rp. {props.total}</h5>
					</div>
				</Col>
			</Row>
        </Modal.Body>
        <Modal.Footer className="text-left">
	        <Link as={Link} to={'/detail-order/'} 
	        onClick={(carts,newResto) => order(state.carts,state.currentRestaurant)} 
	        className="btn btn-dark">
	        	Confirm
	        </Link>
	    </Modal.Footer>
    </Modal>
    </>
  );
}

export default Order