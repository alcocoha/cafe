// ============
// Puerto
// ============

process.env.PORT = process.env.PORT || 3000;


// ============
// Entorno
// ============

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// ============
// Base de datos
// ============

let URLDB = 'mongodb+srv://jorgehurtado:Xc2xMnK4fNPdJlPo@cluster0.j4s6n.mongodb.net/cafe';

if( process.env.NODE_ENV === 'dev' ){
    URLDB = 'mongodb://localhost:27017/cafe';
}

process.env.URLDB = URLDB;