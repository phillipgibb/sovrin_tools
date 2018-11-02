import React, { Component} from 'react';
import {
  ControlLabel, FormControl, FormGroup, Button
} from 'react-bootstrap';
import axios from 'axios'
import '../assets/css/result.css';
let regeneratorRuntime =  require("regenerator-runtime");
import {HighlightedJSON} from '../utils/highlightjson'
export class CredDefLookup extends Component {
  constructor () {
    super()
    this.state = {
      credDefId: '',
      loading: false,
      valid:true,
      dataReceived: false,
      data: '',
      error:false
    }
  }

  getValidationState() {
    const length = this.state.credDefId;
    if (length >= 1 & length <= 100) {
      this.setState({valid: true});
      return 'success';
    }else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
    return null;
  }

  handleChange = event => {
    this.setState({ credDefId: event.target.value });
  }

  handleLookup = async event => {
    event.preventDefault();
    this.setState({
      loading: true, 
      dataReceived: false,
      data: ''
    })
    console.log(this.state)  
    const length = this.state.credDefId.length;
    console.log(`Length: ${length}`)
    if (length >= 1 & length <= 60){
      console.log('looking up credential definition...')
      const _url = process.env.NODE_ENV === 'production' ? "/api/" : "http://localhost:5000/api/"
      try {
        const response = await axios.get(`${_url}credentialdefinition/?cdid=${this.state.credDefId}`, {
          timeout: 35000
        });
        
        this.setState({
          loading: false,
          dataReceived: response.data?true:false,
          data: response.data?response.data:'',
          error: response.data.includes('Error')
        })
        
      }catch(err){
        console.log(err); 
        this.setState({loading: false});
      }
    }else{
      this.setState({valid: false});
    }
  } 


  render() {
    return ( 
      <div>
        <form onSubmit={this.handleLookup}>
          <FormGroup validationState={this.getValidationState()}>
            <ControlLabel>CREDENTIAL DEFINITION ID</ControlLabel>
            <FormControl 
              type="text"
              placeholder="Sovrin Credential Definition Id"
              onChange={this.handleChange}
              disabled={!this.state.valid || this.state.loading}/>
          </FormGroup>
          <Button disabled={!this.state.valid || this.state.loading} type="submit">Lookup</Button>
        </form>
        {(this.state.dataReceived && !this.state.error) &&<HighlightedJSON {...this.state.data}/>}
      </div>
    )
  }
}

export default CredDefLookup;