import React, { useState } from 'react';
import { getCurrentYear } from '../../helpers/getCurrentYear';
import LegalModal from '../../components/LegalModal/LegalModal';
import TermsModal from '../../components/TermsModal/TermsModal';

const Footer: React.FC = () => {
    const [showLegal, setShowLegal] = useState(false);
    const [showTerms, setShowTerms] = useState(false);

    return (
        <>
        <footer className='container py-3 border-top' style={{ fontSize: '.8rem' }}>
            <div className='row align-items-center text-center text-md-start'>
                <div className='col-12 col-md-6 mb-2 mb-md-0'>
                    <p className='mb-0'>
                    © {getCurrentYear()} Designed and developed by Ismael Marot. All rights reserved.
                    </p>
                </div>
                <div className='col-12 col-md-6'>
                    <nav className='d-flex justify-content-center justify-content-md-end align-items-center'>
                        <button 
                            className='btn btn-link px-2 text-decoration-none' 
                            onClick={() => setShowLegal(true)}
                        >
                            Legal
                        </button>
                        <span className='d-md-inline'>|</span>
                        <button 
                            className='btn btn-link px-2 text-decoration-none'
                            onClick={() => setShowTerms(true)}
                        >
                            Terms of Use
                        </button>
                    </nav>
                </div>
            </div>
        </footer>

        <LegalModal show={showLegal} onClose={() => setShowLegal(false)} />
        <TermsModal show={showTerms} onClose={() => setShowTerms(false)} />
        </>
    );
};

export default Footer;

