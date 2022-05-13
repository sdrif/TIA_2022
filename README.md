# TIA_2022
Read me

Dans un premier temps il faut lancer le serveur flask.
Mais avant ca assurez vous d'être bien dans le dossier Flask a l'aide de la commande ```cd <nom du dossier>```. 

Ensuite une fois dans ce fichier, il faudrait créer un environnement virtuel grace a flask comme ceci :

```bash 
py -m venv env
```
(A noté que le nom <env> peut être changé et choisi arbitrairement)
Maintenant, il faut entrer dans l'environnement virtuel :
```bash
env\Scripts\activate
```

Il faut désormais installer les dépendances :
```bash
pip install -r requirements.txt
```

Puis, il faudra donner à flask son fichier python d'entrée comme ceci (ainsi que si vous le désirer d'utiliser le mode debugg pour que flask se rafraichisse automatiquement a chaque fois que vous modifiez votre code):
```bash
set FLASK_APP=app/__init__.py
set FLASK_DEBUG=1
```

Finalement lancez le serveur flask:
```bash
flask run
```

Pour lancer le chatbot, ouvez un nouveau terminal et naviguez dans le dossier <prolog> et effectuer cette commande :
```bash
swipl chatbot.pl
```
