const SafeCall = ({ tx, callback, setter }) => {
  var hash = "";
  var success = false;
  tx.wait()
    .catch((err) => {
      // receiving receipt
      hash = "Tx Failed";
      success = false;
      console.error(err);
    })
    .then(() => {
      success = true;
      hash = tx.hash;
    })
    .finally(() => {
      setter(hash);
      callback(success);
    });
};

export default SafeCall;
