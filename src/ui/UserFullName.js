function UserFullName({ fullName }) {
  return (
    <span className="max-sm:hidden transition-all drop-shadow-md hover:drop-shadow-xl text-violet-200 hover:text-violet-100 bg-violet-950 px-4 py-2 rounded-lg">
      {fullName}
    </span>
  );
}

export default UserFullName;
