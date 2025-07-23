import React, { useEffect, useState } from 'react';
import { getCalendar, saveCalendar } from './api';
import { Table, Button, Form, Alert, Spinner } from 'react-bootstrap';

const PAGE_SIZE = 10; // filas por página

function yyyymmddToDateInput(value) {
  if (!value || value.length !== 8) return '';
  return value.slice(0,4) + '-' + value.slice(4,6) + '-' + value.slice(6,8);
}

function dateInputToYYYYMMDD(value) {
  if (!value || value.length !== 10) return '';
  return value.replace(/-/g, '');
}

export default function CalendarEditor() {
  const [calendar, setCalendar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getCalendar()
      .then(data => {
        const converted = data.map(row => ({
          ...row,
          monday: row.monday === '1' || row.monday === 1,
          tuesday: row.tuesday === '1' || row.tuesday === 1,
          wednesday: row.wednesday === '1' || row.wednesday === 1,
          thursday: row.thursday === '1' || row.thursday === 1,
          friday: row.friday === '1' || row.friday === 1,
          saturday: row.saturday === '1' || row.saturday === 1,
          sunday: row.sunday === '1' || row.sunday === 1,
          start_date: yyyymmddToDateInput(row.start_date),
          end_date: yyyymmddToDateInput(row.end_date),
        }));
        setCalendar(converted);
        setLoading(false);
      })
      .catch(err => {
        setError('Error al cargar el calendario: ' + err.message);
        setLoading(false);
      });
  }, []);

  const handleChange = (i, field, value) => {
    const updated = [...calendar];
    updated[i][field] = value;
    setCalendar(updated);
    setSuccess(false);
  };

  const handleCheckboxChange = (i, field, checked) => {
    const updated = [...calendar];
    updated[i][field] = checked;
    setCalendar(updated);
    setSuccess(false);
  };

  const handleSave = () => {
    setSaving(true);
    setError(null);

    const toSave = calendar.map(row => ({
      ...row,
      monday: row.monday ? '1' : '0',
      tuesday: row.tuesday ? '1' : '0',
      wednesday: row.wednesday ? '1' : '0',
      thursday: row.thursday ? '1' : '0',
      friday: row.friday ? '1' : '0',
      saturday: row.saturday ? '1' : '0',
      sunday: row.sunday ? '1' : '0',
      start_date: dateInputToYYYYMMDD(row.start_date),
      end_date: dateInputToYYYYMMDD(row.end_date),
    }));

    saveCalendar(toSave)
      .then(() => setSuccess(true))
      .catch(e => setError('Error al guardar: ' + e.message))
      .finally(() => setSaving(false));
  };

  if (loading) return <Spinner animation="border" variant="primary" />;

  const totalPages = Math.ceil(calendar.length / PAGE_SIZE);
  const startIndex = (page - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const pageItems = calendar.slice(startIndex, endIndex);

  return (
    <div>
      <h2>Editar Calendario</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">Calendario guardado con éxito</Alert>}

      <Button variant="primary" onClick={handleSave} disabled={saving} className="mb-3">
        {saving ? 'Guardando...' : 'Guardar Calendario'}
      </Button>

      <Table bordered hover responsive>
        <thead className="table-secondary">
          <tr>
            <th>service_id</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
            <th>Sun</th>
            <th>start_date</th>
            <th>end_date</th>
          </tr>
        </thead>
        <tbody>
          {pageItems.map((row, i) => (
            <tr key={row.service_id ?? (startIndex + i)}>
              <td>
                <Form.Control
                  type="text"
                  value={row.service_id ?? ''}
                  onChange={e => handleChange(startIndex + i, 'service_id', e.target.value)}
                  placeholder="service_id"
                />
              </td>
              {['monday','tuesday','wednesday','thursday','friday','saturday','sunday'].map(day => (
                <td key={day} className="text-center align-middle">
                  <Form.Check
                    type="checkbox"
                    checked={!!row[day]}
                    onChange={e => handleCheckboxChange(startIndex + i, day, e.target.checked)}
                    aria-label={day}
                  />
                </td>
              ))}
              <td>
                <Form.Control
                  type="date"
                  value={row.start_date ?? ''}
                  onChange={e => handleChange(startIndex + i, 'start_date', e.target.value)}
                />
              </td>
              <td>
                <Form.Control
                  type="date"
                  value={row.end_date ?? ''}
                  onChange={e => handleChange(startIndex + i, 'end_date', e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <Button
          variant="secondary"
          onClick={() => setPage(p => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Anterior
        </Button>

        <span>Página {page} de {totalPages}</span>

        <Button
          variant="secondary"
          onClick={() => setPage(p => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}
