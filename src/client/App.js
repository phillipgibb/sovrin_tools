import React, { Component} from 'react';
import { Container, Row, Col } from 'reactstrap';
import Header from './components/Header';
import ToolsBody from './components/ToolsBody';
let regeneratorRuntime =  require("regenerator-runtime");


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      didLookup: true,
      schemaLookup: false,
      credDefLookup: false
    };
  }
   onClickDidLookup = async (event) => {
    event.preventDefault();
    //this.lookupDid('RbTrA8BX6gZdEW9LUyFQv7');
    this.setState({ didLookup: true, loading: false, schemaLookup: false, credDefLookup: false });
  }

  onClickSchemaLookup = async (event) => {
    event.preventDefault();
    this.setState({ didLookup: false, loading: false, schemaLookup: true, credDefLookup: false });

  }

  onClickCredentialDefinitionLookup= async (event) => {
    event.preventDefault();
    this.setState({ didLookup: false, loading: false, schemaLookup: false, credDefLookup: true });

  }

  render() {
    return (
      <Container>
      <div>
        <Col>
        <Row>
          <Header onClickDidLookupSelect={this.onClickDidLookup} onClickSchemaLookupSelect={this.onClickSchemaLookup} onClickCredentialDefinitionLookupSelect={this.onClickCredentialDefinitionLookup}/>
        </Row>
        <Row>
          <ToolsBody showDidLookup={this.state.didLookup} showSchemaLookup={this.state.schemaLookup} showCredDefLookup={this.state.credDefLookup} />
        </Row>
        </Col>
      </div>
      </Container>
    );
  }
}

export default App;