export const Users = ({ users, setSelectedUserId, selectedUserId }) => {
  return users.map(user => (
    <a
      key={user.id}
      data-cy="FilterUser"
      href="#/"
      className={selectedUserId === user.id ? 'is-active' : null}
      onClick={() => setSelectedUserId(user.id)}
    >
      {user.name}
    </a>
  ));
};
