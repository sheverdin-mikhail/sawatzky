import { useLocation } from 'react-router-dom';
import { AppRouter } from './router';
import { Header } from 'widgets/Header/Header';
import { Sidebar } from 'widgets/Sidebar';
import { useEffect, useState } from 'react';
import { RoutePath } from 'shared/config/RouteConfig/appRouteConfig';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserInited, userActions } from 'entities/User';
import { useSelector } from 'react-redux';

function App() {

  const { pathname } = useLocation()
  const [isLogin, setIsLogin] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const inited = useSelector(getUserInited)

  useEffect(()=>{
    dispatch(userActions.initAuthData())
  },[dispatch])
  

  useEffect(()=>{
    if(pathname === RoutePath.authorization){
      setIsLogin(true)
    }else{
      setIsLogin(false)
    }
  }, [pathname])


  

  return (
    <div className="App">
      { !isLogin && <Header />  }
      <div className="content-page">
        { !isLogin && <Sidebar />  }
        
        {
          inited && <AppRouter />
        }
      </div>

    </div>
  );
}

export default App;
