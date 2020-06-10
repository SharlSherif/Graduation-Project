import React from 'react';
import { Link } from 'react-router-dom';
import { Image, Badge, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Icofont from 'react-icofont';

class CardItem extends React.Component {
	render() {
		let residents_available = []
		let residents_current = []
		let diff = this.props.residents.maximum - this.props.residents.current
		for (let i = 0; i < this.props.residents.maximum - diff; i++) {
			residents_current.push(0)
		}
		for (let i = 0; i < diff; i++) {
			residents_available.push(0)
		}
		return (
			<div className="list-card bg-white h-100 rounded overflow-hidden position-relative shadow-sm">
				<div className="list-card-image">
					{/* {this.props.rating ? (
						<div className="star position-absolute">
							<Badge variant="success">
								<Icofont icon='star' /> {this.props.rating}
							</Badge>
						</div>
					)
						: ""
					} */}
					{/* <div className={`favourite-heart position-absolute ${this.props.favIcoIconColor}`}>
						<Link to={this.props.linkUrl}>
							<Icofont icon='heart' />
						</Link>
					</div> */}
					{!this.props.isAvailable ? (
						<div className="member-plan position-absolute">
							<Badge variant={this.props.promotedVariant}>Unavailable</Badge>
						</div>
					)
						: ""
					}
					<Link to={this.props.linkUrl}>
						<Image src={this.props.image} className={this.props.imageClass} alt={this.props.imageAlt} />
					</Link>
				</div>
				<div className="p-3 position-relative">
					<div className="list-card-body">

						<h6 className="mb-1">
							<p className="text-gray mb-3 time">
								<Link to={this.props.linkUrl} className="text-black">{this.props.title}</Link>
								{this.props.price ? (
									<span className="float-right text-black-50">{this.props.price} EGP/Month</span>
								)
									: ""
								}
							</p>
						</h6>
						{this.props.subTitle ? (
							<p className="text-gray mb-3">{this.props.subTitle}</p>
						)
							: ''
						}
						<p>
							{this.props.description}
						</p>
						<div class="available-slots">
							{residents_current.map(x => {
								return <img class="user-icon" src="img/user-black.svg" />
							})}
							{residents_available.map(x => {
								return <img class="user-icon" src="img/user-white.svg" />
							})}
						</div>
						<div class="mt-5 buttons">
							{this.props.isRentButton == true && <Button variant="outline-secondary" type="button" id="button-1"><Icofont icon="ui-contact-list" /> Rent</Button>}
							{this.props.isShowRequestsButton == true && <Button variant="outline-secondary" type="button" id="button-1" style={{marginRight:21}}><Icofont icon="list" /> Requests</Button>}
							{this.props.isEditButton == true && <Button variant="outline-secondary" type="button" id="button-1"><Icofont icon="list" /> Edit</Button>}

							{this.props.isShowRequestsButton !== true && <Button style={{ width: (this.props.isRentButton == false && this.props.isEditButton == false) ? '100%' : '50%' }} variant="outline-secondary" type="button" id="button-2"><Icofont icon="google-map" /> Location</Button>}
						</div>
					</div>
					{/* {this.props.offerText ? (
						<div className="list-card-badge">
							<Badge variant={this.props.offerColor}>OFFER</Badge> <small>{this.props.offerText}</small>
						</div>
					)
						: ""
					} */}
				</div>
			</div>
		);
	}
}


CardItem.propTypes = {
	title: PropTypes.string.isRequired,
	imageAlt: PropTypes.string,
	image: PropTypes.string.isRequired,
	imageClass: PropTypes.string,
	linkUrl: PropTypes.string.isRequired,
	offerText: PropTypes.string,
	offerColor: PropTypes.string,
	subTitle: PropTypes.string,
	time: PropTypes.string,
	price: PropTypes.string,
	showPromoted: PropTypes.bool,
	promotedVariant: PropTypes.string,
	favIcoIconColor: PropTypes.string,
	rating: PropTypes.string,
};
CardItem.defaultProps = {
	imageAlt: '',
	imageClass: '',
	offerText: '',
	offerColor: 'success',
	subTitle: '',
	time: '',
	price: '',
	showPromoted: false,
	promotedVariant: 'dark',
	favIcoIconColor: '',
	rating: '',
}

export default CardItem;