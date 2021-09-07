import { useSelector } from 'react-redux';
import State from 'helper/State';
import { selectUsers } from 'store/selectors/user';
import { selectUserId } from 'store/selectors/authentication';

const useCurrentUser = () => {
  const users = useSelector(selectUsers);
  const userId = useSelector(selectUserId);

  return State.getUser(userId, users);
};

export default useCurrentUser;
