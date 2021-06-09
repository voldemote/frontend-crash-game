import _                        from 'lodash';
import styles                   from './styles.module.scss';
import { getProfilePictureUrl } from '../../helper/ProfilePicture';
import Routes                   from '../../constants/Routes';
import { useHistory }           from 'react-router';
import ProfilePicture           from '../ProfilePicture';

const BetPlaceChatMessage = ({ user, tokenAmount, betId, eventId, outcome, dateString }) => {
    const history        = useHistory();
    const profilePicture = getProfilePictureUrl(_.get(user, 'profilePicture'));
    const userName       = _.get(user, 'name', 'Unknown');

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

    const renderText = () => {
        const userName = _.get(user, 'name');

        return <div>
            {userName} has bet <strong>{tokenAmount} EVNT</strong> on <strong>{outcome}</strong>.
        </div>;
    };

    return (
        <div
            className={styles.betPlaceChatMessage}
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

export default BetPlaceChatMessage;
