import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { NumberInput } from './NumberInput';
import type { UseFormRegisterReturn, FieldError } from 'react-hook-form';

describe('NumberInput', () => {
    it('muestra el label correctamente', () => {
        const fakeRegister: UseFormRegisterReturn = {
        onChange: () => Promise.resolve(),
        onBlur: () => Promise.resolve(),
        ref: () => {},
        name: 'testNumber'
        };

        render(
        <NumberInput 
            label='Cantidad'
            register={fakeRegister} 
        />
        );

        expect(screen.getByLabelText('Cantidad')).toBeInTheDocument();
    });

    it('muestra el error cuando existe', () => {
        const fakeRegister: UseFormRegisterReturn = {
        onChange: () => Promise.resolve(),
        onBlur: () => Promise.resolve(),
        ref: () => {},
        name: 'testNumber'
        };

        const error: FieldError = { type: 'manual', message: 'Valor inválido' };

        render(
        <NumberInput 
            label='Cantidad'
            register={fakeRegister} 
            error={error}
        />
        );

        expect(screen.getByText('Valor inválido')).toBeInTheDocument();
    });

    it('llama a onChange al modificar el valor', () => {
        const handleChange = vi.fn(() => Promise.resolve());
        const fakeRegister: UseFormRegisterReturn = {
        onChange: handleChange,
        onBlur: () => Promise.resolve(),
        ref: () => {},
        name: 'testNumber'
        };

        render(
        <NumberInput 
            label='Cantidad'
            register={fakeRegister} 
        />
        );

        const input = screen.getByLabelText('Cantidad') as HTMLInputElement;
        fireEvent.change(input, { target: { value: '10' } });
        expect(handleChange).toHaveBeenCalled();
    });
});
