import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export function useSuperAdminRedirect() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkSuperAdmin() {
      try {
        const response = await fetch('/api/superadmin/exist');
        if (!response.ok) {
          throw new Error('Error al comprobar el estado del superadministrador.');
        }
        const data = await response.json();
        if (!data.adminExists && location.pathname !== '/superadmin') {
          navigate('/superadmin', { replace: true });
        }
      } catch (error) {
        console.error('Error en la comprobación del superadmin:', error);
      } finally {
        setLoading(false);
      }
    }
    checkSuperAdmin();
  }, [navigate, location.pathname]);

  return loading;
}
