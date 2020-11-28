import React from 'react'
import { Helmet } from  'react-helmet'

const Meta = ({ title, description, keywords}) => {
  return (
    <Helmet>
      <title> {title} </title>
      <meta name='description' content={description}/>
      <meta name='keywords' content={keywords} />
    </Helmet>
  )
}
Meta.defaultProps = {
  title: 'welcome to pro shop',
  keywords:'we sell great products for cheap',
  description: 'electronics, cheap electronics'
}

export default Meta
