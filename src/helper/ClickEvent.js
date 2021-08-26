class ClickEvent {
  static stopPropagation(event) {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
  }
}

export default ClickEvent;
