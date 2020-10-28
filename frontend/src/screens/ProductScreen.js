import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import Rating from '../components/Rating'
import { listProductsDetails } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'


const ProductScreen = ({history, match}) => {

    const [quantity, setQuantity] = useState(1)
    
    const dispatch = useDispatch()  
      
    const productDetails = useSelector(state => state.productDetails)
    const { loading, product, error } = productDetails

    useEffect( () =>{
        dispatch(listProductsDetails(match.params.id))            
    },[dispatch, match])
    

    const addToCartHandler = () =>{
        history.push(`/cart/${match.params.id}?qty=${quantity}`)
    }


    return (
        <>
            <Link className='btn btn-dark my-3' to='/'> <AiOutlineArrowLeft/> GoBack</Link>

            {loading ? <Loader />: error? <Message variant ='danger'>{error}</Message> :
            (  
                <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2> {product.name}</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price: &#x20B9; {product.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Description: {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                {/* add to cart stuff */}
                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Price:                                    
                                    </Col>
                                    <Col>
                                        <strong>  &#x20B9; {product.price}</strong>                                    
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Status:                                    
                                    </Col>
                                    <Col>
                                        {product.countInStock > 0 ? 'InStock': 'Out Of Stock'}                                    
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            {product.countInStock > 0 && (
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Qty</Col>
                                        <Col>
                                            {/*TODO: limit the product count to 10 */}
                                            <Form.Control as='select' value={quantity} onChange = {(e) =>
                                            setQuantity(e.target.value)}>
                                                {[...Array(product.countInStock).keys()].map( x =>(
                                                    <option key = {x+1} value={x+1}>
                                                        {x+1}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )}

                            <ListGroup.Item>
                               <Button 
                                className='btn-block' 
                                type='button' 
                                disabled= {product.countInStock === 0 }
                                onClick = {addToCartHandler}
                                >
                                    Add To Cart
                               </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>                   
            )
            }
            
            
        </>
    )
}

export default ProductScreen
