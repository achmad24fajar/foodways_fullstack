import React, {useContext} from 'react'
import {CartContext} from '../../context/cartContext';
import {Container, Row, Col} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarker, faSave } from '@fortawesome/free-solid-svg-icons'

import Map from '../../components/Map';

function EditProfile() {

	return(
		<div>
			<div className="bg-warning foodways-nav shadow-sm position-fixed" style={{zIndex: "100"}}></div>
			
			<div className="profile-page">
				<Container>
					<div className="user-profile">
						<h3 className="libre">Edit Profile</h3>
						<div className="mt-4">
							<form>
							<Row>
								<Col md={9}>
									<div className="form-group">
										<input type="text" className="form-control bg-input" placeholder="Full Name"/>
									</div>
								</Col>
								<Col md={3}>
									<div className="custom-file">
										<input type="file" className="custom-file-input" id="validatedCustomFile" required/>
										<label className="custom-file-label bg-input" for="validatedCustomFile">Choose file...</label>
									</div>
								</Col>
							</Row>
							<div className="form-group">
								<input type="email" className="form-control bg-input" placeholder="Email"/>
							</div>
							<div className="form-group">
								<input type="text" className="form-control bg-input" placeholder="Phone"/>
							</div>
							<Row>
								<Col md={9}>
									<div className="form-group">
										<input type="text" className="form-control bg-input" placeholder="Location"/>
									</div>
								</Col>
								<Col md={3}>

								<Map />
								
								</Col>
							</Row>
							<div className="mt-4 text-right">
								<button type="submit" className="btn btn-dark" style={{width: "300px"}}>
									<FontAwesomeIcon icon={faSave} className="font-standart float-left mt-1" /> Save
								</button>
							</div>
							</form>
						</div>
					</div>
				</Container>
			</div>
		</div>
	)
}

export default EditProfile