import { useRef } from "react";
import defaultUserImage from "../assets/defaultUser.jpeg";
import { MdOutlinePhotoCamera } from "react-icons/md";

export interface SelectProfileImageProps {
  imageLink: string | null;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SelectProfileImage: React.FC<SelectProfileImageProps> = ({
  imageLink,
  handleFileChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleFileButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="avatar">
        <div className="w-48 rounded-full border-gray-200 border-4">
          <img
            src={imageLink ? imageLink : defaultUserImage}
            alt="Default User"
          />
        </div>
      </div>
      <button
        type="button"
        onClick={handleFileButtonClick}
        className="btn btn-sm max-w-48 w-full"
      >
        Escolher Foto
        <MdOutlinePhotoCamera className="max-w-5 max-h-5 w-full h-full" />
      </button>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default SelectProfileImage;
