require('dotenv').config();
const oracledb = require('oracledb');

// Конфигурация из .env
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECT_STRING,
};

// Настройки oracledb
oracledb.autoCommit = true;
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
oracledb.initOracleClient({ driverThin: true }); // Для Thin-режима (без Oracle Client)

async function runTest() {
  let connection;

  try {
    console.log('Connecting to Oracle Database...');
    connection = await oracledb.getConnection(dbConfig);

    // 1. Проверка версии
    const version = await connection.execute(
      `SELECT * FROM v$version WHERE banner LIKE 'Oracle%'`
    );
    console.log('Oracle Version:', version.rows[0].BANNER);

    // 2. Создание тестовой таблицы (если не существует)
    await connection.execute(`
      BEGIN
        EXECUTE IMMEDIATE 'CREATE TABLE test_users (
          id NUMBER GENERATED ALWAYS AS IDENTITY,
          name VARCHAR2(100),
          PRIMARY KEY (id)
        )';
      EXCEPTION
        WHEN OTHERS THEN
          IF SQLCODE != -955 THEN -- Таблица уже существует
            RAISE;
          END IF;
      END;
    `);

    // 3. Вставка данных
    await connection.execute(
      `INSERT INTO test_users (name) VALUES (:name)`,
      ['Alice']
    );

    // 4. Чтение данных
    const result = await connection.execute(
      `SELECT * FROM test_users`
    );
    console.log('Test Users:', result.rows);

  } catch (err) {
    console.error('ERROR:', err);
  } finally {
    if (connection) {
      try {
        await connection.close();
        console.log('Connection closed');
      } catch (err) {
        console.error('Error closing connection:', err);
      }
    }
  }
}

runTest();