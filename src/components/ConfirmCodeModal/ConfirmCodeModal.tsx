import React from 'react';
import type { ConfirmCodeModalProps } from '../../interface/ConfirmCodeModalProps';

const ConfirmCodeModal: React.FC<ConfirmCodeModalProps> = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="modal-backdrop" style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
            <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0.3rem', maxWidth: '400px', textAlign: 'center' }}>
                <p>{message}</p>
                <div className='d-flex justify-content-around mt-3'>
                    <button className='btn btn-primary' onClick={onConfirm}>Sí</button>
                    <button className='btn btn-secondary' onClick={onCancel}>No</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmCodeModal;
