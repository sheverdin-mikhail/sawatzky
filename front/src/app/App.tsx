import { Header } from 'widgets/Header/Header';
import { Sidebar } from 'widgets/Sidebar';
import { useEffect, useRef } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserAuthData, getUserInited, userActions } from 'entities/User';
import { useSelector } from 'react-redux';
import { useUserData } from 'shared/lib/hooks/useUserData/useUserData';
import { notificationsActions } from 'features/Notifications';
import { AppRouter } from './router';

const App = () => {
  const isAuth = useSelector(getUserAuthData);
  const dispatch = useAppDispatch();
  const inited = useSelector(getUserInited);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    dispatch(userActions.initAuthData());
  }, [dispatch]);

  const { tokens } = useUserData();

  useEffect(() => {
    const connectWebSocket = () => {
      const url = `ws://77.223.126.233/ws/applications?token=${tokens?.access}`;
      socketRef.current = new WebSocket(url);
      socketRef.current.onopen = () => {
      };
      socketRef.current.onclose = (event) => {
        if (event.code === 1000) {
          // Соединение закрыто нормально, нет необходимости повторного подключения
        } else {
          // Соединение закрыто с ошибкой или другим способом, попробуйте переподключиться
          setTimeout(connectWebSocket, 3000); // Повторное подключение через 3 секунды (или другой интервал)
        }
      };

      socketRef.current.onmessage = (event) => {
        const { action, data: jsonData } = JSON.parse(event.data);
        if (action === 'newApplication') {
          const data = JSON.parse(jsonData);
          dispatch(notificationsActions.addNewNotification({
            id: data.id,
            name: `Новый запрос №${data.id}`,
          }));
        }
      };
    };

    if (isAuth) {
      connectWebSocket();
    }

    return () => {
      // При размонтировании компонента или изменении зависимостей, закрываем сокет
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [tokens, isAuth, dispatch]);

  return (
    <div className="App">
      { isAuth && <Header /> }
      <div className="content-page">
        { isAuth && <Sidebar /> }

        {
          inited && <AppRouter />
        }
      </div>
    </div>
  );
};

export default App;
