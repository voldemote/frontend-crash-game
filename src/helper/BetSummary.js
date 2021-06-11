import SummaryRowType from '../components/BetSummaryContainer/SummaryRowType';

class BetSummaryHelper {
    static getDivider () {
        return {
            type: SummaryRowType.divider,
        };
    }

    static getKeyValue (key, value, keyBold = false, valueBold = false, isLink = false) {
        return {
            type: SummaryRowType.keyValue,
            key,
            keyBold,
            value,
            valueBold,
            isLink,
        };
    }
}

export default BetSummaryHelper;