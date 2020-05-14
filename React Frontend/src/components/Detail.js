import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Container, Form, InputGroup, Button, Tab, Nav, Image, Badge } from 'react-bootstrap';
import ItemsCarousel from './common/ItemsCarousel';
import GalleryCarousel from './common/GalleryCarousel';
import CheckoutItem from './common/CheckoutItem';
import BestSeller from './common/BestSeller';
import QuickBite from './common/QuickBite';
import StarRating from './common/StarRating';
import RatingBar from './common/RatingBar';
import Review from './common/Review';
import Icofont from 'react-icofont';

class Detail extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			showAddressModal: false,
			users: [
				{
					name: 'Osahan Singh',
					image: '/img/user/5.png',
					url: '#'
				},
				{
					name: 'Gurdeep Osahan',
					image: '/img/user/2.png',
					url: '#'
				},
				{
					name: 'Askbootstrap',
					image: '/img/user/3.png',
					url: '#'
				},
				{
					name: 'Osahan Singh',
					image: '/img/user/4.png',
					url: '#'
				}
			]
		};
	}

	hideAddressModal = () => this.setState({ showAddressModal: false });
	getQty = ({ id, quantity }) => {
		//console.log(id);
		//console.log(quantity);
	}
	getStarValue = ({ value }) => {
		console.log(value);
		//console.log(quantity);
	}



	render() {
		return (
			<>

				<section className="offer-dedicated-body pt-2 pb-2 mt-4 mb-4 col-lg-6 col-md-12" style={{ margin: 'auto' }}>
					<Container>
						<h2>Spice Hut Indian</h2>
						<Row>
							<Col md={12}>
								<div className="offer-dedicated-body-left">
									<div className='h-100'>
										<div className='position-relative'>
											<div>
												<GalleryCarousel />
											</div>
											<div id="restaurant-info" className="bg-white rounded shadow-sm p-4 mb-4">
												<p className="mb-3">
													DescriptionDescriptionDescriptionDescriptionDescription
													DescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescription
												</p>
												<hr className="clearfix" />
												<div className="address-map">
													<div className="mapouter">
														<div className="gmap_canvas">
															<iframe title='addressMap' width="300" height="170" id="gmap_canvas" src="https://maps.google.com/maps?q=university%20of%20san%20francisco&t=&z=9&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe></div>
													</div>
												</div>
												<Button variant="outline-secondary" style={{ marginTop: '5px' }} type="button" id="button-1"><Icofont icon="ui-contact-list" /> Rent</Button>
											</div>
										</div>
									</div>
								</div>
							</Col>
						</Row>
					</Container>
				</section>

			</>
		);
	}
}


export default Detail;