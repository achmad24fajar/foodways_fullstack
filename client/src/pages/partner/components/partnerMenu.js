import {ListGroup} from 'react-bootstrap'
import {Link} from "react-router-dom";

const PartnerMenu = () => {
	return (
		<ListGroup className="shadow-sm">
			<ListGroup.Item variant="warning">
				<Link as={Link} to="/partner" className="nav-link text-dark">
					Transactions
				</Link>
			</ListGroup.Item>
			<ListGroup.Item>
				<Link as={Link} to="/partner/products" className="nav-link text-dark">
					My Product
				</Link>
			</ListGroup.Item>
			<ListGroup.Item>
				<Link as={Link} to="/partner/add-product" className="nav-link text-dark">
					Add Product
				</Link>
			</ListGroup.Item>
			<ListGroup.Item>
				Something
			</ListGroup.Item>
		</ListGroup>
	)
}

export default PartnerMenu