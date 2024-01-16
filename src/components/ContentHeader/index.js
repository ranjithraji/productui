import Button from '../Button';
import React from 'react';
import { Col, Row } from 'reactstrap'
import { IF } from '../../service/util/Conditional';
import './index.css'

const ContentHeader = (props) => {

    let { method, title, backButton, buttonStyle, buttonId, button, onBackFunc, secondBtnProsp, secondBtn } = props

    const headerStyle = backButton && {
        style: {
            alignItems: 'center',
            textAlign: 'start',
            color: '#000',
            display: 'flex',
            fontSize: '18px',
            fontWeight: '600',
            padding: '10px 0',
        }
    }

    return (
        <Row className='p-0'>
            <Col lg={secondBtn ? 8 : 10} md={8} sm={8} xs={6} {...headerStyle}>
                <IF condition={backButton}>
                    <div className="content_header_icon_container"
                        onClick={onBackFunc}
                    ><i className="fas fa-angle-left text-white" /> </div>
                </IF>
                <div className='content_header_title'> {method} {title}</div>
            </Col>
            <Col lg={2} md={4} sm={4} xs={6}>
                <IF condition={secondBtn}>
                    <Button {...secondBtnProsp} />
                </IF>
            </Col>
            <Col lg={2} md={4} sm={4} xs={6}>
                <IF condition={button}>
                    <Button
                        {...buttonStyle}
                        id={buttonId}
                    />
                </IF>
            </Col>
        </Row>
    )
}

export default ContentHeader