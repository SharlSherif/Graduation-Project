import React from 'react';
import { Row, Col } from 'react-bootstrap';

class Settings extends React.Component {
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
                            <h4 className="font-weight-bold mt-0 mb-3">Settings</h4>
                        </Col>

                    </Row>
                </div>
            </>
        );
    }
}
export default Settings;