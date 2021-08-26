import React from 'react';
import FixedIconButton from '../FixedIconButton';
import IconType from '../Icon/IconType';
import PopupTheme from '../Popup/PopupTheme';
import { connect } from 'react-redux';
import { PopupActions } from '../../store/actions/popup';

const FixedEventCreationIconButton = ({ showPopup, eventId, isAdmin }) => {
  if (!isAdmin) {
    return null;
  }

  const eventCreationButtonClicked = () => {
    const options = {};

    if (eventId) {
      options.eventId = eventId;
    }

    showPopup(PopupTheme.betCreation, options);
  };

  return (
    <FixedIconButton
      // TODO text={'Create Trade'}
      onClick={eventCreationButtonClicked}
      iconType={IconType.bet}
    />
  );
};

const mapStateToProps = state => {
  return {
    isAdmin: state.authentication.admin,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showPopup: (popupType, options) => {
      dispatch(
        PopupActions.show({
          popupType,
          options,
        })
      );
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FixedEventCreationIconButton);
