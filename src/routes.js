import React from 'react';
import Calender from './views/calender/Calender';


const Tables = React.lazy(() => import('./views/base/tables/Tables'));


const Cards = React.lazy(() => import('./views/base/cards/Cards'));


const BasicForms = React.lazy(() => import('./views/base/forms/BasicForms'));

const FichesPatients = React.lazy(() => import('./views/fichesPatients/FichesPatients'));


const Paginations = React.lazy(() => import('./views/base/paginations/Pagnations'));


const ButtonDropdowns = React.lazy(() => import('./views/buttons/button-dropdowns/ButtonDropdowns'));

const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'));

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'));

const Brands = React.lazy(() => import('./views/icons/brands/Brands'));

const Modals = React.lazy(() => import('./views/notifications/modals/Modals'));

const Users = React.lazy(() => import('./views/users/Users'));
const User = React.lazy(() => import('./views/users/User'));
const Patient = React.lazy(() => import('./views/Patient/Patient'));
const PrintFiche = React.lazy(() => import('./views/fichesPatients/PrintFiche'));
const Ordonnances = React.lazy(() => import('./views/ordonnances/Ordonnances'));
const PrintOrdonnance = React.lazy(() => import('./views/ordonnances/PrintOrdonnance'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/home', name: 'Dashboard', component: Dashboard },
  { path: '/patients', name: 'Patient', component: Patient },

  { path: '/base', name: 'Base', component: Cards, exact: true },
  
  { path: '/base/cards', name: 'Cards', component: Cards },
  { path: '/fiches-patients', name: 'Fiches Patients', component: FichesPatients },
  { path: '/fiche-patient/:id', name: 'Fiche Patient', component: PrintFiche },
  { path: '/ordonnances', name: 'Ordonnances Médicales', component: Ordonnances },
  { path: '/ordonnance/:id', name: 'Ordonnance Médicale', component: PrintOrdonnance },
  { path: '/calender', name: 'Calendrier', component: Calender },
  { path: '/base/forms', name: 'Forms', component: BasicForms },
  { path: '/base/paginations', name: 'Paginations', component: Paginations },
  { path: '/base/tables', name: 'Tables', component: Tables },

  { path: '/buttons', name: 'Buttons', component: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  { path: '/buttons/button-dropdowns', name: 'Dropdowns', component: ButtonDropdowns },


  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
 
  { path: '/icons/brands', name: 'Brands', component: Brands },

  { path: '/notifications/modals', name: 'Modals', component: Modals },

  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User }

];

export default routes;
