import React, {Component} from 'react';
import Panel from "../DOMElements/Panel/Panel";
import LabeledInput from "../DOMElements/LabeledInput/LabeledInput";
import Button from "../DOMElements/Button/Button";
import '../DOMElements/Margin/Margin.css';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import Link from "../DOMElements/Link/Link";
import * as Auth0 from "auth0-web";
import {getRestFlexUrl} from "../RestFlex/RestFlex";

class EntityForm extends Component {
  componentWillReceiveProps(nextProps) {
    this.setState({
      entityData: nextProps.entity || {}
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      entityName: this.props.entityName,
      entityData: this.props.entity
    };
    this.handleChange = handleChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.componentDidMount = componentDidMount.bind(this);
  }

  async onClick() {
    const missingProperties = this.props.inputs
      .filter(input => input.required)
      .filter(requiredInput => !this.state.entityData[requiredInput.field])
      .map(missingInput => ({
        field: missingInput.field,
        label: missingInput.label
      }));

    if (missingProperties.length > 0) {
      console.log(missingProperties);
      return;
    }

    await onClick(this.state.entityName, this.state.entityData);
    this.props.history.push(`/${this.state.entityName}`);
  }

  render() {
    return (
      <Panel>
        <h2>{this.props.title}</h2>
        {this.props.inputs.map(input => (
          <LabeledInput label={input.label} placeholder={input.placeholder} type={input.type}
                        value={this.state.entityData[input.field]} onChange={this.handleChange(input.field)}
                        field={input.field} key={input.field}/>
        ))}
        <Button onClick={() => (this.onClick())} text="Save" className='margin-top'/>
        <Link text="Cancel" to={'/' + this.state.entityName}/>
      </Panel>
    );
  }
}

export default withRouter(props => <EntityForm {...props}/>);

async function componentDidMount() {
  const _id = this.state.entityData._id;
  const restFlexUrl = getRestFlexUrl(this.props.entityName);
  if (_id) {
    const config = {
      url: `${restFlexUrl}/${_id}`,
      headers: {'Authorization': 'Bearer ' + Auth0.getExtraToken(this.props.entityName)}
    };
    const response = await axios(config);
    this.props.refreshEntity(response.data);
  }
}

async function onClick(entityName, entity) {
  if (entity.hasOwnProperty('_id') && entity._id === null) {
    delete entity._id;
  }
  const restFlexUrl = getRestFlexUrl(entityName);
  const config = {
    method: entity._id ? 'put' : 'post',
    url: `${restFlexUrl}/${entity._id || ''}`,
    data: entity,
    headers: {'Authorization': 'Bearer ' + Auth0.getExtraToken(entityName)}
  };
  return await axios(config);
}

function handleChange(property) {
  return (newValue) => {
    this.setState({
      entityData: {
        ...this.state.entityData,
        [property]: newValue
      }
    });
  }
}
