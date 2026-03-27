

# Portfolio Web — GUIRO, Référent Digital

## Vue d'ensemble
Portfolio professionnel SPA avec dark theme, palette bleue #009DD4, typographie Syne + DM Sans, animations fluides et fond grid futuriste. Données gérées via localStorage avec panneau admin protégé par mot de passe.

## Pages & Navigation

### Navigation SPA
- Barre de navigation fixe avec logo GUIRO, liens vers les 5 sections, bouton admin (icône cadenas)
- Navigation fluide avec scroll ou routing interne
- Menu hamburger responsive mobile

### 1. Accueil (Hero)
- Nom "GUIRO" en grand avec titre "Référent Digital"
- Description courte + tags de compétences animés
- Statistiques animées (années d'expérience, projets réalisés, clients satisfaits)
- Boutons CTA : "Voir mes projets" et "Me contacter"
- Fond avec grille futuriste animée (CSS grid lines + subtle glow)

### 2. Profil
- Carte de contact avec photo, nom, rôle, coordonnées
- Timeline verticale des expériences professionnelles
- Section diplômes & certifications
- Barres de compétences avec pourcentage animé
- Grille d'outils & technologies avec icônes

### 3. Services
- Grille de cartes (icône emoji, titre, description, tarif)
- Hover effects avec glow bleu
- Layout responsive 3 colonnes → 1 colonne mobile

### 4. Portfolio
- Filtres par catégorie (Tous, Web, Design, Marketing, etc.)
- Cartes projet avec emoji, titre, tags, description
- Animation de filtrage fluide

### 5. Contact
- Méthodes de contact (email, téléphone, localisation, réseaux sociaux)
- Formulaire : nom, email, sujet, message avec validation
- Toast de confirmation à l'envoi

## Panneau Admin
- Accès via bouton cadenas, protégé par mot de passe (stocké en hash)
- Interface à onglets pour gérer chaque section de données
- Formulaires CRUD pour : profil, expériences, diplômes, compétences, outils, services, projets, contacts/réseaux, tags accueil
- Données persistées en localStorage
- Données par défaut pré-remplies pour GUIRO

## Design System
- Dark theme : fond #0a0a0f, cartes #12121a, bordures subtiles bleu #009DD4
- Couleur accent : #009DD4 avec variations
- Typographie : Syne (titres), DM Sans (corps)
- Animations : fade-in au scroll, compteurs animés, hover glow, barres de progression
- Grid futuriste en fond (lignes fines animées)
- Fully responsive mobile-first

