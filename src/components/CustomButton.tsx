import Star from '../icons/Star';
import ArrowDown from '../icons/ArrowDown';

type CustomButtonProps = {
  label: string;
};

const CustomButton: React.FC<CustomButtonProps> = ({ label }) => {
  return (
    <button
      type="submit"
      className="flex items-center justify-center gap-2 py-2 px-2 bg-indigo-700 hover:bg-indigo-600 text-white rounded-md  text-md transition duration-300"
    >
      <Star className="w-4 h-4" />
      {label}
      <ArrowDown className="w-4 h-4" />
    </button>
  );
};

export default CustomButton;
