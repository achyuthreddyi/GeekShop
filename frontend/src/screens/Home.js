import React , {  useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { listProducts } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const Home = () => {  

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)

    const { loading, error, products} = productList


    useEffect( () =>{
        // firing the actions
        dispatch(listProducts())                                   
    },[dispatch])
    
    
    return (
        <>
            <h1>latest Products</h1>
            {loading 
              ? <Loader />
              : error ? <Message variant='success' children={ error}></Message>:
            <Row>
                {products.map(product =>(
                    <Col key={product._id} sm={12} md={6} lg={3} xlg={3} >
                        <Product 
                        product = {product}
                        />                          
                    </Col>
                ))}
            </Row>
            }
            
        </>
    )
}

export default Home
