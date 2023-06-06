# Income and Expences
Income and Expences — приложение для отслеживания расходов и доходов

## Технологии
- ReactJS
- NodeJS
- React Router DOM
- Redux
- React-Redux
- Lodash
- React Toastify
- PropTypes

## Установка
### Требования
 - Docker
 - NodeJS >= 14

### Docker установка
https://www.docker.com/products/docker-desktop/

### Backend установка
- Перейдите в директорию (выполнить из корня приложения)
```sh
cd server
```
 - Установите зависимости
```sh
npm install
```

### Frontend установка
 - Перейдите в директорию (выполнить из корня приложения)
```sh
cd client
```

### Docker настройка
- Перейдите в директорию (выполнить из корня приложения)
- Создайте образ
```sh
docker build -t expenseapp .
```
 - Запустите проект
```sh
docker run -d -p 8080:8080 --name expenseapp --rm expenseapp
```
 - Чтобы останосить проект, используйте команду
```sh
docker stop expenseapp
```
