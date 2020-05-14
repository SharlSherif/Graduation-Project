import React from 'react';
import {Link} from 'react-router-dom';
import {Row,Col,Container,Form} from 'react-bootstrap';
import Select2 from 'react-select2-wrapper';
import Icofont from 'react-icofont';
import OwlCarousel from 'react-owl-carousel3';
import ProductBox from './ProductBox';

import CategoriesCarousel from '../common/CategoriesCarousel';

class TopSearch extends React.Component {

	render() {
    	return (
	      <section className="pt-5 pb-5 homepage-search-block position-relative">
	         <div className="banner-overlay"></div>
	         <Container>
	            <Row className="d-flex align-items-center">
	               <Col md={12}>
	                  <div className="homepage-search-title">
	                     <h1 className="mb-2 font-weight-normal"><span className="font-weight-bold">Find Awesome Deals</span> in Australia</h1>
	                     <h5 className="mb-5 text-secondary font-weight-normal">Lists of top restaurants, cafes, pubs, and bars in Melbourne, based on trends</h5>
	                  </div>
	                  <div className="homepage-search-form">
	                     <Form className="form-noborder">
	                        <div className="form-row">
	                           <Form.Group className='col-lg-2 col-md-2 col-sm-12'>
	                              <div className="location-dropdown">
	                              	 <Icofont icon='location-arrow'/>
	                                 <Select2 className="custom-select"
		                                 data={[
										    { text: 'Maadi', id: 1 },
										    { text: 'October', id: 2 },
										  ]}
										  options={{
										    placeholder: 'District',
										  }}
	                                 />
	                              </div>
	                           </Form.Group>
							   <Form.Group className='col-lg-2 col-md-2 col-sm-12'>
	                              <div className="location-dropdown">
	                                 <Select2 className="custom-select"
		                                 data={[
										    { text: 'General', id: 1},
										    { text: 'Student', id: 2 },
										    { text: 'Employee', id: 3 },
										  ]}
										  options={{
										    placeholder: 'Status',
										  }}
	                                 />
	                              </div>
	                           </Form.Group>
	                           <Form.Group className='col-lg-6 col-md-6 col-sm-12'>
	                              <Form.Control type="text" placeholder="Search for an ad.." size='lg' />
	                           </Form.Group>
							   
	                           <Form.Group className='col-lg-2 col-md-2 col-sm-12'>
	                              <Link to="listing" className="btn btn-primary btn-block btn-lg btn-gradient">Search</Link>
	                           </Form.Group>
	                        </div>
	                     </Form>
	                  </div>
	               </Col>
	            </Row>
	         </Container>
	      </section>
	    );
	}
}

const options2={
	responsive: {
        0:{
            items:2,
        },
        764:{
            items:2,
        },
        765: {
          items: 1,
        },
        1200: {
          items: 1,
        },
      },
      lazyLoad: true,
      loop: true,
      autoplay: true,
      autoplaySpeed: 1000,
      dots: false,
      autoplayTimeout: 2000,
      nav: true,
      navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
      autoplayHoverPause: true,
}

export default TopSearch;