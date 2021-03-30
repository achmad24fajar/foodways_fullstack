import React, {useContext, useState, useEffect} from 'react'
import {CartContext} from '../../context/cartContext';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import {useQuery, useMutation} from 'react-query';
import {products} from '../../data/dataProduct.js';
import {Container, Row, Col} from 'react-bootstrap';
import {API} from '../../config/api'

import Card from '../../components/Card.js'


function Product() {

  let { slug } = useParams();

  const [state, dispatch] = useContext(CartContext);

  const [partner, setPartner] = useState({
    id: null,
    fullname: ""
  });

  const getuserBySlug = async () => {
    try {
      const responseUser = await API.get(`/user/${slug}`);
      const user = responseUser.data.data.user;
      setPartner({
        id: user.id,
        fullname: user.fullname
      })
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getuserBySlug()
  }, [])

  const { data: products, loading, error, refetch } = useQuery('products', async () => {
    try{
      const response = await API.get(`/products/${partner.id}`);
      return response; 
    } catch (err) {}
  })

  console.log(products?.data?.data?.products)

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
      <h2 className="libre">{partner.fullname}, Menus</h2>
        <Row>
        {products?.data?.data?.products.map((data) => (
          <Col md={3}>
            <Card 
            data={data} 
            restourant={partner.fullname}
            template="style-3"
            key={data.id}
            fromProduct={true}
            addProductToCart={addProductToCart}
            params={slug}/>
          </Col>
        ))}
        </Row>
      </Container>
    </div>
    </>
  );

}

export default Product
