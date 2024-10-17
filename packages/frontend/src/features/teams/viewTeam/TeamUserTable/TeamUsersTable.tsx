import UserTableRow from "./components/UserTableRow";

type Props = {
  users: [
    {
      user: string;
      role: "team_member" | "manager" | "admin";
      joinedAt?: Date;
    },
  ];
};

function TeamUsersTable({ users }: Props) {
  return (
    <div className="container transition-all">
      <div className="w-full bg-base-200 py-2 rounded-lg">
        <div className="w-full px-4">
          <div className="flex justify-between items-center">
            <h6 className="h6">Team Members</h6>
          </div>
        </div>
        <div className="w-full overflow-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-[1px] border-base-content/20">
                <th className="font-bold px-4 py-2 text-sm text-left text-base-content/90 capitalize">Name</th>
                <th className="font-bold px-4 py-2 text-sm text-left text-base-content/90 capitalize">User ID</th>
                <th className="font-bold px-4 py-2 text-sm text-left text-base-content/90 capitalize">Role</th>
                <th className="font-bold px-4 py-2 text-sm text-left text-base-content/i90 capitalize">Date Joined</th>
              </tr>
            </thead>
            <tbody>{users && users.map((user) => user && <UserTableRow key={user.user} userData={user} />)}</tbody>
          </table>
        </div>
        <div className="w-full h-10 flex items-center border-t-[1px] mt-2 border-base-content/20">
          <div className="px-">
            <p>Total member: {users.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamUsersTable;
