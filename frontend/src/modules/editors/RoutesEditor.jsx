import React, { useEffect, useState } from 'react';
import { getRoutes, saveRoutes } from './api';
import { Table, Button, Form, Alert, Spinner } from 'react-bootstrap';

export default function RoutesEditor() {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    getRoutes()
      .then(data => {
        setRoutes(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Error cargando rutas');
        setLoading(false);
      });
  }, []);

  const handleChange = (index, field, value) => {
    const updated = [...routes];
    updated[index][field] = value;
    setRoutes(updated);
    setSuccess(false);
  };

  const handleSave = () => {
    setSaving(true);
    setError(null);
    saveRoutes(routes)
      .then(() => {
        setSuccess(true);
      })
      .catch(e => {
        setError('Error al guardar rutas: ' + e.message);
      })
      .finally(() => setSaving(false));
  };

  if (loading) return <Spinner animation="border" variant="primary" />;

  return (
    <div>
      <h2>Editar Rutas</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">Rutas guardadas con éxito</Alert>}

      <Button
        variant="primary"
        onClick={handleSave}
        disabled={saving}
        className="mb-3"
      >
        {saving ? 'Guardando...' : 'Guardar Rutas'}
      </Button>

      <Table bordered hover responsive>
        <thead className="table-secondary">
          <tr>
            <th>route_id</th>
            <th>agency_id</th>
            <th>route_short_name</th>
            <th>route_long_name</th>
            <th>route_type</th>
          </tr>
        </thead>
        <tbody>
          {routes.map((route, idx) => (
            <tr key={route.route_id ?? idx}>
              <td>
                <Form.Control
                  type="text"
                  value={route.route_id ?? ''}
                  onChange={e => handleChange(idx, 'route_id', e.target.value)}
                  placeholder="route_id"
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={route.agency_id ?? ''}
                  onChange={e => handleChange(idx, 'agency_id', e.target.value)}
                  placeholder="agency_id"
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={route.route_short_name ?? ''}
                  onChange={e =>
                    handleChange(idx, 'route_short_name', e.target.value)
                  }
                  placeholder="route_short_name"
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={route.route_long_name ?? ''}
                  onChange={e =>
                    handleChange(idx, 'route_long_name', e.target.value)
                  }
                  placeholder="route_long_name"
                />
              </td>
              <td>
                <Form.Control
                  type="number"
                  value={route.route_type ?? ''}
                  onChange={e => handleChange(idx, 'route_type', e.target.value)}
                  placeholder="route_type"
                  min="0"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
