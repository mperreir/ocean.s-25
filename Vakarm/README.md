# Projet Bruit Sous-Marin (Multi-écrans)

Ce projet vise à illustrer l’impact du bruit (navires classiques / navires Greenov) sur les espèces marines, avec une sélection de **zones maritimes** affichées sur une carte **Leaflet**, puis une **simulation p5.js** (Oceansim) où l’on observe le niveau de bruit et le comportement des poissons.

## 1. Installation & Dépendances

### 1.1. Dépendances Node
- **Node.js** (≥ 14) et **npm** (≥ 6)
- **express** : Framework web
- **socket.io** : Communication temps réel
- **ejs** : Moteur de templates
- (Optionnel) **chart.js** (côté client) pour la jauge
- (Optionnel) **leaflet** (côté client) pour la carte
- (Optionnel) **p5** (côté client) pour la simulation

Installation rapide :
```bash
npm init -y
npm install express socket.io ejs
npm install --save-dev nodemon
```

### 1.2. Fichiers statiques côté client
- `leaflet` (CDN ou local)
- `chart.js` (CDN ou local)
- `p5.js` (CDN ou local)
- images (poissons, navires…) dans `public/media/`

## 2. Lancement du serveur

1. **Installer** les dépendances :
   ```bash
npm init -y
npm install express socket.io ejs
npm install --save-dev nodemon
   ```
2. **Démarrer** en local :
   ```bash
   node app.js
   ```

3. **Aller** dans ton navigateur sur [http://localhost:3000](http://localhost:3000) vous pouvez modifier votre adresse.

4. **Sur la page ocean, liser et respecter les consignes**
Instructions :
      1. Poussez le slider Classique jusqu’à 4 et observez le comportement des poissons. Regardez aussi la page Infos pour voir le niveau de bruit.

      2. Continuez avec le slider Classique jusqu’à 6, vérifiez le comportement.

      3. Rentrer le slider Classique (0) et faites la même chose avec le slider Greenov et comparez l'impact.

      4. Poussez finalement le slider Classique au max pour voir la différence
      et comment la solution Greenov peut aider.