import React from 'react'
import { FullPageContainer, PageContainer, PageSizedContainer } from '../../styles/GeneralStyledComponents'
import { Helmet } from 'react-helmet-async'

const UserAccountHome = () => {
  return (
    <PageContainer>
      <Helmet>
        <title>User account</title>
        <meta name="description" content={`User account`} />
      </Helmet>
              
          <h1>My Profile</h1>

      
    </PageContainer>
  )
}

export default UserAccountHome