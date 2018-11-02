import React, { Component } from 'react';

import DidLookup from './DidLookup';
import SchemaLookup from './SchemaLookup';
import CredDefLookup from './CredDefLookup';
let regeneratorRuntime =  require("regenerator-runtime");

class ToolsBody extends Component {
  constructor (props) {
    super(props);
     this.state = {
       didLookup: this.props.showDidLookup,
       schemaLookup: this.props.showSchemaLookup,
       credDefLookup: this.props.showCredDefLookup
     };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ 
      didLookup: nextProps.showDidLookup,
      schemaLookup: nextProps.showSchemaLookup,
      credDefLookup: nextProps.showCredDefLookup
    });
  }

  render() {
    return ( 
      <div>
        { this.state.didLookup && <DidLookup /> }
        { this.state.schemaLookup && <SchemaLookup /> }
        { this.state.credDefLookup && <CredDefLookup /> }
      </div>

    );
  }
}

export default ToolsBody;