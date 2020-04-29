import '../styles/main.scss';
import 'bootstrap';
import 'moment';
import 'moment-range';
import firebase from 'firebase/app';
import apiKeys from './helpers/apiKeys.json';
import auth from './components/auth/auth';
import home from './components/home/home';
import staff from './components/staff/staff';
import reservations from './components/reservations/reservations';
import ingredients from './components/ingredients/ingredients';
import menu from './components/menu/menu';
import authData from './helpers/data/authData';
import reportingRevenue from './components/reportingRevenue/reportingRevenue';

const navbarClickEvents = () => {
  $(document).ready(() => {
    $('#brand-logo').click(home.showHomePage);
    $('#staff-button').click(staff.staffInit);
    $('#reservations-button').click(reservations.buildReservationsSection);
    $('#menu-button').click(menu.buildMenuSection);
    $('#ingredients-button').click(ingredients.buildIngredientsSection);
    $('body').on('click', '#reporting-button', reportingRevenue.buildReportingPage);
  });
};

const init = () => {
  $(document).ready(() => {
    $('#login-button').click(auth.signMeIn);
    $('.nav-item').button('toggle');
  });
  firebase.initializeApp(apiKeys.firebaseKeys);
  navbarClickEvents();
  authData.checkLoginStatus();
  authData.logoutEvent();
};

init();
