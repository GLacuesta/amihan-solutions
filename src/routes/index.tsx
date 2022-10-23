import { lazy, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const Home = lazy(() => import('../views/Home'));
const Login = lazy(() => import('../views/Login'));
const NotFound = lazy(() => import('../views/NotFound'));

const RoutesHOC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const item = localStorage.getItem('accessToken');
    if (!item && pathname !== '/login') {
      navigate('/login', { replace: true });
    }
  }, [pathname]);

  return (
    <Layout>
      <Routes>
        <Route path="/NotFound" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<Navigate to="/NotFound" replace />} />
      </Routes>
    </Layout>
  );
}

export default RoutesHOC;
