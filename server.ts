import http from 'http';
import handler from './api/pqrs';

const server = http.createServer((req, res) => {
  // Mock VercelResponse structure (status and json functions)
  const resMock: any = res;
  resMock.status = (statusCode: number) => {
    res.statusCode = statusCode;
    return resMock;
  };
  resMock.json = (data: any) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
    return resMock;
  };

  // Parse URL to check paths
  const url = new URL(req.url || '', `http://${req.headers.host}`);

  if (url.pathname === '/api/pqrs') {
    handler(req, resMock);
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Endpoint no encontrado' }));
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`\n🚀 [Backend Local] Servidor de API corriendo en http://localhost:${PORT}`);
  console.log(`👉 Consulta los datos en http://localhost:${PORT}/api/pqrs\n`);
});
