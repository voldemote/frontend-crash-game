import React            from 'react';
import IconType         from '../Icon/IconType';
import FixedIconButton  from '../FixedIconButton';
import PopupTheme       from '../Popup/PopupTheme';
import { PopupActions } from '../../store/actions/popup';
import { connect }      from 'react-redux';

const FixedEventCreationIconButton = ({ showPopup, eventId }) => {
    const eventCreationButtonClicked = () => {
        const options = {};

        if (eventId) {
            options.eventId = eventId;
        }

        showPopup(
            PopupTheme.betCreation,
            options,
        );
    };

    return (
        <FixedIconButton
            text={'Create Trade'}
            onClick={eventCreationButtonClicked}
            iconType={IconType.bet}
        />
    );
};

const mapDispatchToProps = (dispatch) => {
          return {
              showPopup: (popupType, options) => {
                  dispatch(PopupActions.show({
                      popupType,
                      options,
                  }));
              },
          };
      }
;

export default connect(
    null,
    mapDispatchToProps,
)(FixedEventCreationIconButton);

