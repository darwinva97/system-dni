import { api } from "@/utils/api";
import type { Dni, User } from "@prisma/client";
import Select, { GroupBase } from "react-select";

const UsersDniForm = ({
  dni,
  setDni,
  users: currentUsers,
  setUsers,
}: {
  dni: Dni;
  setDni: (dni: Dni) => void;
  users: Omit<User, "password">[];
  setUsers: (users: Omit<User, "password">[]) => void;
}) => {
  const { data: allUsers } = api.user.getAll.useQuery();
  const allAllowUsers = allUsers?.filter((user) => user.role === "user") || [];
  const options = [
    {
      options: allAllowUsers
        ? allAllowUsers.map((user) => ({
            label: user.name,
            value: user.id,
          }))
        : [],
    },
  ] as const;
  return (
    <>
      {allAllowUsers && (
        <Select
          defaultValue={currentUsers.map((user) => ({
            label: user.name,
            value: user.id,
          }))}
          onChange={(newUsers) => {
            setUsers(
              allAllowUsers.filter((user) =>
                newUsers.find((newUser) => newUser.value === user.id),
              ),
            );
          }}
          isMulti
          options={options}
          className="basic-multi-select"
          classNamePrefix="select"
        />
      )}
    </>
  );
};

export default UsersDniForm;
