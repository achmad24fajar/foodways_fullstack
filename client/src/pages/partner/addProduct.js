import {Container, Row, Col} from 'react-bootstrap';

function AddProduct() {

	return(
		<div>
			<div className="bg-warning foodways-nav shadow-sm position-fixed" style={{zIndex: "100"}}></div>
			
			<div className="profile-page">
				<Container>
					<div className="user-profile">
						<h3 className="libre">Add Product</h3>
						<div className="mt-4">
							<form>
							<Row>
								<Col md={9}>
									<div className="form-group">
										<input type="text" className="form-control bg-input" placeholder="Title"/>
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
								<input type="text" className="form-control bg-input" placeholder="Price"/>
							</div>
							<div className="mt-4 text-right">
								<input type="submit" className="btn btn-dark" value="Save" style={{
									width: "300px"}}/>
							</div>
							</form>
						</div>
					</div>
				</Container>
			</div>
		</div>
	)
}

export default AddProduct