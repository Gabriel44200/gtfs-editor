import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { getStops, saveStops } from './api';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-shadow.png',
});

export default function StopsEditor() {
  const [stops, setStops] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    getStops()
      .then(setStops)
      .catch(e => console.error('Error fetching stops:', e));
  }, []);

  const handleChange = (index, field, value) => {
    const updated = [...stops];
    updated[index][field] = value;
    setStops(updated);
  };

  const handleSave = () => {
    saveStops(stops)
      .then(() => alert('Guardado con éxito'))
      .catch(e => alert('Error guardando: ' + e.message));
  };

  const handleStopClick = (idx) => {
    setSelectedIndex(idx);
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Columna izquierda: lista + botón guardar */}
      <div
        style={{
          width: '200px',
          backgroundColor: '#f0f0f0',
          borderRight: '1px solid #ccc',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            padding: '1rem',
            borderBottom: '1px solid #ccc',
            backgroundColor: '#f0f0f0',
            flexShrink: 0,
          }}
        >
          <h3 style={{ margin: '0 0 0.5rem 0' }}>Paradas</h3>
          <button onClick={handleSave} style={{ width: '100%' }}>
            Guardar
          </button>
        </div>
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            overflowY: 'auto',
            flexGrow: 1,
          }}
        >
          {stops.map((stop, idx) => (
            <li
              key={stop.stop_id ?? idx}
              onClick={() => handleStopClick(idx)}
              style={{
                padding: '0.5rem',
                cursor: 'pointer',
                backgroundColor: selectedIndex === idx ? '#ddd' : 'transparent',
                borderRadius: '4px',
                marginBottom: '0.25rem',
                userSelect: 'none',
              }}
            >
              {stop.stop_name || 'Sin nombre'}
            </li>
          ))}
        </ul>
      </div>

      {/* Editor */}
      {selectedIndex !== null && stops[selectedIndex] && (
        <div
          style={{
            width: '300px',
            backgroundColor: '#fafafa',
            padding: '1rem',
            borderRight: '1px solid #ccc',
            overflowY: 'auto',
          }}
        >
          <h3>Editar parada</h3>
          <div style={{ marginBottom: '1rem' }}>
            <label>
              <strong>ID:</strong> {stops[selectedIndex].stop_id || 'N/A'}
            </label>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>
              Nombre:
              <input
                type="text"
                value={stops[selectedIndex].stop_name || ''}
                onChange={(e) =>
                  handleChange(selectedIndex, 'stop_name', e.target.value)
                }
                style={{ width: '100%', marginTop: '0.25rem' }}
              />
            </label>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>
              Latitud:
              <input
                type="number"
                value={stops[selectedIndex].stop_lat || ''}
                onChange={(e) =>
                  handleChange(selectedIndex, 'stop_lat', e.target.value)
                }
                style={{ width: '100%', marginTop: '0.25rem' }}
              />
            </label>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>
              Longitud:
              <input
                type="number"
                value={stops[selectedIndex].stop_lon || ''}
                onChange={(e) =>
                  handleChange(selectedIndex, 'stop_lon', e.target.value)
                }
                style={{ width: '100%', marginTop: '0.25rem' }}
              />
            </label>
          </div>
          <button onClick={() => setSelectedIndex(null)}>Cerrar</button>
        </div>
      )}

      {/* Mapa */}
      <div
        style={{
          flexGrow: 1,
          height: '100vh',
          transition: 'margin-left 0.3s ease',
        }}
      >
        <MapContainer
          style={{ height: '100%', width: '100%' }}
          center={[43.37, -8.4]}
          zoom={13}
          scrollWheelZoom={true}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {stops.map((stop, idx) => {
            if (!stop.stop_lat || !stop.stop_lon) return null;
            const position = [parseFloat(stop.stop_lat), parseFloat(stop.stop_lon)];
            return (
              <Marker
                key={stop.stop_id ?? idx}
                position={position}
                eventHandlers={{
                  click: () => setSelectedIndex(idx),
                  contextmenu: (e) => {
                    e.originalEvent.preventDefault();
                    setSelectedIndex(idx);
                  },
                }}
              >
                <Popup>{stop.stop_name}</Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}
