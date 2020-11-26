import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from "reactstrap";
import { useHistory } from "react-router-dom";

import urlConfig from "../config/urlsconfig.json";
import config from "../config/config.json";

const AddProduct = () => {
  let [products, setProducts] = useState([]);
  let [productName, setProductName] = useState("");
  let [productImage, setProductImage] = useState("");
  let [description, setDescription] = useState("");
  let [quantity, setQuantity] = useState("");
  let [unitPrice, setUnitPrice] = useState("");

  const history = useHistory();

  const changeProductName = (e) => {
    setProductName((productName = e.target.value));
  };
  const changeProductImage = (e) => {
    setProductImage((productImage = e.target.value));
  };
  const changeDescription = (e) => {
    setDescription((description = e.target.value));
  };
  const changeQuantity = (e) => {
    setQuantity((quantity = e.target.value));
  };
  const changeUnitPrice = (e) => {
    setUnitPrice((unitPrice = e.target.value));
  };

  const userId = localStorage.getItem("userId");
  const onSubmit = () => {
    let body = JSON.stringify({
      userId: userId,
      productName: productName,
      productImage: productImage,
      description: description,
      quantity: quantity,
      unitPrice: unitPrice,
    });
    const token = localStorage.getItem("token");
    const getRole = () => localStorage.getItem("type");

    let url = `${config.baseURL}${urlConfig.addproduct.uri}`;
    url = url.replace(":userId", userId);
    fetch(url, {
      method: urlConfig.addproduct.method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `bearer ${token}`,
        "type": getRole(),
      },
      body: body,
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((response) => {
        history.push("/");
      });
  };

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <Row>
        <Col xs="1"></Col>
        <Col xs="10">
          <Card>
            <CardBody>
              <Form>
                <FormGroup>
                  <InputGroup size="sm">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>PRODUCT NAME</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      size="sm"
                      type="text"
                      name="title"
                      id="title"
                      onChange={changeProductName}
                      autoComplete="off"
                    />
                  </InputGroup>
                  <br />
                  <InputGroup size="sm">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>PRODUCT IMAGE</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      size="sm"
                      type="subtitle"
                      name="subtitle"
                      id="subtitle"
                      onChange={changeProductImage}
                    />
                  </InputGroup>
                  <br />
                  <InputGroup size="sm">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>DESCRIPTION</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      size="sm"
                      type="text"
                      name="url"
                      id="url"
                      onChange={changeDescription}
                    />
                  </InputGroup>
                  <br />
                  <InputGroup size="sm">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>UNIT PRICE</InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  <Input
                    size="sm"
                    type="number"
                    name="description"
                    id="description"
                    onChange={changeUnitPrice}
                  />
                  <br />
                  <InputGroup size="sm">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>QUANTITY</InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  <Input
                    size="sm"
                    type="number"
                    name="description"
                    id="description"
                    onChange={changeQuantity}
                  />

                  <br />
                  <Button color="info" size="sm" onClick={onSubmit}>
                    SUBMIT
                  </Button>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Col>
        <Col xs="1"></Col>
      </Row>
    </div>
  );
};
export default AddProduct;
