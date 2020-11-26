import React, { useState } from "react";
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
const _ = require("lodash");
const getRole = localStorage.getItem("type");

const ProductCard = (props) => {
  let [order, setOrder] = useState({});
  let [added, isAdded] = useState(false);
  console.log("isAddes", isAdded);

  const history = useHistory();
  const userId = localStorage.getItem("userId");
  let [products, updateProducts] = useState([]);

  const token = localStorage.getItem("token");

  let url = `${config.baseURL}${urlConfig.editproduct.uri}`;
  url = url.replace(":id", props._id);
  url = url.replace(":userId", userId);
  console.log("url", url);
  fetch(url, {
    method: urlConfig.editproduct.method,
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
  const addToCart = () => {
    console.log("ORDER!!!!!!!!!!!         ", localStorage.getItem("orderId"));
    if (
      !localStorage.getItem("orderId") ||
      localStorage.getItem("orderId") === ""
    ) {
      let body = JSON.stringify({
        userId: userId,
        products: [props._id],
        price: props.unitPrice,
      });
      let url = `${config.baseURL}${urlConfig.addorder.uri}`;
      url = url.replace(":userId", userId);
      fetch(url, {
        method: urlConfig.addorder.method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
          type: getRole,
        },
        body: body,
      })
        .then((res) => {
          if (res.status === 200) {
            console.log("ressssssssssssssssssssssssssssssssssss", res);
            return res.json();
          }
        })
        .then((response) => {
          console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", response._id);
          localStorage.setItem("orderId", response._id);
          let _body = JSON.parse(body);
          _body._id = response._id;
          console.log("BODY!!!!!!!!!!!         ", typeof _body);
          setOrder(_body);
        });
    } else {
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
          if (res.status == 200) {
            return res.json();
          }
        })
        .then((response) => {
          response.products = _.map(response.products, "_id");
          response.products.push(props._id);
          setOrder(response);
          console.log("111111111111111111111111111111", response);
          let uri = `${config.baseURL}${urlConfig.editorder.uri}`;
          uri = uri.replace(":id", localStorage.getItem("orderId"));
          uri = uri.replace(":userId", userId);
          editOrder(uri, response);
          isAdded(true);
        });
    }
  };

  const removeFromCart = () => {
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
        if (res.status == 200) {
          return res.json();
        }
      })
      .then((response) => {
        response.products = _.map(response.products, "_id");
        _.remove(response.products, function (id) {
          return id === props._id;
        });
        let uri = `${config.baseURL}${urlConfig.editorder.uri}`;
        uri = uri.replace(":id", localStorage.getItem("orderId"));
        uri = uri.replace(":userId", userId);
        editOrder(url, response);
        window.location.reload(false);

      });
  };
  const editOrder = (url, response) => {
    console.log("EDIT ORDER!!!!!!!!!!!        ", order);
    fetch(url, {
      method: urlConfig.editorder.method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
        type: getRole,
      },
      body: JSON.stringify(response),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((response) => {
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", response);
      });
  };

  const deleteProduct = (id) => {
    let url = `${config.baseURL}${urlConfig.deleteproduct.uri}`;
    url = url.replace(":id", id);
    url = url.replace(":userId", userId);
    fetch(url, {
      method: urlConfig.deleteproduct.method,
      headers: {
        "Context-Type": "application/json",
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
        let _products = _.clone(products);
        _.remove(_products, (product) => {
          if (product._id === id) return true;
        });
        updateProducts((products = _products));
        window.location.reload(false);
      });
  };
  return (
    <div>
      <React.Fragment>
        <Card>
          <CardBody>
            <CardImg width="200px" height="200px" src={props.productImage} />
            <hr />
            <CardTitle>
              <h5 className="display-7"> Product Name : {props.productName}</h5>
            </CardTitle>
            <hr />
            <CardSubtitle>
              <h6 className="display-8"> Description : {props.description}</h6>
            </CardSubtitle>
            <hr />
            <CardText>
              <p className="lead-small">Price : Rs {props.unitPrice} /-</p>
            </CardText>
            <hr />
            <CardText>
              <p className="lead-small">Quantity : {props.quantity} </p>
            </CardText>
            <h4>
              {getRole == "Admin" ? (
                <ButtonGroup>
                  <Button
                    onClick={() => history.push(`/editproduct/${props._id}`)}
                  >
                    Edit
                  </Button>

                  <Button onClick={() => deleteProduct(props._id)}>
                    Delete
                  </Button>
                </ButtonGroup>
              ) : (
                <React.Fragment />
              )}
              {props.added || added ? (
                <Button onClick={() => removeFromCart()}>
                  Remove from cart
                </Button>
              ) : (
                <Button onClick={() => addToCart()}>Add to cart</Button>
              )}
            </h4>
            <p></p>
          </CardBody>
        </Card>
      </React.Fragment>
    </div>
  );
};
export default ProductCard;
