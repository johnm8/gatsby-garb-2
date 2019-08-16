import React from "react"
import { Link } from "gatsby"
import axios from "axios"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"


var obj = { name: "John", age: 30, city: "New York" };
var values = JSON.stringify(obj);

axios.post(`http://localhost:4001/api/test`,  values )
.then(res => {
  console.log(res);
  console.log(res.data);

  if (res.status === 200) {
    this.setState({ redirect: true }); // after signing up, set the state to true. This will trigger a re-render
  }
  

  
})
.catch(err=>{
console.log(err);
});

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export default IndexPage
