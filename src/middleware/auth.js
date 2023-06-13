export default function({store, redirect, app}){
    const jwt = app.$cookies.get('jwt');
    if (jwt) {
      store.commit('auth/setJwt', jwt);
      store.commit('auth/setLoggedIn', true);
    } else {
    //   redirect('/login'); 
    }
  }
  