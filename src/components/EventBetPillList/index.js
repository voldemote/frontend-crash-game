import React               from 'react';
import _                   from 'lodash';
import classNames          from 'classnames';
import Divider             from '../Divider';
import HotBetBadge         from '../HotBetBadge';
import ProfileContainer    from '../ProfileContainer';
import styles              from './styles.module.scss';
import TimeLeftCounter     from '../TimeLeftCounter';
import { connect }         from 'react-redux';
import { getDefaultUser }  from '../../helper/Profile';
import { useState }        from 'react';
import ChoiceSelector      from '../ChoiceSelector';
import ChoiceSelectorTheme from '../ChoiceSelector/ChoiceSelectorTheme';
import Button              from '../Button';
import TokenNumberInput    from '../TokenNumberInput';
import { useEffect }       from 'react';
import { BetActions }      from '../../store/actions/bet';
import HighlightType       from '../Highlight/HighlightType';
import { useIsMount }      from '../hoc/useIsMount';
import { useHasMounted }   from '../hoc/useHasMounted';
import SleepHelper         from '../../helper/Sleep';
import Routes              from '../../constants/Routes';
import { useHistory }      from 'react-router';
import ClickEvent          from '../../helper/ClickEvent';
import EventBetPill        from '../EventBetPill';
import Icon                from '../Icon';
import IconType            from '../Icon/IconType';
import IconTheme           from '../Icon/IconTheme';

const EventBetPillList = ({ event, bets }) => {
    const betPillPreviewCount             = 3;
    const [showAllPills, setShowAllPills] = useState(false);

    const onShowAllClick = () => {
        setShowAllPills(true);
    };

    const renderBetPills = () => {
        const eventId    = _.get(event, '_id');
        let betsToRender = bets;

        if (!showAllPills) {
            betsToRender = _.slice(bets, 0, betPillPreviewCount);
        }

        return _.map(
            betsToRender,
            (bet, betIndex) => {
                return (
                    <EventBetPill
                        key={betIndex}
                        userId={bet.creator}
                        bet={bet}
                        eventId={eventId}
                    />
                );
            },
        );
    };

    const renderShowAllBetsText = () => {
        const size = _.size(bets);

        if (!showAllPills && size > betPillPreviewCount) {
            const countDifference = size - 3;

            return (
                <div
                    onClick={onShowAllClick}
                    className={styles.showAllPillsText}
                >
                    Show + {countDifference} event trades
                    <Icon
                        className={styles.showAllDropDownIcon}
                        iconType={IconType.arrowDown}
                    />
                </div>
            );
        }

        return null;
    };

    return (
        <
        >
            {renderBetPills()}
            {renderShowAllBetsText()}
        </>
    );
};

export default EventBetPillList;
