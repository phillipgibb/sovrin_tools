import React, { Component } from 'react';
import { Navbar, Nav, NavItem} from 'react-bootstrap';
let regeneratorRuntime =  require("regenerator-runtime");

class Header extends Component {

  constructor (props) {
    super(props);
     this.state = {
       didLookup: this.props.onClickDidLookupSelect,
       schemaLookup: this.props.onClickSchemaLookupSelect,
       credDefLookup: this.props.onClickCredentialDefinitionLookupSelect
     };
  }

  render() {
    return ( 
    
      <Navbar inverse collapseOnSelect>
        <Navbar.Toggle right="true" onClick={this.toggle} />
        <Navbar.Brand href="#brand">Sovrin Lookup</Navbar.Brand>
          <Nav>
            <NavItem onClick={this.state.didLookup} href="#">Lookup DID</NavItem>
            <NavItem onClick={this.state.schemaLookup} href="#">Lookup Schema</NavItem>
            <NavItem onClick={this.state.credDefLookup} href="#">Lookup Credential Definition</NavItem>
          </Nav>
      </Navbar>
    );
  }
}


export default Header;