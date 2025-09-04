import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CheckboxInput } from './CheckBox';
import type { UseFormRegisterReturn } from 'react-hook-form';

describe('CheckboxInput', () => {
    it('muestra el label correctamente', () => {
        const fakeRegister: UseFormRegisterReturn = {
        onChange: () => Promise.resolve(),
        onBlur: () => Promise.resolve(),
        ref: () => {},
        name: 'testCheckbox'
        };

        render(
        <CheckboxInput 
            label="Aceptar términos" 
            id="checkbox1" 
            register={fakeRegister} 
        />
        );

        expect(screen.getByLabelText('Aceptar términos')).toBeInTheDocument();
    });

    it('llama a onChange al hacer click', () => {
        const handleChange = vi.fn(() => Promise.resolve());
        const fakeRegister: UseFormRegisterReturn = {
        onChange: handleChange,
        onBlur: () => Promise.resolve(),
        ref: () => {},
        name: 'testCheckbox'
        };

        render(
        <CheckboxInput 
            label="Aceptar términos" 
            id="checkbox1" 
            register={fakeRegister} 
        />
        );

        const checkbox = screen.getByLabelText('Aceptar términos') as HTMLInputElement;

        fireEvent.click(checkbox);
        expect(handleChange).toHaveBeenCalled();
    });
});
