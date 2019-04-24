routes = [
  {
    path: '/',
    url: './index.html',
  },
  {
    path: '/about/',
    url: './pages/about.html',
  },
  {
    path: '/dashboard_ronda/',
    url: './pages/dashboard_ronda.html',
  },
  {
    path: '/ronda/',
    url: './pages/ronda.html',
  },
  {
    path: '/pontos/',
    url: './pages/pontos.html',
  },
  {
    path: '/rota/',
    url: './pages/rota.html',
  },
  {
    path: '/index/',
    url: './index.html',
  },
  // Page Loaders & Router
  {
    path: '/page-loader-template7/:user/:userId/:posts/:postId/',
    templateUrl: './pages/page-loader-template7.html',
  },
  {
    path: '/page-loader-component/:user/:userId/:posts/:postId/',
    componentUrl: './pages/page-loader-component.html',
  },
  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];
