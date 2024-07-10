import { useParams } from "react-router-dom";

const UserCreate = () => {
  const { id } = useParams();
  return (
    <div>
      <h1>Edit Pag {id}</h1>
    </div>
  );
};

export default UserCreate;
