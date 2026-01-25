DEV_COMPOSE_FILE=docker-compose.dev.yaml

.PHONY: up-dev build-dev down-dev restart-dev start-dev stop-dev

# Собрать образы (только изменённые или отсутствующие)
build-dev:
	docker compose -f $(DEV_COMPOSE_FILE) build

stop-dev:
	docker compose -f ${DEV_COMPOSE_FILE} stop

start-dev:
	docker compose -f ${DEV_COMPOSE_FILE} start

# Запустить все сервисы, если нужно — пересоберёт образы
up-dev:
	docker compose -f $(DEV_COMPOSE_FILE) up -d --build

# Остановить и удалить все контейнеры, сети, тома, созданные compose
down-dev:
	docker compose -f $(DEV_COMPOSE_FILE) down

# Быстрый рестарт (сборка + перезапуск)
restart-dev: build down up
