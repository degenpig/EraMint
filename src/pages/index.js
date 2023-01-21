
import Home01 from './Home01';
import AboutUs from './AboutUs';
import Collection from './Collection';
import NFTs from './NFTs';

const routes = [
  { path: '/', component: <Home01 />},
  { path: '/about', component: <AboutUs />},
  { path: '/collection', component: <Collection />},
  { path: '/mynft',component:<NFTs />}
]

export default routes;