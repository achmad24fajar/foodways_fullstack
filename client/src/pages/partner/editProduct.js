import {useState, useEffect} from 'react'
import {Container, Row, Col} from 'react-bootstrap';
import {useQuery, useMutation, useQueryClient } from 'react-query';
import {API, UpdateProduct} from '../../config/api'
import {useParams, useHistory, Link} from "react-router-dom";

import PartnerMenu from './components/partnerMenu'

function EditProduct() {
	const router = useHistory()

	const {id} = useParams()

	const [form, setForm] = useState({
		title: "",
		price: "",
		image: null
	})

	const { data: products, loading, error, refetch } = useQuery('product', async () => {
	    const response = await API.get("/products");
	    return response;
	})

	const getTodoById = async () => {
		try {
			const response = await API.get(`/product/${id}`);
			const product = response.data.data.product;
			setForm({
				title: product.title,
				price: product.price,
				image: product.image
			});
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getTodoById()
	},[])

	console.log(form.image)

    const editProduct = useMutation(async () => {
		const body = new FormData();

		body.append('title', form.title);
		body.append('price', form.price);
		body.append('image', form.image);

		const config = {
		    headers: {
		      	"Content-Type": "multipart/form-data",
		    },
	    };

	    const response = await API.patch(`/product/${id}`, body, config);
	    
    });

    const handleSubmit = async (e) => {
    	e.preventDefault();
    	editProduct.mutate()
    	router.push('/partner/products')
    }

    const onChange = (e) => {
    	const tempForm = { ...form };
	    tempForm[e.target.name] = e.target.type === "file" ? e.target.files[0] : e.target.value;
	    setForm(tempForm);
    }

	return(
		<div>
			<div className="bg-warning foodways-nav shadow-sm position-fixed" style={{zIndex: "100"}}></div>
			
			<div className="profile-page">
				<Container>
					<Row>
						<Col md={12}>
							<div className="user-profile">
								<h3 className="libre" style={{opacity: "0.7"}}>Edit Product</h3>
								<div className="mt-4">
									<form onSubmit={handleSubmit}>
										<div className="form-group">
											<input type="text" 
											className="form-control" 
											placeholder="Title"
											name="title"
											onChange={e => onChange(e)}
											value={form.title}/>
										</div>
										<div className="form-group">
											<input type="text" className="form-control" placeholder="Price"
											name="price"
											onChange={e => onChange(e)}
											value={form.price}/>
										</div>
										<div className="custom-file">
											<input type="file" className="custom-file-input" id="validatedCustomFile"
											name="image"
											onChange={e => onChange(e)} 
											required/>
											<label className="custom-file-label" for="validatedCustomFile">
												{form.image == null ? 'Choose file...' : form.image.name}
											</label>
										</div>
									<div className="mt-3 border-top border-muted pt-3 text-right">
										<button className="btn btn-dark mr-2" style={{width: "150px"}}>
										<Link as={Link} to="/partner/products" className="text-white">Close</Link></button>
										<input type="submit" className="btn btn-warning" value="Save" style={{width: "150px"}}/>
									</div>
									</form>
								</div>
							</div>
						</Col>
					</Row>
				</Container>
			</div>
		</div>
	)
}

export default EditProduct