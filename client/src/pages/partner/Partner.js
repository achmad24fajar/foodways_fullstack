import {Container, Row, Col, Table} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckDouble, faClock, faTimes } from '@fortawesome/free-solid-svg-icons'

function Partner() {

	return(
		<div>
			<div className="bg-warning foodways-nav shadow-sm position-fixed" style={{zIndex: "100"}}></div>
			
			<div className="profile-page">
				<Container>
					<div className="user-profile">
						<h3 className="libre">Income Transaction</h3>
						<div className="mt-4">
							<Table bordered hover>
								<thead>
									<tr>
										<th>No</th>
										<th>Name</th>
										<th>Address</th>
										<th>Product Order</th>
										<th>Status</th>
										<th>Action</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<th>1</th>
										<th>Dina</th>
										<th>Bogor</th>
										<th>KFC Kombo</th>
										<th className="text-warning">Waiting Approve</th>
										<th className="text-center">
											<button className="btn btn-danger btn-sm mr-2">Cancel</button>
											<button className="btn btn-success btn-sm">Approve</button>
										</th>
									</tr>
									<tr>
										<th>2</th>
										<th>Dika</th>
										<th>Bogor</th>
										<th>KFC Kombo</th>
										<th className="text-success">Success</th>
										<th className="text-center">
											<FontAwesomeIcon icon={faCheckDouble} className="text-success font-standart" />	
										</th>
									</tr>
									<tr>
										<th>3</th>
										<th>Nabila</th>
										<th>Bandung</th>
										<th>KFC Kombo</th>
										<th className="text-primary">On the way</th>
										<th className="text-center">
											<FontAwesomeIcon icon={faClock} className="text-primary font-standart" />
										</th>
									</tr>
									<tr>
										<th>4</th>
										<th>Asep</th>
										<th>Garut</th>
										<th>KFC Kombo</th>
										<th className="text-danger">Cancel</th>
										<th className="text-center">
											<FontAwesomeIcon icon={faTimes} className="text-danger font-standart" />
										</th>
									</tr>
								</tbody>
							</Table>
						</div>
					</div>
				</Container>
			</div>
		</div>
	)
}

export default Partner