import React, {useState, useContext} from 'react';
import {UserContext} from '../../context/userContext';
import {Link} from "react-router-dom";
import {Container, Row, Col} from 'react-bootstrap';

import {restourants} from '../../data/dataRestourant.js';
import {restourantNearYou} from '../../data/dataRestourantNearYou.js';
import Card from '../../components/Card.js';

const Landing = () => {

	const [state] = useContext(UserContext);

	return (
	<div>
		<div className="bg-warning position-absolute landing-page">
			<Container>
				<Row className="landing-position">
					<Col md={8}>
						<div className="landing-text">
							<h1>Are You Hungry?</h1>
							<h1>Express Home Delivery</h1>
							<Row>
								<Col md={3}>
									<div className="line"></div>
								</Col>

								<Col md={4}>
									<span className="description">Lorem Ipsum is simply dummy text of the
									printing and typesetting industry. Lorem Ipsum has
									been the industry's standard dummy text ever since the
									1500s.</span>
								</Col>
							</Row>
						</div>
					</Col>

					<Col md={4}>
						<div className="pizza">
							<img src="/images/Landing/10219 1.png" alt="pizza" />
						</div>
					</Col>
				</Row>
			</Container>
		</div>

		<div className="popular-restourant mb-5">
			<Container>
				<h2>Popular Restourant</h2>
				<Row>
				{restourants.map((data) => (
					<Col md={3}>
		        		<Link as={Link} to={'/detail-product/'+data.name.toLowerCase()} className="nav-link p-0 text-dark">
							<Card data={data} template="style-1"/>
						</Link>
					</Col>
				))}
				</Row>
			</Container>
		</div>

		<div className="restourant-near-you">
			<Container>
				<h2>Restourant Near You</h2>
				<Row>
				{restourantNearYou.map((data) => (
					<Col md={3}>
						<Card data={data} template="style-2"/>
					</Col>
				))}
				</Row>
			</Container>
		</div>
	</div>
	);
}

export default Landing;
