import db from '../db/connetion.js';


const crearProveedor= (req,res) =>{
    const  {
        RazonSocial,
        Codigo,
        Direccion,
        CondicionIVA,       
        Telefono,
        CBU,
        Correo
    }=req.body;
    const sql=`
    INSERT INTO Proveedores
    (
        RazonSocial,
        Codigo,
        Direccion,
        CondicionIVA,       
        Telefono,
        CBU,
        Correo
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(sql, [RazonSocial, Codigo, Direccion, CondicionIVA, Telefono, CBU, Correo], (err, result) => {
  if (err) {
    console.error('Error al insertar Proveedor:', err);
    if (err.code==='ER_DUP_ENTRY')
    {
      return res.status(400).json({message: 'Proveedor con Razon social, CUIT o Codigo repetido'});
    }
    return res.status(500).send(err);
  }
    res.status(201).json({ message: 'Proveedor Insertado', id: result.insertId });    
  });
};

 const obtenerProveedores = (req, res) => {
  const sql = 'SELECT IdProveedor, RazonSocial, Codigo, Direccion, Correo, Telefono, CBU, CondicionIVA FROM Proveedores';
    db.query(sql, (err, results) => {
    if (err) {
      console.error('Error al listar Proveedores:', err);
      return res.status(500).json({ message: 'Error en el servidor' });
    }
    res.json(results);
  });
};
const actualizarProveedor = (req, res) => {
  const { id } = req.params;
  const {
    RazonSocial,
    CondicionIVA,
    Direccion,
    Codigo,
    Telefono,
    CBU,
    Correo
  } = req.body;
  
  const sql = `
    UPDATE Proveedores
    SET RazonSocial = ?, CondicionIVA = ?, Direccion = ?, Codigo = ?, Telefono = ?, CBU = ?, Correo = ?
    WHERE IdProveedor = ?
  `;

  const values = [RazonSocial, CondicionIVA, Direccion, Codigo, Telefono, CBU, Correo, id];

  db.query(sql, values, (err) => {
    if (err) {
      console.error('Error al actualizar Proveedor:', err);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
    res.json({ message: 'Proveedor actualizado correctamente' });
  });
};

const eliminarProveedor =(req, res) => {
      const sql = `
    DELETE FROM Proveedores    
      WHERE IdProveedor = ?
  `;
  const values=req.params.id;  
  db.query(sql, values, (err) => {
    if (err) {
      console.error('Error al eliminar proveedor:', err);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  else
  {
    res.status(201).json({ message: 'Proveedor eliminado'});
  }})
}
export {
  crearProveedor,
  obtenerProveedores,
  eliminarProveedor,
  actualizarProveedor
};