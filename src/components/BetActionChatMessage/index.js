import _               from 'lodash';
import styles          from './styles.module.scss';
import Routes          from '../../constants/Routes';
import { useHistory }  from 'react-router';
import ProfilePicture  from '../ProfilePicture';
import ChatMessageType from '../ChatMessageWrapper/ChatMessageType';

const BetActionChatMessage = ({ chatMessageType, user, message, dateString }) => {
    const history = useHistory();
    const betId   = _.get(message, 'betId');
    const eventId = _.get(message, 'eventId');

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
        const userName    = _.get(user, 'name');
        const tokenAmount = _.get(message, 'amount');
        const outcome     = _.get(message, 'outcome');

        switch (chatMessageType) {
            case ChatMessageType.createBet:
                return <>{userName} created trade <strong>{tokenAmount} EVNT</strong> on <strong>{outcome}</strong>.</>;

            case ChatMessageType.placeBet:
                return <>{userName} bought <strong>{tokenAmount} EVNT</strong> of <strong>{outcome}</strong>.</>;

            case ChatMessageType.pulloutBet:
                return <>{userName} sold <strong>{outcome}</strong> for <strong>{tokenAmount} EVNT</strong>.</>;
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
