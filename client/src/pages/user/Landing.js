import React, { useState, useContext } from "react";
import { UserContext } from "../../context/userContext";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useQuery } from "react-query";
import { API } from "../../config/api";
import { enc, AES } from "crypto-js";

import { restourants } from "../../data/dataRestourant.js";
import { restourantNearYou } from "../../data/dataRestourantNearYou.js";
import Card from "../../components/Card.js";

const Landing = () => {
  const {
    data: users,
    loading,
    error,
    refetch,
  } = useQuery("partners", async () => {
    const response = await API.get("/users/partners");
    return response;
  });

  return (
    <div className="mb-4">
      <div className="bg-warning landing-page position-absolute">
        <Container>
          <Row>
            <Col md={8} sm={12}>
              <div className="landing-text">
                <h1>Are You Hungry?</h1>
                <h1>Express Home Delivery</h1>
                <Row>
                  <Col md={3}>
                    <div className="line"></div>
                  </Col>

                  <Col md={5}>
                    <span className="description">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s.
                    </span>
                  </Col>
                </Row>
              </div>
            </Col>

            <Col md={4} className="d-none d-md-block">
              <div className="pizza">
                <img src="/images/Landing/10219 1.png" alt="pizza" />
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="content rounded shadow">
        <div className="popular-restourant mb-5">
          <Container>
            {loading ? (
              <div>
                <h5>Loading...</h5>
              </div>
            ) : (
              <Row>
                {users?.data?.data?.users?.map((data) => (
                  <Col md={6} lg={3} key={data.fullname}>
                    <Link
                      as={Link}
                      to={`/products/${data.slug}`}
                      className="nav-link p-0 text-dark">
                      <Card
                        data={data}
                        template="style-1"
                      />
                    </Link>
                  </Col>
                ))}
              </Row>
            )}
          </Container>
        </div>

        <div className="restourant-near-you">
          <Container>
            <h2>Restourant Near You</h2>
            <Row>
              {restourantNearYou.map((data) => (
                <Col md={4} lg={3}>
                  <Card data={data} template="style-2" />
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Landing;
