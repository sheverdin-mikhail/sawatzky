import { AppRouter } from './router';
import { Header } from 'widgets/Header/Header';
import { Sidebar } from 'widgets/Sidebar';
import { useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserAuthData, getUserInited, userActions } from 'entities/User';
import { useSelector } from 'react-redux';

function App() {

  const isAuth = useSelector(getUserAuthData)
  const dispatch = useAppDispatch()
  const inited = useSelector(getUserInited)

  useEffect(()=>{
    dispatch(userActions.initAuthData())
  },[dispatch])
  

  

  return (
    <div className="App">
      { isAuth && <Header />  }
      <div className="content-page">
        { isAuth && <Sidebar />  }
        
        {
          inited && <AppRouter />
        }
      </div>

    </div>
  );
}

export default App;
