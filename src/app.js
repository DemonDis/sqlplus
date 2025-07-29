const oracledb = require('oracledb');

// Конфигурация подключения
const dbConfig = {
  connectString: 'localhost:1521/XEPDB1', // или FREEPDB1 для 23c
  user: 'system',
  password: 'yourpassword'
};

async function runTest() {
  let connection;

  try {

    oracledb.autoCommit = true;
    oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

    console.log('Connecting to Oracle Database...');
    connection = await oracledb.getConnection(dbConfig);

    // Тестовые запросы...
    const result = await connection.execute(
      `SELECT * FROM v$version WHERE banner LIKE 'Oracle%'`
    );
    console.log('\nOracle Database Version:', result.rows[0].BANNER);

  } catch (err) {
    console.error('ERROR:', err);
  } finally {
    if (connection) {
      try {
        await connection.close();
        console.log('\nConnection closed');
      } catch (err) {
        console.error('Error closing connection:', err);
      }
    }
  }
}

runTest();
