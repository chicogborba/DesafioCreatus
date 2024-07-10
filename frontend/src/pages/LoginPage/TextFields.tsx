import TextField from "../../components/TextField";

const TextFields = () => {
  return (
    <>
      <div className="flex flex-col w-full items-center">
        <TextField type="password" label="Email" placeholder="Email" />
        <TextField type="text" label="Senha" placeholder="Senha" />
      </div>
    </>
  );
};

export default TextFields;
