import cx from 'classnames';
import moment from 'moment';
import React, { Component } from 'react';
import Calendar from './Calendar';
import Time from './Time';


export default class InputMoment extends Component {
  static defaultProps = {
    prevMonthIcon: 'ion-ios-arrow-left',
    nextMonthIcon: 'ion-ios-arrow-right'
  };

  state = {
    tab: 0
  };

  handleClickTab = (e, tab) => {
    e.preventDefault();
    this.setState({ tab: tab });
  };

  handleSave = e => {
    e.preventDefault();
    if (this.props.onSave) this.props.onSave();
  };
  handleCancel = e => {
  		 e.preventDefault();
  		 if (this.props.onCancel) this.props.onCancel();
  };
  render() {
    const { tab } = this.state;
    const {
      moment: m,
      className,
      prevMonthIcon,
      nextMonthIcon,
      onSave,
      ...props
    } = this.props;
    const cls = cx('m-input-moment', className);

    return (
      <div className={cls} {...props}>
        <div className="options">
          <button
            type="button"
            className={cx('ion-calendar im-btn btn btn-btn', { 'is-active btn btn-btn btn-primary waves-effect': tab === 0 })}
            onClick={e => this.handleClickTab(e, 0)}
          >
            Date
          </button>
          <button
            type="button"
            className={cx('ion-clock im-btn btn btn-btn', { 'is-active btn btn-btn btn-primary waves-effect': tab === 1 })}
            onClick={e => this.handleClickTab(e, 1)}
          >
            Time
          </button>
        </div>

        <div className="tabs">
          <Calendar
            className={cx('tab', { 'is-active': tab === 0 })}
            moment={m}
            onChange={this.props.onChange}
            prevMonthIcon={this.props.prevMonthIcon}
            nextMonthIcon={this.props.nextMonthIcon}
          />
          <Time
            className={cx('tab', { 'is-active': tab === 1 })}
            moment={m}
            onChange={this.props.onChange}
          />
        </div>

        <button
          type="button"
          className="im-btn btn-save ion-checkmark btn btn-btn btn-primary waves-effect"
          onClick={this.handleSave}
        >
          Save
        </button>
        <button
          type="button"
          className="im-btn btn-save btn btn-btn btn-primary waves-effect"
          onClick={this.handleCancel}
        >
          Cancel
        </button>
      </div>
    );
  }
}