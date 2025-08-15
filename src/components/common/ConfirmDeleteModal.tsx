import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface ConfirmDeleteModalProps {
    show: boolean;
    title?: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
    show,
    title = "Confirmar acción",
    message,
    confirmText = "Confirmar",
    cancelText = "Cancelar",
    onConfirm,
    onCancel,
}) => {
    return (
        <Modal show={show} onHide={onCancel} centered>
            {title && <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
        </Modal.Header>}
        <Modal.Body>
            <p>{message}</p>
        </Modal.Body>
        <Modal.Footer>
            <Button variant='secondary' onClick={onCancel}>
                {cancelText}
            </Button>
            <Button variant='danger' onClick={onConfirm}>
                {confirmText}
            </Button>
        </Modal.Footer>
        </Modal>
  );
};

export default ConfirmDeleteModal;
