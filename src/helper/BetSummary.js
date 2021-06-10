import SummaryRowType from '../components/BetSummaryContainer/SummaryRowType';

class BetSummaryHelper {
    static getDivider () {
        return {
            type: SummaryRowType.divider,
        };
    }

    static getKeyValue (key, value, isLink = false) {
        return {
            type: SummaryRowType.keyValue,
            key,
            value,
            isLink,
        };
    }
}

export default BetSummaryHelper;