import React from 'react';
import { Row, Col, } from 'react-bootstrap';
import CardItem from '../common/CardItem';

class Posts extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            data:[]
        };
    }

    async componentDidMount() {
        let url = 'http://localhost:4000/api/place/seller/requests/'
        await fetch(url, {
           method: 'GET', // *GET, POST, PUT, DELETE, etc.
           cache: "no-cache",
           credentials: 'same-origin', // include, *same-origin, omit
           headers: {
              'Content-Type': 'application/json',
              'Authorization': localStorage.token
           }
        })
           .then(response => response.json())
           .then(json => {
              console.log(json)
              this.setState({ data: json })
              // this.setState({ listing: json.data, isLoading: false })
           })
           .catch(err => console.log(err))
    }

    render() {
        return (
            <>
                <div className='p-4 bg-white shadow-sm'>
                    <Row>
                        <Col md={12}>
                            <h4 className="font-weight-bold mt-0 mb-3">Properties</h4>
                        </Col>
                        <Col md={12} sm={12} className="mb-4 pb-2">
                            {this.state.data.length > 0 ? this.state.data.map(list => (
                                <Col md={12} sm={12} className="mb-4 pb-2">
                                    <CardItem
                                        title={list.title}
                                        residents={list.residents}
                                        subTitle={list.areaName}
                                        description={list.description}
                                        isRentButton={false}
                                        isShowRequestsButton={true}
                                        isEditButton={true}
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
                            )) :
                                <p style={{
                                    textAlign: 'center',
                                    fontSize: '22px',
                                    marginTop: '30px'
                                }}>You didn't post any properties for rental yet</p>}
                        </Col>
                    </Row>
                </div>
            </>
        );
    }
}
export default Posts;