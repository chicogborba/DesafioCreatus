import UsersTable from "./UsersTable";
import EditUserModal from "./EditUserModal/EditUserModal";
import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { GrDocumentPdf } from "react-icons/gr";
import CreateUserModal from "./CreateUserModal/CreateUserModal";
import useAPI from "../../hooks/useAPI";

export type User = {
  id: string | number;
  email: string;
  name: string;
  level: number;
};

export type NewUser = Omit<User, "id">;

const UserList = () => {
  const { getUsers, createUser, editUser, deleteUser, getUsersPDF } = useAPI();

  const [apiData, setApiData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [EditUserModalData, setEditUserModalData] = useState<User | null>(null);
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    getUsers().then((data) => {
      if (data) {
        setApiData(data);
        setLoading(false);
      }
    });
  };

  const handleCreateUser = (user: NewUser) => {
    createUser(user).then((newUser) => {
      if (newUser) {
        setApiData((prevData) => [...prevData, newUser]);
      }
    });
  };

  const handleSaveEditUser = (user: User) => {
    editUser(user).then((updatedUser) => {
      if (updatedUser) {
        setApiData((prevData) => {
          const index = prevData.findIndex((u) => u.id === updatedUser.id);
          return [
            ...prevData.slice(0, index),
            updatedUser,
            ...prevData.slice(index + 1),
          ];
        });
      }
    });
  };

  const handleDeleteUser = (id: string | number) => {
    deleteUser(id).then((success) => {
      if (success) {
        setApiData((prevData) => {
          return prevData.filter((u) => u.id !== id);
        });
      }
    });
  };

  const handleEditUser = (user: User) => {
    setEditUserModalData(user);
  };

  return (
    <div className="flex flex-row h-screen">
      <Sidebar selected="list" />
      <div className="bg-base-200 h-screen w-full flex items-center content-center py-16 px-32">
        <div className="bg-base-100 overflow-auto shadow-xl w-full h-full rounded-xl flex flex-col">
          <div className="flex justify-between items-center my-7 mx-10">
            <h1 className="font-semibold text-2xl ">Usuários</h1>
            <div className="flex gap-4">
              <GrDocumentPdf
                onClick={getUsersPDF}
                className="text-primary w-7 h-7 hover:opacity-70 hover:cursor-pointer"
              />
              <button
                onClick={() => setIsCreateUserModalOpen(true)}
                className="btn btn-sm btn-primary text-white rounded-full "
              >
                Adicionar Usuário
              </button>
            </div>
          </div>
          {loading ? (
            <p>Carregando...</p>
          ) : (
            <UsersTable
              onUserDelete={handleDeleteUser}
              data={apiData}
              onUserEdit={handleEditUser}
            />
          )}
        </div>
        <EditUserModal
          onUserSave={handleSaveEditUser}
          userData={EditUserModalData}
          onClose={() => setEditUserModalData(null)}
        />
        <CreateUserModal
          isOpen={isCreateUserModalOpen}
          onClose={() => setIsCreateUserModalOpen(false)}
          onCreateUser={handleCreateUser}
        />
      </div>
    </div>
  );
};

export default UserList;
