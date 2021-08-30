class EventTradeViewsHelper {
  static getView(name, counter = undefined, showCounter = false, className) {
    return {
      name,
      counter,
      showCounter,
      className,
    };
  }
}

export default EventTradeViewsHelper;
