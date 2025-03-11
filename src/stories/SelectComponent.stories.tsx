import { Meta, StoryFn } from '@storybook/react';
import { useForm, FormProvider } from 'react-hook-form';
import { SelectComponent } from '../components/SelectComponent';
import FormValues from '../types/FormValues';
import Pokemon from '../types/Pokemon';

// Sample Pokémon Data
const samplePokemon: Pokemon[] = [
  {
    name: 'pikachu',
    url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
  },
  {
    name: 'charizard',
    url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png',
  },
  {
    name: 'bulbasaur',
    url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
  },
  {
    name: 'squirtle',
    url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',
  },
  {
    name: 'jigglypuff',
    url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/39.png',
  },
  {
    name: 'mewtwo',
    url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png',
  },
];

export default {
  title: 'Components/Select',
  component: SelectComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A multi-select dropdown for selecting Pokémon, with search and validation.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Determines the size of the select component.',
    },
    error: {
      control: 'boolean',
      description: 'Shows an error state if validation fails.',
    },
    disabled: {
      control: 'boolean',
      description: 'Shows an disabled state if true.',
    },
    mainLabel: {
      control: 'text',
      description: 'The main label for the select component.',
    },
    optionalLabel: {
      control: 'text',
      description: 'The optional label for the select component.',
      type: 'string',
    },
    errorLabel: {
      control: 'text',
      description: 'The error label for the select component.',
    },
  },
} as Meta;

const Template: StoryFn = ({
  size,
  error,
  mainLabel,
  optionalLabel,
  errorLabel,
  disabled,
}) => {
  const methods = useForm<FormValues>({
    defaultValues: { team: [] },
    mode: 'onChange',
  });

  return (
    <FormProvider {...methods}>
      <SelectComponent
        pokemonList={samplePokemon}
        control={methods.control}
        error={error}
        size={size}
        mainLabel={mainLabel}
        optionalLabel={optionalLabel}
        errorLabel={errorLabel}
        disabled={disabled}
      />
    </FormProvider>
  );
};

export const Default = Template.bind({});
Default.args = {
  mainLabel: 'Label',
  optionalLabel: 'This a required field',
  size: 'xs',
  error: false,
  errorLabel: 'Validation failed',
};

export const ExtraSmall = Template.bind({});
ExtraSmall.args = {
  mainLabel: 'Label',
  optionalLabel: 'This a required field',
  size: 'xs',
  error: false,
};

export const Small = Template.bind({});
Small.args = {
  mainLabel: 'Label',
  optionalLabel: 'This a required field',
  size: 'sm',
  error: false,
};

export const Medium = Template.bind({});
Medium.args = {
  mainLabel: 'Label',
  optionalLabel: 'This a required field',
  size: 'md',
  error: false,
};

export const Large = Template.bind({});
Large.args = {
  mainLabel: 'Label',
  optionalLabel: 'This a required field',
  size: 'lg',
  error: false,
};

export const ErrorState = Template.bind({});
ErrorState.args = {
  mainLabel: 'Label',
  optionalLabel: 'This a required field',
  size: 'xs',
  error: true,
  errorLabel: 'Validation failed',
};

export const Disabled = Template.bind({});
Disabled.args = {
  mainLabel: 'Label',
  optionalLabel: 'This a required field',
  size: 'xs',
  error: false,
  errorLabel: 'Validation failed',
  disabled: true,
};
