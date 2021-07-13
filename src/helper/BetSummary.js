import SummaryRowType from '../components/SummaryRowContainer/SummaryRowType';

class BetSummaryHelper {
    static getDivider () {
        return {
            type: SummaryRowType.divider,
        };
    }

    static getKeyValue (key, value, keyBold = false, valueBold = false, valueBig = false, valueColor = null, isLink = false, valueHighlight = null, valueChildren = null, flexDirectionColumn = false) {
        return {
            type: SummaryRowType.keyValue,
            flexDirectionColumn,
            key,
            keyBold,
            value,
            valueBold,
            valueBig,
            valueChildren,
            valueColor,
            valueHighlight,
            isLink,
        };
    }
}

export default BetSummaryHelper;