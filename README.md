# WME Jump to Node (WJN)

Sur un long segment, l'une des extrémités est souvent hors de l'écran. WJN centre la carte sur le
**nœud A** ou le **nœud B** du segment sélectionné, sur son **milieu**, ou le **cadre en entier**, puis
**ramène** à la position de départ.

Né d'une demande restée sans réponse sur le Discord *Waze Scripts* (`#script-ideas-requests`,
KuniaKid, 07/05/2026). Le seul script qui le faisait
([439269](https://greasyfork.org/scripts/439269), 2022) s'appuie sur des API internes retirées
depuis.

## Trois façons de s'en servir

| Où | Quoi |
|---|---|
| **Panneau du segment**, sous l'en-tête | `NŒUD (A)(B) · (⛶)(◎) · (↩)  3,84 km` sur une ligne |
| **Au survol** d'un segment sélectionné | une petite barre apparaît près du pointeur après ~350 ms d'arrêt ; Échap la ferme |
| **Clavier** | cinq raccourcis déclarés **sans touches** dans Paramètres › Raccourcis clavier |

**Plusieurs segments sélectionnés** : s'ils se suivent (chemin simple), A et B mènent aux deux
bouts de la chaîne et « Milieu » le milieu de la chaîne. Sinon, seuls « Tout voir » et
« Milieu » (centre de l'emprise) sont proposés.

**Longueur** : une pastille en bout de ligne (panneau et barre de survol) donne la longueur de la
sélection — le total pour plusieurs segments, comme « Longueur » en bas du panneau de WME — au
format de la langue et dans l'unité choisie dans les réglages de WME (m/km ou ft/mi). La valeur
exacte est dans l'infobulle.

**Revenir** ramène à la vue d'avant le **premier** déplacement : A puis B puis Revenir ramène au
point de départ.

La barre de survol se désactive dans l'onglet Scripts (🎯).

## Ce qu'il ne fait jamais

Aucune modification de la carte : aucune action n'entre dans la pile d'annulation (contrôlé par
`W.model.actionManager.getActions().length`, resté à 0 sur tous les essais).
