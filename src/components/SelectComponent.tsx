import Pokemon from '../types/Pokemon';
import FormValues from '../types/FormValues';
import ArrowDown from '../icons/ArrowDown';
import ArrowUp from '../icons/ArrowUp';
import Info from '../icons/Info';
import XMark from '../icons/XMark';
import Search from '../icons/Search';
import clsx from 'clsx';
import { Control, Controller } from 'react-hook-form';
import { useState } from 'react';

type SelectComponentProps = {
  control: Control<FormValues, any>;
  pokemonList: Pokemon[];
} & Partial<{
  error: boolean;
  size: string;
  mainLabel: string;
  optionalLabel: string;
  errorLabel: string;
  disabled: boolean;
}>;

export const SelectComponent: React.FC<SelectComponentProps> = ({
  pokemonList,
  control,
  error = false,
  size = 'xs',
  mainLabel = 'Select team',
  optionalLabel = 'This is a required field',
  errorLabel = 'You must select exactly 4 Pokémon',
  disabled = false,
}) => {
  const [query, setQuery] = useState<string>('');
  const [dropDownOpen, setDropDownOpen] = useState<boolean>(false);

  function filter(pokemonList: Pokemon[]) {
    return pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  return (
    <div className={`max-w-${size}`}>
      <div className={'flex justify-between'}>
        <div className="flex items-center gap-1">
          <label className={`block text-${size} font-medium text-black`}>
            {mainLabel}
          </label>
          <Info className="w-4 h-4" />
        </div>
        <span className={`text-gray-700 text-${size}`}>Optional</span>
      </div>
      <Controller
        control={control}
        name="team"
        rules={{
          validate: (value) => value.length === 4 || errorLabel,
        }}
        render={({ field, fieldState }) => (
          <div className={`max-w-${size} overflow-x-auto`}>
            <div
              className={clsx(
                'mt-1 rounded-lg border border-gray-300 px-2 py-1 flex justify-between items-center hover:border-indigo-800',
                (fieldState.invalid || error) && 'border-red-500',
                size === 'sm' && 'py-2',
                size === 'md' && 'py-3',
                size === 'lg' && 'py-4',
                disabled && 'bg-gray-200 opacity-50  pointer-events-none'
              )}
            >
              <div className="flex overflow-hidden whitespace-nowrap">
                {field.value.length > 0 ? (
                  field.value.map((pokemonName: string) => (
                    <div
                      key={pokemonName}
                      className={clsx(
                        'flex items-center bg-gray-200 text-gray-900 rounded-full px-2 py-.5 text-xs mr-1',
                        size === 'sm' && 'py-1',
                        size === 'md' && 'py-2',
                        size === 'lg' && 'py-2 px-3'
                      )}
                    >
                      {pokemonName.charAt(0).toUpperCase() +
                        pokemonName.slice(1)}
                      <button
                        type="button"
                        className="ml-2 text-gray-600 hover:text-gray-900"
                        onClick={(e) => {
                          e.stopPropagation();
                          field.onChange(
                            field.value.filter((p: string) => p !== pokemonName)
                          );
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  ))
                ) : (
                  <>
                    <span
                      className={`text-gray-500 text-${size}`}
                      onClick={() => setDropDownOpen(!dropDownOpen)}
                    >
                      Select
                    </span>
                  </>
                )}
              </div>
              <div className="flex">
                {field.value.length === 4 && (
                  <button
                    type="button"
                    className="cursor-pointer mr-1"
                    onClick={() => field.onChange((field.value = []))}
                  >
                    <XMark
                      className={clsx(
                        'cursor-pointer',
                        size === 'xs' && 'w-3 h-3',
                        size === 'sm' && 'w-4 h-4',
                        size === 'md' && 'w-5 h-5',
                        size === 'lg' && 'w-6 h-6'
                      )}
                    />
                  </button>
                )}
                <div onClick={() => setDropDownOpen(!dropDownOpen)}>
                  {dropDownOpen ? (
                    <ArrowUp
                      className={clsx(
                        'cursor-pointer',
                        size === 'xs' && 'w-3 h-3',
                        size === 'sm' && 'w-4 h-4',
                        size === 'md' && 'w-5 h-5',
                        size === 'lg' && 'w-6 h-6'
                      )}
                    />
                  ) : (
                    <ArrowDown
                      className={clsx(
                        'cursor-pointer',
                        size === 'xs' && 'w-3 h-3',
                        size === 'sm' && 'w-4 h-4',
                        size === 'md' && 'w-5 h-5',
                        size === 'lg' && 'w-6 h-6'
                      )}
                    />
                  )}
                </div>
              </div>
            </div>

            {dropDownOpen && (
              <div className="mt-2 h-40 border rounded-lg overflow-y-auto">
                <div className="relative flex items-center">
                  <Search className="absolute w-4 h-4 ml-4 mt-1 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search"
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>

                <div className="max-h-40 overflow-y-auto p-2">
                  {filter(pokemonList).map((pokemon) => (
                    <div
                      key={pokemon.name}
                      onClick={() => {
                        if (
                          !field.value.includes(pokemon.name) &&
                          field.value.length < 4
                        ) {
                          field.onChange([...field.value, pokemon.name]);
                        }
                      }}
                      className={clsx(
                        'cursor-pointer py-1 px-2 rounded-lg text-xs mb-1 flex justify-between',
                        field.value.includes(pokemon.name)
                          ? 'bg-indigo-500 text-white'
                          : 'bg-gray-100 text-black hover:bg-gray-200',
                        size === 'sm' && 'py-2',
                        size === 'md' && 'py-3',
                        size === 'lg' && 'py-4'
                      )}
                    >
                      {pokemon.name.charAt(0).toUpperCase() +
                        pokemon.name.slice(1)}
                      {field.value.includes(pokemon.name) && <span>✓</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}
            <span className="text-gray-700 text-xs">
              {fieldState.error || error ? (
                <p className={`mt-1 text-${size} text-red-600`}>{errorLabel}</p>
              ) : (
                <p className={`mt-1 text-${size} text-gray-700`}>
                  {optionalLabel}
                </p>
              )}
            </span>
          </div>
        )}
      />
    </div>
  );
};
