import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import Rating from '../components/Rating'
import Axios from 'axios'

const ProductScreen = ({match}) => {

    const [product, setProduct] = useState({})

    useEffect( () =>{
        const fetchProduct = async () =>{
            console.log("geting here ");
            const { data } = await Axios.get(`/api/products/${match.params.id}`)
            setProduct(data)
        }    
        fetchProduct() 
            
    },[match])

   
    return (
        <>
            <Link className='btn btn-dark my-3' to='/'> <AiOutlineArrowLeft/> GoBack</Link>
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
        </>
    )
}

export default ProductScreen
