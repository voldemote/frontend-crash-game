import style                    from './styles.module.scss';
import medalGold                from "../../data/icons/medal-gold.png";
import medalSilver              from "../../data/icons/medal-silver.png";
import medalBronze              from "../../data/icons/medal-bronze.png";
import { formatToFixed }        from 'helper/FormatNumbers';

const LeaderboardItem = ({user, index, showLoadButton = false, onLoad}) => {
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
                    Show all
                </div>
            </div>
            </>
        );
    };

    return (
        <>
            {index === 1 ? (
                <>
                    <div className={style.placeSeperate} />
                    <div className={style.tableFirst}>
                        <p className={style.firstRank}>#{index} <img src={medalGold} alt="medal" /></p>
                        <p className={style.firstName}>{user.username}</p>
                        <p className={style.firstBalance}>{amountWon}</p>
                    </div>
                </>
            ) : index === 2 ? (
                <>
                    <div className={style.placeSeperate} />
                    <div className={style.tableSecond}>
                        <p className={style.secondRank}>#{index} <img src={medalSilver} alt="medal" /></p>
                        <p className={style.secondName}>{user.username}</p>
                        <p className={style.secondBalance}>{amountWon}</p>
                    </div>
                </>
            ) : index === 3 ? (
                <>
                    <div className={style.placeSeperate} />
                    <div className={style.tableThird}>
                        <p className={style.thirdRank}>#{index} <img src={medalBronze} alt="medal" /></p>
                        <p className={style.thirdName}>{user.username}</p>
                        <p className={style.thirdBalance}>{amountWon}</p>
                    </div>
                </>
            ) : (
                <>
                    {showLoadButton && renderLoadButton()}
                    <div className={style.placeSeperate} />
                    <div className={style.tableEntryHolder}>
                        <p className={style.entryRank}>#{index}</p>
                        <p className={style.entryName}>{user.username}</p>
                        <p className={style.entryBalance}>{amountWon}</p>
                    </div>
                </>
            )}
        </>
    )
}

export default LeaderboardItem;