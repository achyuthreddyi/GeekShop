import Axios from 'axios'
import React , { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
// import products from '../products'

const Home = () => {
    const [products, setProducts ] = useState([])

    useEffect( () =>{
        const fetchProducts = async () =>{
            console.log("geting here ");
            const { data } = await Axios.get('/api/products')
            setProducts(data)
        }    
        fetchProducts() 
            
    },[])


    return (
        <>
            <h1>latest Products</h1>
            <Row>
                {products.map(product =>(
                    <Col key={product._id} sm={12} md={6} lg={3} xlg={3} >
                        <Product 
                        product = {product}
                        />              
                        
                    </Col>
                ))}
            </Row>
            
        </>
    )
}

export default Home