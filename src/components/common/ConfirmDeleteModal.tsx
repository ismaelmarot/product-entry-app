import React from 'react';
import type { ConfirmDeleteModalProps } from '../../interface/ConfirmDeleteModalProps';

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
    show,
    title,
    message,
    confirmText = 'Confirmar',
    cancelText = 'Cancelar',
    onConfirm,
    onCancel
}) => {
    if (!show) return null;

    return (
        <div className='modal-backdrop fade show' style={{ display: 'block' }}>
            <div className='modal d-block' tabIndex={-1}>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title'>{title}</h5>
                        </div>
                        <div className='modal-body'>
                            <p>{message}</p>
                        </div>
                        <div className='modal-footer'>
                            <button className='btn btn-secondary' onClick={onCancel}>{cancelText}</button>
                            <button className='btn btn-danger' onClick={onConfirm}>{confirmText}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDeleteModal;
