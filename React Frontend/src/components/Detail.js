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
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
class DemoCarousel extends React.Component {
	render() {
		return (
			<Carousel>
				<div>
					<img src="/img/gallery/1.png" />
				</div>
				<div>
					<img src="/img/gallery/2.png" />
				</div>
				<div>
					<img src="/img/gallery/3.png" />
				</div>
			</Carousel>
		);
	}
};
class Detail extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			details: {},
			residents_available: [],
			residents_current: []
		};
	}

	componentDidMount() {
		if (window.location.search.length < 1) {
			window.location = '/listing'
			return
		}

		let details = JSON.parse(window.location.search.replace("?", "").replace(/%20/g, ' ').replace(/%22/g, '"'))
		let residents_available = []
		let residents_current = []
		let diff = details.residents.maximum - details.residents.current
		for (let i = 0; i < details.residents.maximum - diff; i++) {
			residents_current.push(0)
		}
		for (let i = 0; i < diff; i++) {
			residents_available.push(0)
		}
		this.setState({ details, residents_available, residents_current })
	}

	render() {
		let { details, residents_available, residents_current } = this.state

		return (
			<>

				<section className="offer-dedicated-body pt-2 pb-2 mt-4 mb-4 col-lg-6 col-md-12" style={{ margin: 'auto' }}>
					<Container>
						<h2>{details.title}</h2>
						<Row>
							<Col md={12}>
								<div className="offer-dedicated-body-left">
									<div className='h-100'>
										<div className='position-relative'>
											<div id="restaurant-info" className="bg-white rounded shadow-sm p-4 mb-4">
												<DemoCarousel />
												<hr />
												<p className="mb-3" style={{ overflowWrap: 'break-word' }}>
													{details.description}
												</p>
												<hr />
												<ul style={{ listStyleType: 'none', padding: 0 }}>
													<li>

														<div class="available-slots"><p>
															Price:
															<span style={{ color: 'black' }}>{!!details.price && '  ' + details.price.amount} EGP/Month</span>

														</p>
														</div>
													</li>
													<li>
														<div class="available-slots"><p>
															Target:
															<span style={{ color: 'black' }}>{'  ' + details.type}s</span>
														</p>
														</div>
													</li>
													<li>
														<p>
															Residents:
													<div class="available-slots">
																{residents_current.map(x => {
																	return <img class="user-icon" src="img/user-black.svg" />
																})}
																{residents_available.map(x => {
																	return <img class="user-icon" src="img/user-white.svg" />
																})}
															</div>
														</p>
													</li>
												</ul>
												<hr />
												<p>Features</p>
												<ul style={{ listStyleType: 'none', padding: 0 }}>
													<li>
														<div class="available-slots"><p>
															Furnished:
															<span style={{ color: 'black' }}>{!!details.filters && '  ' + details.filters.isFurnished}</span>
														</p>
														</div>
													</li>
													<li>
														<div class="available-slots"><p>
															Bed Rooms:
															<span style={{ color: 'black' }}>{!!details.filters && '  ' + details.filters.bedrooms}</span>
														</p>
														</div>
													</li>
													<li>
														<div class="available-slots"><p>
															Bath Rooms:
															<span style={{ color: 'black' }}>{!!details.filters && '  ' + details.filters.bathrooms}</span>
														</p>
														</div>
													</li>
													<li>
														<div class="available-slots"><p>
															Area (m²):
															<span style={{ color: 'black' }}>{!!details.filters && '  ' + details.filters.areaM2}</span>
														</p>
														</div>
													</li>
												</ul>

												<hr className="clearfix" />
												<div className="address-map">
													<p>
														<Icofont icon="google-map" />
														{details.areaName}
													</p>
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