import React from 'react'
import { Col, Container, Row } from 'reactstrap';
import ViewProduct from './ViewProduct';
import AddProduct from './AddProduct';
import { IF } from '../../service/util/Conditional';

const Product = () => {

  const [current, setCurrent] = React.useState('View');

  const [element, setElement] = React.useState();

  return (
    <Container fluid>
      <Row style={{ background: "#fff" }}>
        <Col>
          <IF condition={current === 'View'}>
            <ViewProduct setCurrent={() => setCurrent('ADD')}  setElement={setElement} />
          </IF>
          <IF condition={current === 'ADD'}>
            <AddProduct setCurrent={() => setCurrent('View')} element={element}  setElement={setElement}  />
          </IF>
        </Col>
      </Row>
    </Container >
  )
}

export default Product;