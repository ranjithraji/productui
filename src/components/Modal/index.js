import React from 'react'
import './index.css'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { IF } from '../../service/util/Conditional'

const CustomModal = (props) => {

    let {
        id = 'custom-modal',
        closeBtnId = 'custom-modal-close',
        show,
        size = 'lg',
        toggle,
        header,
        content,
        modalClassName,
        headerClassName,
        contentClassName,
        sumbitFuc,
        submitId = "custom-model-submit",
        submitBtn = false
    } = props

    return (
        <Modal id={id} isOpen={show} toggle={toggle} className={modalClassName} size={size} >
            <ModalHeader toggle={toggle} cssModule={headerClassName}>{header}</ModalHeader>
            <ModalBody cssModule={contentClassName}>
                {content}
            </ModalBody>
            <ModalFooter>
                <Button id={closeBtnId} color='danger' onClick={toggle} >Close</Button>
                <IF condition={submitBtn}>
                    <Button id={submitId} color='primary' onClick={sumbitFuc} >Sumbit</Button>
                </IF>
            </ModalFooter>
        </Modal>
        // <Modal
        //     size="lg"
        //     show={show}
        //     onHide={toggle}
        //     aria-labelledby="example-modal-sizes-title-lg"
        // >
        //     <Modal.Header closeButton>
        //         <Modal.Title id="example-modal-sizes-title-lg">
        //             {header}
        //         </Modal.Title>
        //     </Modal.Header>
        //     <Modal.Body>{content}</Modal.Body>
        // </Modal>
    )
}

export default CustomModal