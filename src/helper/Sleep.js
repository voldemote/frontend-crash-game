class SleepHelper {
  static sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export default SleepHelper;
