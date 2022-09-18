import React from 'react'
import CustomHead from './CustomHead'
import Footer from './Footer'
import Header from './Header'

export default function Layout({ children, pageTitle }) {
  return (
    <>
      <CustomHead pageTitle={pageTitle} />
      <Header />
      {children}
      <Footer />
    </>
  )
}
