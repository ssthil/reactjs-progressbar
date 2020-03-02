import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import {
  Button,
  ButtonToolbar,
  Col,
  Container,
  Form,
  ProgressBar,
  Row,
} from 'react-bootstrap';
import './App.css';
import Header from './components/Header';

function App() {
  const [buttons, setButtons] = useState([]);
  const [bars, setBars] = useState([]);
  const [limit, setLimit] = useState(0);

  const [dropDownValue, setDropDownValue] = useState(0);
  const [percentage, setPercentage] = useState(0);

  const url = 'http://pb-api.herokuapp.com/bars';

  async function getData() {
    const response = await fetch(url);
    const data = await response.json();
    setButtons(data.buttons);
    setBars(data.bars);
    setPercentage(parseInt(data.bars[0]));
    setLimit(data.limit);
  }
  /** data */
  useEffect(() => {
    getData();
  }, []);

  function percentageCalculate(barValue) {
    return Math.round((parseInt(barValue) / Number(limit)) * 100);
  }

  const selectedDropDownValue = ev => {
    setDropDownValue(ev.target.value);
  };

  return (
    <Container fluid>
      <Header title="Progress bar - Reactjs" />
      <div className="container">
        <Row>
          <Col lg={3} sm={12} className="margin-bottom">
            <Form>
              <Form.Group>
                <Form.Control
                  as="select"
                  onChange={selectedDropDownValue}
                  defaultValue={dropDownValue}
                >
                  <option value={0}>Select</option>
                  {bars.map((val, index) => (
                    <option key={index} value={val}>
                      Progressbar {index + 1}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form>
          </Col>
          <Col lg={9} sm={12}>
            <ButtonToolbar>
              {buttons.map((button, index) => (
                <Button
                  key={index}
                  variant={button > 0 ? 'outline-primary' : 'outline-danger'}
                  className="button-align"
                  onClick={e =>
                    setPercentage(percentage => percentage + parseInt(button))
                  }
                >
                  {button}
                </Button>
              ))}
            </ButtonToolbar>
          </Col>
        </Row>

        <br />
        <Row>
          {bars.map((barVal, index) => (
            <Col sm={12} className="progressbar-container" key={index}>
              {/* <ProgressBar
                animated
                now={
                  percentage > 0 ? Math.round((percentage / limit) * 100) : 0
                }
                label={`${
                  percentage > 0 ? Math.round((percentage / limit) * 100) : 0
                }%`}
                striped
                variant={
                  Math.round((percentage / limit) * 100) >= 100
                    ? 'danger'
                    : 'info'
                }
                className="bar"
              /> */}
              <ProgressBar
                animated
                now={
                  percentageCalculate(barVal) > 0
                    ? percentageCalculate(barVal)
                    : 0
                }
                label={`${
                  percentageCalculate(barVal) > 0
                    ? percentageCalculate(barVal)
                    : 0
                }%`}
                striped
                variant={percentageCalculate(barVal) >= 100 ? 'danger' : 'info'}
                className="bar"
              />
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
}

export default App;
