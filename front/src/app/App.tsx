import { useLocation } from 'react-router-dom';
import { AppRouter } from './router';
import { Header } from 'widgets/Header/Header';
import { Sidebar } from 'widgets/Sidebar';
import { useEffect, useState } from 'react';
import { RoutePath } from 'shared/config/RouteConfig/appRouteConfig';

function App() {

  const { pathname } = useLocation()
  const [isLogin, setIsLogin] = useState<boolean>(false)
  

  useEffect(()=>{
    // if(pathname === RoutePath.authorization){
    //   setIsLogin(true)
    // }else{
    //   setIsLogin(false)
    // }
  }, [pathname])

  return (
    <div className="App">
      <Header/>
      <div className="content-page">
        {/* { !isLogin && } */}
        <Sidebar /> 
        <AppRouter />
      </div>

    </div>
  );
}

export default App;
