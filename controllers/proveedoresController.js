const db= require('../db/connetion');

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
  return res.status(500).send(err);
}
    res.status(201).json({ message: 'Proveedor Insertado', id: result.insertId });    
  });
};
module.exports={crearProveedor};