import Eye from '../icons/Eye';
import Mail from '../icons/Mail';
import { Control, Controller } from 'react-hook-form';
import FormValues from '../types/FormValues';
import Info from '../icons/Info';
import clsx from 'clsx';

type CustomInputProps = {
  control: Control<FormValues, any>;
  label: string;
  name: keyof FormValues;
};

const CustomInput: React.FC<CustomInputProps> = ({ control, label, name }) => {
  return (
    <div>
      <div className="w-full flex justify-between">
        <div className="flex items-center gap-1">
          <label className="block text-sm font-medium text-black">
            {label}
          </label>
          <Info className="w-4 h-4" />
        </div>
        <span className="text-gray-700 text-xs">Optional</span>
      </div>

      <Controller
        control={control}
        name={name}
        rules={{
          required: `This field is required.`,
          maxLength: {
            value: 12,
            message: 'First name should be at most 12 characters',
          },
          minLength: {
            value: 2,
            message: 'First name should be at least 2 characters',
          },
          pattern: {
            value: /^[A-Za-z]+$/,
            message: 'Only letters are allowed',
          },
        }}
        render={({ field, fieldState }) => (
          <div className="flex flex-col">
            <div className="relative flex items-center">
              {/* Left Icon */}
              <Mail
                className={clsx(
                  'absolute w-4 h-4 ml-4 mt-1',
                  fieldState.invalid && 'text-red-500'
                )}
              />

              {/* Input Field */}
              <input
                {...field}
                type="text"
                placeholder={label}
                className={clsx(fieldState.invalid && 'border-red-500')}
              />

              {/* Right Icon */}
              <Eye className="absolute w-4 h-4 right-0 mt-1 mr-4 text-gray-700" />
            </div>
            <span className="text-gray-700 text-xs">
              {fieldState.error ? (
                <p className="mt-1 text-xs text-red-600">
                  {fieldState.error.message}
                </p>
              ) : (
                'This information is required'
              )}
            </span>
          </div>
        )}
      />
    </div>
  );
};

export default CustomInput;
