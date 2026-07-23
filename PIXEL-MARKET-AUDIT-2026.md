# Audit marché — Pixel Shopify et attribution

Date de vérification : 23 juillet 2026.

## Périmètre

Le marché ne peut pas être résumé à « tous les pixels ». Les solutions comparables se répartissent en trois familles :

1. renvoi de signaux vers les régies publicitaires ;
2. infrastructure de tracking client + server-side ;
3. suites d’attribution et d’analytics e-commerce.

Le benchmark couvre les acteurs Shopify les plus directement comparables et disposant de sources publiques vérifiables. Il ne prétend pas inventorier chaque script ou agence de server-side tagging.

## Benchmark vérifié

| Produit | Positionnement public vérifié | Modèle commercial public | Lecture pour Scaliente |
|---|---|---|---|
| WeTracked | Tracking first-party, enrichissement et renvoi temps réel vers Meta, TikTok, X, Pinterest, Snapchat et Google Ads | À partir de 49 $/mois pour 500 commandes et 3 boutiques | Très orienté qualité du signal envoyé aux régies. Scaliente doit expliquer sa couche profit et ses modèles d’attribution, pas promettre une meilleure précision sans test comparatif. |
| Rapi Tracking | Installation et synchronisation de plusieurs pixels Meta avec événements server-side illimités | Prix affiché sur le Shopify App Store | Cible plus étroite, centrée Meta. La page Scaliente doit rester multi-plateforme et reliée aux coûts Shopify. |
| Triple Whale | Pixel first-party, attribution multi-touch, large surface analytics et nombreuses intégrations | Tarification par plan et périmètre, détails variables selon le niveau | Concurrent de suite analytique. Le message Scaliente doit être plus direct : source → commande → profit, sans revendiquer une supériorité générale. |
| Elevar | Couche de données et tracking server-side Shopify avec monitoring, alertes et accompagnement | 225 $/mois à 3 000 $/mois selon le plan publié | Offre infrastructure/enterprise. Scaliente peut défendre une installation intégrée au produit et une lecture business immédiatement exploitable. |
| Littledata | Data layer Shopify et envoi server-side vers GA4, Google Ads, Meta, TikTok, Pinterest, Klaviyo et autres destinations | Paiement à la commande ou plans à partir de 159 $/mois | Référence tracking/GA4. Scaliente se distingue par son dashboard profit natif et l’attribution déterministe dans la même application. |
| Attribuly | Attribution multi-touch, activation d’audiences, récupération de paniers et intégrations ads/email | Plan gratuit, puis plans payants liés à l’usage/GMV | Offre large et orientée activation. Scaliente ne doit pas promettre la récupération d’audiences ou l’attribution view-through tant que ces fonctions ne sont pas livrées. |

## Sources officielles

- WeTracked : https://www.wetracked.io/pricing
- Rapi Tracking, Shopify App Store : https://apps.shopify.com/rapi-tracking
- Triple Whale Pixel : https://www.triplewhale.com/pixel
- Triple Whale pricing : https://www.triplewhale.com/pricing
- Elevar pricing : https://getelevar.com/pricing-and-plans/
- Littledata plans : https://www.littledata.io/plans
- Littledata server-side architecture : https://help.littledata.io/posts/how-server-side-tracking-works
- Attribuly, Shopify App Store : https://apps.shopify.com/attribuly
- Shopify Web Pixels : https://shopify.dev/docs/apps/build/marketing/pixels

## Positionnement recommandé

### Promesse principale

« Le pixel Shopify qui relie chaque vente à votre profit. »

Cette promesse est défendable car le code produit relie les événements du Web Pixel aux commandes, puis combine le revenu attribué avec les dépenses publicitaires et les coûts utilisés dans le calcul de profit.

### Différenciateurs prouvables

- extension Shopify Web Pixel installée depuis Scaliente ;
- Pixel inclus sans surcoût dans tous les abonnements, y compris Discovery à 0 € (`src/config/plans.js` et absence de verrou de plan sur les routes Pixel) ;
- funnel standard de la page vue à la commande finalisée ;
- collecte des UTM, identifiants de clic et cookies publicitaires disponibles ;
- six modèles déterministes : dernier clic, dernier clic non direct, premier clic, linéaire, décroissance temporelle et position ;
- seuil de fiabilité visible à 60 % de revenu attribué ;
- Meta, Google, TikTok, Pinterest et Snapchat réunis dans Ads Insights ;
- profit par canal remis dans le contexte des coûts produits, frais, livraison et taxes ;
- transmission d’achats server-side disponible pour Meta, TikTok, Snapchat et Pinterest. Google server-side ne doit pas être présenté comme équivalent tant que sa validation de production n’est pas terminée.

### Promesses à ne pas utiliser

- « le meilleur pixel » ou « le pixel le plus précis » ;
- « 100 % des conversions » ou « tracking garanti » ;
- attribution view-through ou post-purchase survey ;
- récupération d’un historique antérieur à l’installation ;
- Google CAPI présenté comme déjà équivalent aux adaptateurs Meta/TikTok/Snapchat/Pinterest ;
- conformité RGPD garantie. Le produit expose des contrôles de consentement, mais le marchand reste responsable de sa configuration.

## Funnel retenu pour la page

1. **Outcome** — relier chaque vente à sa source puis au profit.
2. **Preuve produit** — vraie capture anonymisée d’Ads Insights et chiffres sourcés dans le code.
3. **Mécanisme** — clic/campagne → parcours Shopify → commande → profit.
4. **Couverture** — liste exacte des événements suivis.
5. **Explicabilité** — six modèles et seuil de couverture visible.
6. **Différenciation** — le pixel intégré aux dépenses ads et aux coûts de la boutique.
7. **Réduction du risque** — installation, limites temporelles et FAQ technique.
8. **Conversion** — CTA Shopify après compréhension complète.

## SEO et GEO

- URL canonique conservée : `/[lang]/features/pixel-attribution` ;
- intention principale : pixel Shopify / Shopify pixel ;
- intentions secondaires : attribution Shopify, tracking Shopify, Meta pixel Shopify, attribution multi-touch e-commerce ;
- réponses courtes et autonomes dans la FAQ pour les moteurs de réponse ;
- données structurées `FAQPage` et `BreadcrumbList` ;
- titres explicites, vocabulaire stable et aucune page concurrente créée sur un second slug.
