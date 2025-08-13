# Проверка BD 🎉

### Запустите Oracle XE в Docker
```bash
docker run -d \
  --name oracle-xe \
  -p 1521:1521 \
  -p 5500:5500 \
  -e ORACLE_PWD=yourpassword \
  -e ORACLE_CHARACTERSET=AL32UTF8 \
  -v oracle_data:/opt/oracle/oradata \
  container-registry.oracle.com/database/express:21.3.0-xe
```

### Для Oracle 23c Free (новее версия)
```bash
docker run -d \
  --name oracle-23c-free \
  -p 1521:1521 \
  -p 5500:5500 \
  -e ORACLE_PWD=yourpassword \
  container-registry.oracle.com/database/free:23.3.0.0
```

### Для работы с Docker Compose
```bash
# запустить
docker-compose up -d
# погасить
docker-composer down
```

### Ошибка по timeout
```bash
ERROR: for sqlplus_oracle_1  UnixHTTPConnectionPool(host='localhost', port=None): Read timed out. (read timeout=60)

ERROR: for oracle  UnixHTTPConnectionPool(host='localhost', port=None): Read timed out. (read timeout=60)
ERROR: An HTTP request took too long to complete. Retry with --verbose to obtain debug information.
If you encounter this issue regularly because of slow network conditions, consider setting COMPOSE_HTTP_TIMEOUT to a higher value (current value: 60).
```
### Решение
```bash
export COMPOSE_HTTP_TIMEOUT=120 && docker-compose up --build
```

### Убедитесь, что контейнер запущен
```bash
docker ps
```

### Проверьте, что порт 1521 проброшен
```bash
netstat -tuln | grep 1521
```

#### Technology stack
```bash
# версия node
node -v
# версия docker
docker --version
# Для дистрибутивов на основе Debian/Ubuntu
lsb_release -a
```
- **Lang**: Node **v20.19.3**
- **DOCKER**: Docker version **28.3.2**, build **578ccf6**
- **OC**: Ubuntu **22.04.1 LTS**
