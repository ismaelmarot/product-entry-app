import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface LegalModalProps {
    show: boolean;
        onClose: () => void;
}

const LegalModal: React.FC<LegalModalProps> = ({ show, onClose }) => {
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Legal</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                Este sitio y la aplicación de carga de productos son proporcionados 
                “tal cual”, sin garantías explícitas ni implícitas, incluyendo pero 
                no limitadas a la idoneidad para un propósito particular...
                </p>
                {/* Agrega aquí todo el texto legal completo */}
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={onClose}>Cerrar</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default LegalModal;
