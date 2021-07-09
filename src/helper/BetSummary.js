import SummaryRowType from '../components/SummaryRowContainer/SummaryRowType';

class BetSummaryHelper {
    static getDivider () {
        return {
            type: SummaryRowType.divider,
        };
    }

    static getKeyValue (key, value, keyBold = false, valueBold = false, valueColor = null, isLink = false, valueHighlight = null) {
        return {
            type: SummaryRowType.keyValue,
            key,
            keyBold,
            value,
            valueBold,
            valueColor,
            valueHighlight,
            isLink,
        };
    }
}

export default BetSummaryHelper;