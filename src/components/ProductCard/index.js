import React from 'react'
import { Card, CardBody, CardFooter, Col, Row } from 'reactstrap';

const ProductCard = (props) => {

    let { products = [] } = props;
    return (
        <Row className='align-items-center'>
            <Col lg={1}></Col>
            {products && products.map((x, i) =>
                <Col key={i} lg={3} md={4} sm={8}>
                    <Card className='p-2 text-center' style={{
                        border: ' 6px solid white',
                        boxShadow: ' 5px 3px 10px gray',
                        borderRadius: '10px',
                        width: "300px",
                        height: '350px'
                    }}>
                        <CardBody>
                            <img src={x.url || 'https://cdn-icons-png.flaticon.com/512/743/743007.png'} width={"80%"} height={"70%"} alt={x.name} />
                        </CardBody>
                        <CardFooter className='border-0' style={{
                            height: "30%"
                        }}>
                            <div className='mt-2 ' style={{ fontWeight: 'bold' }}>
                                <p style={{ fontSize: "12px", fontWeight: 'bold' }}>{x.name}</p>
                                <p style={{ fontSize: "15px", fontWeight: 'bold' }}>₹{x.price}</p>
                            </div>
                        </CardFooter>
                    </Card>
                </Col>)}
        </Row>
    )
}

export default ProductCard