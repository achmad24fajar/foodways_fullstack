import {useState} from 'react'
import {Container, Row, Col} from 'react-bootstrap';
import {useQuery, useMutation } from 'react-query';
import {API} from '../../config/api';
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faSave } from '@fortawesome/free-solid-svg-icons'
import {useHistory} from "react-router-dom";

import PartnerMenu from './components/partnerMenu'

function AddProduct() {

	const router = useHistory()

	const [form, setForm] = useState({
		title: "",
		price: "",
		image: null
	})

	const { data: users, loading, error, refetch } = useQuery('product', async () => {
	    const response = await API.get("/products");
	    return response;
	})

	const addProduct = useMutation(async () => {
		const body = new FormData();

		body.append('title', form.title);
		body.append('price', form.price);
		body.append('image', form.image);

		const config = {
		    headers: {
		      	"Content-Type": "multipart/form-data",
		    },
	    };

	    const response = await API.post("/product", body, config);
	    refetch();
    });

    const onChange = (e) => {
    	const tempForm = { ...form };
	    tempForm[e.target.name] =
	        e.target.type === "file" ? e.target.files[0] : e.target.value;
	    setForm(tempForm);
    }

    const handleSubmit = (e) => {
    	e.preventDefault();
    	addProduct.mutate();
    	setForm({
    		title: "",
			price: "",
			image: null
    	})
    	if(loading){
    		console.log('Loading Data')
	    } else {
	    	router.push('/partner/products')
	    }
    }

	return(
		<div>
			<div className="bg-warning foodways-nav shadow-sm position-fixed" style={{zIndex: "100"}}></div>
			
			<div className="profile-page">
				<Container>
					<Row>
						<Col md={12}>
							<div className="user-profile">
							<Row>
								<Col md={6}>
									<h3 className="libre" style={{opacity: "0.7"}}>Add Product</h3>
								</Col>
								<Col md={6}>
									<Link as={Link} to="/partner/products" className="float-right">
										<button className="btn btn-warning text-white">
										<FontAwesomeIcon icon={faChevronLeft} /> Back</button>
									</Link>
								</Col>
							</Row> 
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
										<button type="submit" className="btn btn-dark" style={{width: "150px"}}>
										<FontAwesomeIcon icon={faSave} /> Save</button>
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

export default AddProduct