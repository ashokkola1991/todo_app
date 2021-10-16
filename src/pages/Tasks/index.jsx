import { Alert, Table, Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useState, useEffect } from 'react'
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PieChart from 'react-simple-pie-chart';

import { addTask, chnageTaskStatus } from '../../store/actions/product';


function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function Tasks() {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state);
  const [modal, setModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const { state } = location;

  const onSubmit = (e) => {
    e.preventDefault();
    const el = e.target.elements;
    const newTask = {
      id: uuidv4(),
      taskName: el[1].value,
      state: 'new'
    }
    dispatch(addTask(state.id, newTask));
    toggle();
  }

  const toggle = () => setModal(!modal);

  useEffect(() => {
    for (let product of products) {
      if (product.id === state?.id) {
        setTasks(product.tasks);
        break;
      }
    }
  }, [products, state])

  const newTasks = tasks.filter(item => item.state === 'new');
  const pendingTasks = tasks.filter(item => item.state === 'pending');
  const doneTasks = tasks.filter(item => item.state === 'done');

  const renderTable = (data) => (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>Task Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {
          data.map((item, i) => (
            <tr>
              <th scope="row">{i + 1}</th>
              <td>{item.taskName}</td>
              <td>
                <Input type="select" value={item.state} onChange={(e) => {
                  dispatch(chnageTaskStatus(state?.id, item.id, e.target.value))
                }}>
                  <option>select</option>
                  <option>new</option>
                  <option>pending</option>
                  <option>done</option>
                </Input>
              </td>
            </tr>
          ))
        }
      </tbody>
    </Table>
  )

  const renderPieChart = () => {
    return (<div className="row">
      <div className="col-md-3">
        <PieChart
          slices={[
            {
              color: '#d4edda',
              value: newTasks.length,
            },
            {
              color: '#f5c6cb',
              value: pendingTasks.length,
            }, {
              color: '#ffeeba',
              value: doneTasks.length,
            }
          ]}
        />
      </div>
      <div className="col-md-6">
        <Alert color="success">
          New: <b>{newTasks.length}</b>
        </Alert>
        <Alert color="danger">
          pending: <b>{pendingTasks.length}</b>
        </Alert>
        <Alert color="warning">
          done: <b>{doneTasks.length}</b>
        </Alert>
      </div>
    </div>)
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6"><h1>Tasks</h1></div>
        <div className="col-md-6">
          <Button color="primary" onClick={toggle}>Add</Button>{' '}
          <Button color="primary" onClick={() => history.push('/')}>back to products</Button>
        </div>
      </div>
      <h4>{'Chart'}</h4>
      {renderPieChart()}
      <h4>{'New'}</h4>
      {renderTable(newTasks)}

      <h4>{'pending'}</h4>
      {renderTable(pendingTasks)}
      <h4>{'done'}</h4>
      {renderTable(doneTasks)}

      <Modal isOpen={modal} toggle={toggle} >
        <Form onSubmit={onSubmit}>
          <ModalHeader toggle={toggle}>Add task</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="task">Task</Label>
              <Input type="text" name="task" id="task" placeholder="Enter task name" />
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

export default Tasks;
