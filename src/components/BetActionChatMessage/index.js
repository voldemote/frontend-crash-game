import _               from 'lodash';
import styles          from './styles.module.scss';
import Routes          from '../../constants/Routes';
import { useHistory }  from 'react-router';
import ProfilePicture  from '../ProfilePicture';
import ChatMessageType from '../ChatMessageWrapper/ChatMessageType';

const BetActionChatMessage = ({ chatMessageType, user, tokenAmount, betId, eventId, outcome, dateString }) => {
    const history = useHistory();

    if (!user) {
        return null;
    }

    const onClick = () => {
        history.push(Routes.getRouteWithParameters(
            Routes.bet,
            {
                eventId,
                betId,
            },
        ));
    };

    const getMessage = () => {
        const userName = _.get(user, 'name');

        switch (chatMessageType) {
            case ChatMessageType.placeBet:
                return <>{userName} has bet <strong>{tokenAmount} EVNT</strong> on <strong>{outcome}</strong>.</>;

            case ChatMessageType.pulloutBet:
                return <>{userName} has sold <strong>{tokenAmount} EVNT</strong> of <strong>{outcome}</strong>.</>;
        }

        return null;
    };

    const renderText = () => {
        return <div>
            {getMessage()}
        </div>;
    };

    return (
        <div
            className={styles.betActionChatMessage}
            onClick={onClick}
        >
            <ProfilePicture
                user={user}
                width={20}
                height={20}
            />
            {renderText()}
            <small>
                {dateString}
            </small>
        </div>
    );
};

export default BetActionChatMessage;
