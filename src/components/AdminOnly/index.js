import useCurrentUser from 'hooks/useCurrentUser';

export default function AdminOnly({ children }) {
  const user = useCurrentUser();

  if (!user) return null;
  if (!user.admin) return null;

  return children;
}
