## 🎯 WME Jump to Node — v0.06.00 — [GreasyFork 🔗](https://greasyfork.org/en/scripts/597298-wme-jump-to-node) — [GitHub 🔗](https://github.com/DrSlump34/WME-Jump-to-Node)

![WME Jump to Node|256x256, 50%](https://raw.githubusercontent.com/DrSlump34/WME-Jump-to-Node/master/icon-256.png)

### 🇬🇧 English

**On a long segment, one end is often off screen.** To look at a node — turns, junction, restriction — you scroll the map by hand, then scroll back. This script takes you there in one click, and brings you back.

![WME Jump to Node — segment panel and hover toolbar|1364x791, 50%](https://raw.githubusercontent.com/DrSlump34/WME-Jump-to-Node/master/capture_0.06.00_survol.png)

**In the segment panel**, one line under the header: `NODE (A)(B) | (⛶)(◎) | (↩)   545 m`
* **A · B** — centre the map on node A or node B of the selected segment. Zoom and selection are kept.
* **⛶ Fit** — zoom so the whole selection fits on screen.
* **◎ Middle** — centre on the middle, measured along the road.
* **↩ Back** — return to the view before the first jump: A, then B, then Back brings you home. If you move the map yourself between two jumps, that place becomes home.
* **Length** — the length of the selection (the total for several segments), the same figure as at the bottom of the panel, in your WME units (m/km or ft/mi). No more scrolling down to find it.

**On the map.** Rest the pointer on a selected segment: the same buttons appear right next to it. A click, moving away, moving the map or **Esc** closes them. They never open while you draw or drag, and can be turned off in the Scripts tab.

**Several segments.** If the selected segments follow one another, **A** and **B** take you to the two ends of the chain (A on the node-A side of the first selected segment), and **◎** to its middle. If they do not, **Fit** and **Middle** (centre of the area) remain.

**Keyboard.** Five shortcuts are listed **without keys** under Settings › Keyboard shortcuts, so as not to take any from another script. Assign the ones you want there.

**Languages:** English, French, German, Spanish, Italian, Portuguese (BR/PT), Hebrew. Follows the WME locale.
**Safety:** the script never changes the map — nothing enters the undo stack. Built on the WME SDK. Its only request outside waze.com: at most once a day, the version number published on GreasyFork, for the update badge.

This one answers a request left unanswered since May on the Waze Scripts Discord (`#script-ideas-requests`), by KuniaKid: the script that used to do this (2022) relies on WME internals that no longer exist.

Feedback and ideas very welcome.

---

### 🇫🇷 Français

**Sur un long segment, l’une des extrémités est souvent hors de l’écran.** Pour aller voir un nœud — virages, jonction, restriction — on fait défiler la carte à la main, puis on revient. Ce script vous y emmène en un clic, et vous ramène.

**Dans le panneau du segment**, une ligne sous l’en-tête : `NŒUD (A)(B) | (⛶)(◎) | (↩)   545 m`
* **A · B** — centrer la carte sur le nœud A ou le nœud B du segment sélectionné. Le zoom et la sélection sont conservés.
* **⛶ Tout voir** — zoomer pour que toute la sélection tienne à l’écran.
* **◎ Milieu** — centrer sur le milieu, mesuré le long de la voie.
* **↩ Revenir** — revenir à la vue d’avant le premier saut : A, puis B, puis Revenir ramène au point de départ. Si vous déplacez vous-même la carte entre deux sauts, c’est ce nouvel endroit qui devient le point de départ.
* **Longueur** — la longueur de la sélection (le total pour plusieurs segments), le même chiffre qu’en bas du panneau, dans les unités de WME (m/km ou ft/mi). Plus besoin de descendre la chercher.

**Sur la carte.** Arrêtez le pointeur sur un segment sélectionné : les mêmes boutons apparaissent juste à côté. Un clic, un écart, un déplacement de la carte ou **Échap** les referme. Ils ne s’ouvrent jamais pendant un tracé ou un glisser, et se désactivent dans l’onglet Scripts.

**Plusieurs segments.** Si les segments sélectionnés se suivent, **A** et **B** mènent aux deux bouts de la chaîne (A du côté du nœud A du premier segment sélectionné), et **◎** à son milieu. Sinon, **Tout voir** et **Milieu** (centre de l’emprise) restent proposés.

**Clavier.** Cinq raccourcis sont listés **sans touches** dans Paramètres › Raccourcis clavier, pour n’en prendre aucune à un autre script. Attribuez-y ceux que vous voulez.

![WME Jump to Node — onglet Scripts|318x873, 50%](https://raw.githubusercontent.com/DrSlump34/WME-Jump-to-Node/master/capture_0.06.00_onglet.png)

**Langues :** anglais, français, allemand, espagnol, italien, portugais (BR/PT), hébreu. Suit la langue de WME.
**Sûreté :** le script ne modifie jamais la carte — rien n’entre dans la pile d’annulation. Construit sur le SDK de WME. Sa seule requête hors de waze.com : au plus une fois par jour, le numéro de version publié sur GreasyFork, pour la pastille de mise à jour.

Il répond à une demande restée sans réponse depuis mai sur le Discord Waze Scripts (`#script-ideas-requests`), de KuniaKid : le script qui le faisait (2022) s’appuie sur des mécanismes internes de WME qui n’existent plus.

Retours et idées bienvenus.
