class EventTradeViewsHelper {
  static getView(
    name,
    counter = undefined,
    showCounter = false,
    className,
    hidden = false
  ) {
    return {
      name,
      counter,
      showCounter,
      className,
      hidden,
    };
  }
}

export default EventTradeViewsHelper;
