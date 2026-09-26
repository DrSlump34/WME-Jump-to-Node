// ==UserScript==
// @name         WME Jump to Node
// @name:fr      WME Jump to Node
// @name:de      WME Jump to Node
// @name:es      WME Jump to Node
// @name:it      WME Jump to Node
// @name:pt-BR   WME Jump to Node
// @name:pt      WME Jump to Node
// @name:he      WME Jump to Node
// @icon         data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc2NCcgaGVpZ2h0PSc2NCcgdmlld0JveD0nMCAwIDY0IDY0Jz48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9J2cnIHgxPScwJyB5MT0nMCcgeDI9JzEnIHkyPScxJz48c3RvcCBvZmZzZXQ9JzAnIHN0b3AtY29sb3I9JyMxZTg4ZTUnLz48c3RvcCBvZmZzZXQ9JzEnIHN0b3AtY29sb3I9JyMxNTY1YzAnLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0nNjQnIGhlaWdodD0nNjQnIHJ4PScxNCcgZmlsbD0ndXJsKCNnKScvPjxwYXRoIGQ9J005IDQ3IEgzOScgc3Ryb2tlPScjZmZmJyBzdHJva2Utd2lkdGg9JzYnIHN0cm9rZS1saW5lY2FwPSdyb3VuZCcvPjxjaXJjbGUgY3g9JzknIGN5PSc0Nycgcj0nNScgZmlsbD0nI2ZmZicvPjxjaXJjbGUgY3g9JzQ1JyBjeT0nNDcnIHI9JzcnIGZpbGw9JyNmYjhjMDAnIHN0cm9rZT0nI2ZmZicgc3Ryb2tlLXdpZHRoPSczJy8+PHBhdGggZD0nTTEzIDMzIEMxOCAxMiAzOCAxMCA0NCAzMCcgZmlsbD0nbm9uZScgc3Ryb2tlPScjZmZmZmZmJyBzdHJva2Utd2lkdGg9JzMuNScgc3Ryb2tlLWxpbmVjYXA9J3JvdW5kJyBzdHJva2UtZGFzaGFycmF5PScxIDcnLz48cGF0aCBkPSdNMzYgMjcgTDQ1IDM3IEw1MCAyNCBaJyBmaWxsPScjZmZmJy8+PC9zdmc+Cg==
// @namespace    https://github.com/DrSlump34
// @version      0.06.00
// @description  Jump to either end of the selected segment, to its middle, or fit it on screen — from the segment panel, from a small toolbar that appears when you hover the selection, or by keyboard. A Back button returns you where you were.
// @description:fr Sauter à l'une ou l'autre extrémité du segment sélectionné, à son milieu, ou l'afficher en entier — depuis le panneau du segment, depuis une petite barre qui apparaît au survol de la sélection, ou au clavier. Un bouton Revenir vous ramène d'où vous veniez.
// @description:de Springen Sie zu einem Ende des ausgewählten Segments, zu seiner Mitte, oder zeigen Sie es ganz an — über den Segmentbereich, über eine kleine Leiste, die beim Überfahren der Auswahl erscheint, oder per Tastatur. Eine Zurück-Schaltfläche bringt Sie zurück.
// @description:es Salte a uno u otro extremo del segmento seleccionado, a su punto medio, o muéstrelo entero — desde el panel del segmento, desde una pequeña barra que aparece al pasar sobre la selección, o con el teclado. Un botón Volver le devuelve adonde estaba.
// @description:it Salta a uno dei due estremi del segmento selezionato, al suo punto medio, o mostralo per intero — dal pannello del segmento, da una piccola barra che appare passando sulla selezione, o da tastiera. Un pulsante Indietro riporta dove si era.
// @description:pt-BR Salte para uma das pontas do segmento selecionado, para o meio dele, ou veja-o inteiro — pelo painel do segmento, por uma pequena barra que aparece ao passar o mouse sobre a seleção, ou pelo teclado. Um botão Voltar leva de volta ao ponto de partida.
// @description:pt Salte para uma das extremidades do segmento selecionado, para o meio, ou veja-o por inteiro — pelo painel do segmento, por uma pequena barra que aparece ao passar o rato sobre a seleção, ou pelo teclado. Um botão Voltar leva de volta ao ponto de partida.
// @description:he קפיצה לאחד מקצות המקטע הנבחר, לאמצעו, או הצגתו במלואו — מלוח המקטע, מסרגל קטן שמופיע במעבר מעל הבחירה, או מהמקלדת. כפתור חזרה מחזיר למקום הקודם.
// @author       DrSlump34
// @copyright    DrSlump34 2026
// @license      MIT
// @homepageURL  https://github.com/DrSlump34/WME-Jump-to-Node
// @supportURL   https://www.waze.com/discuss/t/script-wme-jump-to-node/412995
// @downloadURL  https://update.greasyfork.org/scripts/597298/WME%20Jump%20to%20Node.user.js
// @updateURL    https://update.greasyfork.org/scripts/597298/WME%20Jump%20to%20Node.meta.js
// @match        https://www.waze.com/*/editor*
// @match        https://www.waze.com/editor*
// @match        https://beta.waze.com/*/editor*
// @match        https://beta.waze.com/editor*
// @exclude      https://www.waze.com/*user/*editor/*
// @exclude      https://www.waze.com/discuss/*
// @exclude      https://www.waze.com/editor/sdk/*
// @exclude      https://beta.waze.com/*user/*editor/*
// @exclude      https://beta.waze.com/editor/sdk/*
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @connect      update.greasyfork.org
// @run-at       document-idle
// ==/UserScript==

/*  Sur un long segment, l'une des extrémités est souvent hors de l'écran : pour aller voir le
 *  nœud (virages, jonction, restriction), il faut faire défiler la carte à la main puis revenir.
 *  Le script centre la carte sur le nœud A ou B, sur le milieu, ou cadre la sélection entière,
 *  et garde la position de départ pour y revenir.
 *
 *  Avec plusieurs segments sélectionnés qui se suivent, A et B deviennent les deux bouts de la
 *  chaîne. S'ils ne forment pas une chaîne, seuls le cadrage et le milieu ont un sens.
 *
 *  Il ne modifie jamais la carte : aucune action n'entre dans la pile d'annulation de WME.
 */

(function () {
    'use strict';

    const SCRIPT_ID = 'wme-jump-to-node';
    const SCRIPT_NAME = 'WME Jump to Node';
    const VERSION = (typeof GM_info !== 'undefined' && GM_info.script && GM_info.script.version) || 'dev';
    const BAR_ID = 'wjn-bar';
    const POP_ID = 'wjn-pop';
    const FLASH_LAYER = 'wjn-flash';
    const FLASH_MS = 1600;
    const OPTS_KEY = 'wjn.opts';
    const URL_GF = 'https://greasyfork.org/scripts/597298-wme-jump-to-node';
    const URL_DISCUSS = 'https://www.waze.com/discuss/t/script-wme-jump-to-node/412995';

    // Survol : la barre n'apparaît que si le pointeur S'ARRÊTE sur la sélection (intention de
    // survol), pour ne pas clignoter à chaque passage ; elle tolère un bref écart pour qu'on
    // puisse l'atteindre.
    const HOVER_PX = 8;           // distance au tracé, en pixels d'écran
    const HOVER_DELAY = 350;      // temps d'arrêt avant apparition
    const HOVER_STILL_PX = 6;     // mouvement toléré pendant ce temps
    const HIDE_GRACE = 450;       // délai avant disparition quand on s'éloigne
    const FIT_MARGIN = 0.12;      // marge du cadrage, en fraction de l'emprise

    const URL_GH = 'https://github.com/DrSlump34/WME-Jump-to-Node';

    // Depuis la 0.06.00 le script demande GM_xmlhttpRequest (pastille de nouvelle version) : il
    // ne tourne plus dans la page mais dans le bac à sable du gestionnaire, et W, getWmeSdk et le
    // verrou anti-double-chargement se lisent sur la page par unsafeWindow, comme dans WDA et WRP.
    const pw = (typeof unsafeWindow !== 'undefined') ? unsafeWindow : window;

    // L'icône de l'en-tête (@icon), pour l'onglet et le titre du panneau.
    const icone = h => '<svg xmlns="http://www.w3.org/2000/svg" width="' + h + '" height="' + h + '" viewBox="0 0 64 64" aria-hidden="true" focusable="false">' +
        '<defs><linearGradient id="wjn-ico-g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1e88e5"/><stop offset="1" stop-color="#1565c0"/></linearGradient></defs>' +
        '<rect width="64" height="64" rx="14" fill="url(#wjn-ico-g)"/><path d="M9 47 H39" stroke="#fff" stroke-width="6" stroke-linecap="round"/>' +
        '<circle cx="9" cy="47" r="5" fill="#fff"/><circle cx="45" cy="47" r="7" fill="#fb8c00" stroke="#fff" stroke-width="3"/>' +
        '<path d="M13 33 C18 12 38 10 44 30" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" stroke-dasharray="1 7"/>' +
        '<path d="M36 27 L45 37 L50 24 Z" fill="#fff"/></svg>';

    let sdk = null;
    let retour = null;            // {lon, lat, zoom} : la vue d'avant le premier saut
    let pose = null;              // {lon, lat, zoom} : la vue où le dernier saut a laissé la carte
    let poseJusqua = 0;           // jusqu'à cet instant, un déplacement de la carte est celui du saut
    let flashTimer = null;
    let flashOk = false;
    let opts = { survol: true };

    const log = m => console.log('[WJN] ' + m);
    // Un échec qui se répète (à chaque mouvement de souris, à chaque rendu du panneau) n'est
    // écrit qu'une fois : assez pour savoir pourquoi une fonction s'est tue après une mise à
    // jour de WME, sans noyer la console.
    const dejaDit = new Set();
    const logUneFois = (cle, m) => { if (!dejaDit.has(cle)) { dejaDit.add(cle); log(m); } };

    // =====================================================================
    //  I18N — détection sur la locale de WME, repli sur l'anglais
    // =====================================================================

    const DICO = {
        en: {
            lblNode: 'Node',
            tipA: 'Center the map on node A (start of the segment)',
            tipB: 'Center the map on node B (end of the segment)',
            tipE1: 'Center the map on the first end of the selected chain',
            tipE2: 'Center the map on the other end of the selected chain',
            tipFit: 'Fit: zoom to show the whole selection',
            tipMid: 'Middle: center the map on the middle of the selection',
            tipMidBox: 'Center: center the map on the center of the selected area',
            tipBack: 'Back: return to the view before the jump',
            tipBackNone: 'Back: nothing to return to yet',
            tipLen: (m, n) => n === 1 ? 'Length of the selected segment: ' + m : 'Total length of the ' + n + ' selected segments: ' + m,
            scA: 'Jump to node A (or first end of the selected chain)',
            scB: 'Jump to node B (or other end of the selected chain)',
            scFit: 'Fit the selected segments on screen',
            scMid: 'Jump to the middle of the selection',
            scBack: 'Return to the position before the jump',
            sbHint: 'Jump to either end of the selected segment, to its middle, or fit it on screen — then come back.',
            sbHover: 'Toolbar on hover',
            sbHoverHint: 'Rest the pointer on a selected segment: the toolbar appears next to it.',
            sbHelp: 'Help',
            hPanelT: 'The buttons',
            hPanelB: '<table class="wjn-help-table"><tr><td><b>A</b> · <b>B</b></td><td>Center the map on node A or node B of the selected segment. Zoom is kept.</td></tr><tr><td><b>&#x26F6;</b></td><td>Zoom so the whole selection fits on screen.</td></tr><tr><td><b>&#x25CE;</b></td><td>Center on the middle, measured along the road.</td></tr><tr><td><b>&#x21A9;</b></td><td>Back to the view before the FIRST move: A, then B, then back brings you home. If you move the map yourself between two jumps, that place becomes home.</td></tr><tr><td><b>Length</b></td><td>Length of the selection (the total for several segments) — the same figure as at the bottom of the panel.</td></tr></table>',
            hHoverT: 'On hover',
            hHoverB: '<p>Rest the pointer on a selected segment for a moment: the same buttons appear next to it. Click, move away, move the map or press <kbd>Esc</kbd> to close them.</p><p>They never open while you draw or drag.</p>',
            hMultiT: 'Several segments',
            hMultiB: '<p>If the selected segments follow one another, <b>A</b> and <b>B</b> jump to the two ends of the chain, and &#x25CE; to its middle.</p><p>If they do not, only &#x26F6; and &#x25CE; (center of the area) are offered.</p>',
            hKeysT: 'Keyboard',
            hKeysB: '<p>Five shortcuts are listed <b>without keys</b> under Settings › Keyboard shortcuts, so as not to take any from another script. Assign the ones you want there.</p>',
            hSafeB: 'The script never changes the map: nothing enters the undo stack.',
            lnkDiscuss: 'Discuss thread',
            majBtn: v => 'Version ' + v + ' is available',
            majInstall: 'Install',
        },
        fr: {
            lblNode: 'Nœud',
            tipA: 'Centrer la carte sur le nœud A (début du segment)',
            tipB: 'Centrer la carte sur le nœud B (fin du segment)',
            tipE1: 'Centrer la carte sur le premier bout de la chaîne sélectionnée',
            tipE2: 'Centrer la carte sur l\'autre bout de la chaîne sélectionnée',
            tipFit: 'Tout voir\u00a0: zoomer pour afficher toute la sélection',
            tipMid: 'Milieu\u00a0: centrer la carte sur le milieu de la sélection',
            tipMidBox: 'Centre\u00a0: centrer la carte sur le centre de la zone sélectionnée',
            tipBack: 'Revenir à la vue d\'avant le saut',
            tipBackNone: 'Revenir\u00a0: aucune position à retrouver pour l\'instant',
            tipLen: (m, n) => n === 1 ? 'Longueur du segment sélectionné\u00a0: ' + m : 'Longueur totale des ' + n + ' segments sélectionnés\u00a0: ' + m,
            scA: 'Aller au nœud A (ou au premier bout de la chaîne sélectionnée)',
            scB: 'Aller au nœud B (ou à l\'autre bout de la chaîne sélectionnée)',
            scFit: 'Afficher en entier les segments sélectionnés',
            scMid: 'Aller au milieu de la sélection',
            scBack: 'Revenir à la position d\'avant le saut',
            sbHint: 'Aller à l\'une ou l\'autre extrémité du segment sélectionné, à son milieu, ou l\'afficher en entier — puis revenir.',
            sbHover: 'Barre au survol',
            sbHoverHint: 'Arrêtez le pointeur sur un segment sélectionné\u00a0: la barre apparaît à côté.',
            sbHelp: 'Aide',
            hPanelT: 'Les boutons',
            hPanelB: '<table class="wjn-help-table"><tr><td><b>A</b> · <b>B</b></td><td>Centrer la carte sur le nœud A ou le nœud B du segment sélectionné. Le zoom est conservé.</td></tr><tr><td><b>&#x26F6;</b></td><td>Zoomer pour que toute la sélection tienne à l\'écran.</td></tr><tr><td><b>&#x25CE;</b></td><td>Centrer sur le milieu, mesuré le long de la voie.</td></tr><tr><td><b>&#x21A9;</b></td><td>Revenir à la vue d\'avant le PREMIER déplacement\u00a0: A, puis B, puis retour ramène au point de départ. Si vous déplacez vous-même la carte entre deux sauts, c\'est ce nouvel endroit qui devient le point de départ.</td></tr><tr><td><b>Longueur</b></td><td>Longueur de la sélection (le total pour plusieurs segments) — le même chiffre qu\'en bas du panneau.</td></tr></table>',
            hHoverT: 'Au survol',
            hHoverB: '<p>Arrêtez un instant le pointeur sur un segment sélectionné\u00a0: les mêmes boutons apparaissent à côté. Un clic, un écart, un déplacement de la carte ou <kbd>Échap</kbd> les referme.</p><p>Ils ne s\'ouvrent jamais pendant un tracé ou un glisser.</p>',
            hMultiT: 'Plusieurs segments',
            hMultiB: '<p>Si les segments sélectionnés se suivent, <b>A</b> et <b>B</b> mènent aux deux bouts de la chaîne, et &#x25CE; à son milieu.</p><p>Sinon, seuls &#x26F6; et &#x25CE; (centre de l\'emprise) sont proposés.</p>',
            hKeysT: 'Clavier',
            hKeysB: '<p>Cinq raccourcis sont listés <b>sans touches</b> dans Paramètres › Raccourcis clavier, pour n\'en prendre aucune à un autre script. Attribuez-y ceux que vous voulez.</p>',
            hSafeB: 'Le script ne modifie jamais la carte\u00a0: rien n\'entre dans la pile d\'annulation.',
            lnkDiscuss: 'Fil Discuss',
            majBtn: v => 'La version ' + v + ' est disponible',
            majInstall: 'Installer',
        },
        de: {
            lblNode: 'Knoten',
            tipA: 'Karte auf Knoten A zentrieren (Anfang des Segments)',
            tipB: 'Karte auf Knoten B zentrieren (Ende des Segments)',
            tipE1: 'Karte auf das erste Ende der ausgewählten Kette zentrieren',
            tipE2: 'Karte auf das andere Ende der ausgewählten Kette zentrieren',
            tipFit: 'Alles: zoomen, um die ganze Auswahl zu zeigen',
            tipMid: 'Mitte: Karte auf die Mitte der Auswahl zentrieren',
            tipMidBox: 'Mitte: Karte auf die Mitte des ausgewählten Bereichs zentrieren',
            tipBack: 'Zurück zur Ansicht vor dem Sprung',
            tipBackNone: 'Zurück: noch keine Position zum Zurückkehren',
            tipLen: (m, n) => n === 1 ? 'Länge des ausgewählten Segments: ' + m : 'Gesamtlänge der ' + n + ' ausgewählten Segmente: ' + m,
            scA: 'Zu Knoten A springen (oder zum ersten Ende der Kette)',
            scB: 'Zu Knoten B springen (oder zum anderen Ende der Kette)',
            scFit: 'Ausgewählte Segmente ganz anzeigen',
            scMid: 'Zur Mitte der Auswahl springen',
            scBack: 'Zurück zur Position vor dem Sprung',
            sbHint: 'Zu einem Ende des ausgewählten Segments springen, zu seiner Mitte, oder es ganz anzeigen — und wieder zurück.',
            sbHover: 'Leiste beim Überfahren',
            sbHoverHint: 'Den Zeiger auf einem ausgewählten Segment ruhen lassen: die Leiste erscheint daneben.',
            sbHelp: 'Hilfe',
            hPanelT: 'Die Schaltflächen',
            hPanelB: '<table class="wjn-help-table"><tr><td><b>A</b> · <b>B</b></td><td>Karte auf Knoten A oder Knoten B des ausgewählten Segments zentrieren. Der Zoom bleibt.</td></tr><tr><td><b>&#x26F6;</b></td><td>So zoomen, dass die ganze Auswahl auf den Bildschirm passt.</td></tr><tr><td><b>&#x25CE;</b></td><td>Auf die Mitte zentrieren, entlang der Straße gemessen.</td></tr><tr><td><b>&#x21A9;</b></td><td>Zurück zur Ansicht vor der ERSTEN Bewegung: A, dann B, dann zurück führt zum Ausgangspunkt. Wer die Karte zwischen zwei Sprüngen selbst verschiebt, macht diese Stelle zum neuen Ausgangspunkt.</td></tr><tr><td><b>Länge</b></td><td>Länge der Auswahl (die Summe bei mehreren Segmenten) — derselbe Wert wie unten im Bereich.</td></tr></table>',
            hHoverT: 'Beim Überfahren',
            hHoverB: '<p>Den Zeiger kurz auf einem ausgewählten Segment ruhen lassen: dieselben Schaltflächen erscheinen daneben. Ein Klick, Wegbewegen, Verschieben der Karte oder <kbd>Esc</kbd> schließt sie.</p><p>Beim Zeichnen oder Ziehen öffnen sie sich nie.</p>',
            hMultiT: 'Mehrere Segmente',
            hMultiB: '<p>Folgen die ausgewählten Segmente aufeinander, führen <b>A</b> und <b>B</b> zu den beiden Enden der Kette und &#x25CE; zu ihrer Mitte.</p><p>Sonst werden nur &#x26F6; und &#x25CE; (Mitte des Bereichs) angeboten.</p>',
            hKeysT: 'Tastatur',
            hKeysB: '<p>Fünf Tastenkürzel stehen <b>ohne Tasten</b> unter Einstellungen › Tastenkürzel, um keinem anderen Skript eine wegzunehmen. Dort nach Wunsch belegen.</p>',
            hSafeB: 'Das Skript ändert die Karte nie: nichts gelangt in den Rückgängig-Verlauf.',
            lnkDiscuss: 'Discuss-Thread',
            majBtn: v => 'Version ' + v + ' ist verfügbar',
            majInstall: 'Installieren',
        },
        es: {
            lblNode: 'Nodo',
            tipA: 'Centrar el mapa en el nodo A (inicio del segmento)',
            tipB: 'Centrar el mapa en el nodo B (final del segmento)',
            tipE1: 'Centrar el mapa en el primer extremo de la cadena seleccionada',
            tipE2: 'Centrar el mapa en el otro extremo de la cadena seleccionada',
            tipFit: 'Ver todo: hacer zoom para mostrar toda la selección',
            tipMid: 'Centro: centrar el mapa en el punto medio de la selección',
            tipMidBox: 'Centro: centrar el mapa en el centro del área seleccionada',
            tipBack: 'Volver a la vista anterior al salto',
            tipBackNone: 'Volver: todavía no hay posición a la que volver',
            tipLen: (m, n) => n === 1 ? 'Longitud del segmento seleccionado: ' + m : 'Longitud total de los ' + n + ' segmentos seleccionados: ' + m,
            scA: 'Ir al nodo A (o al primer extremo de la cadena seleccionada)',
            scB: 'Ir al nodo B (o al otro extremo de la cadena seleccionada)',
            scFit: 'Mostrar enteros los segmentos seleccionados',
            scMid: 'Ir al punto medio de la selección',
            scBack: 'Volver a la posición anterior al salto',
            sbHint: 'Ir a uno u otro extremo del segmento seleccionado, a su punto medio, o mostrarlo entero — y volver.',
            sbHover: 'Barra al pasar el puntero',
            sbHoverHint: 'Detenga el puntero sobre un segmento seleccionado: la barra aparece al lado.',
            sbHelp: 'Ayuda',
            hPanelT: 'Los botones',
            hPanelB: '<table class="wjn-help-table"><tr><td><b>A</b> · <b>B</b></td><td>Centrar el mapa en el nodo A o B del segmento seleccionado. Se conserva el zoom.</td></tr><tr><td><b>&#x26F6;</b></td><td>Hacer zoom para que toda la selección quepa en pantalla.</td></tr><tr><td><b>&#x25CE;</b></td><td>Centrar en el punto medio, medido a lo largo de la vía.</td></tr><tr><td><b>&#x21A9;</b></td><td>Volver a la vista anterior al PRIMER movimiento: A, luego B, luego volver lleva al punto de partida. Si mueve el mapa usted mismo entre dos saltos, ese lugar pasa a ser el punto de partida.</td></tr><tr><td><b>Longitud</b></td><td>Longitud de la selección (el total si hay varios segmentos) — la misma cifra que al pie del panel.</td></tr></table>',
            hHoverT: 'Al pasar el puntero',
            hHoverB: '<p>Detenga un momento el puntero sobre un segmento seleccionado: aparecen los mismos botones al lado. Un clic, alejarse, mover el mapa o <kbd>Esc</kbd> los cierra.</p><p>Nunca se abren mientras dibuja o arrastra.</p>',
            hMultiT: 'Varios segmentos',
            hMultiB: '<p>Si los segmentos seleccionados se siguen, <b>A</b> y <b>B</b> llevan a los dos extremos de la cadena, y &#x25CE; a su punto medio.</p><p>Si no, solo se ofrecen &#x26F6; y &#x25CE; (centro del área).</p>',
            hKeysT: 'Teclado',
            hKeysB: '<p>Cinco atajos aparecen <b>sin teclas</b> en Ajustes › Atajos de teclado, para no quitarle ninguna a otro script. Asigne allí los que quiera.</p>',
            hSafeB: 'El script nunca modifica el mapa: nada entra en el historial de deshacer.',
            lnkDiscuss: 'Hilo en Discuss',
            majBtn: v => 'La versión ' + v + ' está disponible',
            majInstall: 'Instalar',
        },
        it: {
            lblNode: 'Nodo',
            tipA: 'Centra la mappa sul nodo A (inizio del segmento)',
            tipB: 'Centra la mappa sul nodo B (fine del segmento)',
            tipE1: 'Centra la mappa sul primo estremo della catena selezionata',
            tipE2: 'Centra la mappa sull\'altro estremo della catena selezionata',
            tipFit: 'Tutto: zoom per mostrare tutta la selezione',
            tipMid: 'Centro: centra la mappa sul punto medio della selezione',
            tipMidBox: 'Centro: centra la mappa sul centro dell\'area selezionata',
            tipBack: 'Torna alla vista prima del salto',
            tipBackNone: 'Indietro: ancora nessuna posizione a cui tornare',
            tipLen: (m, n) => n === 1 ? 'Lunghezza del segmento selezionato: ' + m : 'Lunghezza totale dei ' + n + ' segmenti selezionati: ' + m,
            scA: 'Vai al nodo A (o al primo estremo della catena selezionata)',
            scB: 'Vai al nodo B (o all\'altro estremo della catena selezionata)',
            scFit: 'Mostra per intero i segmenti selezionati',
            scMid: 'Vai al punto medio della selezione',
            scBack: 'Torna alla posizione precedente al salto',
            sbHint: 'Andare a uno dei due estremi del segmento selezionato, al suo punto medio, o mostrarlo per intero — e tornare.',
            sbHover: 'Barra al passaggio',
            sbHoverHint: 'Ferma il puntatore su un segmento selezionato: la barra appare accanto.',
            sbHelp: 'Aiuto',
            hPanelT: 'I pulsanti',
            hPanelB: '<table class="wjn-help-table"><tr><td><b>A</b> · <b>B</b></td><td>Centra la mappa sul nodo A o B del segmento selezionato. Lo zoom resta invariato.</td></tr><tr><td><b>&#x26F6;</b></td><td>Zoom perché tutta la selezione stia sullo schermo.</td></tr><tr><td><b>&#x25CE;</b></td><td>Centra sul punto medio, misurato lungo la strada.</td></tr><tr><td><b>&#x21A9;</b></td><td>Torna alla vista prima del PRIMO spostamento: A, poi B, poi indietro riporta al punto di partenza. Se sposti tu la mappa tra due salti, quel punto diventa il nuovo punto di partenza.</td></tr><tr><td><b>Lunghezza</b></td><td>Lunghezza della selezione (il totale per più segmenti) — lo stesso valore in fondo al pannello.</td></tr></table>',
            hHoverT: 'Al passaggio',
            hHoverB: '<p>Ferma un attimo il puntatore su un segmento selezionato: accanto appaiono gli stessi pulsanti. Un clic, allontanarsi, spostare la mappa o <kbd>Esc</kbd> li chiude.</p><p>Non si aprono mai mentre si disegna o si trascina.</p>',
            hMultiT: 'Più segmenti',
            hMultiB: '<p>Se i segmenti selezionati si susseguono, <b>A</b> e <b>B</b> portano ai due estremi della catena, e &#x25CE; al suo punto medio.</p><p>Altrimenti sono proposti solo &#x26F6; e &#x25CE; (centro dell\'area).</p>',
            hKeysT: 'Tastiera',
            hKeysB: '<p>Cinque scorciatoie sono elencate <b>senza tasti</b> in Impostazioni › Scorciatoie da tastiera, per non toglierne a un altro script. Assegna lì quelle che vuoi.</p>',
            hSafeB: 'Lo script non modifica mai la mappa: nulla entra nella cronologia di annullamento.',
            lnkDiscuss: 'Discussione su Discuss',
            majBtn: v => 'La versione ' + v + ' è disponibile',
            majInstall: 'Installa',
        },
        'pt-BR': {
            lblNode: 'Nó',
            tipA: 'Centralizar o mapa no nó A (início do segmento)',
            tipB: 'Centralizar o mapa no nó B (fim do segmento)',
            tipE1: 'Centralizar o mapa na primeira ponta da cadeia selecionada',
            tipE2: 'Centralizar o mapa na outra ponta da cadeia selecionada',
            tipFit: 'Ver tudo: dar zoom para mostrar toda a seleção',
            tipMid: 'Meio: centralizar o mapa no meio da seleção',
            tipMidBox: 'Centro: centralizar o mapa no centro da área selecionada',
            tipBack: 'Voltar à vista anterior ao salto',
            tipBackNone: 'Voltar: ainda não há posição para voltar',
            tipLen: (m, n) => n === 1 ? 'Comprimento do segmento selecionado: ' + m : 'Comprimento total dos ' + n + ' segmentos selecionados: ' + m,
            scA: 'Ir ao nó A (ou à primeira ponta da cadeia selecionada)',
            scB: 'Ir ao nó B (ou à outra ponta da cadeia selecionada)',
            scFit: 'Mostrar inteiros os segmentos selecionados',
            scMid: 'Ir ao meio da seleção',
            scBack: 'Voltar à posição anterior ao salto',
            sbHint: 'Ir a uma das pontas do segmento selecionado, ao meio dele, ou vê-lo inteiro — e voltar.',
            sbHover: 'Barra ao passar o mouse',
            sbHoverHint: 'Pare o ponteiro sobre um segmento selecionado: a barra aparece ao lado.',
            sbHelp: 'Ajuda',
            hPanelT: 'Os botões',
            hPanelB: '<table class="wjn-help-table"><tr><td><b>A</b> · <b>B</b></td><td>Centralizar o mapa no nó A ou B do segmento selecionado. O zoom é mantido.</td></tr><tr><td><b>&#x26F6;</b></td><td>Dar zoom para que toda a seleção caiba na tela.</td></tr><tr><td><b>&#x25CE;</b></td><td>Centralizar no meio, medido ao longo da via.</td></tr><tr><td><b>&#x21A9;</b></td><td>Voltar à vista anterior ao PRIMEIRO movimento: A, depois B, depois voltar leva ao ponto de partida. Se você mover o mapa entre dois saltos, esse lugar passa a ser o ponto de partida.</td></tr><tr><td><b>Comprimento</b></td><td>Comprimento da seleção (o total para vários segmentos) — o mesmo valor do rodapé do painel.</td></tr></table>',
            hHoverT: 'Ao passar o mouse',
            hHoverB: '<p>Pare o ponteiro um instante sobre um segmento selecionado: os mesmos botões aparecem ao lado. Um clique, afastar-se, mover o mapa ou <kbd>Esc</kbd> os fecha.</p><p>Nunca abrem durante um desenho ou um arrasto.</p>',
            hMultiT: 'Vários segmentos',
            hMultiB: '<p>Se os segmentos selecionados se seguem, <b>A</b> e <b>B</b> levam às duas pontas da cadeia, e &#x25CE; ao meio dela.</p><p>Caso contrário, só &#x26F6; e &#x25CE; (centro da área) são oferecidos.</p>',
            hKeysT: 'Teclado',
            hKeysB: '<p>Cinco atalhos aparecem <b>sem teclas</b> em Configurações › Atalhos de teclado, para não tirar nenhuma de outro script. Atribua lá os que quiser.</p>',
            hSafeB: 'O script nunca altera o mapa: nada entra no histórico de desfazer.',
            lnkDiscuss: 'Tópico no Discuss',
            majBtn: v => 'A versão ' + v + ' está disponível',
            majInstall: 'Instalar',
        },
        'pt-PT': {
            lblNode: 'Nó',
            tipA: 'Centrar o mapa no nó A (início do segmento)',
            tipB: 'Centrar o mapa no nó B (fim do segmento)',
            tipE1: 'Centrar o mapa na primeira extremidade da cadeia selecionada',
            tipE2: 'Centrar o mapa na outra extremidade da cadeia selecionada',
            tipFit: 'Ver tudo: fazer zoom para mostrar toda a seleção',
            tipMid: 'Meio: centrar o mapa no meio da seleção',
            tipMidBox: 'Centro: centrar o mapa no centro da área selecionada',
            tipBack: 'Voltar à vista anterior ao salto',
            tipBackNone: 'Voltar: ainda não há posição para onde voltar',
            tipLen: (m, n) => n === 1 ? 'Comprimento do segmento selecionado: ' + m : 'Comprimento total dos ' + n + ' segmentos selecionados: ' + m,
            scA: 'Ir ao nó A (ou à primeira extremidade da cadeia selecionada)',
            scB: 'Ir ao nó B (ou à outra extremidade da cadeia selecionada)',
            scFit: 'Mostrar por inteiro os segmentos selecionados',
            scMid: 'Ir ao meio da seleção',
            scBack: 'Voltar à posição anterior ao salto',
            sbHint: 'Ir a uma das extremidades do segmento selecionado, ao meio, ou vê-lo por inteiro — e voltar.',
            sbHover: 'Barra ao passar o rato',
            sbHoverHint: 'Pare o ponteiro sobre um segmento selecionado: a barra aparece ao lado.',
            sbHelp: 'Ajuda',
            hPanelT: 'Os botões',
            hPanelB: '<table class="wjn-help-table"><tr><td><b>A</b> · <b>B</b></td><td>Centrar o mapa no nó A ou B do segmento selecionado. O zoom mantém-se.</td></tr><tr><td><b>&#x26F6;</b></td><td>Fazer zoom para que toda a seleção caiba no ecrã.</td></tr><tr><td><b>&#x25CE;</b></td><td>Centrar no meio, medido ao longo da via.</td></tr><tr><td><b>&#x21A9;</b></td><td>Voltar à vista anterior ao PRIMEIRO movimento: A, depois B, depois voltar leva ao ponto de partida. Se mover o mapa entre dois saltos, esse sítio passa a ser o ponto de partida.</td></tr><tr><td><b>Comprimento</b></td><td>Comprimento da seleção (o total para vários segmentos) — o mesmo valor do fundo do painel.</td></tr></table>',
            hHoverT: 'Ao passar o rato',
            hHoverB: '<p>Pare o ponteiro um instante sobre um segmento selecionado: os mesmos botões aparecem ao lado. Um clique, afastar-se, mover o mapa ou <kbd>Esc</kbd> fecha-os.</p><p>Nunca abrem durante um desenho ou um arrasto.</p>',
            hMultiT: 'Vários segmentos',
            hMultiB: '<p>Se os segmentos selecionados se seguem, <b>A</b> e <b>B</b> levam às duas extremidades da cadeia, e &#x25CE; ao meio.</p><p>Caso contrário, só &#x26F6; e &#x25CE; (centro da área) são propostos.</p>',
            hKeysT: 'Teclado',
            hKeysB: '<p>Cinco atalhos aparecem <b>sem teclas</b> em Definições › Atalhos de teclado, para não tirar nenhuma a outro script. Atribua lá os que quiser.</p>',
            hSafeB: 'O script nunca altera o mapa: nada entra no histórico de anular.',
            lnkDiscuss: 'Tópico no Discuss',
            majBtn: v => 'A versão ' + v + ' está disponível',
            majInstall: 'Instalar',
        },
        he: {
            lblNode: 'צומת',
            tipA: 'מרכז את המפה על צומת A (תחילת המקטע)',
            tipB: 'מרכז את המפה על צומת B (סוף המקטע)',
            tipE1: 'מרכז את המפה על הקצה הראשון של השרשרת הנבחרת',
            tipE2: 'מרכז את המפה על הקצה השני של השרשרת הנבחרת',
            tipFit: 'הכל: זום להצגת כל הבחירה',
            tipMid: 'אמצע: מרכז את המפה על אמצע הבחירה',
            tipMidBox: 'מרכז: מרכז את המפה על מרכז האזור הנבחר',
            tipBack: 'חזרה לתצוגה שלפני הקפיצה',
            tipBackNone: 'חזרה: עדיין אין מיקום לחזור אליו',
            tipLen: (m, n) => n === 1 ? 'אורך המקטע הנבחר: ' + m : 'האורך הכולל של ' + n + ' המקטעים הנבחרים: ' + m,
            scA: 'קפיצה לצומת A (או לקצה הראשון של השרשרת הנבחרת)',
            scB: 'קפיצה לצומת B (או לקצה השני של השרשרת הנבחרת)',
            scFit: 'הצגת המקטעים הנבחרים במלואם',
            scMid: 'קפיצה לאמצע הבחירה',
            scBack: 'חזרה למיקום שלפני הקפיצה',
            sbHint: 'קפיצה לאחד מקצות המקטע הנבחר, לאמצעו, או הצגתו במלואו — וחזרה.',
            sbHover: 'סרגל במעבר עכבר',
            sbHoverHint: 'עצרו את הסמן על מקטע נבחר: הסרגל מופיע לידו.',
            sbHelp: 'עזרה',
            hPanelT: 'הכפתורים',
            hPanelB: '<table class="wjn-help-table"><tr><td><b>A</b> · <b>B</b></td><td>מרכז את המפה על צומת A או B של המקטע הנבחר. הזום נשמר.</td></tr><tr><td><b>&#x26F6;</b></td><td>זום כך שכל הבחירה תיכנס למסך.</td></tr><tr><td><b>&#x25CE;</b></td><td>מרכז על האמצע, הנמדד לאורך הדרך.</td></tr><tr><td><b>&#x21A9;</b></td><td>חזרה לתצוגה שלפני התזוזה הראשונה: A, אחר כך B, אחר כך חזרה — מחזיר לנקודת המוצא. אם תזיזו את המפה בעצמכם בין שתי קפיצות, המקום הזה יהפוך לנקודת המוצא.</td></tr><tr><td><b>אורך</b></td><td>אורך הבחירה (הסכום עבור כמה מקטעים) — אותו ערך שבתחתית הלוח.</td></tr></table>',
            hHoverT: 'במעבר עכבר',
            hHoverB: '<p>עצרו לרגע את הסמן על מקטע נבחר: אותם כפתורים מופיעים לידו. לחיצה, התרחקות, הזזת המפה או <kbd>Esc</kbd> סוגרים אותם.</p><p>הם לעולם לא נפתחים בזמן ציור או גרירה.</p>',
            hMultiT: 'כמה מקטעים',
            hMultiB: '<p>אם המקטעים הנבחרים רציפים, <b>A</b> ו-<b>B</b> מובילים לשני קצות השרשרת, ו-&#x25CE; לאמצעה.</p><p>אחרת מוצעים רק &#x26F6; ו-&#x25CE; (מרכז האזור).</p>',
            hKeysT: 'מקלדת',
            hKeysB: '<p>חמישה קיצורים מופיעים <b>ללא מקשים</b> בהגדרות › קיצורי מקלדת, כדי לא לקחת מקש מסקריפט אחר. הקצו שם את אלה שתרצו.</p>',
            hSafeB: 'הסקריפט לעולם אינו משנה את המפה: דבר אינו נכנס להיסטוריית הביטול.',
            lnkDiscuss: 'שרשור ב-Discuss',
            majBtn: v => 'גרסה ' + v + ' זמינה',
            majInstall: 'התקנה',
        },
    };

    // Seul « br » distingue le portugais brésilien ; d'anciens navigateurs rendent encore
    // « iw » pour l'hébreu.
    const detectLang = () => {
        try {
            const l = (pw.W?.userscripts?.state?.locale || document.documentElement.lang || navigator.language || 'en').toLowerCase();
            if (l.startsWith('pt')) return l.includes('br') ? 'pt-BR' : 'pt-PT';
            if (l.startsWith('he') || l.startsWith('iw')) return 'he';
            return ['fr', 'de', 'es', 'it', 'en'].find(c => l.startsWith(c)) || 'en';
        } catch (e) { return 'en'; }
    };
    let _lang = 'en';
    const t = (key, ...args) => {
        const v = (DICO[_lang] && DICO[_lang][key]) || DICO.en[key];
        if (typeof v === 'function') return v(...args);
        return v !== undefined ? v : key;
    };

    function lireOpts() {
        try { return Object.assign({ survol: true }, JSON.parse(localStorage.getItem(OPTS_KEY) || '{}')); }
        catch (e) { return { survol: true }; }
    }
    function ecrireOpts() {
        try { localStorage.setItem(OPTS_KEY, JSON.stringify(opts)); } catch (e) { }
    }

    // =====================================================================
    //  Géométrie — GeoJSON Waze en WGS84 (lon, lat)
    // =====================================================================

    // Distance locale en mètres : à ces échelles l'approximation équirectangulaire suffit.
    function metres(a, b) {
        const kx = 111320 * Math.cos((a[1] + b[1]) / 2 * Math.PI / 180);
        return Math.hypot((b[0] - a[0]) * kx, (b[1] - a[1]) * 110540);
    }

    function pointAMiLongueur(coords) {
        let total = 0;
        for (let i = 1; i < coords.length; i++) total += metres(coords[i - 1], coords[i]);
        let reste = total / 2;
        for (let i = 1; i < coords.length; i++) {
            const d = metres(coords[i - 1], coords[i]);
            if (reste <= d && d > 0) {
                const u = reste / d;
                return [coords[i - 1][0] + u * (coords[i][0] - coords[i - 1][0]), coords[i - 1][1] + u * (coords[i][1] - coords[i - 1][1])];
            }
            reste -= d;
        }
        return coords[coords.length - 1];
    }

    function emprise(listes) {
        let w = Infinity, s = Infinity, e = -Infinity, n = -Infinity;
        for (const c of listes) for (const [x, y] of c) { w = Math.min(w, x); e = Math.max(e, x); s = Math.min(s, y); n = Math.max(n, y); }
        return [w, s, e, n];
    }

    function distPointSegment(px, py, ax, ay, bx, by) {
        const dx = bx - ax, dy = by - ay;
        const l2 = dx * dx + dy * dy;
        let u = l2 === 0 ? 0 : ((px - ax) * dx + (py - ay) * dy) / l2;
        u = Math.max(0, Math.min(1, u));
        return Math.hypot(px - (ax + u * dx), py - (ay + u * dy));
    }

    // =====================================================================
    //  La sélection
    // =====================================================================

    function segmentsSelectionnes() {
        let sel;
        try { sel = sdk.Editing.getSelection(); } catch (e) { return []; }
        if (!sel || sel.objectType !== 'segment' || !sel.ids || !sel.ids.length) return [];
        const segs = [];
        for (const id of sel.ids) {
            let s = null;
            try { s = sdk.DataModel.Segments.getById({ segmentId: id }); } catch (e) { }
            if (s && s.geometry && s.geometry.coordinates && s.geometry.coordinates.length >= 2) segs.push(s);
        }
        return segs.length === sel.ids.length ? segs : [];
    }

    // Plusieurs segments « se suivent » si leurs nœuds forment un chemin simple : deux nœuds
    // de degré 1 (les bouts), tous les autres de degré 2, et aucun morceau détaché. Le tracé
    // est alors recollé dans l'ordre, pour que le milieu soit celui de la chaîne.
    function chaine(segs) {
        if (segs.length === 1) return segs[0].geometry.coordinates.slice();
        const parNoeud = new Map();
        for (const s of segs) {
            if (s.fromNodeId == null || s.toNodeId == null || s.fromNodeId === s.toNodeId) return null;
            for (const n of [s.fromNodeId, s.toNodeId]) {
                if (!parNoeud.has(n)) parNoeud.set(n, []);
                parNoeud.get(n).push(s);
            }
        }
        const bouts = [...parNoeud.entries()].filter(([, l]) => l.length === 1).map(([n]) => n);
        if (bouts.length !== 2 || [...parNoeud.values()].some(l => l.length > 2)) return null;
        let noeud = bouts[0];
        const vus = new Set();
        const trace = [];
        let sensPremier = true;       // la chaîne parcourt-elle le premier segment de A vers B ?
        while (true) {
            const s = (parNoeud.get(noeud) || []).find(x => !vus.has(x.id));
            if (!s) break;
            vus.add(s.id);
            const c = s.geometry.coordinates;
            const pts = s.fromNodeId === noeud ? c : c.slice().reverse();
            if (s === segs[0]) sensPremier = s.fromNodeId === noeud;
            trace.push(...(trace.length ? pts.slice(1) : pts));
            noeud = s.fromNodeId === noeud ? s.toNodeId : s.fromNodeId;
        }
        if (vus.size !== segs.length) return null;
        // La chaîne prend le sens du premier segment sélectionné : son bout A est du côté du
        // nœud A de ce segment, comme pour un segment seul. Le résultat ne dépend donc que de
        // ce premier segment, et non de l'ordre dans lequel les autres ont été ajoutés (avant la
        // 0.06.00, S2 puis S1 puis S3 et S2 puis S3 puis S1 donnaient deux A opposés).
        return sensPremier ? trace : trace.reverse();
    }

    // Ce que la sélection permet : tout ce qui suit se déduit de cet objet, et de lui seul.
    function cibles() {
        const segs = segmentsSelectionnes();
        if (!segs.length) return null;
        const trace = chaine(segs);
        const listes = segs.map(s => s.geometry.coordinates);
        const [w, s, e, n] = emprise(listes);
        return {
            unique: segs.length === 1,
            A: trace ? trace[0] : null,
            B: trace ? trace[trace.length - 1] : null,
            mid: trace ? pointAMiLongueur(trace) : [(w + e) / 2, (s + n) / 2],
            bbox: [w, s, e, n],
            listes,
            n: segs.length,
            // Même somme que « Longueur » en bas du panneau de WME.
            metres: segs.reduce((tot, x) => tot + (x.length || 0), 0),
        };
    }

    // =====================================================================
    //  Déplacements, retour, repère
    // =====================================================================

    function vueCourante() {
        const c = sdk.Map.getMapCenter();
        return { lon: c.lon, lat: c.lat, zoom: sdk.Map.getZoomLevel() };
    }

    // Deux vues sont les mêmes si le zoom est égal et si les centres tombent à 2 px près à
    // l'écran : une comparaison en degrés dépendrait du zoom.
    function memeVue(a, b) {
        if (!a || !b || a.zoom !== b.zoom) return false;
        const pa = sdk.Map.getPixelFromLonLat({ lonLat: { lon: a.lon, lat: a.lat } });
        const pb = sdk.Map.getPixelFromLonLat({ lonLat: { lon: b.lon, lat: b.lat } });
        return Math.hypot(pa.x - pb.x, pa.y - pb.y) <= 2;
    }

    // On garde la vue d'avant le PREMIER saut : A puis B puis Revenir ramène au point de départ,
    // pas au nœud A. Mais si la carte n'est plus là où le dernier saut l'a laissée, l'éditeur
    // l'a déplacée lui-même : le point de départ devient l'endroit où il est allé. Sans cela,
    // Revenir ramenait (jusqu'à la 0.05.01) à une vue du début de la session, à des kilomètres.
    function memoriser() {
        const v = vueCourante();
        if (retour && !memeVue(v, pose)) retour = null;
        if (!retour) retour = v;
    }

    // Relevée après le saut, puis à chaque déplacement qu'il provoque pendant une seconde : un
    // cadrage peut arriver en plusieurs temps. Un déplacement plus tardif est celui de l'éditeur.
    function noterPose() {
        poseJusqua = Date.now() + 1000;
        pose = vueCourante();
    }
    function surDeplacementCarte() {
        if (Date.now() < poseJusqua) { try { pose = vueCourante(); } catch (e) { } }
        cacherPop();
    }

    // Toutes les commandes (panneau, barre de survol, clavier) passent par ici.
    function agir(action) {
        if (action === 'back') { revenir(); return; }
        const c = cibles();
        if (!c) return;
        const pt = action === 'A' ? c.A : action === 'B' ? c.B : action === 'mid' ? c.mid : null;
        if (action !== 'fit' && !pt) return;
        memoriser();
        if (action === 'fit') {
            const [w, s, e, n] = c.bbox;
            const mx = Math.max((e - w) * FIT_MARGIN, 0.0002), my = Math.max((n - s) * FIT_MARGIN, 0.0002);
            sdk.Map.zoomToExtent({ bbox: [w - mx, s - my, e + mx, n + my] });
        } else {
            sdk.Map.setMapCenter({ lonLat: { lon: pt[0], lat: pt[1] } });
            flasher(pt);
        }
        noterPose();
        majBarre();
    }

    function revenir() {
        if (!retour) return;
        sdk.Map.setMapCenter({ lonLat: { lon: retour.lon, lat: retour.lat }, zoomLevel: retour.zoom });
        retour = null;
        pose = null;
        majBarre();
    }

    // Un anneau bref sur le point visé : le centre de la carte ne se voit pas, un point qui
    // s'allume si.
    function poserCalqueFlash() {
        try {
            sdk.Map.addLayer({
                layerName: FLASH_LAYER,
                styleRules: [{ style: { pointRadius: 14, fillOpacity: 0, strokeColor: '#ff00ff', strokeWidth: 4, strokeOpacity: 1 } }]
            });
            flashOk = true;
        } catch (e) { log('calque de repère : ' + e.message); }
    }

    function flasher(pt) {
        if (!flashOk) return;
        try {
            clearTimeout(flashTimer);
            sdk.Map.removeAllFeaturesFromLayer({ layerName: FLASH_LAYER });
            sdk.Map.addFeatureToLayer({
                layerName: FLASH_LAYER,
                feature: { type: 'Feature', id: 'wjn-point', geometry: { type: 'Point', coordinates: pt }, properties: {} }
            });
            flashTimer = setTimeout(() => {
                try { sdk.Map.removeAllFeaturesFromLayer({ layerName: FLASH_LAYER }); } catch (e) { }
            }, FLASH_MS);
        } catch (e) { log('repère : ' + e.message); }
    }

    // =====================================================================
    //  Apparence — mêmes jetons, même typo et mêmes gabarits que WME Closures Toolkit,
    //  pour que les scripts de la famille se lisent d'un coup d'œil
    // =====================================================================

    // Préfixe propre (--wjn-*) : les valeurs sont celles de WCT, mais les deux scripts
    // cohabitent sans que l'un dépende des variables de l'autre.
    // ⚠️ Pas d'accent grave dans ce bloc : il vit dans un template literal.
    const CSS = `
:root {
    --wjn-blue: #2196f3; --wjn-blue-btn: #1976d2; --wjn-blue-dk: #1565c0; --wjn-grey: #9e9e9e;
    --wjn-surface: #ffffff; --wjn-bg: #f5f7f9; --wjn-border: #dde3ea;
    --wjn-text: #2d3748; --wjn-text2: #566372;
    --wjn-radius: 8px; --wjn-shadow: 0 8px 32px rgba(0,0,0,.22), 0 2px 8px rgba(0,0,0,.12);
}
.wjn-row { display: flex; align-items: center; gap: 4px; font-family: 'Rubik','Open Sans',sans-serif; font-size: 12px; }
#${BAR_ID} { padding: 4px 16px 6px; }
.wjn-lbl {
    font-size: 10px; font-weight: 600; color: var(--wjn-text2);
    text-transform: uppercase; letter-spacing: .04em; margin-inline-end: 2px; white-space: nowrap;
}
.wjn-sep { width: 1px; height: 14px; background: var(--wjn-border); margin: 0 3px; flex-shrink: 0; }
/* Pastille ronde de 22 px : le gabarit des jours de WCT. WME impose height:32px à tout
   bouton, d'où la hauteur et le padding remis à plat. */
.wjn-chip {
    display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0;
    width: 22px; height: 22px; min-height: 0; padding: 0; margin: 0;
    font-family: inherit; font-size: 11px; font-weight: 700; line-height: 1;
    border-radius: 50%; border: 1px solid var(--wjn-border);
    background: var(--wjn-surface); color: var(--wjn-blue-dk); cursor: pointer; user-select: none;
    transition: background .12s, color .12s, border-color .12s, transform .1s;
}
/* Pastille pleine au survol : #1976d2 et non #2196f3, blanc dessus à 4,60:1 au lieu de 3,12:1 (charte, 25/09). */
.wjn-chip:hover { background: var(--wjn-blue-btn); border-color: var(--wjn-blue-btn); color: #fff; }
.wjn-chip:active { transform: scale(.92); }
.wjn-chip.wjn-ico { font-size: 13px; color: var(--wjn-text2); }
.wjn-chip.wjn-ico:hover { color: #fff; }
.wjn-chip[disabled] { opacity: .4; cursor: not-allowed; }
.wjn-chip[disabled]:hover { background: var(--wjn-surface); border-color: var(--wjn-border); color: var(--wjn-text2); }
.wjn-len {
    display: inline-flex; align-items: center; height: 22px; padding: 0 8px; margin-inline-start: auto;
    border-radius: 50px; background: #eceff1; color: #37474f;
    font-size: 11px; font-weight: 700; white-space: nowrap; cursor: help; font-variant-numeric: tabular-nums;
}
.wjn-chip:focus-visible, #wjn-sidebar :focus-visible { outline: 2px solid var(--wjn-blue); outline-offset: 1px; }
/* Barre de survol : les mêmes pastilles dans une carte flottante. Posée sur le body, jamais
   dans un conteneur positionné de WME — elle passerait sous la carte. */
#${POP_ID} {
    position: fixed; z-index: 10050; padding: 4px 6px;
    background: var(--wjn-surface); border: 1px solid var(--wjn-border);
    border-radius: 50px; box-shadow: var(--wjn-shadow);
}
#${POP_ID}[hidden] { display: none !important; }
#${POP_ID} .wjn-len { margin-inline-start: 0; }
/* Onglet Scripts — calqué sur #wct-sidebar */
#wjn-sidebar { padding: 10px 12px; font-family: 'Rubik','Open Sans',sans-serif; font-size: 12px; color: var(--wjn-text); }
#wjn-sidebar h2 { display: flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 700; color: var(--wjn-blue); margin: 0 0 8px; }
#wjn-sidebar h2 .wjn-sb-ico { display: inline-flex; }
#wjn-sidebar h2 .wjn-sb-ver { font-size: 11px; font-weight: 400; color: var(--wjn-grey); }
.wjn-sb-hint { font-size: 11px; color: var(--wjn-text2); line-height: 1.6; margin: 0; }
.wjn-sb-sec { font-size: 11px; font-weight: 700; color: var(--wjn-blue); text-transform: uppercase; letter-spacing: .05em; margin: 14px 0 6px; }
.wjn-toggle-row { display: flex; align-items: center; justify-content: space-between; margin-top: 12px; }
.wjn-toggle-lbl { font-size: 13px; font-weight: 600; cursor: pointer; }
.wjn-toggle { position: relative; width: 36px; height: 20px; flex-shrink: 0; }
.wjn-toggle input { opacity: 0; width: 0; height: 0; }
.wjn-toggle-slider { position: absolute; cursor: pointer; inset: 0; background: #8a94a0; border-radius: 50px; transition: background .2s; }
.wjn-toggle-slider:before { content: ''; position: absolute; width: 14px; height: 14px; inset-inline-start: 3px; bottom: 3px; background: #fff; border-radius: 50%; transition: transform .2s; }
.wjn-toggle input:checked + .wjn-toggle-slider { background: var(--wjn-blue); }
/* La case est invisible (0 × 0) : le contour du focus va sur le curseur. */
.wjn-toggle input:focus-visible + .wjn-toggle-slider { outline: 2px solid var(--wjn-blue-dk); outline-offset: 2px; }
.wjn-toggle input:checked + .wjn-toggle-slider:before { transform: translateX(16px); }
#wjn-sidebar[dir="rtl"] .wjn-toggle input:checked + .wjn-toggle-slider:before { transform: translateX(-16px); }
.wjn-help-section { border: 1px solid var(--wjn-border); border-radius: var(--wjn-radius); margin-bottom: 4px; overflow: hidden; }
.wjn-help-hdr {
    display: flex; align-items: center; justify-content: space-between; width: 100%;
    height: auto; min-height: 0; margin: 0; border: none; font-family: inherit; text-align: start;
    padding: 5px 9px; font-size: 11px; font-weight: 700;
    cursor: pointer; background: var(--wjn-bg); color: var(--wjn-text); user-select: none;
}
.wjn-help-hdr.on { color: var(--wjn-blue-dk); background: #e3f2fd; }
.wjn-help-hdr:hover { background: #eef4fb; }
.wjn-help-body { padding: 7px 9px; font-size: 11px; line-height: 1.5; color: var(--wjn-text); }
.wjn-help-body p { margin: 0 0 5px; }
.wjn-help-table { width: 100%; border-collapse: collapse; }
.wjn-help-table td { padding: 3px 5px; vertical-align: top; border-bottom: 1px solid var(--wjn-border); }
.wjn-help-table td:first-child { width: 44px; white-space: nowrap; color: var(--wjn-text2); }
/* WME impose un texte BLANC à la balise kbd. */
#wjn-sidebar kbd {
    display: inline-block; background: var(--wjn-bg); color: var(--wjn-text);
    border: 1px solid var(--wjn-border); border-bottom-width: 2px; border-radius: 3px;
    padding: 0 4px; font-family: ui-monospace,Menlo,Consolas,monospace; font-size: 10px; line-height: 1.5;
}
.wjn-sb-links { margin-top: 12px; padding-top: 10px; border-top: 1px solid var(--wjn-border); font-size: 11px; color: var(--wjn-text2); text-align: center; }
.wjn-sb-links a { color: var(--wjn-blue-dk); }
.wjn-sb-maj { margin: 0 0 8px; padding: 5px 8px; border-radius: 8px; background: #ffebee; color: #c62828; font-size: 11px; font-weight: 600; }
.wjn-sb-maj[hidden] { display: none; }
.wjn-sb-maj a { color: #c62828; }
.wjn-sb-foot { margin-top: 10px; font-size: 11px; color: var(--wjn-grey); line-height: 1.6; }
`;

    // =====================================================================
    //  Les pastilles — un seul gabarit pour le panneau et la barre de survol
    // =====================================================================

    const chip = (q, txt, ico) => '<button type="button" class="wjn-chip' + (ico ? ' wjn-ico' : '') + '" data-wjn="' + q + '">' + txt + '</button>';

    // Pour une chaîne, A et B désignent ses deux bouts : A est du côté du nœud A du premier
    // segment sélectionné (voir chaine()).
    function rangee(c, avecLibelle) {
        let h = '';
        if (c.A) {
            if (avecLibelle) h += '<span class="wjn-lbl">' + t('lblNode') + '</span>';
            h += chip('A', 'A') + chip('B', 'B') + '<span class="wjn-sep"></span>';
        }
        h += chip('fit', '&#x26F6;', true) + chip('mid', '&#x25CE;', true);
        return h;
    }

    // Longueur au format de la langue (« 3,84 km » et non « 3.842 km », qu'un francophone lit
    // trois mille huit cents) et dans l'unité choisie dans les réglages de WME ; la valeur
    // exacte va dans l'infobulle.
    function longueur(metres) {
        let imperial = false;
        try { imperial = !!sdk.Settings.getUserSettings().isImperial; } catch (e) { logUneFois('unite', 'unité des réglages illisible, mètres par défaut : ' + e.message); }
        // La valeur exacte s'écrit sans séparateur de milliers : « 3,842 m » (anglais, langue de
        // repli) se lirait 3,8 m pour un néerlandais ou un hispanophone ; « 3842 m » ne trompe personne.
        const nb = (v, d, groupes = true) => new Intl.NumberFormat(_lang, { minimumFractionDigits: d, maximumFractionDigits: d, useGrouping: groupes }).format(v);
        const esp = ' ';
        if (imperial) {
            const ft = metres * 3.28084;
            return { court: ft < 528 ? nb(ft, 0) + esp + 'ft' : nb(ft / 5280, 2) + esp + 'mi', exact: nb(ft, 0, false) + esp + 'ft' };
        }
        const court = metres < 1000 ? nb(metres, 0) + esp + 'm' : nb(metres / 1000, metres < 10000 ? 2 : 1) + esp + 'km';
        return { court, exact: nb(metres, 0, false) + esp + 'm' };
    }

    const badgeLongueur = () => '<span class="wjn-len"></span>';

    const chipRetour = () => '<button type="button" class="wjn-chip wjn-ico wjn-back" data-wjn="back">&#x21A9;</button>';

    function titrer(racine, c) {
        const tips = { A: c.unique ? 'tipA' : 'tipE1', B: c.unique ? 'tipB' : 'tipE2', fit: 'tipFit', mid: c.A ? 'tipMid' : 'tipMidBox' };
        for (const [q, k] of Object.entries(tips)) {
            const el = racine.querySelector('[data-wjn="' + q + '"]');
            if (el) { el.title = t(k); el.setAttribute('aria-label', t(k)); }
        }
        const bk = racine.querySelector('[data-wjn="back"]');
        if (bk) {
            bk.title = retour ? t('tipBack') : t('tipBackNone');
            bk.setAttribute('aria-label', bk.title);
            bk.disabled = !retour;
        }
        const ln = racine.querySelector('.wjn-len');
        if (ln) {
            const l = longueur(c.metres);
            // Écrire le même texte remplace quand même le nœud : l'observateur du panneau le verrait
            // et rappellerait titrer(), sans fin.
            if (ln.textContent !== l.court) ln.textContent = l.court;
            ln.title = t('tipLen', l.exact, c.n);
        }
    }

    function ecouterClics(racine, apres) {
        racine.addEventListener('click', ev => {
            const b = ev.target.closest('[data-wjn]');
            if (!b || b.disabled) return;
            agir(b.getAttribute('data-wjn'));
            if (apres) apres();
        });
    }

    // =====================================================================
    //  La barre du panneau, sous l'en-tête du segment — une seule ligne
    // =====================================================================

    let signatureBarre = '';

    function majBarre() {
        const bar = document.getElementById(BAR_ID);
        const c = cibles();
        if (!bar || !c) return;
        titrer(bar, c);
    }

    // WME reconstruit le panneau à chaque sélection : la barre est reposée à chaque fois, et
    // retirée quand la sélection n'est plus faite de segments.
    function placerBarre() {
        const entete = document.querySelector('.segment-feature-editor wz-section-header');
        const existante = document.getElementById(BAR_ID);
        const c = cibles();
        if (c && !entete && document.querySelector('.segment-feature-editor')) logUneFois('entete', 'en-tête du panneau du segment introuvable : la barre n\'est pas posée');
        if (!c || !entete) { if (existante) existante.remove(); signatureBarre = ''; return; }
        const sig = _lang + (c.unique ? 'u' : 'm') + (c.A ? 'c' : '-');
        // Même conteneur que l'en-tête suffit : exiger la place JUSTE en dessous ferait se battre
        // la barre avec tout autre script qui s'y glisse (WME Route Preview avait dû céder).
        if (existante && existante.parentElement === entete.parentElement && sig === signatureBarre) { titrer(existante, c); return; }
        if (existante) existante.remove();
        const bar = document.createElement('div');
        bar.id = BAR_ID;
        bar.className = 'wjn-row';
        bar.innerHTML = rangee(c, true) + '<span class="wjn-sep"></span>' + chipRetour() + badgeLongueur();
        ecouterClics(bar);
        entete.after(bar);
        signatureBarre = sig;
        titrer(bar, c);
    }

    // Un setTimeout et non requestAnimationFrame : ce dernier est suspendu dans un onglet en
    // arrière-plan, et la barre manquerait au retour sur l'onglet.
    let placementPrevu = false;
    function planifierPlacement() {
        if (placementPrevu) return;
        placementPrevu = true;
        setTimeout(() => { placementPrevu = false; placerBarre(); }, 30);
    }

    // =====================================================================
    //  La barre de survol
    // =====================================================================

    let pop = null;
    let survolTimer = null;
    let masquageTimer = null;
    let arret = null;             // {x, y} : où le pointeur s'est arrêté
    let boutonEnfonce = false;
    let surPop = false;           // le pointeur est sur la barre : elle ne doit pas s'effacer

    function surLaSelection(x, y) {
        const c = cibles();
        if (!c) return false;
        for (const coords of c.listes) {
            let prec = null;
            for (const [lon, lat] of coords) {
                const p = sdk.Map.getPixelFromLonLat({ lonLat: { lon, lat } });
                if (prec && distPointSegment(x, y, prec.x, prec.y, p.x, p.y) <= HOVER_PX) return true;
                prec = p;
            }
        }
        return false;
    }

    function cacherPop() {
        clearTimeout(survolTimer); clearTimeout(masquageTimer);
        arret = null;
        surPop = false;
        if (pop) pop.hidden = true;
    }

    function montrerPop(x, y) {
        const c = cibles();
        if (!c) return;
        if (!pop) {
            pop = document.createElement('div');
            pop.id = POP_ID;
            pop.className = 'wjn-row';
            pop.setAttribute('role', 'toolbar');
            ecouterClics(pop, cacherPop);
            pop.addEventListener('mouseenter', () => { surPop = true; clearTimeout(masquageTimer); });
            pop.addEventListener('mouseleave', () => { surPop = false; clearTimeout(masquageTimer); masquageTimer = setTimeout(cacherPop, HIDE_GRACE); });
            document.body.appendChild(pop);
        }
        pop.dir = _lang === 'he' ? 'rtl' : 'ltr';
        pop.innerHTML = rangee(c, false) + (retour ? '<span class="wjn-sep"></span>' + chipRetour() : '') + '<span class="wjn-sep"></span>' + badgeLongueur();
        titrer(pop, c);
        pop.hidden = false;
        // Décalée en bas à droite du pointeur, et ramenée dans la fenêtre si besoin : la barre
        // ne doit jamais recouvrir le point que l'on survole.
        const r = pop.getBoundingClientRect();
        let px = x + 14, py = y + 14;
        if (px + r.width > window.innerWidth - 4) px = x - 14 - r.width;
        if (py + r.height > window.innerHeight - 4) py = y - 14 - r.height;
        pop.style.left = Math.max(4, px) + 'px';
        pop.style.top = Math.max(4, py) + 'px';
    }

    function surMouvement(ev) {
        if (!opts.survol || boutonEnfonce) return;
        let dessin = false;
        try { dessin = sdk.Editing.isDrawingInProgress(); } catch (e) { logUneFois('dessin', 'état du tracé illisible : ' + e.message); }
        if (dessin) { cacherPop(); return; }
        const dessus = surLaSelection(ev.clientX, ev.clientY);
        const visible = pop && !pop.hidden;
        // Un mouvement traité en retard, pris juste avant d'entrer dans la barre, réarmait le
        // masquage APRÈS son mouseenter : elle s'effaçait sous le pointeur (0.05.01).
        if (visible && surPop) return;
        if (visible) {
            if (dessus) clearTimeout(masquageTimer);
            else { clearTimeout(masquageTimer); masquageTimer = setTimeout(cacherPop, HIDE_GRACE); }
            return;
        }
        if (!dessus) { clearTimeout(survolTimer); arret = null; return; }
        if (arret && Math.hypot(ev.clientX - arret.x, ev.clientY - arret.y) <= HOVER_STILL_PX) return;
        arret = { x: ev.clientX, y: ev.clientY };
        clearTimeout(survolTimer);
        survolTimer = setTimeout(() => montrerPop(arret.x, arret.y), HOVER_DELAY);
    }

    function brancherSurvol() {
        let vue;
        try { vue = sdk.Map.getMapViewportElement(); } catch (e) { log('survol : ' + e.message); return; }
        let prevu = null, dernier = null;
        vue.addEventListener('mousemove', ev => {
            // Un setTimeout et non requestAnimationFrame, suspendu dans un onglet en arrière-plan.
            // On traite le DERNIER mouvement de la fenêtre de 16 ms, là où est le pointeur.
            dernier = ev;
            if (prevu) return;
            prevu = setTimeout(() => { prevu = null; surMouvement(dernier); }, 16);
        });
        vue.addEventListener('mousedown', () => { boutonEnfonce = true; cacherPop(); });
        window.addEventListener('mouseup', () => { boutonEnfonce = false; });
        // Bouton relâché hors de la fenêtre : aucun mouseup n'arrive, la barre ne s'ouvrirait plus.
        window.addEventListener('blur', () => { boutonEnfonce = false; });
        vue.addEventListener('mouseleave', ev => {
            if (pop && !pop.hidden && pop.contains(ev.relatedTarget)) return;
            clearTimeout(survolTimer);
            if (pop && !pop.hidden) masquageTimer = setTimeout(cacherPop, HIDE_GRACE);
        });
        document.addEventListener('keydown', ev => { if (ev.key === 'Escape' && pop && !pop.hidden) cacherPop(); });
        try { sdk.Events.on({ eventName: 'wme-map-move', eventHandler: surDeplacementCarte }); }
        catch (e) { log('événement de déplacement : ' + e.message + ' — Revenir ne verra pas les déplacements faits à la main'); }
    }

    // =====================================================================
    //  Nouvelle version publiée — même mécanique que WCT, WRP et WDA
    // =====================================================================
    //  La pastille ne s'allume que sur une version PUBLIÉE strictement supérieure à celle qui tourne ;
    //  hors ligne, réponse illisible ou page absente, elle reste éteinte. On lit le .meta.js de
    //  GreasyFork (quelques centaines d'octets), au plus une fois par 24 h.

    const gmScript = () => (typeof GM_info !== 'undefined' && GM_info.script) || {};
    const URL_MAJ = gmScript().updateURL || 'https://update.greasyfork.org/scripts/597298/WME%20Jump%20to%20Node.meta.js';
    const URL_INSTALLER = gmScript().downloadURL || 'https://update.greasyfork.org/scripts/597298/WME%20Jump%20to%20Node.user.js';
    const VER_RE = /^\d+(\.\d+)*$/;
    const MAJ_KEY = 'wjn.maj.v1', MAJ_DELAI = 864e5;
    let majEnLigne = null;
    // Segment par segment, en nombres : en chaînes, « 0.9.00 » passerait pour plus récent que « 0.13.00 ».
    const majCmp = (a, b) => {
        const pa = String(a).split('.'), pb = String(b).split('.');
        for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
            const x = Number(pa[i]) || 0, y = Number(pb[i]) || 0;
            if (x !== y) return x < y ? -1 : 1;
        }
        return 0;
    };
    function majRendre() {
        const e = document.getElementById('wjn-sb-maj');
        if (e) { e.hidden = !majEnLigne; if (majEnLigne) e.querySelector('span').textContent = t('majBtn', majEnLigne); }
    }
    function verifierMaj() {
        if (!VER_RE.test(VERSION) || typeof GM_xmlhttpRequest !== 'function') return;
        let memo = null;
        try { memo = JSON.parse(localStorage.getItem(MAJ_KEY) || 'null'); } catch (e) { }
        if (memo && Date.now() - memo.t < MAJ_DELAI) {
            if (memo.v && VER_RE.test(memo.v) && majCmp(VERSION, memo.v) < 0) { majEnLigne = memo.v; majRendre(); }
            return;
        }
        const retenir = v => { try { localStorage.setItem(MAJ_KEY, JSON.stringify({ t: Date.now(), v })); } catch (e) { } };
        GM_xmlhttpRequest({
            method: 'GET', url: URL_MAJ, timeout: 10000, nocache: true,
            onload: r => {
                // onload vient AUSSI sur un 404 : la page d'erreur ne doit pas être lue comme un script.
                if (r.status < 200 || r.status >= 300) { retenir(null); return; }
                const m = (r.responseText || '').match(/^\/\/\s*@version\s+(\S+)/m);
                retenir(m && VER_RE.test(m[1]) ? m[1] : null);
                if (!m || !VER_RE.test(m[1]) || majCmp(VERSION, m[1]) >= 0) return;
                majEnLigne = m[1];
                majRendre();
                log('nouvelle version publiée : ' + m[1] + ' (installée : ' + VERSION + ')');
            },
            onerror: () => { }, ontimeout: () => { },
        });
    }

    // =====================================================================
    //  Onglet Scripts — même ossature que celui de WCT
    // =====================================================================

    const AIDE = [
        { id: 'panel', t: 'hPanelT', b: 'hPanelB' },
        { id: 'hover', t: 'hHoverT', b: 'hHoverB' },
        { id: 'multi', t: 'hMultiT', b: 'hMultiB' },
        { id: 'keys', t: 'hKeysT', b: 'hKeysB' },
    ];

    const construireOnglet = () => `
<div id="wjn-sidebar" dir="${_lang === 'he' ? 'rtl' : 'ltr'}">
    <h2><span class="wjn-sb-ico">${icone(18)}</span>${SCRIPT_NAME} <span class="wjn-sb-ver">v${VERSION}</span></h2>
    <p class="wjn-sb-maj" id="wjn-sb-maj" hidden><span></span> <a href="#" id="wjn-maj">${t('majInstall')}</a></p>
    <p class="wjn-sb-hint">${t('sbHint')}</p>
    <div class="wjn-toggle-row">
        <label class="wjn-toggle-lbl" for="wjn-survol">${t('sbHover')}</label>
        <label class="wjn-toggle">
            <input type="checkbox" id="wjn-survol" ${opts.survol ? 'checked' : ''}>
            <span class="wjn-toggle-slider"></span>
        </label>
    </div>
    <p class="wjn-sb-hint" style="margin-top:4px">${t('sbHoverHint')}</p>
    <div class="wjn-sb-sec">&#x2753; ${t('sbHelp')}</div>
    ${AIDE.map((s, i) => `
    <div class="wjn-help-section">
        <button type="button" class="wjn-help-hdr${i === 0 ? ' on' : ''}" data-aide="${s.id}" aria-expanded="${i === 0}">${t(s.t)} <span>${i === 0 ? '&#x25BC;' : '&#x25B6;'}</span></button>
        <div class="wjn-help-body" data-corps="${s.id}"${i === 0 ? '' : ' hidden'}>${t(s.b)}</div>
    </div>`).join('')}
    <div class="wjn-sb-links">&#x1F4AC; <a href="${URL_DISCUSS}" target="_blank" rel="noopener">${t('lnkDiscuss')}</a> &nbsp;&#xB7;&nbsp; &#x1F517; <a href="${URL_GF}" target="_blank" rel="noopener">GreasyFork</a> &nbsp;&#xB7;&nbsp; <a href="${URL_GH}" target="_blank" rel="noopener">GitHub</a></div>
    <p class="wjn-sb-foot">&#x1F512; ${t('hSafeB')}</p>
</div>`;

    async function poserOnglet() {
        try {
            const res = await sdk.Sidebar.registerScriptTab();
            res.tabLabel.innerHTML = '<span style="display:inline-flex;vertical-align:middle">' + icone(20) + '</span>';
            res.tabLabel.title = SCRIPT_NAME;
            res.tabLabel.setAttribute('aria-label', SCRIPT_NAME);
            res.tabPane.innerHTML = construireOnglet();
            majRendre();
            const cb = res.tabPane.querySelector('#wjn-survol');
            cb.addEventListener('change', () => { opts.survol = cb.checked; ecrireOpts(); if (!opts.survol) cacherPop(); });
            res.tabPane.addEventListener('click', ev => {
                if (ev.target.closest('#wjn-maj')) { ev.preventDefault(); window.open(URL_INSTALLER, '_blank', 'noopener'); return; }
                const h = ev.target.closest('[data-aide]');
                if (!h) return;
                const corps = res.tabPane.querySelector('[data-corps="' + h.getAttribute('data-aide') + '"]');
                const ouvrir = corps.hidden;
                corps.hidden = !ouvrir;
                h.classList.toggle('on', ouvrir);
                h.setAttribute('aria-expanded', String(ouvrir));
                h.querySelector('span').innerHTML = ouvrir ? '&#x25BC;' : '&#x25B6;';
            });
        } catch (e) { log('onglet : ' + e.message); }
    }

    // Déclarés sans touches, pour ne rien prendre à un autre script : chacun les attribue
    // dans Paramètres › Raccourcis clavier.
    //
    // WME ne garde PAS les touches qu'on attribue aux raccourcis d'un script : au rechargement,
    // le script les redéclare et elles repartent à « None » (mesuré le 26/09 : Alt+Maj+J posé,
    // actif, perdu au rechargement). Le script les relit donc par getAllShortcuts() quand la
    // page se ferme ou passe en arrière-plan, et les redonne à createShortcut au chargement.
    // Le format rendu (« 6,74 » : modificateurs, code de touche) est accepté tel quel en retour.
    // Mais la touche posée à la main revient au format « 6,74 » (bits C=1 S=2 A=4, code de touche),
    // que createShortcut accepte sans l'afficher (un caractère nul dans la liste de WME) ; il faut
    // lui rendre « SA+j » (mesuré le 26/09 : « AS+k » et « SA+k » s'affichent Alt + Maj + K, mais
    // « A+S+k » perd Maj). On traduit les lettres et les chiffres ; une touche spéciale (flèche,
    // pavé numérique) n'est pas reprise, faute d'un nom que createShortcut comprenne.
    function versFormatSdk(k) {
        const m = /^(\d+),(\d+)$/.exec(String(k || ''));
        if (!m) return k || null;
        const bits = +m[1], code = +m[2];
        const touche = (code >= 48 && code <= 57) || (code >= 65 && code <= 90) ? String.fromCharCode(code).toLowerCase() : null;
        if (!touche) return null;
        const mods = (bits & 1 ? 'C' : '') + (bits & 2 ? 'S' : '') + (bits & 4 ? 'A' : '');
        return (mods ? mods + '+' : '') + touche;
    }
    const TOUCHES_KEY = 'wjn.raccourcis';
    let touchesConnues = '{}';    // ce que cet onglet a lu ou écrit en dernier
    function lireTouches() {
        try { const o = JSON.parse(localStorage.getItem(TOUCHES_KEY) || '{}'); return o && typeof o === 'object' ? o : {}; }
        catch (e) { return {}; }
    }
    // N'écrit que si les touches ont changé DANS CET ONGLET : sinon, un second onglet WME fermé
    // après coup effacerait la touche qu'on vient de poser dans le premier (mesuré le 26/09 : une
    // instance sans touche a remis le stockage à « {} » en se fermant).
    function retenirTouches() {
        let liste;
        try { liste = sdk.Shortcuts.getAllShortcuts(); } catch (e) { logUneFois('touches', 'raccourcis illisibles : ' + e.message); return; }
        const o = {};
        for (const r of liste || []) {
            if (!r || !/^wjn-/.test(r.shortcutId) || !r.shortcutKeys) continue;
            const k = versFormatSdk(r.shortcutKeys);
            if (k) o[r.shortcutId] = k;
            else logUneFois('touche-' + r.shortcutId, 'raccourci ' + r.shortcutId + ' : touche spéciale ' + r.shortcutKeys + ' non retenue');
        }
        const s = JSON.stringify(o);
        if (s === touchesConnues) return;
        try { localStorage.setItem(TOUCHES_KEY, s); touchesConnues = s; } catch (e) { }
    }

    function poserRaccourcis() {
        const defs = [
            { id: 'wjn-node-a', desc: 'scA', act: 'A' },
            { id: 'wjn-node-b', desc: 'scB', act: 'B' },
            { id: 'wjn-fit', desc: 'scFit', act: 'fit' },
            { id: 'wjn-middle', desc: 'scMid', act: 'mid' },
            { id: 'wjn-back', desc: 'scBack', act: 'back' },
        ];
        const touches = lireTouches();
        touchesConnues = JSON.stringify(touches);
        for (const d of defs) {
            const creer = cles => sdk.Shortcuts.createShortcut({ shortcutId: d.id, shortcutKeys: cles, description: t(d.desc), callback: () => agir(d.act) });
            try {
                creer(versFormatSdk(touches[d.id]));
            } catch (e) {
                // Touche prise entre-temps par un autre script : on la lui laisse, sans touche ici.
                log('raccourci ' + d.id + ' : ' + e.message + (touches[d.id] ? ' — reposé sans touche' : ''));
                if (touches[d.id]) { try { creer(null); } catch (e2) { log('raccourci ' + d.id + ' : ' + e2.message); } }
            }
        }
        pw.addEventListener('beforeunload', retenirTouches);
        document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') retenirTouches(); });
    }

    // =====================================================================
    //  INIT
    // =====================================================================

    const init = () => {
        if (pw.__WJN_LOADED) return;
        pw.__WJN_LOADED = true;

        sdk = pw.getWmeSdk({ scriptId: SCRIPT_ID, scriptName: SCRIPT_NAME });
        _lang = detectLang();
        opts = lireOpts();

        const st = document.createElement('style');
        st.textContent = CSS;
        document.head.appendChild(st);

        poserCalqueFlash();
        poserRaccourcis();
        poserOnglet();
        brancherSurvol();
        verifierMaj();

        try { sdk.Events.on({ eventName: 'wme-selection-changed', eventHandler: () => { cacherPop(); planifierPlacement(); } }); }
        catch (e) { log('événement sélection : ' + e.message); }
        // Le panneau se re-rend aussi sans changement de sélection (onglets, enregistrement).
        const panneau = document.getElementById('edit-panel') || document.body;
        if (panneau === document.body) log('#edit-panel absent : le panneau est surveillé depuis le body, plus coûteux');
        new MutationObserver(planifierPlacement).observe(panneau, { childList: true, subtree: true });

        planifierPlacement();
        log('v' + VERSION + ' prêt — langue ' + _lang);
    };

    if (pw.W?.userscripts?.state?.isReady) init();
    else document.addEventListener('wme-ready', init, { once: true });

})();
