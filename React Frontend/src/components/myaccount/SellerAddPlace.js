import React from 'react';
import { Row, Col, Form, Dropdown } from 'react-bootstrap';
import CardItem from '../common/CardItem';
let arr = [
    { field: "title", message: "Title cannot be empty" },
    { field: "description", message: "Description cannot be empty" },
    { field: "areaName", message: "Area Name cannot be empty" },
    { field: "price", message: "Price cannot be empty" },
    { field: "maximum", message: "Please specify a maximum count for this property residents" },
    { field: "bedrooms", message: "Please specify the number of bedrooms" },
    { field: "bathrooms", message: "Please specify the number of bathrooms" },
    { field: "areaM2", message: "Please specify the Area (m^2)" },
    { field: "type", message: "Please select a target audience" },
]

class SellerAddPlace extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isLoading: true,
            success: false,
            message: "",
            type: "",
            currency: "EGP",
            current: 0,
            isFurnished: false,
            errors: []
        };
    }

    Add = async () => {
        let messages = []
        for (let { field, message } of arr) {
            if (this.state[field] == "" || this.state[field] == undefined) {
                messages.push(message)
            }
        }
        if (messages.length > 0) {
            this.setState({ errors: messages })
            return
        }


        let url = 'http://localhost:4000/api/place/'
        let object = {
            "title": this.state.title,
            "type": this.state.type,
            "description": this.state.description,
            //! dont forget about adding images
            // "images": [
            //     "a.com",
            //     "b.com",
            //     "c.com"
            // ],
            "areaName": this.state.areaName,
            //! dont forget about adding a map
            // "location": {
            //     "lat": 30.0471581,
            //     "lng": 31.3855297
            // },
            "price": {
                "currency": this.state.currency,
                "amount": this.state.price
            },
            "residents": {
                "maximum": this.state.maximum,
                "current": this.state.current
            },
            "filters": {
                "isFurnished": this.state.isFurnished,
                "bedrooms": this.state.bedrooms,
                "bathrooms": this.state.bathrooms,
                "areaM2": this.state.areaM2
            }
        }
        console.table(object)
        await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            cache: "no-cache",
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
            },
            body: JSON.stringify(object)
        })
            .then(response => response.json())
            .then(json => {
                // if (!json.success) {
                // let messages = []
                // for (let error in json.message.errors) {
                //     messages.push(json.message.errors[error].message)
                // }
                // this.setState({ errors: messages })

                // }
                if (json.success) {
                    this.setState({ errors: [], success: true })
                    window.location="/myaccount/posts"
                }
                console.log(json)
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <>
                <Col lg={6} md={12} sm={12} style={{ margin: 'auto', marginTop: 20 }}>

                    <div className='p-4 bg-white shadow-sm'>
                        <Row>
                            <Col md={12}>
                                <h4 className="font-weight-bold mt-0 mb-3" style={{ textAlign: 'center' }}>New Property</h4>
                            </Col>
                            <Col md={12} sm={12} className="mb-4 pb-2" style={{ margin: 'auto' }}>
                                <Col md={8} sm={12} style={{ margin: 'auto' }} className="mb-4 pb-2">
                                    <form onSubmit={this.Add}>
                                        <div className="form-label-group">
                                            <div className="form-label-group">
                                                <Form.Control type="text" id="inputTitle" value={this.state.title} onChange={e => this.setState({ title: e.target.value })} placeholder="Title" />
                                                <Form.Label htmlFor="inputTitle">Title</Form.Label>
                                            </div>
                                            <div className="form-label-group">
                                                <Form.Control type="text" id="inputDescription" value={this.state.description} onChange={e => this.setState({ description: e.target.value })} placeholder="Description" />
                                                <Form.Label htmlFor="inputDescription">Description</Form.Label>
                                            </div>
                                            <div className="form-label-group">
                                                <Form.Control type="text" id="inputareaName" value={this.state.areaName} onChange={e => this.setState({ areaName: e.target.value })} placeholder="Area Name" />
                                                <Form.Label htmlFor="inputareaName">Area Name</Form.Label>
                                            </div>
                                            <div className="row">
                                                <div className="col-3 form-label-group" style={{ marginLeft: 15, padding: 0 }}  >
                                                    <Form.Control type="number" id="inputPrice" value={this.state.price} onChange={e => this.setState({ price: Number(e.target.value) })} placeholder="Price" />
                                                    <Form.Label htmlFor="inputPrice">Price (per month)</Form.Label>
                                                </div>
                                                <div className="col-3" style={{ marginTop: 13 }}>
                                                    <select id="currency" className="form-control" style={{ maxWidth: '90%' }} onChange={e => this.setState({ currency: e.target.value })} >
                                                        <option value="EGP">EGP</option>
                                                        <option value="USD">USD</option>
                                                    </select>
                                                </div>
                                                <div className="col-5">
                                                    <select id="inputTargetAudience" className="form-control" style={{ marginTop: 13 }} onChange={e => this.setState({ type: e.target.value })} >
                                                        <option value="">Select Targeted Audience</option>
                                                        <option value="employee">Employees</option>
                                                        <option value="student">Students</option>
                                                    </select>
                                                    {/* <Form.Control type="text" id="inputTargetAudience" value={this.state.type} onChange={e => this.setState({ type: e.target.value })} placeholder="Target Audience" /> */}
                                                </div>

                                            </div>
                                            <div className="row">
                                                <div className="form-label-group col-6">
                                                    <Form.Control type="text" id="inputCurrentResidents" defaultValue="0" value={this.state.current} onChange={e => this.setState({ current: Number(e.target.value) })} placeholder="Maximum Residents" />
                                                    <Form.Label style={{ paddingLeft: 15 }} htmlFor="inputCurrentResidents">Current Residents Count</Form.Label>
                                                </div>

                                                <div className="form-label-group col-6">
                                                    <Form.Control type="text" id="inputMaximumResidents" value={this.state.maximum} onChange={e => this.setState({ maximum: Number(e.target.value) })} placeholder="Maximum Residents" />
                                                    <Form.Label style={{ paddingLeft: 15 }} htmlFor="inputMaximumResidents">Maximum Residents Count</Form.Label>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <input type="checkbox" className="col-1" style={{ height: 22, marginLeft: 7 }} onChange={e => this.setState({ isFurnished: e.target.checked })} />
                                                <label className="" style={{ padding: 3, color: '#495057' }}>Furnished</label>
                                            </div>
                                            <div className="form-label-group">

                                                <Form.Control type="number" id="inputBedroomsNumber" value={this.state.bedrooms} onChange={e => this.setState({ bedrooms: Number(e.target.value) })} placeholder="Bedrooms Number" />
                                                <Form.Label htmlFor="inputBedroomsNumber">Bed-rooms Count</Form.Label>
                                            </div>
                                            <div className="form-label-group">

                                                <Form.Control type="number" id="inputBathroomsNumber" value={this.state.bathrooms} onChange={e => this.setState({ bathrooms: Number(e.target.value) })} placeholder="Bathrooms Number" />
                                                <Form.Label htmlFor="inputBathroomsNumber">Bath-rooms Count</Form.Label>
                                            </div>
                                            <div className="form-label-group">
                                                <Form.Control type="number" id="inputArea" value={this.state.areaM2} onChange={e => this.setState({ areaM2: Number(e.target.value) })} placeholder="Area" />
                                                <Form.Label htmlFor="inputArea">Area (m^2)</Form.Label>
                                            </div>

                                        </div>
                                    </form>
                                    {this.state.success &&
                                        <div className="alert alert-success" role="alert">
                                            Property has been added successfully!
                                        </div>
                                    }
                                    {this.state.errors.length > 0 &&
                                        this.state.errors.map(errorMessage => (
                                            <div className="alert alert-danger" role="alert">
                                                {errorMessage}
                                            </div>
                                        ))
                                    }
                                </Col>


                            </Col>
                            <Col md={12}>
                                <Row>
                                    <button className="col-3 btn btn-lg btn-outline-primary btn-block btn-login text-uppercase font-weight-bold mb-2" onClick={this.props.history.goBack} style={{ color: 'white' }}>Back</button>
                                    <span className="col-6" style={{ textAlign: 'center' }}></span>
                                    <button className="col-3 btn btn-lg btn-info btn-block btn-login text-uppercase font-weight-bold mb-2" type="submit" onClick={this.Add} style={{ color: 'white' }}>Publish</button>
                                </Row>

                            </Col>
                        </Row>
                    </div>
                </Col>

            </>
        );
    }
}
export default SellerAddPlace;