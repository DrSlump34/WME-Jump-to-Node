## 🎯 WME Jump to Node

**Sur un long segment, l’une des extrémités est souvent hors de l’écran.** Pour aller voir un nœud — virages, jonction, restriction — on fait défiler la carte à la main, puis on revient. Ce script vous y emmène en un clic, et vous ramène.

### Dans le panneau du segment

Une ligne sous l’en-tête du panneau : `NŒUD (A)(B) | (⛶)(◎) | (↩)   545 m`

* **A · B** — centrer la carte sur le nœud A ou le nœud B du segment sélectionné. Le zoom et la sélection sont conservés.
* **⛶ Tout voir** — zoomer pour que toute la sélection tienne à l’écran.
* **◎ Milieu** — centrer sur le milieu, mesuré le long de la voie.
* **↩ Revenir** — revenir à la vue d’avant le premier déplacement : A, puis B, puis Revenir ramène au point de départ.
* **Longueur** — la longueur de la sélection (le total pour plusieurs segments), le même chiffre qu’en bas du panneau, dans les unités de WME (m/km ou ft/mi). Plus besoin de descendre la chercher.

### Sur la carte

Arrêtez le pointeur sur un segment sélectionné : les mêmes boutons apparaissent juste à côté. Un clic, un écart, un déplacement de la carte ou **Échap** les referme. Ils ne s’ouvrent jamais pendant un tracé ou un glisser, et se désactivent dans l’onglet Scripts.

### Plusieurs segments

Si les segments sélectionnés se suivent, **A** et **B** mènent aux deux bouts de la chaîne, et **◎** à son milieu. Sinon, **Tout voir** et **Milieu** (centre de l’emprise) restent proposés.

### Clavier

Cinq raccourcis sont listés **sans touches** dans Paramètres › Raccourcis clavier, pour n’en prendre aucune à un autre script. Attribuez-y ceux que vous voulez.

### Bon à savoir

* Ne modifie jamais la carte : rien n’entre dans la pile d’annulation.
* Langues : anglais, français, allemand, espagnol, italien, portugais (BR/PT), hébreu. Suit la langue de WME.
* Construit sur le SDK de WME : aucune requête externe, aucune dépendance.
* Né d’une demande restée sans réponse sur le Discord Waze Scripts (`#script-ideas-requests`). Le script qui le faisait (2022) s’appuie sur des mécanismes internes de WME qui n’existent plus.

Code source, historique et signalements : [GitHub](https://github.com/DrSlump34/WME-Jump-to-Node)
