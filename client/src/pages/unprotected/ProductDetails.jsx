import React, { useEffect, useState } from 'react'
import { FullPageContainer, PageContainer, PageSizedContainer } from '../../styles/GeneralStyledComponents'
import { Helmet } from 'react-helmet-async'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { LIST_OF_PRODUCTS } from '../../utils/LIST_OF_PRODUCTS'

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});

  useEffect(() => {
    setProduct(LIST_OF_PRODUCTS.find(product => product.id === params.productId))
  },[params.productId]);

  return (
    <PageContainer>
      <Helmet>
        <title></title>
        <meta name="description" content={`Product information.`} /> 
      </Helmet>
      <FullPageContainer style={{ backgroundColor: 'white', color: 'black' }}>
        <PageSizedContainer style={{ minHeight: '80vh', gap: '30px', flexDirection: 'row', alignItems: 'flex-start', paddingTop: '140px', justifyContent: 'space-between'}}>
          <img src={product.image} alt="" style={{ width: '40%' }}/>
          <div>
            <h2>{product.name}</h2>
            <p style={{ margin: '10px 0', color: 'black' }}>{product.category} <span style={{ color: 'green' }}>| In stock</span></p>
            <p style={{ marginBottom: '20px'}}>{product.price} RWF</p>
            <p>{product.description}</p>
            <button onClick={() => navigate(`/order/${product.id}`)} style={{ cursor: 'pointer', padding: '15px 20px', background: 'black', color: 'white', fontSize: '100%', border: 'none', textDecoration: 'none', borderRadius: '10px', margin: '40px 0' }}>Book now</button>
          </div>
        </PageSizedContainer>
      </FullPageContainer>
    </PageContainer>
  )
}

export default ProductDetails