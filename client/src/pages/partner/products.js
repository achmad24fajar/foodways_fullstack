import React, {useState} from 'react';
import {Container, Row, Col, Table} from 'react-bootstrap';
import {API} from '../../config/api'
import {useQuery, useMutation} from 'react-query';
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faPlusSquare, faBoxOpen } from '@fortawesome/free-solid-svg-icons'

import PartnerMenu from './components/partnerMenu'

function Products () {

	const [loadData, setLoadData] = useState('')

	const { data: products, loading, error, refetch } = useQuery('products', async () => {
	    const response = await API.get("/products");
	    return response;
	})

	if(loading){
		console.log('Loading')
	}
	console.log(loadData)

	const deleteProduct = useMutation(async (id) => {
	    await API.delete(`/product/${id}`);
	    refetch();
	});

	const deleteUserById = async (id) => {
	    deleteProduct.mutate(id);
	};
		
	return (
		<div>
		{loadData}
		<div className="bg-warning foodways-nav shadow-sm position-fixed" style={{zIndex: "100"}}></div>
			<div className="profile-page">
				<Container>
					<Row>
						<Col md={12}>
							<div className="user-profile">
							<Row>
								<Col md={6}>
									<h3 className="libre">All Products</h3></Col>
								<Col md={6}>
									<Link as={Link} to="/partner/add-product" className="float-right">
										<button className="btn btn-warning text-white">
										<FontAwesomeIcon icon={faPlusSquare} /> dd Product</button>
									</Link>
								</Col>
							</Row> 
								<div className="mt-4">
									<Table className="table bg-white rounded shadow-sm">
										<thead>
											<tr className="text-center">
												<th>No</th>
												<th>Image</th>
												<th>Title</th>
												<th>Price</th>
												<th>#</th>
											</tr>
										</thead>
										<tbody>
										{ products?.data?.data?.products == 0 ? (
										<tr>
											<td colspan="5" className="text-center">
												<FontAwesomeIcon icon={faBoxOpen} className="text-warning" style={{
													fontSize: "100px"
												}} />
												<h3 className="text-muted">Data is empty</h3>
											</td>
										</tr>
										) : (
										products?.data?.data?.products?.map((data, index) => (
										<tr className="text-center">
											<td>
											<span class="badge badge-warning font-standart text-dark">{index+1}</span></td>
											<td style={{width: "15%"}}>
												<img src={`http://localhost:5000/uploads/${data.image}`} alt={data.title}
												className="product-image rounded"/>
											</td>
											<td>{data.title}</td>
											<td>Rp. {data.price}</td>
											<td>
											<div className="d-inline mr-2">
												<Link as={Link} to={`/partner/edit/product/${data.id}`}>
													<FontAwesomeIcon icon={faEdit} className="font-standart text-warning" />
												</Link>
											</div>
											<div className="d-inline ml-2">
												<FontAwesomeIcon 
												icon={faTrash} 
												className="font-standart cursor text-danger" 
												role="button"
												onClick={() => deleteUserById(data.id)} />
											</div>
											</td>
										</tr>
										))
										)}
										</tbody>
									</Table>
								</div>
							</div>
						</Col>
					</Row>
				</Container>
			</div>
		</div>
	);
	
};

export default Products;