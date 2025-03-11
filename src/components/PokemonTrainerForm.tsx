import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { SelectComponent } from './SelectComponent';
import Pokemon from '../types/Pokemon';
import FormValues from '../types/FormValues';
import CustomInput from './CustomInput';
import CustomButton from './CustomButton';

import Modal from './Modal';

const PokemonBattleForm: React.FC = () => {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      firstName: '',
      lastName: '',
      team: [],
    },
  });

  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [selectedPokemons, setSelectedPokemons] = useState<Pokemon[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await axios.get(
          'https://pokeapi.co/api/v2/pokemon?limit=151'
        );
        setPokemonList(response.data.results);
      } catch (error) {
        console.error('Failed to fetch Pokémon list:', error);
      }
    };
    fetchPokemonList();
  }, []);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const spriteUrls = await Promise.all(
        data.team.map(async (pokemonName) => {
          const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
          );
          return response.data.sprites.front_default;
        })
      );
      const pokemons = data.team.map((pokemonName, index): Pokemon => {
        return {
          name: pokemonName,
          url: spriteUrls[index],
        };
      });

      setSelectedPokemons(pokemons);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Failed to fetch Pokémon sprites:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-blue-100 to-indigo-200">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-xs p-6 bg-white rounded-2xl shadow-xl space-y-4 flex flex-col "
      >
        <h2 className="text-2xl font-bold text-center text-indigo-600">
          Battle Tower Registration
        </h2>

        <CustomInput control={control} name="firstName" label="First name" />

        <CustomInput control={control} name="lastName" label="Last name" />

        <div className="max-w-md">
          <SelectComponent pokemonList={pokemonList} control={control} />
        </div>

        <CustomButton label="Apply" />
      </form>

      {isModalOpen && (
        <Modal pokemons={selectedPokemons} setIsModalOpen={setIsModalOpen} />
      )}
    </div>
  );
};

export default PokemonBattleForm;
