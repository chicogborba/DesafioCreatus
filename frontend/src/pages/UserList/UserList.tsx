import UsersTable from "./UsersTable";
import CreateUserModal from "./CreateUserModal";
import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { GrDocumentPdf } from "react-icons/gr";

export interface User {
  id: string | number;
  email: string;
  name: string;
  level: 1 | 2 | 3 | 4 | 5;
}

const data: User[] = [
  {
    id: 1,
    name: "Ricardo Oliveira Lima",
    email: "joao@gmail.com",
    level: 1,
  },
  {
    id: 2,
    name: "Maria",
    email: "maria@gmail.com",
    level: 2,
  },
  {
    id: 3,
    name: "Maria",
    email: "maria@gmail.com",
    level: 3,
  },
  {
    id: 4,
    name: "Maria",
    email: "maria@gmail.com",
    level: 4,
  },
  {
    id: 5,
    name: "Maria",
    email: "maria@gmail.com",
    level: 2,
  },
  {
    id: 6,
    name: "Maria",
    email: "maria@gmail.com",
    level: 3,
  },
  {
    id: 7,
    name: "Maria",
    email: "maria@gmail.com",
    level: 2,
  },
  {
    id: 8,
    name: "Maria",
    email: "maria@gmail.com",
    level: 3,
  },
  {
    id: 9,
    name: "Maria",
    email: "maria@gmail.com",
    level: 1,
  },
  {
    id: 10,
    name: "Maria",
    email: "maria@gmail.com",
    level: 4,
  },
  {
    id: 11,
    name: "Maria",
    email: "maria@gmail.com",
    level: 1,
  },
  {
    id: 12,
    name: "Maria",
    email: "maria@gmail.com",
    level: 1,
  },
  {
    id: 13,
    name: "Maria",
    email: "maria@gmail.com",
    level: 1,
  },
  {
    id: 14,
    name: "Maria",
    email: "maria@gmail.com",
    level: 4,
  },
  {
    id: 15,
    name: "Maria",
    email: "maria@gmail.com",
    level: 5,
  },
];
const UserList = () => {
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);
  return (
    <div className="flex flex-row h-screen">
      <Sidebar selected="list" />
      <div className="bg-base-200 h-screen w-full flex items-center content-center py-16 px-32">
        <div className="bg-base-100 overflow-auto shadow-xl w-full h-full rounded-xl flex flex-col">
          <div className="flex justify-between items-center my-7 mx-10">
            <h1 className="font-semibold text-2xl ">Usuários</h1>
            <div className="flex gap-4">
              <GrDocumentPdf className="text-primary w-7 h-7 hover:opacity-70 hover:cursor-pointer" />
              <button className="btn btn-sm btn-primary text-white rounded-full ">
                Adicionar Usuário
              </button>
            </div>
          </div>
          <UsersTable
            data={data}
            onUserEdit={() => setIsCreateUserModalOpen(true)}
          />
        </div>
        <CreateUserModal
          isOpen={isCreateUserModalOpen}
          onClose={() => setIsCreateUserModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default UserList;
