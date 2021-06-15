import _                  from 'lodash';
import styles             from './styles.module.scss';
import { connect }        from 'react-redux';
import { getDefaultUser } from '../../helper/Profile';

const RelatedBetCard = ({ onClick, title, user, image }) => {
    const getEventCardStyle = () => {
        return {
            backgroundImage: 'url("' + image + '")',
        };
    };

    return (
        <div
            className={styles.relatedBetCard}
            onClick={onClick}
        >
            <div
                className={styles.eventCardBackgroundBlur}
                style={getEventCardStyle()}
            >
            </div>
            <div className={styles.eventCardBackground}>
            </div>
            <div>
                <span className={styles.organizer}>
                    {_.get(user, 'name')}
                </span>
                <span className={styles.title}>
                    {title}
                </span>
            </div>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    const { userId } = ownProps;
    let user         = getDefaultUser();

    if (userId) {
        user = _.get(
            state.user.users,
            userId,
        );
    }

    return {
        user: user,
    };
};

export default connect(
    mapStateToProps,
    null,
)(RelatedBetCard);
