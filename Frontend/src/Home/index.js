import React, { useEffect, useState } from "react";
import {
  Jumbotron,
  Button,
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardText,
  CardHeader,
  CardFooter,
} from "reactstrap";
import { useHistory } from "react-router-dom";
import ProductCard from "../Templates/productCard";
const config = require("../config/config.json");
const urlConfig = require("../config/urlsconfig.json");

const Home = () => {
  let [products, setProducts] = useState([]);
  const history = useHistory();
  const getRole = localStorage.getItem("type");
  const orderId = localStorage.getItem("orderId");

  const fetchProduct = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    let url = `${config.baseURL}${urlConfig.getproducts.uri}`;
    url = url.replace(":userId", userId);
    fetch(url, {
      method: urlConfig.getproducts.method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
        type: getRole,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((response) => {
        if (response) {
          setProducts(response);
        }
      });
  };

  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <div>
      <div>
        <React.Fragment>
          <br />
          <br />
          <br />
          <br />

          <Row>
            <Col xs="1"></Col>
            <Col xs="7">
              {products.length === 0 ? (
                <Jumbotron>
                  <center>
                    <h3 className="display-3">No Products Posted</h3>
                  </center>
                </Jumbotron>
              ) : (
                <div style={{ "overflow-y": "scroll", height: "400px" }}>
                  {products.map((product) => {
                    return (
                      <React.Fragment id="container">
                        <ProductCard
                          productName={product.productName}
                          productImage={product.productImage}
                          description={product.description}
                          unitPrice={product.unitPrice}
                          quantity={product.quantity}
                          _id={product._id}
                        />
                        <br />
                      </React.Fragment>
                    );
                  })}
                </div>
              )}
            </Col>
            {getRole == "Admin" ? (
              <Col xs="3">
                <Card>
                  <CardBody>
                    <hr />
                    <CardText>
                      <p className="lead-small">
                        A blog is an online journal or informational website
                        displaying information in the reverse chronological
                        order, with the latest posts appearing first, at the
                        top. It is a platform where a writer or a group of
                        writers share their views on an individual subject. So
                        Create a New Blog and share your Ideas and Thoughts :D
                        !!
                      </p>
                    </CardText>
                    <hr />
                    <CardFooter>
                      <Button
                        size="sm"
                        color="info"
                        block
                        onClick={() => {
                          history.push("/addproduct");
                        }}
                      >
                        New Product
                      </Button>
                    </CardFooter>
                  </CardBody>
                </Card>
              </Col>
            ) : (
              <Col xs="3">
                <Card>
                  <CardBody>
                    <hr />
                    <CardText>
                      <p className="lead-small">
                        A blog is an online journal or informational website
                        displaying information in the reverse chronological
                        order, with the latest posts appearing first, at the
                        top. It is a platform where a writer or a group of
                        writers share their views on an individual subject. So
                        Create a New Blog and share your Ideas and Thoughts :D
                        !!
                      </p>
                    </CardText>
                    <hr />
                    <CardFooter>
                      <Button
                        size="sm"
                        color="info"
                        block
                        onClick={() => {
                          history.push(`/viewcart/${orderId}`);
                        }}
                      >
                        View Cart
                      </Button>
                    </CardFooter>
                  </CardBody>
                </Card>
              </Col>
            )}
          </Row>
        </React.Fragment>
      </div>
    </div>
  );
};

export default Home;
