import React, {useContext} from 'react'
import {CartContext} from '../../context/cartContext';
import {Container, Row, Col, Nav} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarker } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'

function DetailOrder() {

	const [state, dispatch] = useContext(CartContext);
	const orders = state.order[0];

	console.log(state.restaurant)

	let qty = [];
	let price = [];
	const pushCarts = orders.map(order => {
		qty.push(order.qty);
		price.push(order.price * order.qty)
	})

	let subTotal = (price.length != 0 ? price.reduce((a, b) => a + b) : 0 )
	let totalItem = (qty.length != 0 ? qty.reduce((a, b) => a + b) : 0 )
	let total = subTotal + state.ongkir

	return(
		<div>
			<div className="bg-warning position-absolute foodways-nav"></div>
			<div className="bg-warning position-absolute foodways-nav"></div>
			{(orders.length == 0) ? (
			    <div className="text-center my-5">
			       <Container>
				        <h2 className="text-muted libre">You haven't ordered yet</h2>
				        <div className="empty mt-5">
				        	<img src={process.env.PUBLIC_URL + '/empty.svg'} alt="empty-product"
				        		style={{
				        			width: "400px"
				        		}}
				        	/>
				        </div>
				        <Nav.Link as={Link} to="/" className="btn btn-dark mx-auto mt-5" style={{width: "200px"}}>
				        	Buy something now!
				        </Nav.Link>
			       </Container>
			    </div>
			) : (
			<div className="mt-5">
				<Container>
					<div className="cart">
						<h2 className="libre">{state.restaurant}</h2>
						<div className="location mt-5"> 
							<label>Delivery Location</label>
							<div className="form-group d-flex">
								<input name="location" type="text" className="form-control" style={{
									width: "86%",
									marginRight: "5px",
								}} />
								<button className="btn btn-dark"><FontAwesomeIcon icon={faMapMarker} className="text-white font-standart mr-2" />Select on map</button>
							</div>
							<div className="cartItem mt-3">
								<Row>
									<Col md={8}>
										<div className="border-bottom border-secondary py-2">
											Review Your Order
										</div>
										{orders.map(cart => (
										<div className="border-bottom border-secondary pt-2 pb-3">
										<Row className="mt-3" key={cart.id}>
											<Col md={2}>
												<img src={cart.image} alt={cart.name} 
												style={{
													width: "100%"
												}} />
											</Col>
											<Col md={5}>
												<div className="mt-2">
													<h5>{cart.name}</h5>
												</div>
												<div className="counter mt-3">
													<span className="font-weight-bold">Qty : {cart.qty}x</span>
												</div>
											</Col>
											<Col md={5} className="text-right">
												<div className="mt-2">
													<h6 className="text-danger font-standart">Rp. {cart.price}</h6>
												</div>
											</Col>
										</Row>
										</div>
										))}
									</Col>
									<Col md={4}>
										<div className="border-bottom border-top border-secondary calculate">
										<Row>
											<Col md={6}>
												<div className="mt-1">
													<span>Subtotal</span>
												</div>
												<div className="mt-2">
													<span>Qty</span>
												</div>
												<div className="mt-2">
													<span>Ongkir</span>
												</div>
											</Col>
											<Col md={6} className="text-right">
												<div className="mt-1">
													<span className="text-danger font-standart font-weight-bold">Rp. {subTotal}</span>
												</div>
												<div className="mt-2">
													<span>{totalItem}</span>
												</div>
												<div className="mt-2">
													<span className="text-danger font-standart font-weight-bold">Rp. {state.ongkir}</span>
												</div>
											</Col>
										</Row>
										</div>
										<Row className="mt-3">
											<Col md={6}>
												<div>
													<span>Total</span>
												</div>
											</Col>
											<Col md={6} className="text-right">
												<div>
													<h5 className="text-danger font-big">Rp. {total}</h5>
												</div>
											</Col>
										</Row>
									</Col>
								</Row>						
							</div>
						</div>
					</div>
					<div className="text-right mt-5">
						<button className="btn btn-dark" style={{width: "250px"}}>See how far</button>
					</div>
				</Container>
			</div>
			)}
		</div>
	)
}

export default DetailOrder