import React from 'react';
import { navigate } from "gatsby";
import { Button, FormGroup, Label, Input  } from 'reactstrap';
import FAPIcon from "../FontAwesomePro"
import Form from './Form';


class SearchInput extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.handleClick = this.handleClick.bind(this);
    this.handleString = this.handleString.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  state = {
    navigate: false,
    query: null,
    textEntered: false,
    value: ''
  };

  handleClick(e) {
    const {query} = this.state;
    e.preventDefault();
    navigate(`/search?q=${query}`)
  }
  handleString(e) {
    e.preventDefault();
    this.setState({
      textEntered: e.target.value ? true : false,
      value: e.target.value,
      query: e.target.value
    });
  }
  handleReset(e) {
    e.preventDefault();
    this.setState({
      query: null,
      textEntered: false,
      value: ''
    });
  }

  render() {    
    const placeholder = this.props.placeholder ? this.props.placeholder : "Search";
    const className = this.props.className ? this.props.className : "";

    let reset = this.state.textEntered ? <Button type="reset" id="reset" onClick={ this.handleReset }><FAPIcon icon="times" height="28" width="28"/></Button> : false;

    return (

      <Form className={className} onSubmit={this.handleClick}>
        <FormGroup>
          <Label for="search" className="sr-only" >Search</Label>
          <Input type="text" name="search" id="search" placeholder={placeholder} value={this.state.value} onChange={ this.handleString } bsSize="lg"/>
          {reset}
          <Button type="submit" id="submit">GO <FAPIcon icon="long-arrow-right" height="24" width="24"/></Button>
        </FormGroup>
      </Form>

    );
  }
}
export default SearchInput;
