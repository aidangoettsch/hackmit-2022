APP_NAME = hackmit-2022
DOCKERFILES = $(shell find -name 'Dockerfile')
.PHONY: $(DOCKERFILES)

all: docker-images deploy

docker-images: $(DOCKERFILES)
	echo $(DOCKERFILES)

$(DOCKERFILES): %/Dockerfile: %
	docker build -t invincibot/$(APP_NAME)-$< $<
	docker push invincibot/$(APP_NAME)-$<

deploy:
	docker-compose up