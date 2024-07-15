import { useState } from "react";
import { NewUser, User } from "./UserList";
import useAPI from "../../hooks/useAPI";

const useUserList = () => {
  const { getUsers, createUser, editUser, deleteUser } = useAPI();

  const [apiData, setApiData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [EditUserModalData, setEditUserModalData] = useState<User | null>(null);
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);

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

  return {
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
  };
};

export default useUserList;
