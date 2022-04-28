help: ## display this help message
	@echo 'usage: make [target]'
	@echo
	@echo 'targets:'
	@egrep '^(.+)\:\ ##\ (.+)' ${MAKEFILE_LIST} | column -t -c 2 -s ':#'

install: ## install the project
	docker-compose exec -T web bash -c "cd /app && npm install"

start: ## start docker container
	docker-compose up --build -d --remove-orphans

stop: ## stop docker container
	docker-compose down

restart: ## restart docker container
	docker-compose restart

bash: ## run bash in docker container
	docker-compose exec -T ${PROJECT_NAME}-web bash

log: ## display log of web docker container
	docker logs Amethysta-web -f 
