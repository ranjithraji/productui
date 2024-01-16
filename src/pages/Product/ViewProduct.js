import React from 'react'
import { DELETEPRODUCTS, GETALLPRODUCTS } from '../../service/API/APIservices';
import { Button, Card, CardHeader, Col, Row } from 'reactstrap';
import Tables from '../../components/Tables';
import { CONFIG } from '../../service/util/CONFIG';
import CustomModal from '../../components/Modal';
import ContentHeader from '../../components/ContentHeader';
import { Toast } from '../../service/util/Toast';
import ProductCard from '../../components/ProductCard';
import { IF, IFELSE } from '../../service/util/Conditional';

const ViewProduct = (props) => {

    /* Props */

    let { setCurrent, setElement } = props;

    /* variable state */

    const [products, setProducts] = React.useState();
    const [elementData, setElementData] = React.useState();
    const [modal, setModal] = React.useState(false);
    const [deleteModal, setDeleteModal] = React.useState(false);
    const [productView, setProductView] = React.useState(false);

    /*model function*/

    const toggle = () => {
        setModal(!modal);
        setElementData('');
    }
    const onImageView = (x) => {
        setElementData(x);
        setModal(true);
    }

    const deleteToggle = () => {
        setDeleteModal(!deleteModal);
        setElementData('');
    }

    const onDelete = (data) => {
        setElementData(data)
        setDeleteModal(true);
    }


    /* fetch product function */

    const fetchProducts = async () => {
        let response;

        try {
            response = await GETALLPRODUCTS();

            if (response.success) {
                setProducts(response.products)
            }
        } catch (error) {
            Toast({ position: 'TOP_RIGHT', message: String(error.error).toLowerCase().replace('view type', '2D View Type'), type: 'error', theme: 'colored' })
        }
    }

    /* delete product function */

    const deleteProductFuc = async () => {
        let response;

        try {
            response = await DELETEPRODUCTS({ productId: elementData._id });

            if (response.success) {
                Toast({ position: 'TOP_RIGHT', message: response.message, type: 'success', theme: 'colored' });
                deleteToggle();
                fetchProducts();
            }
        } catch (error) {
            Toast({ position: 'TOP_RIGHT', message: String(error.error).toLowerCase().replace('view type', '2D View Type'), type: 'error', theme: 'colored' })
        }
    }

    /*  Update Icon Action */

    const onEdit = (data) => {
        setElement(data);
        setCurrent();
    }


    //useEffect to call fetch products

    React.useEffect(() => {
        fetchProducts();
    }, []);


    /* Button Properties */

    const BtnProps = {
        submitBtn: {
            name: 'Submit',
            bgColor: '#00C851',
            width: '45%',
            textColor: '#fff',
            borderRadiusValue: '0.25rem',
            borderless: true,
            shadow: true,
            onClick: () => setCurrent()
        },
        createBin: {
            name: 'Create',
            bgColor: '#172b4d',
            width: '80%',
            textColor: '#fff',
            borderRadiusValue: '0.25rem',
            borderless: true,
            shadow: true,
            onClick: () => setCurrent()
        },
        productBin: {
            name: productView ? 'Table View' : 'Card View',
            bgColor: '#fff',
            width: '80%',
            textColor: '#172b4d',
            borderRadiusValue: '0.25rem',
            borderColor: '#172b4d',
            borderWidth: '2px',
            shadow: true,
            onClick: () => setProductView(!productView)
        }
    };

    return (
        <Card className="border-0">

            {/* Header */}
            <CardHeader className="border-0 bg-white" style={{ padding: "10px 0px", textAlign: 'start' }}>
                {/* Content Header */}
                <ContentHeader title={'Product'} backButton={false} button={true} buttonStyle={BtnProps.createBin} buttonId={'model_create_btn'} secondBtnProsp={BtnProps.productBin} secondBtnId={'product-view-button'} secondBtn={true} />
            </CardHeader>

            {/* Content Body */}
            <IF condition={productView == true}>
                {/* Content Card View */}
                <ProductCard products={products || []} />
            </IF>
            <IF condition={productView == false}>
                {/* Content Table View */}
                <Tables TableData={products || []} HeaderName={'PRODUCT'} onImageView={onImageView} onDelete={onDelete} setElement={onEdit} />
            </IF>

            {/* Modal */}

            <CustomModal
                size='md'
                header={`Images - ${elementData && elementData?.category}`}
                content={
                    <>
                        <Row>
                            <Col lg={12}>
                                <img src={elementData?.url} width={"100%"} height={"100%"} alt={elementData?.name} id={`image_id_${elementData?.url}`} />
                            </Col>
                        </Row>
                    </>
                }
                toggle={toggle}
                show={modal}
                closeBtnId={"image-close-id"}
                id={"image-modal"}
            />

            <CustomModal
                size='md'
                header={`Delete Comfiration`}
                content={
                    <>
                        <Row>
                            <Col lg={12}>
                                Are you sure to delete product - {elementData?.name}
                            </Col>
                        </Row>
                    </>
                }
                toggle={deleteToggle}
                show={deleteModal}
                closeBtnId={"delete-close-id"}
                id={"delete-modal"}
                submitBtn={true}
                sumbitFuc={deleteProductFuc}
                submitId={"submit-delete-id"}
            />
        </Card>
    )
}

export default ViewProduct