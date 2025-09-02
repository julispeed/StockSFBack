

CREATE TABLE Familias (
    IdFamilia INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(255) UNIQUE NOT NULL,
    Descripcion VARCHAR(255)
);

CREATE TABLE GruposArticulos (
    IdGrupoArticulo INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(255) UNIQUE NOT NULL,
    Descripcion VARCHAR(255),
    IdFamilia INT NOT NULL,
    FOREIGN KEY (IdFamilia) REFERENCES Familias(IdFamilia)
);

CREATE TABLE Articulos (
    IdArticulo INT AUTO_INCREMENT PRIMARY KEY,
    Descripcion VARCHAR(255) UNIQUE NOT NULL,
    Unidad_medida VARCHAR(100) NOT NULL,
    Codigo_barra VARCHAR(100),
    Codigo VARCHAR(5) UNIQUE NOT NULL,
    Precio DECIMAL(10, 2) NOT NULL,
    Costo DECIMAL(10, 2) NOT NULL,
    IdGrupoArticulos INT NOT NULL,
    FOREIGN KEY (IdGrupoArticulos) REFERENCES GruposArticulos(IdGrupoArticulo) 
);



CREATE TABLE Proveedores (
    IdProveedor INT AUTO_INCREMENT PRIMARY KEY,
    RazonSocial VARCHAR(255) UNIQUE NOT NULL,
    CondicionIVA VARCHAR(255) NOT NULL,
    Direccion VARCHAR(255),
    Codigo VARCHAR(5) UNIQUE NOT NULL,
    Telefono VARCHAR(255),
    CBU VARCHAR(255),
    Correo VARCHAR(255)
);

CREATE TABLE Depositos (
    IdDeposito INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(255) UNIQUE NOT NULL,
    Descripcion VARCHAR(255)
);


CREATE TABLE MovimientosStock (
    IdMovimientoStock INT AUTO_INCREMENT PRIMARY KEY,
    TipoMovimiento VARCHAR(3) NOT NULL,
    Prefijo INT NOT NULL,
    Numero INT NOT NULL,    
    Fecha DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    IdDeposito INT NOT NULL,
    CONSTRAINT CK_TipoMovimiento CHECK (TipoMovimiento IN ('EGR', 'ING', 'AJU', 'DEV', 'REM', 'VEN')),
    FOREIGN KEY (IdDeposito) REFERENCES Depositos(IdDeposito) 
);

CREATE TABLE MovimientosDetalleStock (
    IdMovimientosDetalleStock INT AUTO_INCREMENT PRIMARY KEY,
    IdMovimientoStock INT NOT NULL,
    IdArticulo INT NOT NULL,
    Cantidad INT NOT NULL,
    FOREIGN KEY (IdMovimientoStock) REFERENCES MovimientosStock(IdMovimientoStock),
    FOREIGN KEY (IdArticulo) REFERENCES Articulos(IdArticulo) 
);
