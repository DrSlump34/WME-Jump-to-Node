**Arbitrage de l'audit avancé de WME Jump to Node 0.05.01 : 3 défauts majeurs, 12 mineurs, rien en sécurité**

Fichier audité : C:\Users\drslu\Projets\WME-Jump-to-Node\WME-Jump-to-Node.user.js. Dans ce qui suit, « user.js » désigne ce fichier et « check-idents.js » le contrôle C:\Users\drslu\Projets\WME-Jump-to-Node\tools\check-idents.js. Aucun fichier du projet n'a été modifié.

### 0. Décompte des verdicts

- **Constats remontés par les 11 experts : 58.** 7 ont été réfutés par les réfuteurs. Il en reste 51 : 18 confirmés et 33 requalifiés.
- **Sécurité : 0 constat.** Je retiens ce zéro : les six `innerHTML` ne reçoivent que des constantes et le dictionnaire du script, la longueur passe par `textContent` et `title` (l. 680-681), et le script ne fait aucune requête.
- **Après fusion des doublons et arbitrage, il reste 17 sujets :**
  - 3 majeurs ;
  - 12 mineurs ;
  - 2 que je classe « faible, facultatif » ;
  - 5 points ne peuvent être tranchés que par un geste dans WME : je ne les compte pas ;
  - 9 sont écartés.
- **Écarts de charte déjà connus, cités mais non comptés :**
  - rail éteint de l'interrupteur en #ccc (l. 595, contraste 1,61:1) ;
  - pas de contour de focus sur le curseur (l. 575 et 594) ;
  - pas de pastille de nouvelle version ;
  - pas de lien GitHub au pied (l. 861).

### 1. Collisions tranchées

- **Revenir, gravité (majeur ou mineur).** Maintenabilité le classe mineur (« un clic sur A ou B vous ramène »), les quatre autres experts majeur. **Je retiens majeur.** Le clic sur A ou B ne ramène que près du segment, pas à la vue d'où l'éditeur est parti. Et l'infobulle « là où vous étiez avant » (l. 124) le trompe.
- **Revenir, correction.** Parcours propose `retour = null` à chaque `wme-selection-changed` (l. 923) ; Dépendances le refuse. **Je donne raison à Dépendances.** Cette remise à zéro casserait un usage légitime : sauter en A, sélectionner le segment suivant, sauter encore, puis revenir au départ. Il faut détecter un déplacement de la carte fait à la main.
- **Insécables en français : 11 occurrences (Langues) ou 9 (Charte).** J'ai recompté avec node sur les l. 116-146 : **11**, soit 10 espaces ordinaires devant « : » et 1 devant « ? » (tipLen, l. 126). Il n'y a aucune insécable dans ces lignes. La Charte a sous-compté.
- **Couleur des liens du pied et du titre d'aide ouvert.** L'Accessibilité y voit une décision de charte à prendre pour toute la famille ; la Charte y voit un écart de WJN. **Je donne raison à la Charte.** La CSS de référence (WME-Route-Preview.user.js, copie de publication) utilise #1565c0 pour les deux : `.wrp-help-hdr.on` à la l. 1484, `.wrp-sb-foot a` à la l. 1492. Ce sont donc des écarts de WJN, pas de la charte. En revanche, le h2 et les titres de section en #2196f3, et le pied en #9e9e9e, suivent la charte : une éventuelle correction se décide pour toute la famille.
- **Recalcul complet à chaque mouvement de souris (l. 798).** Robustesse le réfute, Cohabitation le classe nul, Performances mineur. **Je le classe nul** : le seul chiffre est un banc node (0,37 ms pour 100 segments), et les projections du SDK n'ont pas été mesurées. À optimiser seulement après une mesure faite dans WME.
- **Raccourcis muets quand ils n'ont rien à faire.** Robustesse le garde en mineur, Parcours le réfute. **Je l'écarte** : les raccourcis de WME se comportent de la même façon, et les boutons correspondants sont absents ou grisés dans les mêmes cas.

### 2. Doublons fusionnés

- **Revenir jamais remis à zéro :** 5 experts (Exactitude, Robustesse, Parcours, Maintenabilité, Dépendances) ; devient **D1**.
- **check-idents qui ment :** Robustesse et Maintenabilité. J'ai refait les mutations moi-même : `metres` renommée donne « OK — 144 déclarations » ; `new MutationObserver(planifierPlacment)` donne « OK » ; `emprise` renommée est bien détectée. Devient **D2**.
- **Barre de survol qui s'efface sous le pointeur, et limiteur qui traite le premier événement au lieu du dernier :** Accessibilité et Performances, l. 775 à 819. Devient **D3**.
- **Barre du panneau qui exige d'être juste sous l'en-tête :** Cohabitation, Performances et Maintenabilité (l. 715) ; devient **D4**.
- **Bout désigné par A sur une chaîne :** Exactitude, Parcours et Maintenabilité (l. 431-433) ; devient **D5**.
- **Titre d'aide ouvert, liens du pied :** Accessibilité et Charte (l. 607 et 621) ; devient **D6**.
- **Insécables :** Langues et Charte ; devient **D8**.
- **Erreurs avalées sans trace, sélecteur du panneau hors contrat, repli de l'observateur sur `document.body` :** Maintenabilité et Dépendances (l. 648, 710, 796, 829, 926) ; devient **D14**.

### 3. Causes communes

- **Un état qu'on mémorise sans jamais l'invalider.** `retour` (D1) n'est remis à zéro qu'à la l. 502. Le limiteur (D3, l. 819) garde l'événement du début de sa fenêtre de 16 ms. Le `mouseenter` de la barre (l. 775) n'annule qu'une seule minuterie. Même famille de défaut : on retient une valeur sans se demander quand elle cesse d'être vraie.
- **Une règle rigide copiée du jumeau d'avant.** D4 (`previousElementSibling === entete`) : WRP a déjà assoupli la même règle dans sa l. 1816.
- **Un contrôle qui ne voit pas la portée des noms (D2).** check-idents met dans un même ensemble les paramètres et les déclarations (l. 44-47), et ne regarde que les noms suivis de « ( » (l. 52).
- **Des écarts à la CSS de référence WRP (D6, D7, D11).** À corriger d'un coup, en même temps que les écarts de charte déjà connus.

### 4. Angles morts vérifiés moi-même dans le code

- **Correction de D1 et événement `wme-map-move`.** Cet événement se déclenche aussi quand le script déplace lui-même la carte (l. 829 : il ferme la barre de survol après chaque saut). Une remise à zéro branchée sur cet événement effacerait `retour` à chaque saut. Il faut donc comparer dans `memoriser()` la vue courante à la dernière vue posée par le script. Après un `zoomToExtent` (l. 491), le centre et le zoom finaux ne se connaissent qu'après coup : c'est à mesurer dans WME (relire `getMapCenter` et `getZoomLevel` après le cadrage).
- **D3, confirmé en suivant le code.**
  - La barre est ajoutée à `document.body` (l. 777) : les mouvements de souris sur elle ne passent jamais par l'écouteur du viewport (l. 816).
  - Un minuteur de 16 ms armé juste avant que le pointeur n'entre dans la barre, porteur d'une position hors du tracé, réarme le masquage (l. 802) après le `mouseenter` (l. 775). Plus rien ne l'annule ensuite, et la barre disparaît 450 ms plus tard sous le pointeur.
  - Avec une souris à fréquence élevée (8 ms entre deux mouvements), chaque fenêtre de 16 ms couvre deux événements : le cas devient courant.
  - Garder le dernier événement au lieu du premier ne suffit pas. Il faut un drapeau « pointeur sur la barre ».
- **Angle mort nouveau, faible.** Si l'éditeur fait glisser la carte et relâche le bouton hors de la fenêtre du navigateur, `boutonEnfonce` reste vrai (l. 821-822 : `mouseup` écouté sur `window`). La barre de survol ne s'ouvre plus jusqu'au clic suivant. C'est une gêne, je ne le compte pas ; je le note seulement pour la reprise de D3.
- **Rien d'autre ne tient.** Sélection vide ou non-segment, segment en cours de dessin (nœud null), boucle, sélection partiellement chargée (l. 413), zoom restauré par Revenir (l. 501), barre de survol périmée après un raccourci (elle est fermée par `wme-map-move`) : tous ces cas sont sains.

### 5. Liste finale des défauts retenus

**Majeurs**

- **D1. user.js:473 — Revenir ramène à une vue périmée.**
  - Défaut : `if (retour) return;`, et `retour` n'est remis à null qu'à la l. 502. L'éditeur est **envoyé au mauvais endroit**, avec l'ancien zoom, parfois à des kilomètres. L'infobulle `tipBack` (l. 124) le **trompe**.
  - Scénario : un saut non suivi de Revenir, un déplacement à la main, un nouveau saut, puis ↩ ramène au point de départ du premier saut. C'est l'usage courant : on saute au nœud et on y reste pour éditer.
  - Références : heuristiques de Nielsen n° 1 (état visible) et n° 3 (contrôle et liberté).
  - Correction :
    - dans `agir()`, retenir la vue posée par le script ;
    - dans `memoriser()`, si la vue courante s'en écarte (quelques pixels via `getPixelFromLonLat`, ou un zoom différent), remplacer `retour` par la vue courante ;
    - ne **pas** remettre à zéro sur changement de sélection ;
    - mettre à jour `hPanelB` dans les 8 langues.
  - Effort : quelques heures, mesure du centre après `zoomToExtent` comprise.
- **D2. check-idents.js:44-47 et 52 — le contrôle répond « OK » sur le défaut qu'il annonce surveiller (l. 1-3).**
  - Mutations prouvées : `metres` supprimée passe, parce que le paramètre `metres` de `longueur()` (user.js l. 646) la « déclare ». Si `metres()` manque, `pointAMiLongueur` (l. 372) lève une erreur dès la première sélection, et `cibles()` meurt avec le panneau, le survol et les raccourcis. Une fonction passée en valeur (`MutationObserver(X)`, `eventHandler: X`) n'est pas contrôlée non plus.
  - Aujourd'hui, le code livré marche : le défaut est latent, mais c'est la garde de chaque livraison qui ment.
  - Correction :
    - ensemble séparé pour les paramètres ;
    - contrôler aussi les noms passés en valeur ;
    - témoins de mutation obligatoires (au moins `metres` et `planifierPlacement`), dont l'échec est exigé ;
    - en option, contrôler que les 8 dictionnaires ont les mêmes clés.
  - Effort : quelques heures.
- **D3. user.js:775, 802, 816-819 — la barre de survol s'efface sous le pointeur 450 ms après qu'on l'a atteinte.**
  - Impact : la barre devient aléatoire, surtout pour un geste lent ou une souris rapide. Personne n'est envoyé au mauvais endroit. WCAG 2.2 SC 1.4.13 n'est pas respecté sur l'exigence « survolable ».
  - Correction :
    - drapeau `surPop` : vrai au `mouseenter`, faux au `mouseleave` (l. 776) ;
    - ne pas réarmer le masquage de la l. 802 tant que `surPop` est vrai ;
    - au passage, que le limiteur traite le dernier événement de sa fenêtre et non le premier ;
    - remettre `boutonEnfonce` à faux au `mousedown` suivant, ou sur `blur`.
  - Effort : quelques minutes.

**Mineurs**

- **D4. user.js:715 — la barre du panneau exige d'être juste sous l'en-tête.** Latent : aucun script ne se bat avec elle aujourd'hui, mais un futur script aussi rigide ferait boucler les deux barres. Correction : `existante.parentElement === entete.parentElement` et signature inchangée, comme WRP l. 1816. À essayer ensuite dans WME avec WRP chargé, puisque WRP se range sous les barres wjn- (sa l. 1828). Effort : minutes.
- **D5. user.js:431-433 et 631-632 — sur une chaîne dont le premier segment sélectionné est au milieu, le bout désigné par A dépend de l'ordre de sélection.** Le commentaire « pour que A reste stable » est faux dans ce cas. A et B mènent toujours à un vrai bout de la chaîne : c'est au pire un clic de trop. Correction : orienter la chaîne à partir du `fromNodeId` du premier segment, ou au minimum corriger les deux commentaires. Effort : minutes.
- **D6. user.js:607 et 621 — titre d'aide ouvert en #2196f3 sur #e3f2fd (2,74:1, visible dès l'ouverture, l. 858) et liens du pied en #2196f3 (3,12:1), là où WRP met #1565c0.** WCAG 2.2 SC 1.4.3. Correction : `var(--wjn-blue-dk)` aux deux endroits. Effort : minutes.
- **D7. user.js:848-850 — l'interrupteur « Barre au survol » n'a pas de nom accessible.** Le texte est un span frère du label. Un lecteur d'écran annonce « case à cocher » sans dire ce qu'elle règle, et un clic sur le texte ne bascule rien. WCAG 2.2 SC 4.1.2. Correction : `<label for="wjn-survol">` sur la ligne, ou `aria-labelledby`. À reporter dans WRP et WCT si la même structure y existe. Effort : minutes.
- **D8. user.js:122-144 — 11 espaces ordinaires en français** (10 devant « : », 1 devant « ? » à la l. 126). Écart à la charte, qui n'est pas dans la liste des écarts connus : un « : » peut passer seul en début de ligne dans l'onglet. Effort : minutes.
- **D9. user.js:28-30 — `@match https://beta.waze.com/editor*` manque**, alors que la forme équivalente existe pour www (l. 29). Sur la bêta sans code de langue, le script ne se charge pas du tout. Correction : ajouter ce `@match` et le `@exclude …/editor/sdk/*` correspondant. Effort : minutes.
- **D10. user.js:106, 137, 230, etc. — l'aide nomme la pastille « km » dans les 8 langues**, alors qu'elle affiche m, ft ou mi selon la longueur et l'unité choisie. Correction : un libellé neutre traduit. Effort : minutes.
- **D11. user.js:868 — l'onglet Scripts s'appelle « 🎯 » pour un lecteur d'écran.** Selon AccName 1.2, le `title` n'est pas utilisé quand le contenu n'est pas vide. Correction : `aria-label` égal à `SCRIPT_NAME`, et `aria-hidden` sur l'emoji. Même motif à vérifier dans WRP. Effort : minutes.
- **D12. user.js:569 — `pointer-events: none` sur le bouton grisé cache son infobulle `tipBackNone` et son curseur « interdit ».** Le clic est déjà bloqué par `disabled` et par le test de la l. 688. Correction : retirer `pointer-events: none`. Effort : minutes.
- **D13. user.js:664 — hors chaîne, ◎ garde l'infobulle « milieu de la sélection » alors qu'il vise le centre de l'emprise (l. 459).** L'anneau de repère montre toutefois le point réel. Correction : une infobulle dédiée, dans les 8 langues. Effort : minutes.
- **D14. user.js:648, 710-713, 796, 829, 926 — des échecs sans aucune trace en console.** Rien ne casse aujourd'hui : cela ne compte que si le SDK ou le DOM de WME change. Correction : un `log` unique par clé (`logUneFois`), et un log si l'en-tête ou `#edit-panel` est introuvable. Effort : minutes.
- **D15. user.js:227, 232, 236 — l'italien mêle tu et voi.** Correction : tout mettre au tu, en laissant la l. 230 telle quelle. Effort : minutes.

**Faibles, facultatifs**

- **D16. user.js:565 —** au survol, les lettres A et B passent à 3,12:1. Correction : #1976d2, à décider en même temps que WCT, d'où vient ce gabarit.
- **D17. user.js:649 —** l'infobulle formate les nombres selon la langue de l'interface, pas selon la locale complète. La pastille visible juste à côté lève l'ambiguïté.

### 6. À mesurer dans WME (non comptés, un geste de l'auteur chacun)

1. **Priorité : les touches attribuées aux raccourcis survivent-elles à un rechargement ?** Le script crée toujours ses raccourcis avec `shortcutKeys: null` (l. 897) et n'enregistre rien. L'aide invite pourtant à attribuer des touches. Si elles sont perdues, c'est un défaut majeur, et WRP (l. 2420) a le même motif.
2. Échap sur la barre de survol désélectionne-t-il dans WME ? Si oui, retenir l'événement **uniquement** quand la barre est visible.
3. L'anneau de repère (l. 512, remplissage d'opacité nulle) prend-il un clic sur le nœud pendant ses 1,6 s ?
4. Dans quel ordre `sel.ids` arrive-t-il (ordre des clics ou non) ? Cela conditionne D5.
5. Centre et zoom relus juste après `zoomToExtent` : c'est nécessaire à la correction de D1.

### 7. Écartés

- Recalcul du survol à chaque mouvement de souris (pas de coût mesuré).
- Raccourcis muets.
- Focus perdu après Revenir.
- Revenir « inaccessible » hors d'un segment : un clic pour resélectionner le segment suffit. Une phrase d'aide suffit, à ajouter en même temps que D1.
- README sans insécables.
- Icône du titre en 13 px au lieu de 18 px.
- Langue lue sans passer par `getLocale`.
- Barre de survol bornée à la colonne de boutons de la carte : la règle de charte vise une fenêtre durable, pas une bulle passagère.
- Contrôle des clés i18n comme défaut isolé : je l'ai rattaché à D2.

### 8. Ordre des opérations

1. **D2 d'abord**, avec ses témoins de mutation : c'est la garde de toutes les modifications qui suivent.
2. **D1**, avec l'aide `hPanelB` et `tipBack` dans les 8 langues ; faire **D8** dans la même passe sur le dictionnaire français.
3. **D3**, sur la même zone de code (l. 775-822).
4. **D4**, puis un essai dans WME avec WRP chargé.
5. **Passe de charte unique :** D6, D7, D10, D11, D12, D13, D15, avec les écarts connus (rail #8a94a0, contour de focus, pastille de version avec son `@connect`, lien GitHub au pied), puis D9 et D14.
6. Les mesures du § 6, la n° 1 en tête ; ensuite une nouvelle version, en 0.06.00.

### 9. Ce qu'il ne faut PAS faire

- Remettre `retour` à null à chaque changement de sélection : cela casse A, segment suivant, saut, Revenir.
- Détecter le déplacement manuel par `wme-map-move` sans filtre : l'événement se déclenche aussi sur les sauts du script.
- Appeler `stopPropagation` ou `preventDefault` sur Échap sans condition : c'est la leçon du 25/09.
- Recalculer la longueur depuis la géométrie : la pastille divergerait du chiffre affiché par WME.
- Remplacer les lettres A et B par ⇤ ⇥ : il faudrait tout retraduire dans les 8 langues pour presque rien.
- Mettre en cache ou préfiltrer le survol sans mesure préalable dans WME.
- Ajouter des toasts aux raccourcis sans cible.
- Changer seul dans WJN le bleu #2196f3 des titres ou le gris #9e9e9e du pied : c'est une décision pour toute la famille.
- Retirer le repli de l'observateur sur `document.body` : un log suffit.