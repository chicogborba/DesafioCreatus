import TextField from "../../components/TextField";

export interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateUserModal: React.FC<CreateUserModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <div
      className={`fixed inset-0 w-full z-50 flex items-center justify-center ${isOpen ? "block" : "hidden"}`}
    >
      <div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>
      <div className="modal-box relative bg-white py-6 px-12  rounded-lg shadow-lg z-10">
        <button
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>
        <div className="w-full text-left flex flex-col gap-4">
          <h3 className="font-medium text-2xl">Editar Usuario</h3>
          <TextField type="text" label="Nome" placeholder="Nome" />
          <TextField type="text" label="Email" placeholder="Email" />
          <TextField
            type="number"
            min="1"
            max="5"
            label="Nível de Acesso"
            placeholder="Nível de Acesso"
          />
          <TextField type="password" label="Senha" placeholder="Senha" />
          <TextField
            type="password"
            label="Confirmar Senha"
            placeholder="Senha"
          />
          <button className="btn btn-primary w-fit self-end mt-4">
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateUserModal;
