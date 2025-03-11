import React from 'react';
import Pokemon from '../types/Pokemon';
import XMark from '../icons/XMark';

type ModalProps = {
  pokemons: Pokemon[];
  setIsModalOpen: any;
};

const Modal: React.FC<ModalProps> = ({ pokemons, setIsModalOpen }) => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-100 to-indigo-200  flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-md w-full max-w-md">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Team</h3>
          <button
            type="button"
            onClick={() => setIsModalOpen((prev: boolean) => !prev)}
          >
            <XMark />
          </button>
        </div>
        <div className="flex flex-col gap-2 mt-2">
          {pokemons.map((pokemon, index) => (
            <div className="flex items-center justify-around border-dashed border-2 rounded-md">
              <img
                key={index}
                src={pokemon.url}
                alt={`Pokemon ${index + 1}`}
                className="w-20 h-20 object-contain"
              />
              <span className="text-gray-700">
                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
              </span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-end mt-4">
          <span
            className="font-semibold cursor-pointer"
            onClick={() => setIsModalOpen((prev: boolean) => !prev)}
          >
            Cancel
          </span>
          <button
            type="button"
            onClick={() => setIsModalOpen((prev: boolean) => !prev)}
            className="bg-indigo-700 text-white px-2 py-1 rounded-sm ml-4 font-semibold focus:outline-none"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
