import SummaryRowType from '../components/BetSummaryContainer/SummaryRowType';

class BetSummaryHelper {
    static getDivider () {
        return {
            type: SummaryRowType.divider,
        };
    }

    static getKeyValue (key, value, keyBold = false, valueBold = false, valueColor = null, isLink = false) {
        return {
            type: SummaryRowType.keyValue,
            key,
            keyBold,
            value,
            valueBold,
            valueColor,
            isLink,
        };
    }
}

export default BetSummaryHelper;