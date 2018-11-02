import React, { Component} from 'react';
import {
  ControlLabel, FormControl, FormGroup, Button
} from 'react-bootstrap';
import axios from 'axios'
import {HighlightedJSON} from '../utils/highlightjson'
let regeneratorRuntime =  require("regenerator-runtime");
import '../assets/css/result.css'
export class NymLookup extends Component {
  constructor () {
    super()
    this.state = {
      did: '',
      loading: false,
      valid:true,
      dataReceived: false,
      data: ''
    }
  }

  getValidationState() {
    const length = this.state.did;
    if (length >= 16 & length <= 32) {
      this.setState({valid: true});
      return 'success';
    }else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
    return null;
  }

  handleChange = event => {
    this.setState({ did: event.target.value });
  }

  handleLookup = async event => {
    event.preventDefault();
    this.setState({
      loading: true, 
      dataReceived: false,
      data: ''
    })
    console.log(this.state)  
    const length = this.state.did.length;
    console.log(`Length: ${length}`)
    if (length >= 16 & length <= 32){
      console.log('looking up DID...')
      const _url = process.env.NODE_ENV === 'production' ? "/api/" : "http://localhost:5000/api/"
      try {
        console.log()
        const response = await axios.get(`${_url}nym/?did=${this.state.did}`, {
          timeout: 25000
        });
        this.setState({
          loading: false,
          dataReceived: response.data?true:false,
          data: response.data?response.data:''

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
          <ControlLabel>DID</ControlLabel>
          <FormControl 
            type="text"
            placeholder="sovrin did"
            onChange={this.handleChange}
            disabled={!this.state.valid || this.state.loading}/>
        </FormGroup>
        <Button disabled={!this.state.valid || this.state.loading} type="submit">Lookup</Button>
      </form>
      {this.state.dataReceived && <HighlightedJSON {...this.state.data}/>}
      </div>
    )
  }
}

export default NymLookup;