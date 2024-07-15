import UsersTable from "./UsersTable";
import EditUserModal from "./EditUserModal/EditUserModal";
import { useEffect } from "react";
import CreateUserModal from "./CreateUserModal/CreateUserModal";
import useAPI from "../../hooks/useAPI";
import PageWrapper from "../../components/PageWrapper";
import useUserList from "./useUserList";
import UserListHeader from "./UserListHeader";

export type User = {
  id: string | number;
  email: string;
  name: string;
  level: number;
  profile_img: string;
};

export type NewUser = Omit<User, "id">;

const UserList = () => {
  const { getUsersPDF } = useAPI();

  const {
    apiData,
    loading,
    EditUserModalData,
    isCreateUserModalOpen,
    setIsCreateUserModalOpen,
    fetchUsers,
    handleCreateUser,
    handleSaveEditUser,
    handleDeleteUser,
    handleEditUser,
    setEditUserModalData,
  } = useUserList();

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <PageWrapper>
      <>
        <UserListHeader
          getUsersPDF={getUsersPDF}
          setIsCreateUserModalOpen={setIsCreateUserModalOpen}
        />
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <UsersTable
            onUserDelete={handleDeleteUser}
            data={apiData}
            onUserEdit={handleEditUser}
          />
        )}
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
      </>
    </PageWrapper>
  );
};

export default UserList;
