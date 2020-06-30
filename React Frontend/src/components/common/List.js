import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Container, Dropdown, Accordion, Button, Form, Spinner } from 'react-bootstrap';
import Icofont from 'react-icofont';
import CardItem from './CardItem';
import TopSearch from '../home/TopSearch'
import RentalRequestModal from '../modals/RentalRequestModal'

class List extends React.Component {
	state = {
		listing: [],
		isLoading: true,
		isFurnished: 'All',
		bathRooms: 'All',
		area: 'All',
		bedRooms: 'All',
		areaM2: {
			from: 0,
			to: 0
		},
		price: {
			from: 0,
			to: 0
		},
		show: false,
		place: {} //? we need this to determine which place did the user click on to send the rental request
	}
	async componentDidMount() {
		let url = 'http://localhost:4000/api/place/'
		await fetch(url, {
			method: 'GET', // *GET, POST, PUT, DELETE, etc.
			cache: "no-cache",
			credentials: 'same-origin', // include, *same-origin, omit
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(response => response.json())
			.then(json => {
				this.setState({ listing: json.data, isLoading: false })
			})
			.catch(err => console.log(err))
	}

	get_AreaNames() {
		let isAdded = []// for area names
		return this.state.listing.map((x, i) => {
			if (isAdded.indexOf(x.areaName) !== -1) return ''
			isAdded.push(x.areaName)
			return <Form.Check
				onClick={e => {
					this.setState({ area: x.areaName })
					// this.filter('areaName', x.areaName, false)
				}}
				custom
				type='radio'
				name="areaName"
				id={'default-areaName' + i}
				label={<React.Fragment>{x.areaName}<small className="text-black-50"> {this.state.listing.filter(y => y.areaName == x.areaName).length}</small></React.Fragment>}
			/>
		})
	}

	get_bedRooms() {
		let isAdded = []// for area names
		return this.state.listing.map((x, i) => {
			if (isAdded.indexOf(x.filters.bedrooms) !== -1) return ''
			isAdded.push(x.filters.bedrooms)
			return <Form.Check
				custom
				type='radio'
				name="bedrooms"
				id={'default-bedrooms' + i}
				onClick={() => this.setState({ bedRooms: x.filters.bedrooms })}
				label={<React.Fragment>{x.filters.bedrooms}<small className="text-black-50"> {this.state.listing.filter(y => y.filters.bedrooms == x.filters.bedrooms).length}</small></React.Fragment>}
			/>
		})
	}


	get_bathRooms() {
		let isAdded = []// for area names
		return this.state.listing.map((x, i) => {
			if (isAdded.indexOf(x.filters.bathrooms) !== -1) return ''
			isAdded.push(x.filters.bathrooms)
			return <Form.Check
				custom
				type='radio'
				name="bathrooms"
				id={'default-bathrooms' + i}
				onClick={() => this.setState({ bathRooms: x.filters.bathrooms })}
				label={<React.Fragment>{x.filters.bathrooms}<small className="text-black-50"> {this.state.listing.filter(y => y.filters.bathrooms == x.filters.bathrooms).length}</small></React.Fragment>}
			/>
		})
	}
	render() {

		return (
			<>
				{this.state.show && <RentalRequestModal show={this.state.show} place={this.state.place} onHide={() => this.setState({ show: false })} />}
				<TopSearch />
				<section className="section pt-5 pb-5 products-listing">
					<Container>
						<Row>
							<Col md={3}>
								<div className="filters shadow-sm rounded bg-white mb-4">
									<div className="filters-header border-bottom pl-4 pr-4 pt-3 pb-3">
										<h5 className="m-0">Filter By</h5>
									</div>
									<div className="filters-body">
										<Accordion defaultActiveKey="0">
											<div className="filters-card border-bottom p-4">
												<div className="filters-card-header" id="headingOne">
													<h6 className="mb-0">
														<Accordion.Toggle as={Button} size='block' variant="link" className='text-left d-flex align-items-center p-0' eventKey="0">
															Area <Icofont icon='arrow-down' className='ml-auto' />
														</Accordion.Toggle>
													</h6>
												</div>
												<Accordion.Collapse eventKey="0">
													<div className="filters-card-body card-shop-filters">
														<Form.Check
															custom
															type='radio'
															defaultChecked={true}
															id='default-areaName00'
															name='areaName'
															onClick={() => this.setState({ area: 'All' })}
															label={<React.Fragment>All <small className="text-black-50"> {this.state.listing.length}</small></React.Fragment>}
														/>
														{this.get_AreaNames()}

													</div>
												</Accordion.Collapse>
											</div>
											<div className="filters-card border-bottom p-4">
												<div className="filters-card-header" id="headingOne">
													<h6 className="mb-0">
														<Accordion.Toggle as={Button} size='block' variant="link" className='text-left d-flex align-items-center p-0' eventKey="6">
															Price <Icofont icon='arrow-down' className='ml-auto' />
														</Accordion.Toggle>
													</h6>
												</div>
												<Accordion.Collapse eventKey="6">
													<div className="filters-card-body card-shop-filters">
														<input onChange={(e) => this.setState({ price: { from: Number(e.target.value), to: this.state.price.to } })} placeholder="from" class="form-control" style={{ "width": "80%" }} />
														<input onChange={(e) => this.setState({ price: { to: Number(e.target.value), from: this.state.price.from } })} placeholder="to" class="form-control" style={{ "width": "80%", marginTop: '5%' }} />
													</div>
												</Accordion.Collapse>
											</div>
											<div className="filters-card border-bottom p-4">
												<div className="filters-card-header" id="headingOne">
													<h6 className="mb-0">
														<Accordion.Toggle as={Button} size='block' variant="link" className='text-left d-flex align-items-center p-0' eventKey="3">
															Area (m²) <Icofont icon='arrow-down' className='ml-auto' />
														</Accordion.Toggle>
													</h6>
												</div>
												<Accordion.Collapse eventKey="3">
													<div className="filters-card-body card-shop-filters">
														<input onChange={(e) => this.setState({ areaM2: { from: Number(e.target.value), to: this.state.areaM2.to } })} placeholder="from" class="form-control" style={{ "width": "80%" }} />
														<input onChange={(e) => this.setState({ areaM2: { to: Number(e.target.value), from: this.state.areaM2.from } })} placeholder="to" class="form-control" style={{ "width": "80%", marginTop: '5%' }} />
													</div>
												</Accordion.Collapse>
											</div>
											<div className="filters-card border-bottom p-4">
												<div className="filters-card-header" id="headingOne">
													<h6 className="mb-0">
														<Accordion.Toggle as={Button} size='block' variant="link" className='text-left d-flex align-items-center p-0' eventKey="4">
															Bed Rooms <Icofont icon='arrow-down' className='ml-auto' />
														</Accordion.Toggle>
													</h6>
												</div>
												<Accordion.Collapse eventKey="4">
													<div className="filters-card-body card-shop-filters">
														<Form.Check
															custom
															type='radio'
															defaultChecked={true}
															id='custom-cb23'
															name="bedrooms"
															onClick={() => this.setState({ bedRooms: 'All' })}
															label={<React.Fragment>All <small className="text-black-50">{this.state.listing.length}</small></React.Fragment>}
														/>
														{this.get_bedRooms()}
													</div>
												</Accordion.Collapse>
											</div>
											<div className="filters-card border-bottom p-4">
												<div className="filters-card-header" id="headingOne">
													<h6 className="mb-0">
														<Accordion.Toggle as={Button} size='block' variant="link" className='text-left d-flex align-items-center p-0' eventKey="2">
															Bath Rooms <Icofont icon='arrow-down' className='ml-auto' />
														</Accordion.Toggle>
													</h6>
												</div>
												<Accordion.Collapse eventKey="2">
													<div className="filters-card-body card-shop-filters">
														<Form.Check
															custom
															type='radio'
															defaultChecked={true}
															id='custom-cb24'
															name="bathrooms"
															onClick={() => this.setState({ bathRooms: 'All' })}
															label={<React.Fragment>All <small className="text-black-50">{this.state.listing.length}</small></React.Fragment>}
														/>
														{this.get_bathRooms()}
													</div>
												</Accordion.Collapse>
											</div>
											<div className="filters-card border-bottom p-4">
												<div className="filters-card-header" id="headingOne">
													<h6 className='text-left d-flex align-items-center mb-0' style={{ color: '#007bff' }}>
														Furnished
													</h6>
													<Form.Check
														custom
														type='radio'
														defaultChecked={true}
														id='custom-1'
														name="isFurnished"
														onClick={() => this.setState({ isFurnished: 'All' })}
														label={<React.Fragment>All <small className="text-black-50">{this.state.listing.length}</small></React.Fragment>}
													/>
													<Form.Check
														custom
														type='radio'
														id='custom-2'
														name="isFurnished"
														onClick={() => this.setState({ isFurnished: false })}
														label={<React.Fragment>No <small className="text-black-50">{this.state.listing.filter(x => !x.filters.isFurnished).length}</small></React.Fragment>}
													/>
													<Form.Check
														custom
														type='radio'
														id='custom-3'
														name="isFurnished"
														onClick={() => this.setState({ isFurnished: true })}
														label={<React.Fragment>Yes <small className="text-black-50">{this.state.listing.filter(x => x.filters.isFurnished).length}</small></React.Fragment>}
													/>
												</div>
											</div>

										</Accordion>
									</div>
								</div>
							</Col>
							<Col md={9}>
								<Row>
									{this.state.listing.sort((a, b) => a.createdAt < b.createdAt).map(list => {
										let Tile = <Col md={12} sm={12} className="mb-4 pb-2" >
											<CardItem
												list={list}
												isRentButton={true}
												imageAlt='Product'
												image='img/list/1.png'
												imageClass='img-fluid item-img'
												onRentClick={() => this.setState({ place: list, show: true })}
												promotedVariant='dark'
												favIcoIconColor='text-danger'
											/>
										</Col>
										let isFilter = false
										if (this.state.area !== 'All') {
											isFilter = true
											if (this.state.area == list.areaName) {
												console.log("passed", list)
												return Tile
											}
										}
										if (this.state.bedRooms !== 'All') {
											isFilter = true
											if (list.filters.bedrooms == this.state.bedRooms) {
												return Tile
											}
										}
										if (this.state.bathRooms !== 'All') {
											isFilter = true
											if (list.filters.bathrooms == this.state.bathRooms) {
												return Tile
											}
										}
										if (this.state.isFurnished !== 'All') {
											isFilter = true
											if (list.filters.isFurnished == this.state.isFurnished) {
												return Tile
											}
										}
										// user wants to filter by areaM2 as long as its not 0
										if (this.state.areaM2.from !== 0 && this.state.areaM2.to !== 0) {
											isFilter = true
											if (list.filters.areaM2 >= this.state.areaM2.from && list.filters.areaM2 <= this.state.areaM2.to) {
												console.log("passed", list)
												return Tile
											}
										}
										if (this.state.price.from !== 0 && this.state.price.to !== 0) {
											isFilter = true
											if (list.price.amount >= this.state.price.from && list.price.amount <= this.state.price.to) {
												console.log("passed", list)
												return Tile
											}
										}

										// no filters are declared, just return the listing item
										if (!isFilter) {
											return Tile
										}

									})}
									{this.state.isLoading &&
										<Col md={12} className="text-center load-more">
											<Button variant="primary" type="button" disabled="">
												<Spinner animation="grow" size="sm" className='mr-1' />
				                        Loading...
			                        </Button>
										</Col>
									}
								</Row>
							</Col>
						</Row>
					</Container>

				</section>
			</>
		);
	}
}


export default List;