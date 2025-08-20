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
            <Modal.Body style={{ fontSize:'.7rem', textAlign:'justify' }}>
                <p>
                Este sitio y la aplicación de carga de productos son proporcionados 
                “tal cual”, sin garantías explícitas ni implícitas, incluyendo pero 
                no limitadas a la idoneidad para un propósito particular...
                </p>
             

                <p>Responsable: <span>Ismael Marot</span></p>
                <p>Dirección: La Plata, Buenos Aires, Argentina</p>
                <p>Correo electrónico:
                    <a href='mailto:ismaelmarot@hotmail.com' style={{textDecoration:'none'}}> ismaelmarot@hotmail.com</a>
                </p>

                <p>Sitio web:
                     <a href='https://ismaelmarot.github.io' style={{textDecoration:'none'}}> www.ismaelmarot.github.io</a>
                </p>


## Licencia del código
El código de este sitio web y de los proyectos que contiene se distribuye bajo la **licencia MIT**. Esto permite su uso, copia, modificación y distribución siempre que se mantenga la atribución correspondiente.

## Propiedad intelectual de contenidos
El contenido textual, logotipos y elementos gráficos propios de este sitio no se distribuyen bajo la licencia MIT y permanecen bajo derechos reservados, salvo que se indique expresamente lo contrario.

## Enlaces externos
Este sitio puede contener enlaces a otros sitios web de terceros. No me hago responsable del contenido o de las políticas de privacidad de dichos sitios.

## Privacidad y cookies
Este sitio no recopila datos personales sensibles, salvo los que proporciones voluntariamente (por ejemplo, a través de formularios o correo electrónico).  
Para más información, consulta la [Política de Privacidad](/privacy).

---
**Última actualización:** [fecha]

            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={onClose}>Cerrar</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default LegalModal;
