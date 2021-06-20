import { useState } from 'react' 
import { Container, Row, Col, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckDouble, faClock, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useQuery, useMutation } from 'react-query';
import { API } from '../../config/api'
import { useHistory } from "react-router-dom";

import PartnerMenu from './components/partnerMenu'

function Partner() {

	const [status, setStatus] = useState({
		id: null,
		name: ""
	})

	const {id, name} = status

	const { data: transactions, loading, error, refetch } = useQuery('transactions', async () => {
	    try{
	      const response = await API.get("/transactions");
	      return response; 
	    } catch (err) {}
	})

    const handleSubmit = async (id, status) => {
    	setStatus({
    		id: id,
    		name: status
    	})

    	if(status){
    		editProduct.mutate()
    	}
    }

	const editProduct = useMutation(async () => {
		const body = JSON.stringify({
			status: name,
		})

		const config = {
		    headers: {
		      	"Content-Type": "application/json",
		    },
	    };

	    const response = await API.patch(`/transaction/${id}`, body, config);
	    
    });

    console.log(id)

	return(
		<div>
			<div className="bg-warning foodways-nav shadow-sm position-fixed" style={{zIndex: "100"}}></div>
			
			<div className="profile-page">
				<Container>
					<Row>
						<Col md={12}>
							<div className="user-profile">
								<h3 className="libre">Income Transaction</h3>
								<div className="mt-4">
									<Table className="table bg-white rounded shadow-sm text-center">
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
										 {transactions?.data?.data?.transaction.map((data, index) => (
											<tr>
												<th>{index+1}</th>
												<th>{data.fullname}</th>
												<th></th>
												<th>
													{data?.orders?.order?.map((order) => (
														<span className="font-weight-bold libre d-block">* {order.title}</span>
													))}
												</th>
												<th className="text-warning">{data.status}</th>
												<th className="text-center">
													<button className="btn btn-danger btn-sm mr-2" 
													onClick={() => handleSubmit(data.id, 'cancel')}>Cancel {data.id}</button>
													<button className="btn btn-success btn-sm" 
													onClick={() => handleSubmit(data.id, 'approve')}>Approve {data.id}</button>
												</th>
											</tr>
										 ))}
										</tbody>
									</Table>
								</div>
							</div>
						</Col>
					</Row>
				</Container>
			</div>
		</div>
	)
}

export default Partner