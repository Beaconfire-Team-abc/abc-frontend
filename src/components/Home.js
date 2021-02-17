import React from 'react';
import {Jumbotron, Container, Alert} from 'react-bootstrap'

function Home (props) {
    return (
        <div>
          <Container>
            <Jumbotron>
              <h1>Welcome to Employee Timesheet System</h1>
            </Jumbotron>
            {
                props.isAuthed ?
                <div>
                    <Alert variant='success'>
                        You already logged in!
                    </Alert>
                </div>:
                <div>
                    <Alert variant='danger'>
                        Please login first.
                    </Alert>
                </div>
            }
          </Container>
        </div>
      );
}

export default Home;