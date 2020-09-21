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

let URLDB = process.env.MONGO_URI;

if( process.env.NODE_ENV === 'dev' ){
    URLDB = 'mongodb://localhost:27017/cafe';
}

process.env.URLDB = URLDB;