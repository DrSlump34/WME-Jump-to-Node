# Prompt de génération du visuel (ChatGPT / Gemini)

Calé sur le style commun à `WME-Closures-Toolkit/icon.png`,
`WME-Naming-Auditor/icon.png`, `WME-Driving-Areas/Icon.png` et
`Fermetures-Hivernales/icon.png` : squircle bleu en dégradé, plan de carte clair en
perspective au bas, objets 3D « soft » en plastique mat, ombres douces, fond blanc,
aucun texte.

⚠️ **Joindre les icônes existantes en référence** si l'outil l'accepte (ChatGPT et
Gemini acceptent des images d'entrée) : c'est ce qui garantit la cohérence de
famille, bien plus que la description écrite.

⚠️⚠️ **Le piège propre à CE script : les lettres A et B.** Le script parle des nœuds
A et B, et le premier réflexe d'un générateur est de les écrire — sur des pastilles,
sur la route, dans des bulles. Ce serait à refaire : les lettres sortent déformées, et
elles n'apprennent rien à 64 px. ⇒ **Les deux bouts se disent par deux RONDS** (un
blanc, discret, au départ ; un orange, marqué, à l'arrivée), jamais par une lettre.

⚠️ **Second piège : ne pas dessiner une appli de navigation.** Une épingle rouge sur
une carte, c'est Google Maps. Ici le sujet est **le regard qui saute au bout d'un
segment** : l'arc pointillé et le nœud d'arrivée cerclé portent le sens, pas une
épingle générique.

---

## Prompt (anglais — à privilégier)

```
A modern app icon in the style of macOS Big Sur / iOS: a squircle (rounded square)
with a smooth vertical blue gradient background, from a bright azure blue at the top
to a deeper royal blue at the bottom. The icon sits on a pure white background with
a soft drop shadow beneath it.

Subject: jumping instantly from one end of a long road segment to the other.

Composition, from back to front:
- At the bottom, a stylised light grey road map plane in slight perspective, with a
  few pale green field patches and thin white roads, exactly like a simplified
  navigation map.
- On that map plane, one long straight white road segment running from the lower
  left towards the horizon on the right. Its near end is a small round white node,
  soft and discreet.
- Its far end is the focal element: a round node in warm orange, slightly raised like
  a soft matte 3D button, surrounded by a thin glowing orange ring that pulses
  outward on the map, like a target that has just been reached.
- A dotted arc, made of soft white rounded dashes, leaps from above the near node
  over the road and lands on the far orange node, ending with a small rounded white
  arrowhead. It reads as a jump, not as a route.
- A small soft grey car silhouette on the road near the white node, low and
  discreet, no bigger than a quarter of the orange node's ring.

Style: flat-3D icon illustration, soft matte plastic materials, gentle ambient
occlusion and soft shadows, no harsh highlights, no outlines except the white road
casing. Clean, friendly, professional. Colours: azure and royal blue, white, light
grey, pale green, one warm orange for the far node and its ring.

No text, no letters, no numbers, no "A", no "B", no map pin, no location marker
teardrop, no compass, no watermark. The two ends of the segment must be shown only
as round nodes. Square 1:1 composition, centred, generous padding around the
squircle.
```

## Prompt (français, si l'outil répond mieux en français)

```
Icône d'application moderne, style macOS Big Sur / iOS : un carré à coins très
arrondis (squircle) avec un dégradé vertical bleu, du bleu azur vif en haut au bleu
roi profond en bas. L'icône est posée sur un fond blanc pur, avec une ombre portée
douce en dessous.

Sujet : sauter instantanément d'un bout à l'autre d'un long segment de route.

Composition, de l'arrière vers l'avant :
- En bas, un plan de carte routière gris clair en légère perspective, avec quelques
  parcelles vert pâle et de fines routes blanches, comme une carte de navigation
  simplifiée.
- Sur ce plan, un long segment de route blanc et rectiligne, qui part du bas à gauche
  vers l'horizon à droite. Son extrémité proche est un petit nœud rond blanc, doux et
  discret.
- Son extrémité lointaine est l'élément central : un nœud rond orange chaud,
  légèrement en relief comme un bouton en 3D douce et mate, entouré d'un fin anneau
  orange lumineux qui s'élargit sur la carte, comme une cible qu'on vient
  d'atteindre.
- Un arc en pointillés, fait de tirets blancs arrondis, bondit depuis le nœud proche
  par-dessus la route et atterrit sur le nœud orange, terminé par une petite pointe
  de flèche blanche arrondie. Il se lit comme un saut, pas comme un itinéraire.
- Une petite silhouette de voiture gris doux sur la route près du nœud blanc, basse
  et discrète, pas plus grande qu'un quart de l'anneau orange.

Style : illustration d'icône en 3D plate, matières plastiques mates et douces,
occlusion ambiante légère et ombres douces, pas de reflets durs, pas de contours sauf
le liseré blanc des routes. Propre, chaleureux, professionnel. Couleurs : bleu azur
et bleu roi, blanc, gris clair, vert pâle, un seul orange chaud pour le nœud
d'arrivée et son anneau.

Aucun texte, aucune lettre, aucun chiffre, aucun « A », aucun « B », aucune épingle
de localisation, aucune goutte de marqueur, aucune boussole, aucun filigrane. Les
deux bouts du segment ne se lisent QUE comme des nœuds ronds. Composition carrée
1:1, centrée, avec une marge généreuse autour du squircle.
```

---

## Ce qu'il faut vérifier sur le résultat

1. **Aucune lettre nulle part.** C'est le contrôle n°1 : un générateur à qui l'on parle
   de nœuds A et B finit par les écrire. Un « A » déformé suffit à refaire l'image.
2. **Pas d'épingle en goutte.** Si un marqueur de localisation apparaît, l'icône
   raconte Google Maps. Redemander « round node only ».
3. **L'arc se lit-il comme un SAUT à 64 px ?** C'est lui qui dit « aller au bout ». S'il
   disparaît à la réduction, demander des tirets plus épais et moins nombreux.
4. **Le nœud orange est-il le premier regard ?** Si la voiture ou la route attirent l'œil
   avant lui, les reculer et les éteindre.
5. **L'orange est-il la seule couleur chaude ?** Deux couleurs chaudes et l'icône perd
   sa lecture immédiate.
6. **Fond réellement blanc**, pas gris ni transparent — comme les autres icônes.
7. **Cohérence de famille** : poser les icônes des scripts côte à côte à la même taille.
   Si celle-ci jure, c'est en général la saturation du bleu ou la dureté des ombres.

## Ensuite

Réduire en 512, 256, 128 et 64 px et garder toutes les tailles : Discord affiche
petit, GreasyFork affiche grand.

⚠️ **Où elle servira** : le dépôt GitHub, la fiche GreasyFork (image jointe à une
version : elle ne se remplace qu'en publiant) et le **post Discuss** d'annonce.

## L'icône embarquée dans l'en-tête

Le `@icon` du `.user.js` est un SVG autonome : squircle bleu en dégradé, segment
blanc, arc pointillé qui saute vers le nœud d'arrivée orange. C'est **elle** que Tampermonkey
et GreasyFork affichent en petit ; l'onglet du panneau Scripts de WME porte, lui, l'emoji 🎯. Elle
n'a pas besoin du générateur d'images : elle reste nette à toute taille. L'image
produite par ce prompt sert aux **vitrines** (GitHub, GreasyFork, Discuss).
