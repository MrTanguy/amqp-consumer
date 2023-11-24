# Consumer AMQP

Le but de ce projet est d'écouter la queue sur RabbitMQ et d'envoyer un mail à MailHog

## Démarrer avec Docker

- WSL2 : [installation](https://learn.microsoft.com/fr-fr/windows/wsl/install)
- Docker : [installation](https://www.docker.com/products/docker-desktop/)

### Initialisation 

Recupérer le repository via `git clone https://github.com/MrTanguy/amqp-consumer.git`

Se rendre dans le dossier `cd .\amqp-consumer\`

Utiliser la branch dev `git checkout dev`

Lancer la commande `docker-compose up`

Se rendre sur `http://localhost:8025/` pour voir les mails reçus.

Il est important de réaliser le README de ce projet avant de tester celui-là : [amqp-producer](https://github.com/MrTanguy/amqp-producer/tree/dev)

PS : Un nouveau container devrait apparaître dans Docker Desktop