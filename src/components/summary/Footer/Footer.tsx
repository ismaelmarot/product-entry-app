import { type JSX } from 'react';
import { getCurrentYear } from '../../../helpers/getCurrentYear';

function Footer(): JSX.Element {
    return (
        <footer className='text-center py-4 border-t mt-6 text-sm'>
            <p>© {getCurrentYear()} Designed and developed by ismael Marot. All rights reserved.</p>
            <nav className='mt-2 space-x-2'>
                <a href='/terms' className='hover:underline'>Terms of Use</a> |
                <a href='/legal' className='hover:underline'>Legal</a> | 
            </nav>
        </footer>
    );
}

export default Footer;
