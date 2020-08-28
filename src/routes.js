import React from 'react';
import Calender from './views/calender/Calender';



const FichesPatients = React.lazy(() => import('./views/fichesPatients/FichesPatients'));
const Patient = React.lazy(() => import('./views/Patient/Patient'));
const PrintFiche = React.lazy(() => import('./views/fichesPatients/PrintFiche'));
const Ordonnances = React.lazy(() => import('./views/ordonnances/Ordonnances'));
const PrintOrdonnance = React.lazy(() => import('./views/ordonnances/PrintOrdonnance'));
const Profile = React.lazy(() => import('./views/profile/Profile'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/patients', exact: true,  name: 'Patient', component: Patient },
  { path: '/fiches-patients', exact: true, name: 'Fiches Patients', component: FichesPatients },
  { path: '/fiche-patient/:id', exact: true , name: 'Fiche Patient', component: PrintFiche },
  { path: '/ordonnances', exact: true, name: 'Ordonnances Médicales', component: Ordonnances },
  { path: '/ordonnance/:id', exact: true, name: 'Ordonnance Médicale', component: PrintOrdonnance },
  { path: '/calender',  exact: true, name: 'Calendrier', component: Calender },
  { path: '/profil/:id' , exact: true, name: 'Profil', component: Profile },
  

];

export default routes;
