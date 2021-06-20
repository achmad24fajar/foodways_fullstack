import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../../context/cartContext";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { products } from "../../data/dataProduct.js";
import { Container, Row, Col } from "react-bootstrap";
import { API } from "../../config/api";

import Card from "../../components/Card.js";

function Product() {
  const { slug } = useParams();
  const [store, setStore] = useState();

  const storeName = () => {
    if (slug.includes("-")) {
      let arr = slug.split("-");
      let newArr = arr.map((str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
      });
      let str = newArr.toString().replace(",", " ");
      setStore(str);
    } else {
      setStore(slug.charAt(0).toUpperCase() + slug.slice(1));
    }
  };

  useEffect(() => {
    storeName();
  }, [slug]);

  const [state, dispatch] = useContext(CartContext);

  const {
    data: products,
    loading,
    error,
    refetch,
  } = useQuery(["products", slug], async () => {
    const data = await API.get(`/products/${slug}`);
    return data;
  });

  console.log(products?.data?.data?.products);

  const addProductToCart = (item, restourant) => {
    dispatch({
      type: "ADD_CART",
      payload: item,
      resto: restourant,
      addOrRemove: true,
    });
  };

  return (
    <>
      <div
        className="bg-warning foodways-nav shadow-sm position-fixed"
        style={{ zIndex: "100" }}></div>
      <div className="products">
        <Container>
          <h2 className="libre">{store ? store : "Loading ..."}, Menus</h2>
          <Row>
            {products?.data?.data?.products?.map((data) => (
              <Col md={3}>
                <Card
                  data={data}
                  restourant={slug}
                  template="style-3"
                  key={data.id}
                  fromProduct={true}
                  addProductToCart={addProductToCart}
                  params={slug}
                />
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Product;
