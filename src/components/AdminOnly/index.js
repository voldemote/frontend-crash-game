import useCurrentUser from 'hooks/useCurrentUser';

export default function AdminOnly({ children }) {
  const user = useCurrentUser();

  if (!user.admin) return null;

  return children;
}
