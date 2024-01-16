import Button from '../../components//Button'
import ContentHeader from '../../components/ContentHeader'
import Input from '../../components//Input'
import InputSelect from '../../components//Select'
import React from 'react'
import { Card, CardBody, CardFooter, CardHeader, Col, Row } from 'reactstrap'
import { CONFIG } from '../../service/util/CONFIG'
import { IF } from '../../service/util/Conditional'
import { SCHEMA } from '../../service/util/Schema'
import { Toast } from '../../service/util/Toast'
import { Validation } from '../../service/util/Vaildation';
import { CREATEPRODUCT, UPDATEPRODUCTS } from '../../service/API/APIservices'

let fileds = SCHEMA.PRODUCT;

const AddProduct = (props) => {

  /* Props  */

  let { setCurrent, element, setElement } = props;

  /* Input Variable State  */

  const [state, setState] = React.useState({
    name: '',
    price: '',
    category: '',
    description: '',
    url: ''
  });

  /* Option Variable State  */

  const [optionState, setOptionState] = React.useState({
    category: ''
  });

  /*  Update State */

  const [updateState, setUpdateState] = React.useState(
    {
      name: '',
      price: '',
      category: '',
      description: '',
      url: ''
    }
  );

  /* useEffect Functionality */

  React.useEffect(() => {
    const InitialFuc = async () => {

      /* Update Page Value Validation and setSate */
      if (element) {

        let categoryObj = CONFIG.category.find(x => x.type === element.category);

        setState({
          name: element.name,
          price: element.price,
          category: element.category,
          description: element.description,
          url: element.url
        });

        setOptionState({
          category: { label: categoryObj.type, value: categoryObj.type }
        });

        setUpdateState({
          name: element.name,
          price: element.price,
          category: element.category,
          description: element.description,
          url: element.url
        });
      }
    }

    InitialFuc();
  }, [])

  /* Error Variable State  */

  const [error, setError] = React.useState({ inValidField: [], message: {} });


  /* Input State OnChange Function */

  const singleOnchange = (field, value) => {
    setError({ inValidField: [], message: {} });

    let data = state;

    if (!element) {

      if (field === 'name') {
        data = { ...data, [field]: value, }
      }

      if (field === 'description') {
        data = { ...data, [field]: value }
      }

      if (field === 'price') {
        data = { ...data, [field]: value };
      }

      if (field === 'url') {
        data = { ...data, [field]: value };
      }

    } else {
      data = { ...data, [field]: value }
    }

    setState(data);
  }

  /* Option State OnChange Function */

  const optionOnchange = (field, option) => {
    setError({ inValidField: [], message: {} })

    let data = state, optionData = optionState;

    if (!element) {

      if (field === 'category') {
        data = { ...data, [field]: option.value, url: '' }
        optionData = { ...optionData, [field]: option, };
      }


    } else {
      data = { ...data, [field]: option.value }
      optionData = { ...optionData, [field]: option }
    }


    setState(data);
    setOptionState(optionData);

  }

  /* Part Create Functionality  */

  const onSubmit = async () => {

    setError({ inValidField: [], message: {} });

    /* API Body data fields */
    let body = {}, schema = fileds;

    let requiredData = ['name', 'price', 'category', 'description'];

    requiredData.map(x => body[x] = state[x]);

    if (!optionState.category && state.url) {
      schema = schema.filter(x => x.name != 'url');
      schema.push({ name: 'url', type: 'string', regex: CONFIG.img_src });
    }

    // Validation

    let errors = Validation(state, schema);

    //Error Condition

    if (errors.inValidField.length > 0) {
      setError(errors)
    } else {

      //Create API Promise
      try {

        let response = await CREATEPRODUCT(body);

        if (response) {
          Toast({ position: 'TOP_RIGHT', message: String(response.message).toLowerCase().replace('product', 'Product'), type: 'success', theme: 'colored' });
          _reset();
          setCurrent();
        }

      } catch (error) {
        Toast({ position: 'TOP_RIGHT', message: String(error.error).toLowerCase().replace('product', 'Product'), type: 'error', theme: 'colored' })
      }
    }

  }

  /* Part Update Functionality  */

  const onUpdate = async () => {

    setError({ inValidField: [], message: {} });

    /* API Body data fields */

    let body = {}, schema = fileds;

    let requiredData = ['name', 'price', 'category', 'description','url'];

    requiredData.map(x => state[x] !== updateState[x] ? body[x] = state[x] : false);

    if (!optionState.category && state.url) {
      schema = schema.filter(x => x.name != 'url');
      schema.push({ name: 'url', type: 'string', regex: CONFIG.img_src });
    }

    // Validation

    let errors = Validation(state, schema);

    //Error Condition

    if (errors.inValidField.length > 0) {
      setError(errors)
    } else {

      //Update API Promise
      try {

        let response = await UPDATEPRODUCTS({ ...body, productId: element._id });

        if (response) {
          Toast({ position: 'TOP_RIGHT', message: response.message, type: 'success', theme: 'colored' });
          _reset();
          setCurrent();
        }

      } catch (error) {
        Toast({ position: 'TOP_RIGHT', message: String(error.error).toLowerCase().replace('view type', '2D View Type'), type: 'error', theme: 'colored' })
      }

    }
  }

  /* Reset Function */

  const _reset = () => {
    /* Update Page Value Validation and setSate */
    setState({
      name: '',
      price: '',
      category: '',
      description: '',
      url: ''
    });
    setOptionState({
      category: ''
    });
    setElement();
    setUpdateState({
      name: '',
      price: '',
      category: '',
      description: '',
      url: ''
    });
    setError({ inValidField: [], message: {} })
  }

  const _resetUpdate = () => {
    /* Update Page Value Validation and setSate */
    if (element) {

      let categoryObj = CONFIG.category.find(x => x.type === element.category);

      setState({
        name: element.name,
        price: element.price,
        category: element.category,
        description: element.description,
        url: element.url
      });

      setOptionState({
        category: { label: categoryObj.type, value: categoryObj.type }
      });

      setUpdateState({
        name: element.name,
        price: element.price,
        category: element.category,
        description: element.description,
        url: element.url
      });
    }
  }

  /* Button Properties */

  const BtnProps = {
    resetBtn: {
      name: 'Reset',
      bgColor: '#ff4444',
      width: '45%',
      textColor: '#fff',
      borderRadiusValue: '0.25rem',
      borderless: true,
      shadow: true,
      onClick: () => element ? _resetUpdate() : _reset()
    },
    submitBtn: {
      name: 'Submit',
      bgColor: '#00C851',
      width: '45%',
      textColor: '#fff',
      borderRadiusValue: '0.25rem',
      borderless: true,
      shadow: true,
      disabled: !state['category'],
      onClick: () => element ? onUpdate() : onSubmit()
    },
    createBin: {
      name: 'Create',
      bgColor: '#172b4d',
      width: '80%',
      textColor: '#fff',
      borderRadiusValue: '0.25rem',
      borderless: true,
      shadow: true,
      onClick: () => { _reset(); setCurrent(); }
    },
  };

  return (
    <Card className="border-0">

      {/* Header   */}

      <CardHeader className="border-0 bg-white">
        <ContentHeader title={'Product'} method={element ? 'Update' : 'Create'} backButton={true} onBackFunc={() => { _reset(); setCurrent(); }} />
        <IF condition={state['type'] === 'Group'}>
          <Row style={{ justifyContent: 'center' }}>
            <Col lg={2} className='pt-1'>
              <Button {...BtnProps.downloadBin} />
            </Col>
          </Row>
        </IF>
      </CardHeader>

      {/* Body   */}

      <CardBody >

        {/* Part Form   */}
        <Row>
          <Col lg={4}>
            <Input
              name='Name'
              type='text'
              inputType={'mixedString'}
              placeholder='Enter Name'
              id={'product_name_input'}
              width='80%'
              height='80px'
              keyname={'name'}
              value={state['name']}
              important={true}
              onChange={singleOnchange}
              toast={error.inValidField.includes('name')}
              error={error.inValidField.includes('name')}
              toastMsg={error.message?.name}
            />
          </Col>
          <Col lg={4}>
            <Input
              name='Price'
              type='text'
              inputType={'number'}
              placeholder='Enter Price No'
              id={'product_number_input'}
              width='80%'
              height='80px'
              keyname={'price'}
              value={state['price']}
              important={true}
              onChange={singleOnchange}
              toast={error.inValidField.includes('price')}
              error={error.inValidField.includes('price')}
              toastMsg={error.message?.price}
              disabled={!state['name']}
            />
          </Col>
          <Col lg={4}>
            <InputSelect
              name='Category Type'
              title={true}
              placeholder='Select Category Type'
              width='80%'
              height='80px'
              id={'product_image_category_select'}
              important={true}
              keyname={'category'}
              options={CONFIG.category || []}
              value={optionState['category']}
              onSelect={optionOnchange}
              field={'type'}
              label={'type'}
              toast={error.inValidField.includes('category')}
              error={error.inValidField.includes('category')}
              toastMsg={error.message?.category}
              disabled={!state['price']}
            />
          </Col>
          <Col lg={4}>
            <Input
              name='Description'
              type='textarea'
              inputType={'mixedString'}
              placeholder='Enter description'
              id={'product_description_input'}
              width='80%'
              height='auto'
              inputStyle={{ minHeight: '200px', height: 'auto' }}
              keyname={'description'}
              value={state['description']}
              important={true}
              onChange={singleOnchange}
              toast={error.inValidField.includes('description')}
              error={error.inValidField.includes('description')}
              toastMsg={error.message?.description}
              disabled={!state['name']}
            />
          </Col>
          <IF condition={state['category']}>
            <Col lg={4}>
              <Input
                name='Image URL'
                type='text'
                inputType={'mixedString'}
                placeholder='Enter Image Source'
                id={'product_image_input'}
                width='80%'
                height='80px'
                keyname={'url'}
                value={state['url']}
                important={false}
                onChange={singleOnchange}
                toast={error.inValidField.includes('url')}
                error={error.inValidField.includes('url')}
                toastMsg={error.message?.url}
                disabled={!state['category']}
              />
            </Col>
          </IF>
        </Row>
      </CardBody>

      {/* Card Footer  */}

      <CardFooter className='border-0 bg-white'>

        {/* Action Buttons */}
        <Row>
          <Col lg={8}></Col>
          <Col lg={4}>
            <div style={{ display: "flex", justifyContent: 'space-evenly' }}>
              <Button   {...BtnProps.resetBtn} />
              <Button
                {...BtnProps.submitBtn} />
            </div>
          </Col>
        </Row>
      </CardFooter >
    </Card >
  )
}

export default AddProduct