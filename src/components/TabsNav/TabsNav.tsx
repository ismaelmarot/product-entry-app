import { NavLink } from 'react-router-dom';

export default function TabsNav() {
  const tabs = [
    { to: '/general', label: '1. Información general' },
    { to: '/productor', label: '2. Datos del productor' },
    { to: '/productos', label: '3. Productos' },
    { to: '/final', label: '4. Final / PDF' },
  ];

  return (
    <ul className='nav nav-tabs mt-3'>
      {tabs.map(t => (
        <li className='nav-item' key={t.to}>
          <NavLink
            to={t.to}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            {t.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
