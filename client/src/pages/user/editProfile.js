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
								<div className="form-group">
									<input type="text" className="form-control" placeholder="Full Name"/>
								</div>
								<div className="form-group">
									<input type="email" className="form-control" placeholder="Email"/>
								</div>
								<div className="form-group">
									<input type="text" className="form-control" placeholder="Phone"/>
								</div>
								<div className="custom-file">
									<input type="file" className="custom-file-input file" id="validatedCustomFile" required/>
									<label className="custom-file-label" for="validatedCustomFile">Choose file...</label>
								</div>
								<div class="input-group my-3">
								    <input type="text" class="form-control" placeholder="Your Location" 
								    aria-label="Your Location" aria-describedby="button-addon2" />
								    <div class="input-group-append">
								    	<Map/>
								    </div>
								</div>

								<div className="mt-4 text-right border-top pt-4">
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