import fs from 'fs';
import path from 'path';

export default function handler(req: any, res: any) {
  try {
    const filePath = path.join(process.cwd(), 'data', 'pqrs.json');
    const fileData = fs.readFileSync(filePath, 'utf-8');
    const pqrs = JSON.parse(fileData);

    // Configuración de CORS y tipo de contenido
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    return res.status(200).json(pqrs);
  } catch (error) {
    console.error('Error al leer el archivo de PQRS:', error);
    return res.status(500).json({ error: 'Error interno del servidor al leer los datos de PQRS' });
  }
}
