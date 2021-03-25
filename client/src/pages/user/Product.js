import React, {useContext} from 'react'
import {CartContext} from '../../context/cartContext';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import {products} from '../../data/dataProduct.js';
import {Container, Row, Col} from 'react-bootstrap';

import Card from '../../components/Card.js'


function Product() {

  let { id } = useParams();
  const item = products.filter(data => data.restourant.toLowerCase() == id);

  const [state, dispatch] = useContext(CartContext);

  const addProductToCart = (item, restourant) => {
    dispatch({
      type: "ADD_CART",
      payload: item,
      resto: restourant,
      addOrRemove: true
    });
  };

  return(
    <>
    <div className="bg-warning foodways-nav shadow-sm position-fixed" style={{zIndex: "100"}}></div>
    <div className="detail-product-menu">
      <Container>
      <h2 className="libre">{item[0].restourant}, Menus</h2>
        <Row>
        {item[0].product.map((data) => (
          <Col md={3}>
            <Card 
            data={data} 
            restourant={item[0].restourant}
            template="style-3"
            key={data.id}
            fromProduct={true}
            addProductToCart={addProductToCart}/>
          </Col>
        ))}
        </Row>
      </Container>
    </div>
    </>
  );

}

export default Product
