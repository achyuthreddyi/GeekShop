import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import Rating from '../components/Rating'
import { listProductsDetails } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'


const ProductScreen = ({match}) => {

    const dispatch = useDispatch()  
      
    const productDetails = useSelector(state => state.productDetails)
    const { loading, product, error } = productDetails

    useEffect( () =>{
        dispatch(listProductsDetails(match.params.id))            
    },[dispatch, match])


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
                            <ListGroup.Item>
                               <Button 
                                className='btn-block' 
                                type='button' 
                                disabled= {product.countInStock === 0 }>
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
