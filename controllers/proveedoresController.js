import db from '../db/connetion.js';


const crearProveedor= async (req,res) =>{
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
    const values = [RazonSocial, Codigo, Direccion, CondicionIVA, Telefono, CBU, Correo];
      try {
          const [result] = await db.query(sql, values);
          res.status(201).json({ message: 'Proveedor insertado',id: result.insertId});
      }
      catch(err)
      {
         console.error('Error al insertar Proveedor:', err);
          if (err.code==='ER_DUP_ENTRY')
            {
              return res.status(400).json({message: 'Proveedor con Razon social, CUIT o Codigo repetido'});
            }
          return res.status(500).send(err);
      }
};

 const obtenerProveedores = async (req, res) => {
  const sql = 'SELECT IdProveedor, RazonSocial, Codigo, Direccion, Correo, Telefono, CBU, CondicionIVA FROM Proveedores';

  try {
  const [result] = await db.query(sql);
    res.json(result);
  }
  catch (err)
  {
    console.error('Error al listar Proveedores:', err);
    return res.status(500).json({ message: 'Error en el servidor' });
  }

};
const actualizarProveedor = async (req, res) => {
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

    try {
          await db.query(sql, values);
          res.json({ message: 'Proveedor actualizado correctamente' });
    }
    catch (err) {
        console.error('Error al actualizar Proveedor:', err);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const eliminarProveedor = async (req, res) => {
      const sql = `
      DELETE FROM Proveedores    
      WHERE IdProveedor = ?
  `;
  const { id } = req.params;
  try {
      await db.query(sql, [id]);
      res.status(200).json({ message: 'Proveedor eliminado' });
  }
  catch (err) {
      console.error('Error al eliminar proveedor:', err);
      return res.status(500).json({ message: 'Error interno del servidor' });
  }
};
export {
  crearProveedor,
  obtenerProveedores,
  eliminarProveedor,
  actualizarProveedor
};