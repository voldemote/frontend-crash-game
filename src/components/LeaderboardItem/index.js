import style                    from './styles.module.scss';
import medalGold                from "../../data/icons/medal-gold.png";
import medalSilver                from "../../data/icons/medal-silver.png";
import medalBronze                from "../../data/icons/medal-bronze.png";

const LeaderboardItem = ({user}) => {
    let totalBalance = Math.round(user.balance);
    return (
        <>
            {user.index === 1 ? (
                <>
                    <div className={style.placeSeperate} />
                    <div className={style.tableFirst}>
                        <p className={style.firstRank}>#{user.index} <img src={medalGold} alt="medal" /></p>
                        <p className={style.firstName}>{user.name}</p>
                        <p className={style.firstBalance}>{totalBalance}</p>
                    </div>
                </>
            ) : user.index === 2 ? (
                <>
                    <div className={style.placeSeperate} />
                    <div className={style.tableSecond}>
                        <p className={style.secondRank}>#{user.index} <img src={medalSilver} alt="medal" /></p>
                        <p className={style.secondName}>{user.name}</p>
                        <p className={style.secondBalance}>{totalBalance}</p>
                    </div>
                </>
            ) : user.index === 3 ? (
                <>
                    <div className={style.placeSeperate} />
                    <div className={style.tableThird}>
                        <p className={style.thirdRank}>#{user.index} <img src={medalBronze} alt="medal" /></p>
                        <p className={style.thirdName}>{user.name}</p>
                        <p className={style.thirdBalance}>{user.balance}</p>
                    </div>
                </>
            ) : (
                <>
                    <div className={style.placeSeperate} />
                    <div className={style.tableEntryHolder}>
                        <p className={style.entryRank}>#{user.index}</p>
                        <p className={style.entryName}>{user.name}</p>
                        <p className={style.entryBalance}>{user.balance}</p>
                    </div>
                </>
            )}
        </>
    )
}

export default LeaderboardItem;