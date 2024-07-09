import { useParams } from "react-router-dom";

const UserEdit = () => {
  const { id } = useParams();
  return (
    <div>
      <h1>Edit Pag {id}</h1>
    </div>
  );
};

export default UserEdit;
