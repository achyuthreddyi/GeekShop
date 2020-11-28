import React , {  useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { listProducts } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'


const Home = ({match}) => {  

    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1
    alert(pageNumber)

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)

    const { loading, error, products, page, pages} = productList


    useEffect( () =>{
        // firing the actions
        dispatch(listProducts(keyword, pageNumber))                                   
    },[dispatch,keyword, pageNumber])
    
    
    return (
        <>
            {products && products.length !==0 &&  <h1>latest Products</h1>}
            {loading 
              ? <Loader />
              : error ? <Message variant='success' children={ error}></Message>
              :
                (    
                <>
                <Row>
                    {products.length ===0 && <h1>No such products</h1>}
                    {products.map(product =>(
                        <Col key={product._id} sm={12} md={6} lg={3} xlg={3} >
                            <Product 
                            product = {product}
                            />                          
                        </Col>
                    ))}
                </Row>
                <Paginate 
                    pages={pages} 
                    page={page} 
                    keyword = {keyword ?  keyword : ''} />
                </>
                )
            }
            
        </>
    )
}

export default Home
