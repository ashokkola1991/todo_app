import { Table, Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useState } from 'react'
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from '../../store/actions/product';


function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function Products() {
  const history = useHistory();
  const dispatch = useDispatch();
  const {products} = useSelector((state) => state);
  const [modal, setModal] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    const el = e.target.elements;
    dispatch(addProduct({
      id: uuidv4(),
      productName: el[1].value,
      tasks: []
    }))
    toggle();
  }

  const toggle = () => setModal(!modal);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6"><h1>Products</h1></div>
        <div className="col-md-6"><Button color="primary" onClick={toggle}>Add</Button></div>
      </div>

      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            products.map((item, i) => (
              <tr>
                <th scope="row">{i+1}</th>
                <td>{item.productName}</td>
                <td><Button size="sm" color="info" onClick={() => {
                  history.push('tasks', item)
                }}>Tasks</Button></td>
              </tr>
            ))
          }
        </tbody>
      </Table>
      <Modal isOpen={modal} toggle={toggle} >
        <Form onSubmit={onSubmit}>
          <ModalHeader toggle={toggle}>Modal title</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="product">Product</Label>
              <Input type="text" name="product" id="product" placeholder="Enter product name" />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit">Submit</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
}

export default Products;
