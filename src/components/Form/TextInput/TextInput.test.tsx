import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TextInput } from './TextInput';
import type { UseFormRegisterReturn, FieldError } from 'react-hook-form';

describe('TextInput', () => {
    it('muestra el label correctamente', () => {
        const fakeRegister: UseFormRegisterReturn = {
        onChange: () => Promise.resolve(),
        onBlur: () => Promise.resolve(),
        ref: () => {},
        name: 'testText'
        };

        render(<TextInput label='Nombre' register={fakeRegister} />);
        expect(screen.getByLabelText('Nombre')).toBeInTheDocument();
    });

    it('muestra el error cuando existe', () => {
        const fakeRegister: UseFormRegisterReturn = {
        onChange: () => Promise.resolve(),
        onBlur: () => Promise.resolve(),
        ref: () => {},
        name: 'testText'
        };

        const error: FieldError = { type: 'manual', message: 'Valor inválido' };

        render(<TextInput label='Nombre' register={fakeRegister} error={error} />);
        expect(screen.getByText('Valor inválido')).toBeInTheDocument();
    });

    it('llama a onChange al modificar el valor', () => {
        const handleChange = vi.fn(() => Promise.resolve());
        const fakeRegister: UseFormRegisterReturn = {
        onChange: handleChange,
        onBlur: () => Promise.resolve(),
        ref: () => {},
        name: 'testText'
        };

        render(<TextInput label='Nombre' register={fakeRegister} />);

        const input = screen.getByLabelText('Nombre') as HTMLInputElement;
        fireEvent.change(input, { target: { value: 'Nuevo valor' } });
        expect(handleChange).toHaveBeenCalled();
    });
});
