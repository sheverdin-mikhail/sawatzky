
create_volumes:
	cd back && docker volume create auto_back_static && docker volume create auto_back_static

#Создать пользователя для админки
create_super_user:
	cd back && docker exec -it swatzky_back_1 python3 manage.py createsuperuser

#Сделать миграции в бд
back_migrate:
	cd back && docker exec -it swatzky_back_1 python3 manage.py migrate

#Создать приложение 
back_migrate:
	cd back && docker exec -it swatzky_back_1 python3 manage.py migrate

#Включить celery
up_celery:

#Собрать и поднять контейнеры приложения
up_app:
	cd back && docker-compose -f docker-compose.dev.yml up --build

#Поднять собранные контейнеры
start_app:
	cd back && docker-compose -f docker-compose.dev.yml start

#Отключить контейнеры приложения 
down_app:
	cd back && docker-compose -f docker-compose.dev.yml down