import Axios from 'axios'
import React , {  useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { listProducts } from '../actions/productActions'
// import products from '../products'

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
            {loading ? <h1>loading the data</h1>: error ? <h1>{ error} </h1>:
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
