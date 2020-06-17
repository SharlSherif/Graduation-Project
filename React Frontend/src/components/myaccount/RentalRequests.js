import React from 'react';
import { Row, Col, } from 'react-bootstrap';
import CardItem from '../common/CardItem';

class RentalRequests extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
        };
    }

    render() {
        return (
            <>
                <div className='p-4 bg-white shadow-sm'>
                    <Row>
                        <Col md={12}>
                            <h4 className="font-weight-bold mt-0 mb-3">Rental Requests</h4>
                        </Col>
                        <Col md={12} sm={12} className="mb-4 pb-2">
                            {this.context.rentalRequests && this.context.rentalRequests.length > 0 ? this.context.rentalRequests.map(list => (
                                <Col md={12} sm={12} className="mb-4 pb-2">
                                    <CardItem
                                        title={list.title}
                                        residents={list.residents}
                                        subTitle={list.areaName}
                                        description={list.description}
                                        isRentButton={false}
                                        imageAlt='Product'
                                        image='img/list/1.png'
                                        imageClass='img-fluid item-img'
                                        
                                        offerText='65% off | Use Coupon OSAHAN50'
                                        time='15–25 min'
                                        price={list.price.amount}
                                        isAvailable={list.isAvailable}
                                        promotedVariant='dark'
                                        favIcoIconColor='text-danger'
                                    />
                                </Col>
                            )) :
                                <p style={{
                                    textAlign: 'center',
                                    fontSize: '22px',
                                    marginTop: '30px'
                                }}>No rental requests were found at the moment</p>}
                        </Col>
                    </Row>
                </div>
            </>
        );
    }
}
export default RentalRequests;