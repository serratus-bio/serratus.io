import React from "react"
import Helmet from "react-helmet"

export default ({ children }) => (
  <>
    <Helmet>
      <title>Cool</title>
    </Helmet>
      {children}
      <footer></footer>
  </>
)