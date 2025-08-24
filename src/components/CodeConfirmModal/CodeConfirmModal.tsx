import type { CodeConfirmModalProps } from '../../interface/CodeConfirmModalProps';

function CodeConfirmModal({ show, message, onConfirm, onCancel }: CodeConfirmModalProps) {
    if (!show) return null;

    return (
        <div 
            className='modal-backdrop'
            style={{
                position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 1050
            }}
            >
            <div 
                className='modal-content p-4'
                style={{ backgroundColor: 'white', borderRadius: '.3rem', minWidth: '300px', maxWidth: '90%' }}
            >
                <p>{message}</p>
                <div className='d-flex justify-content-end gap-2 mt-3'>
                <button className='btn btn-secondary' onClick={onCancel}>Cancelar</button>
                <button className='btn btn-primary' onClick={onConfirm}>Continuar</button>
                </div>
            </div>
        </div>
    );
}

export default CodeConfirmModal;
