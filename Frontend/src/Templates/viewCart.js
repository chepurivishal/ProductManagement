import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
  Button,
  Row,
  NavLink,
  ButtonGroup,
  Input,
} from "reactstrap";
import urlConfig from "../config/urlsconfig.json";
import config from "../config/config.json";
import { Link, useHistory } from "react-router-dom";
import ProductCard from "./productCard";
const _ = require("lodash");
const getRole = localStorage.getItem("type");

const ViewCart = ({ match }) => {
  console.log("@@@@@@@@", getRole);
  let [orders, updateOrders] = useState("");
  const history = useHistory();
  const userId = localStorage.getItem("userId");
  let [products, setProducts] = useState([]);
  let [price, setPrice] = useState(0);

  const changeProduct = (e) => {
    setProducts((products = e.target.value));
  };
  const changePrice = (e) => {
    setPrice((price = e.target.value));
  };

  const token = localStorage.getItem("token");

  let url = `${config.baseURL}${urlConfig.editorder.uri}`;
  url = url.replace(":id", match.params.id);
  url = url.replace(":userId", userId);
  console.log("url", url);
  fetch(url, {
    method: urlConfig.editorder.method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
      type: getRole,
    },
  }).then((res) => {
    if (res.status === 200) {
      return res.json();
    }
  });
  const fetchOrder = () => {
    let url = `${config.baseURL}${urlConfig.getorder.uri}`;
    url = url.replace(":id", localStorage.getItem("orderId"));
    url = url.replace(":userId", userId);
    fetch(url, {
      method: urlConfig.getorder.method,
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
        setProducts(response.products);
        console.log("RESPONSE!!!!!!!!!!!!!!         ", response.products);
        var totalPrice = 0;
        response.products.map(function (product) {
          totalPrice = totalPrice + product.unitPrice;
        });
        console.log("TOTALPRICE!!!!!!          ", totalPrice);
        setPrice(totalPrice);
      });
  };
  useEffect(() => {
    fetchOrder(match.params.id);
  }, []);

  return (
    <div>
      <React.Fragment>
        {products.map((product) => {
          return (
            <React.Fragment id="container">
              <ProductCard
                productName={product.productName}
                productImage={product.productImage}
                description={product.description}
                unitPrice={product.unitPrice}
                quantity={product.quantity}
                added={true}
                _id={product._id}
              />
              <br />
              </React.Fragment>
              );
            })}
            <h5>Total Amount : {price}</h5>
      </React.Fragment>
    </div>
  );
};
export default ViewCart;
