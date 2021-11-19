import { Grid } from "@material-ui/core";
import classNames from "classnames";
import styles from './styles.module.scss';
import BetTable from "./tables/BetTable";
import DepositTable from './tables/DepositTable';
import WithDrawalsTable from "./tables/WithDrawalsTable";



const UserWalletTables = ({className, type='DEPOSITS'}) => {
    const rowData = {
        DEPOSITS: true? []: [ {wFair : "deposits wFair", network: "deposit network", address: "deposit Adress", date: new Date().toDateString(), txHash: "deposit txhash"}],
        WITHDRAWALS: true? []: [ {wfair: 'withdrawal wfaire', fee: 'fee', network: "network", startDate: new Date().toDateString(), status: "Review",txHash: "deposit txhash"} ],
        BETS:true? []: [{game:"game", user: "user", trade: "trade", mult: '3.00x', cashout: '30 PFair'}]
    };

    const renderDepositTableRows = (depositTableRows) => {
        return <DepositTable renderRow={depositTableRows} />
    }
    const renderWithDrawalsTableRows = (depositTableRows) => {
        return <WithDrawalsTable renderRow={depositTableRows} />;

    }
    const renderBetsTableRows = (betTabelRows) => {
        return <BetTable renderRow={betTabelRows} />
    }

    const renderTableRows = (type) => {
        switch (type) {
            case 'DEPOSITS':
            return renderDepositTableRows(rowData[type]);
            case 'WITHDRAWALS':
            return renderWithDrawalsTableRows(rowData[type]);
            case 'BETS':
            return renderBetsTableRows(rowData[type]);
            default:
                return renderDepositTableRows(rowData[type]);
        }
    }
return renderTableRows(type);

}
export default UserWalletTables;
