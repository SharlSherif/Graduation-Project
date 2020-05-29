import React from 'react';
import { Row, Col } from 'react-bootstrap';
import CardItem from '../common/CardItem';
import Context from '../context'

class ConfirmedRentals extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
        };
    }
    static contextType = Context;

    render() {
        console.log("COnfirmedRentals  :", this.context)
        return (
            <>
                <div className='p-4 bg-white shadow-sm'>
                    <Row>
                        <Col md={12}>
                            <h4 className="font-weight-bold mt-0 mb-3">Confirmed Rentals</h4>
                        </Col>
                        {this.context.confirmedRentals &&this.context.confirmedRentals.length >0 ? this.context.confirmedRentals.map(list => (
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
                                    linkUrl={'/detail?' + JSON.stringify(list)}
                                    offerText='65% off | Use Coupon OSAHAN50'
                                    time='15–25 min'
                                    price={list.price.amount}
                                    isAvailable={list.isAvailable}
                                    promotedVariant='dark'
                                    favIcoIconColor='text-danger'
                                />
                            </Col>
                        )):
                                <p style={{
                                    textAlign: 'center',
                                    fontSize: '22px',
                                    marginTop: '30px'
                                }}>No confirmed rentals were found at the moment</p>}
                    </Row>
                </div>
            </>
        );
    }
}
export default ConfirmedRentals;