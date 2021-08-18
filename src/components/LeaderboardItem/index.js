import style                    from './styles.module.scss';
import medalGold                from "../../data/icons/medal-gold.png";
import medalSilver              from "../../data/icons/medal-silver.png";
import medalBronze              from "../../data/icons/medal-bronze.png";
import { formatToFixed }        from 'helper/FormatNumbers';
import classNames from 'classnames';

const LeaderboardItem = ({user, isCurrentUser = false, showLoadButton = false, onLoad}) => {
    let amountWon = formatToFixed(user.amountWon);

    const renderLoadButton = () => {
        return (
            <>
            <div className={style.placeSeperate} />
            <div className={style.tableEntryHolder}>
                <div
                    className={style.loadButton}
                    onClick={onLoad}
                >
                    Load more
                </div>
            </div>
            </>
        );
    };

    const getUsername = () => {
        if (isCurrentUser) return user.username + " (You)";
        return user.username;
    }

    return (
        <>
            {user.rank === 1 ? (
                <>
                    <div className={style.placeSeperate} />
                    <div className={style.tableFirst}>
                        <p className={style.firstRank}>#{user.rank} <img src={medalGold} alt="medal" /></p>
                        <p className={style.firstName}>{getUsername(user.username)}</p>
                        <p className={style.firstBalance}>{amountWon}</p>
                    </div>
                </>
            ) : user.rank === 2 ? (
                <>
                    <div className={style.placeSeperate} />
                    <div className={style.tableSecond}>
                        <p className={style.secondRank}>#{user.rank} <img src={medalSilver} alt="medal" /></p>
                        <p className={style.secondName}>{getUsername(user.username)}</p>
                        <p className={style.secondBalance}>{amountWon}</p>
                    </div>
                </>
            ) : user.rank === 3 ? (
                <>
                    <div className={style.placeSeperate} />
                    <div className={style.tableThird}>
                        <p className={style.thirdRank}>#{user.rank} <img src={medalBronze} alt="medal" /></p>
                        <p className={style.thirdName}>{getUsername(user.username)}</p>
                        <p className={style.thirdBalance}>{amountWon}</p>
                    </div>
                </>
            ) : (
                <>
                    {showLoadButton && renderLoadButton()}
                    <div className={style.placeSeperate} />
                    <div className={classNames(style.tableEntryHolder, isCurrentUser && style.tableCurrentUser)}>
                        <p className={style.entryRank}>#{user.rank}</p>
                        <p className={style.entryName}>{getUsername(user.username)}</p>
                        <p className={style.entryBalance}>{amountWon}</p>
                    </div>
                </>
            )}
        </>
    )
}

export default LeaderboardItem;