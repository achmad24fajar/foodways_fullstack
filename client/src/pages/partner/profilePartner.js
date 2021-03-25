import {Container, Row, Col, Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserEdit } from '@fortawesome/free-solid-svg-icons'

function ProfilePartner() {

	return(
		<div>
			<div className="bg-warning foodways-nav shadow-sm position-fixed" style={{zIndex: "100"}}></div>
			
			<div className="profile-page">
				<Container>
					<div className="user-profile">
					<Row>
						<Col md={7}>
							<h3 className="libre">Profile Partner</h3>
							<div className="user mt-4">
								<Row>
									<Col md={4}>
										<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Zayn_Wiki_%28cropped%29.jpg/220px-Zayn_Wiki_%28cropped%29.jpg" 
										alt="Achmad Fajar" width="100%" className="rounded" />
										<div className="btn-edit mt-3">
											<Nav.Link as={Link} to="/partner/edit/profile-partner" className="btn btn-dark btn-block">
											<FontAwesomeIcon icon={faUserEdit} className="font-standart" />	Edit Profile
											</Nav.Link>
										</div>
									</Col>
									<Col md={8}>
										<div className="user-info">
										<div>
											<span className="d-block font-weight-bold">FullName</span>
											<span className="d-block">Achmad Fajar</span>
										</div>
										<div className="mt-2">
											<span className="d-block font-weight-bold">Email</span>
											<span className="d-block">achmad10@gmail.com</span>
										</div>
										<div className="mt-2">
											<span className="d-block font-weight-bold">Phone</span>
											<span className="d-block">090989878</span>
										</div>
										</div>
									</Col>
								</Row>
							</div>
						</Col>
						<Col md={5}>
							<h3 className="libre">History Order</h3>
							<div className="history mt-4">
								<div className="bg-white p-3 rounded">
								<Row>
									<Col md={6}>
										<div className="product-name">
											<span className="font-weight-bold libre">KFC Kombo</span>
										</div>
										<div className="date">
											<span><bold>Saturday,</bold> <span className="text-muted">12 March 2021</span></span>
										</div>
									</Col>
									<Col md={6} className="text-right">
										<div className="foodways-icon">
											<span className='mr-2 barlow font-big'>FoodWays</span>
											<img src={process.env.PUBLIC_URL + "logo.png"} />
										</div>
										<div className="status">
											<div className="bg-status text-center"><span className="text-success">Finished</span></div>
										</div>
									</Col>
								</Row>
								</div>
							</div>
						</Col>
					</Row>
					</div>
				</Container>
			</div>
		</div>
	)
}

export default ProfilePartner