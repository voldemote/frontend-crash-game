import Modal from "../Modal";
import Waiting from "./Waiting";
import Success from "./Success";
import Error from "./Error";

const TxModal = ({
  hash,
  action,
  blocked,
  success,
  setModalOpen,
  setTokenAreaOpen,
  canAddToken = false,
}) => {
  const getModalContent = () => {
    if (blocked) return <Waiting hash={hash} action={action} />;
    if (!blocked) {
      if (success) {
        return (
          <Success
            setModalOpen={setModalOpen}
            canAddToken={canAddToken}
            setTokenAreaOpen={setTokenAreaOpen}
          />
        );
      } else {
        return <Error setModalOpen={setModalOpen} hash={hash} />;
      }
    }
  };
  return (
    <Modal isOpen={true} showCloseButton={false}>
      {getModalContent()}
    </Modal>
  );
};

export default TxModal;
