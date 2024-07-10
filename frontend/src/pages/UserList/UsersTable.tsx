import { FiTrash2 } from "react-icons/fi";
import { MdOutlineModeEdit } from "react-icons/md";
import { User } from "./UserList";

export interface UsersTablePRops {
  data: User[];
}

const UsersTable: React.FC<UsersTablePRops> = ({ data }) => {
  return (
    <>
      <div className="sticky top-0 text-center flex justify-between items-center py-2 px-10 bg-gray-100 border-y border-gray-200">
        <h1 className="text-left font-normal text-lg w-full text-gray-500">
          NOME
        </h1>
        <h1 className="font-normal text-lg w-full text-gray-500">EMAIL</h1>
        <h1 className="font-normal text-lg w-full text-gray-500">
          NÍVEL DE ACESSO
        </h1>
        <span className="flex">
          <MdOutlineModeEdit className="text-transparent text-2xl mx-2" />
          <FiTrash2 className="text-transparent text-2xl mx-2" />
        </span>
      </div>
      {data.map((user, index) => (
        <div
          key={index}
          className="text-center pt-6 pb-14 flex justify-between items-center py-2 px-10 border-b border-gray-200"
        >
          <h1 className="text-left font-normal text-md w-full text-gray-500">
            {user.name}
          </h1>
          <h1 className="font-normal text-md w-full text-gray-500">
            {user.email}
          </h1>
          <h1 className="font-normal text-md w-full text-gray-500">
            {user.level}
          </h1>
          <span className="flex">
            <MdOutlineModeEdit className="text-primary text-2xl mx-2" />
            <FiTrash2 className="text-red-500 text-2xl mx-2" />
          </span>
        </div>
      ))}
    </>
  );
};

export default UsersTable;
