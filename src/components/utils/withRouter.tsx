import { useLocation, useNavigate, useParams } from "react-router-dom";

// Типизация для пропсов компонента
interface WithRouterProps {
  router: {
    location: ReturnType<typeof useLocation>;
    navigate: ReturnType<typeof useNavigate>;
    params: ReturnType<typeof useParams>;
  };
}

// Обёртка для использования хуков React Router v6 в классовых компонентах
function withRouter<T>(Component: React.ComponentType<T>) {
  function ComponentWithRouterProp(props: T) {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();

    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}

export default withRouter;
