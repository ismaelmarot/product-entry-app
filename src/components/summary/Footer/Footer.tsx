import { type JSX } from 'react';
import { getCurrentYear } from '../../../helpers/getCurrentYear';

function Footer(): JSX.Element {
    return (
        <footer className='container py-3 border-top' style={{ fontSize: '.8rem' }}>
            <div className='row align-items-center text-center text-md-start'>
                <div className='col-12 col-md-6 mb-2 mb-md-0'>
                <p className='mb-0'>
                    © {getCurrentYear()} Designed and developed by Ismael Marot. All rights reserved.
                </p>
                </div>
                <div className='col-12 col-md-6'>
                    <nav className='d-flex justify-content-center justify-content-md-end'>
                        <a href='/legal' className='px-2 text-decoration-none'>Legal</a>
                        <span className='d-none d-md-inline'>|</span>
                        <a href='/terms' className='px-2 text-decoration-none'>Terms of Use</a>
                    </nav>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
