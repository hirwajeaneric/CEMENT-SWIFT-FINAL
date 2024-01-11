import { Helmet } from "react-helmet-async";
import { Card2, FullPageContainer, HeaderOne1, PageContainer, PageSizedContainer, RowFlexedContainer } from "../../styles/GeneralStyledComponents";
import { useContext, useEffect } from "react";
import { ScrollContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Endpoints from "../../utils/APIS";
import { LIST_OF_PRODUCTS } from "../../utils/LIST_OF_PRODUCTS";
import ProductCard from "../../components/ProductCard";

export default function Products() {
  const { setNotHomePage } = useContext(ScrollContext);
  const navigate = useNavigate();
  const { isLoading, listOfDJs } = useSelector(state => state.user)

  useEffect(() => {
    if (window.location.pathname !== '/' || window.location.pathname !== '') {
      setNotHomePage(true);
    }
  }, [setNotHomePage]);

  return (
    <PageContainer>
      <Helmet>
        <title>Products - Products who work with us.</title>
        <meta name="description" content={`All Products who work with us.`} /> 
      </Helmet>
      <FullPageContainer style={{ background: 'white', marginTop:'40px' }}>
        <PageSizedContainer style={{ padding: "80px 0px", justifyContent: 'flex-start', minHeight: '70vh' }}>
          <h2 style={{ fontWeight: '600', color: '#1b1d21', width: '100%', textAlign: 'left' }}>Available Cement types in stock</h2>
          <RowFlexedContainer style={{ justifyContent: 'space-between', alignItems: 'flex-start', gap: '30px', margin: '30px 0 20px', alignItems: "flex-start" }}> 
            {LIST_OF_PRODUCTS.map((product, index) => {
              if (index > 9) {
                  return <></>
              }
              return (
                  <ProductCard key={index} product={product} />
              )
            })}
          </RowFlexedContainer>
        </PageSizedContainer>
      </FullPageContainer>
    </PageContainer>
  )
}
