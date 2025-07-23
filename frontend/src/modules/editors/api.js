export async function getStops() {
  const res = await fetch('http://localhost:5000/api/stops');
  if (!res.ok) throw new Error('Error al obtener stops');
  return res.json();
}

export async function saveStops(data) {
  const res = await fetch('http://localhost:5000/api/stops', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al guardar stops');
  return res.json();
}

export async function getAgencies() {
  const res = await fetch('http://localhost:5000/api/agencies');
  if (!res.ok) throw new Error('Error al obtener agencias');
  return res.json();
}

export async function saveAgencies(data) {
  const res = await fetch('http://localhost:5000/api/agencies', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al guardar agencias');
  return res.json();
}

export async function getRoutes() {
  const res = await fetch('http://localhost:5000/api/routes');
  if (!res.ok) throw new Error('Error al obtener rutas');
  return res.json();
}

export async function saveRoutes(data) {
  const res = await fetch('http://localhost:5000/api/routes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al guardar rutas');
  return res.json();
}

export async function getCalendar() {
  const res = await fetch('http://localhost:5000/api/calendar');
  if (!res.ok) throw new Error('Error al obtener calendario');
  return res.json();
}

export async function saveCalendar(data) {
  const res = await fetch('http://localhost:5000/api/calendar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al guardar calendario');
  return res.json();
}
