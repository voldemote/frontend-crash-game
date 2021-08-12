class EventTradeViewsHelper {
    static getView (name, counter = undefined, showCounter = false) {
        return {
            name,
            counter,
            showCounter
        };
    };
}

export default EventTradeViewsHelper;