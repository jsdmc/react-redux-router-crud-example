import React, { PropTypes, Component } from 'react/addons';
import classnames from 'classnames'
import reactMixin from 'react-mixin';
import ValidationMixin from 'react-validation-mixin';
import Joi from 'joi';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ContractActions from '../../actions/ContractActions';

@connect((state, props) => {
  //TODO: move this to decorator or so
  if (props.params && props.params.id){
    let contract = state.contracts.items.filter(c => c.id == props.params.id);
    if (contract.length == 1)
      return { 
        contract : contract[0],
        isEdit: true
      };
  }
  return {};
})
@reactMixin.decorate(ValidationMixin)
//TODO: modify linked state mixin to work with nested properties
@reactMixin.decorate(React.addons.LinkedStateMixin)
export default class ContractForm extends Component {

  initialState = {
    id: null,
    description: null,
    finished: null
  };

  constructor(props, context) {
    super(props, context);
    
    this.actions = bindActionCreators(ContractActions, this.props.dispatch);

    //TODO: modify validation for nested properties
    this.validatorTypes = {
      id: Joi.number().required().label('Contract Id'),
      description: Joi.when('finished', { is: true, then: Joi.string().min(5).max(25).required() }).label('Description'),
      finished: Joi.boolean().label('Finished')
    }

    this.state = this.props.contract ? this.props.contract : this.initialState;
  }

  renderHelpText(message) {
    return (
      <span className="help-block">{message}</span>
    );
  }

  getClasses(field) {
    return classnames({
      'form-group': true,
      'has-error': !this.isValid(field)
    });
  }

  handleReset(event) {
    event.preventDefault();
    this.clearValidations();
    this.setState(this.initialState);
  }

  handleSubmit(event) {
    event.preventDefault();
    var onValidate = function(error, validationErrors) {
      if (error) {
        this.setState({
          feedback: 'Form is invalid'
        });
      } else {
        this.setState({
          feedback: 'Form is valid. Ready to send to action creator'
        });

        //TODO: here we need to take only state props related to contract object
        if (this.props.isEdit){
          this.actions.editContract(this.state);
        } else {
          this.actions.addContract(this.state);
        }
      }
    }.bind(this);
    this.validate(onValidate);
  }

  render() {
    const submitBtnLbl = this.props.isEdit ? 'Edit' : 'Create';
    return (
      <section className='row'>
        <Link to="/contracts">
          Contracts list
        </Link>
        <h3>Contract</h3>
        <form onSubmit={::this.handleSubmit} className='form-horizontal'>
          <fieldset>
            <div className={this.getClasses('id')}>
              <label htmlFor='id'>Id</label>
              <input type='text' id='id' valueLink={this.linkState('id')} onBlur={this.handleValidation('id')} 
                disabled={this.props.isEdit} className='form-control' placeholder='ID' />
              {this.getValidationMessages('id').map(this.renderHelpText)}
            </div>
            <div className={this.getClasses('description')}>
              <label htmlFor='description'>Description</label>
              <input type='text' id='description' valueLink={this.linkState('description')} onBlur={this.handleValidation('description')} className='form-control' placeholder='Description' />
              {this.getValidationMessages('description').map(this.renderHelpText)}
            </div>
            <div className={this.getClasses('finished')}>
              <label htmlFor='finished'>Is finished</label>
              <input type='text' id='finished' valueLink={this.linkState('finished')} onBlur={this.handleValidation('finished')}  className='form-control' />
              {this.getValidationMessages('finished').map(this.renderHelpText)}
            </div>
            <div className='form-group'>
              <h3>{this.state.feedback}</h3>
            </div>
            <div className='text-center form-group'>
              <button type='submit' className='btn btn-large btn-primary'>{submitBtnLbl}</button>
              {' '}
              <button onClick={::this.handleReset} className='btn btn-large btn-info'>Reset</button>
            </div>
          </fieldset>
        </form>
      </section>
    );
  }
}
