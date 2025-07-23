import React, { useEffect, useState } from 'react';
import { getAgencies, saveAgencies } from './api';
import { Table, Button, Form, Alert, Spinner } from 'react-bootstrap';

export default function AgenciesEditor() {
  const [agencies, setAgencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    getAgencies()
      .then(data => {
        setAgencies(data);
        setLoading(false);
      })
      .catch(e => {
        setError('Error cargando agencias');
        setLoading(false);
      });
  }, []);

  const handleChange = (index, field, value) => {
    const updated = [...agencies];
    updated[index][field] = value;
    setAgencies(updated);
    setSuccess(false);
  };

  const handleSave = () => {
    setSaving(true);
    setError(null);
    saveAgencies(agencies)
      .then(() => {
        setSuccess(true);
      })
      .catch(e => {
        setError('Error guardando agencias: ' + e.message);
      })
      .finally(() => setSaving(false));
  };

  if (loading) return <Spinner animation="border" variant="primary" />;

  return (
    <div>
      <h2>Editar Agencias</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">Agencias guardadas con éxito</Alert>}

      <Button
        variant="primary"
        onClick={handleSave}
        disabled={saving}
        className="mb-3"
      >
        {saving ? 'Guardando...' : 'Guardar Agencias'}
      </Button>

      <Table bordered hover responsive>
        <thead className="table-secondary">
          <tr>
            <th>ID Agencia</th>
            <th>Nombre Agencia</th>
            <th>URL Agencia</th>
            <th>Zona Horaria</th>
          </tr>
        </thead>
        <tbody>
          {agencies.map((agency, idx) => (
            <tr key={agency.agency_id ?? idx}>
              <td>
                <Form.Control
                  type="text"
                  value={agency.agency_id ?? ''}
                  onChange={e => handleChange(idx, 'agency_id', e.target.value)}
                  placeholder="agency_id"
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={agency.agency_name ?? ''}
                  onChange={e => handleChange(idx, 'agency_name', e.target.value)}
                  placeholder="agency_name"
                />
              </td>
              <td>
                <Form.Control
                  type="url"
                  value={agency.agency_url ?? ''}
                  onChange={e => handleChange(idx, 'agency_url', e.target.value)}
                  placeholder="https://"
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={agency.agency_timezone ?? ''}
                  onChange={e =>
                    handleChange(idx, 'agency_timezone', e.target.value)
                  }
                  placeholder="Europe/Madrid"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
