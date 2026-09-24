// ==UserScript==
// @name         WME Jump to Node
// @name:fr      WME Jump to Node
// @name:de      WME Jump to Node
// @name:es      WME Jump to Node
// @name:it      WME Jump to Node
// @name:pt-BR   WME Jump to Node
// @name:pt      WME Jump to Node
// @name:he      WME Jump to Node
// @icon         data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc2NCcgaGVpZ2h0PSc2NCcgdmlld0JveD0nMCAwIDY0IDY0Jz48cmVjdCB3aWR0aD0nNjQnIGhlaWdodD0nNjQnIHJ4PScxMicgZmlsbD0nIzE1NjVjMCcvPjxwYXRoIGQ9J00xMiA0OCBDMjQgNDYgMzAgMjAgNTAgMTYnIGZpbGw9J25vbmUnIHN0cm9rZT0nI2ZmZmZmZicgc3Ryb2tlLXdpZHRoPSc1JyBzdHJva2UtbGluZWNhcD0ncm91bmQnLz48Y2lyY2xlIGN4PScxMicgY3k9JzQ4JyByPSc2JyBmaWxsPScjZmZmZmZmJy8+PGNpcmNsZSBjeD0nNTAnIGN5PScxNicgcj0nOScgZmlsbD0nbm9uZScgc3Ryb2tlPScjZmI4YzAwJyBzdHJva2Utd2lkdGg9JzQnLz48Y2lyY2xlIGN4PSc1MCcgY3k9JzE2JyByPSc0JyBmaWxsPScjZmI4YzAwJy8+PC9zdmc+Cg==
// @namespace    https://github.com/DrSlump34
// @version      0.02.00
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
// @match        https://www.waze.com/*/editor*
// @match        https://www.waze.com/editor*
// @match        https://beta.waze.com/*/editor*
// @exclude      https://www.waze.com/*user/*editor/*
// @exclude      https://www.waze.com/discuss/*
// @exclude      https://www.waze.com/editor/sdk/*
// @grant        none
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

    // Survol : la barre n'apparaît que si le pointeur S'ARRÊTE sur la sélection (intention de
    // survol), pour ne pas clignoter à chaque passage ; elle tolère un bref écart pour qu'on
    // puisse l'atteindre.
    const HOVER_PX = 8;           // distance au tracé, en pixels d'écran
    const HOVER_DELAY = 350;      // temps d'arrêt avant apparition
    const HOVER_STILL_PX = 6;     // mouvement toléré pendant ce temps
    const HIDE_GRACE = 450;       // délai avant disparition quand on s'éloigne
    const FIT_MARGIN = 0.12;      // marge du cadrage, en fraction de l'emprise

    let sdk = null;
    let retour = null;            // {lon, lat, zoom} : la vue d'avant le premier déplacement
    let flashTimer = null;
    let flashOk = false;
    let opts = { survol: true };

    const log = m => console.log('[WJN] ' + m);

    // =====================================================================
    //  I18N — détection sur la locale de WME, repli sur l'anglais
    // =====================================================================

    const DICO = {
        en: {
            goTo: 'Go to node', goToChain: 'Go to',
            fit: 'Fit', mid: 'Middle', back: 'Back',
            tipA: 'Center the map on node A (start of the segment)',
            tipB: 'Center the map on node B (end of the segment)',
            tipE1: 'Center the map on the first end of the selected chain',
            tipE2: 'Center the map on the other end of the selected chain',
            tipFit: 'Zoom to show the whole selection',
            tipMid: 'Center the map on the middle of the selection',
            tipBack: 'Return to where you were before',
            tipBackNone: 'Nothing to return to yet',
            scA: 'Jump to node A (or first end of the selected chain)',
            scB: 'Jump to node B (or other end of the selected chain)',
            scFit: 'Fit the selected segments on screen',
            scMid: 'Jump to the middle of the selection',
            scBack: 'Return to the position before the jump',
            pHover: 'Show the toolbar when hovering the selected segments',
            pHoverHelp: 'Rest the pointer on a selected segment: a small toolbar appears next to it. Press Esc to dismiss it.',
            pKeys: 'Keyboard shortcuts are listed, without keys, under Settings › Keyboard shortcuts — assign the ones you want there.',
        },
        fr: {
            goTo: 'Aller au nœud', goToChain: 'Aller à',
            fit: 'Tout voir', mid: 'Milieu', back: 'Revenir',
            tipA: 'Centrer la carte sur le nœud A (début du segment)',
            tipB: 'Centrer la carte sur le nœud B (fin du segment)',
            tipE1: 'Centrer la carte sur le premier bout de la chaîne sélectionnée',
            tipE2: 'Centrer la carte sur l\'autre bout de la chaîne sélectionnée',
            tipFit: 'Zoomer pour voir toute la sélection',
            tipMid: 'Centrer la carte sur le milieu de la sélection',
            tipBack: 'Revenir là où vous étiez avant',
            tipBackNone: 'Aucune position à retrouver pour l\'instant',
            scA: 'Aller au nœud A (ou au premier bout de la chaîne sélectionnée)',
            scB: 'Aller au nœud B (ou à l\'autre bout de la chaîne sélectionnée)',
            scFit: 'Afficher en entier les segments sélectionnés',
            scMid: 'Aller au milieu de la sélection',
            scBack: 'Revenir à la position d\'avant le saut',
            pHover: 'Afficher la barre au survol des segments sélectionnés',
            pHoverHelp: 'Arrêtez le pointeur sur un segment sélectionné : une petite barre apparaît à côté. Échap la referme.',
            pKeys: 'Les raccourcis clavier sont listés, sans touches, dans Paramètres › Raccourcis clavier — attribuez-y ceux que vous voulez.',
        },
        de: {
            goTo: 'Zu Knoten', goToChain: 'Gehe zu',
            fit: 'Alles', mid: 'Mitte', back: 'Zurück',
            tipA: 'Karte auf Knoten A zentrieren (Anfang des Segments)',
            tipB: 'Karte auf Knoten B zentrieren (Ende des Segments)',
            tipE1: 'Karte auf das erste Ende der ausgewählten Kette zentrieren',
            tipE2: 'Karte auf das andere Ende der ausgewählten Kette zentrieren',
            tipFit: 'Zoomen, um die ganze Auswahl zu zeigen',
            tipMid: 'Karte auf die Mitte der Auswahl zentrieren',
            tipBack: 'Zurück zur vorherigen Position',
            tipBackNone: 'Noch keine Position zum Zurückkehren',
            scA: 'Zu Knoten A springen (oder zum ersten Ende der Kette)',
            scB: 'Zu Knoten B springen (oder zum anderen Ende der Kette)',
            scFit: 'Ausgewählte Segmente ganz anzeigen',
            scMid: 'Zur Mitte der Auswahl springen',
            scBack: 'Zurück zur Position vor dem Sprung',
            pHover: 'Leiste beim Überfahren der ausgewählten Segmente zeigen',
            pHoverHelp: 'Den Zeiger auf einem ausgewählten Segment ruhen lassen: daneben erscheint eine kleine Leiste. Esc schließt sie.',
            pKeys: 'Die Tastenkürzel stehen ohne Tasten unter Einstellungen › Tastenkürzel — dort nach Wunsch belegen.',
        },
        es: {
            goTo: 'Ir al nodo', goToChain: 'Ir a',
            fit: 'Ver todo', mid: 'Centro', back: 'Volver',
            tipA: 'Centrar el mapa en el nodo A (inicio del segmento)',
            tipB: 'Centrar el mapa en el nodo B (final del segmento)',
            tipE1: 'Centrar el mapa en el primer extremo de la cadena seleccionada',
            tipE2: 'Centrar el mapa en el otro extremo de la cadena seleccionada',
            tipFit: 'Hacer zoom para ver toda la selección',
            tipMid: 'Centrar el mapa en el punto medio de la selección',
            tipBack: 'Volver adonde estaba antes',
            tipBackNone: 'Todavía no hay posición a la que volver',
            scA: 'Ir al nodo A (o al primer extremo de la cadena seleccionada)',
            scB: 'Ir al nodo B (o al otro extremo de la cadena seleccionada)',
            scFit: 'Mostrar enteros los segmentos seleccionados',
            scMid: 'Ir al punto medio de la selección',
            scBack: 'Volver a la posición anterior al salto',
            pHover: 'Mostrar la barra al pasar sobre los segmentos seleccionados',
            pHoverHelp: 'Detenga el puntero sobre un segmento seleccionado: aparece una pequeña barra al lado. Esc la cierra.',
            pKeys: 'Los atajos de teclado aparecen, sin teclas, en Ajustes › Atajos de teclado — asigne allí los que quiera.',
        },
        it: {
            goTo: 'Vai al nodo', goToChain: 'Vai a',
            fit: 'Tutto', mid: 'Centro', back: 'Indietro',
            tipA: 'Centra la mappa sul nodo A (inizio del segmento)',
            tipB: 'Centra la mappa sul nodo B (fine del segmento)',
            tipE1: 'Centra la mappa sul primo estremo della catena selezionata',
            tipE2: 'Centra la mappa sull\'altro estremo della catena selezionata',
            tipFit: 'Zoom per vedere tutta la selezione',
            tipMid: 'Centra la mappa sul punto medio della selezione',
            tipBack: 'Torna dov\'eri prima',
            tipBackNone: 'Ancora nessuna posizione a cui tornare',
            scA: 'Vai al nodo A (o al primo estremo della catena selezionata)',
            scB: 'Vai al nodo B (o all\'altro estremo della catena selezionata)',
            scFit: 'Mostra per intero i segmenti selezionati',
            scMid: 'Vai al punto medio della selezione',
            scBack: 'Torna alla posizione precedente al salto',
            pHover: 'Mostra la barra passando sui segmenti selezionati',
            pHoverHelp: 'Fermate il puntatore su un segmento selezionato: accanto appare una piccola barra. Esc la chiude.',
            pKeys: 'Le scorciatoie da tastiera sono elencate, senza tasti, in Impostazioni › Scorciatoie da tastiera — assegnate lì quelle che volete.',
        },
        'pt-BR': {
            goTo: 'Ir ao nó', goToChain: 'Ir para',
            fit: 'Ver tudo', mid: 'Meio', back: 'Voltar',
            tipA: 'Centralizar o mapa no nó A (início do segmento)',
            tipB: 'Centralizar o mapa no nó B (fim do segmento)',
            tipE1: 'Centralizar o mapa na primeira ponta da cadeia selecionada',
            tipE2: 'Centralizar o mapa na outra ponta da cadeia selecionada',
            tipFit: 'Dar zoom para ver toda a seleção',
            tipMid: 'Centralizar o mapa no meio da seleção',
            tipBack: 'Voltar para onde você estava antes',
            tipBackNone: 'Ainda não há posição para voltar',
            scA: 'Ir ao nó A (ou à primeira ponta da cadeia selecionada)',
            scB: 'Ir ao nó B (ou à outra ponta da cadeia selecionada)',
            scFit: 'Mostrar inteiros os segmentos selecionados',
            scMid: 'Ir ao meio da seleção',
            scBack: 'Voltar à posição anterior ao salto',
            pHover: 'Mostrar a barra ao passar o mouse sobre os segmentos selecionados',
            pHoverHelp: 'Pare o ponteiro sobre um segmento selecionado: uma pequena barra aparece ao lado. Esc a fecha.',
            pKeys: 'Os atalhos de teclado aparecem, sem teclas, em Configurações › Atalhos de teclado — atribua lá os que quiser.',
        },
        'pt-PT': {
            goTo: 'Ir ao nó', goToChain: 'Ir para',
            fit: 'Ver tudo', mid: 'Meio', back: 'Voltar',
            tipA: 'Centrar o mapa no nó A (início do segmento)',
            tipB: 'Centrar o mapa no nó B (fim do segmento)',
            tipE1: 'Centrar o mapa na primeira extremidade da cadeia selecionada',
            tipE2: 'Centrar o mapa na outra extremidade da cadeia selecionada',
            tipFit: 'Fazer zoom para ver toda a seleção',
            tipMid: 'Centrar o mapa no meio da seleção',
            tipBack: 'Voltar ao sítio onde estava antes',
            tipBackNone: 'Ainda não há posição para onde voltar',
            scA: 'Ir ao nó A (ou à primeira extremidade da cadeia selecionada)',
            scB: 'Ir ao nó B (ou à outra extremidade da cadeia selecionada)',
            scFit: 'Mostrar por inteiro os segmentos selecionados',
            scMid: 'Ir ao meio da seleção',
            scBack: 'Voltar à posição anterior ao salto',
            pHover: 'Mostrar a barra ao passar o rato sobre os segmentos selecionados',
            pHoverHelp: 'Pare o ponteiro sobre um segmento selecionado: aparece uma pequena barra ao lado. Esc fecha-a.',
            pKeys: 'Os atalhos de teclado aparecem, sem teclas, em Definições › Atalhos de teclado — atribua lá os que quiser.',
        },
        he: {
            goTo: 'לצומת', goToChain: 'עבור אל',
            fit: 'הכל', mid: 'אמצע', back: 'חזרה',
            tipA: 'מרכז את המפה על צומת A (תחילת המקטע)',
            tipB: 'מרכז את המפה על צומת B (סוף המקטע)',
            tipE1: 'מרכז את המפה על הקצה הראשון של השרשרת הנבחרת',
            tipE2: 'מרכז את המפה על הקצה השני של השרשרת הנבחרת',
            tipFit: 'זום להצגת כל הבחירה',
            tipMid: 'מרכז את המפה על אמצע הבחירה',
            tipBack: 'חזרה למקום שבו היית קודם',
            tipBackNone: 'עדיין אין מיקום לחזור אליו',
            scA: 'קפיצה לצומת A (או לקצה הראשון של השרשרת הנבחרת)',
            scB: 'קפיצה לצומת B (או לקצה השני של השרשרת הנבחרת)',
            scFit: 'הצגת המקטעים הנבחרים במלואם',
            scMid: 'קפיצה לאמצע הבחירה',
            scBack: 'חזרה למיקום שלפני הקפיצה',
            pHover: 'הצג את הסרגל במעבר מעל המקטעים הנבחרים',
            pHoverHelp: 'עצרו את הסמן על מקטע נבחר: סרגל קטן מופיע לידו. Esc סוגר אותו.',
            pKeys: 'קיצורי המקלדת מופיעים, ללא מקשים, בהגדרות › קיצורי מקלדת — הקצו שם את אלה שתרצו.',
        },
    };

    // Seul « br » distingue le portugais brésilien ; d'anciens navigateurs rendent encore
    // « iw » pour l'hébreu.
    const detectLang = () => {
        try {
            const l = (window.W?.userscripts?.state?.locale || document.documentElement.lang || navigator.language || 'en').toLowerCase();
            if (l.startsWith('pt')) return l.includes('br') ? 'pt-BR' : 'pt-PT';
            if (l.startsWith('he') || l.startsWith('iw')) return 'he';
            return ['fr', 'de', 'es', 'it', 'en'].find(c => l.startsWith(c)) || 'en';
        } catch (e) { return 'en'; }
    };
    let _lang = 'en';
    const t = key => (DICO[_lang] && DICO[_lang][key]) || DICO.en[key] || key;

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
        // Le premier bout est celui du premier segment sélectionné, pour que A reste stable.
        const premier = segs[0];
        let noeud = [premier.fromNodeId, premier.toNodeId].includes(bouts[0]) ? bouts[0] : bouts[1];
        const vus = new Set();
        const trace = [];
        while (true) {
            const s = (parNoeud.get(noeud) || []).find(x => !vus.has(x.id));
            if (!s) break;
            vus.add(s.id);
            const c = s.geometry.coordinates;
            const pts = s.fromNodeId === noeud ? c : c.slice().reverse();
            trace.push(...(trace.length ? pts.slice(1) : pts));
            noeud = s.fromNodeId === noeud ? s.toNodeId : s.fromNodeId;
        }
        return vus.size === segs.length ? trace : null;
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
        };
    }

    // =====================================================================
    //  Déplacements, retour, repère
    // =====================================================================

    function memoriser() {
        if (retour) return;
        const c = sdk.Map.getMapCenter();
        retour = { lon: c.lon, lat: c.lat, zoom: sdk.Map.getZoomLevel() };
    }

    // Toutes les commandes (panneau, barre de survol, clavier) passent par ici.
    function agir(action) {
        if (action === 'back') { revenir(); return; }
        const c = cibles();
        if (!c) return;
        const pt = action === 'A' ? c.A : action === 'B' ? c.B : action === 'mid' ? c.mid : null;
        if (action !== 'fit' && !pt) return;
        // On garde la vue d'avant le PREMIER déplacement : A puis B puis Revenir ramène au
        // point de départ, pas au nœud A.
        memoriser();
        if (action === 'fit') {
            const [w, s, e, n] = c.bbox;
            const mx = Math.max((e - w) * FIT_MARGIN, 0.0002), my = Math.max((n - s) * FIT_MARGIN, 0.0002);
            sdk.Map.zoomToExtent({ bbox: [w - mx, s - my, e + mx, n + my] });
        } else {
            sdk.Map.setMapCenter({ lonLat: { lon: pt[0], lat: pt[1] } });
            flasher(pt);
        }
        majBarre();
    }

    function revenir() {
        if (!retour) return;
        sdk.Map.setMapCenter({ lonLat: { lon: retour.lon, lat: retour.lat }, zoomLevel: retour.zoom });
        retour = null;
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
    //  Les boutons — un seul gabarit pour le panneau et la barre de survol
    // =====================================================================

    const CSS = `
#${BAR_ID} { display: flex; align-items: center; flex-wrap: wrap; gap: 4px 6px; padding: 4px 16px 6px; }
#${BAR_ID} .wjn-lbl { font-size: 12px; color: var(--content_p2, #6a7075); margin-inline-end: 2px; }
#${BAR_ID} .wjn-back { margin-inline-start: auto; }
#${BAR_ID} .wjn-br { flex-basis: 100%; height: 0; }
#${POP_ID} { position: fixed; z-index: 10050; display: flex; align-items: center; gap: 4px; padding: 4px;
  background: var(--background_default, #fff); border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, .28); }
#${POP_ID}[hidden] { display: none !important; }
#${POP_ID} .wjn-sep { width: 1px; align-self: stretch; margin: 2px 2px; background: var(--hairline, #d5d7db); }
#wjn-pane label { display: flex; gap: 8px; align-items: flex-start; font-size: 13px; }
#wjn-pane p { font-size: 12px; color: var(--content_p2, #6a7075); margin: 6px 0 0; }
`;

    // Le libellé d'un bouton d'extrémité change avec la sélection : A/B pour un segment,
    // ⇤/⇥ pour une chaîne — un « nœud A » de chaîne ne correspondrait à rien dans WME.
    const bouton = (q, txt, cls) => '<wz-button size="sm" color="' + (cls || 'secondary') + '" data-wjn="' + q + '">' + txt + '</wz-button>';

    function boutonsExtremites(c) {
        return c.A ? bouton('A', c.unique ? 'A' : '&#x21E4;') + bouton('B', c.unique ? 'B' : '&#x21E5;') : '';
    }

    function boutonsVues(compact) {
        return bouton('fit', compact ? '&#x26F6;' : '&#x26F6; <span data-lbl="fit"></span>') +
            bouton('mid', compact ? '&#x25CE;' : '&#x25CE; <span data-lbl="mid"></span>');
    }

    function titrer(racine, c) {
        const tips = { A: c.unique ? 'tipA' : 'tipE1', B: c.unique ? 'tipB' : 'tipE2', fit: 'tipFit', mid: 'tipMid' };
        for (const [q, k] of Object.entries(tips)) {
            const el = racine.querySelector('[data-wjn="' + q + '"]');
            if (el) el.title = t(k);
        }
        racine.querySelectorAll('[data-lbl]').forEach(el => { el.textContent = t(el.getAttribute('data-lbl')); });
        const bk = racine.querySelector('[data-wjn="back"]');
        if (bk) {
            bk.title = retour ? t('tipBack') : t('tipBackNone');
            if (retour) bk.removeAttribute('disabled'); else bk.setAttribute('disabled', '');
        }
    }

    function ecouterClics(racine, apres) {
        racine.addEventListener('click', ev => {
            const b = ev.target.closest('[data-wjn]');
            if (!b || b.hasAttribute('disabled')) return;
            agir(b.getAttribute('data-wjn'));
            if (apres) apres();
        });
    }

    // =====================================================================
    //  La barre du panneau, sous l'en-tête du segment
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
        const c = entete ? cibles() : null;
        if (!c) { if (existante) existante.remove(); signatureBarre = ''; return; }
        const sig = (c.unique ? 'u' : 'm') + (c.A ? 'c' : '-');
        if (existante && existante.previousElementSibling === entete && sig === signatureBarre) { titrer(existante, c); return; }
        if (existante) existante.remove();
        const bar = document.createElement('div');
        bar.id = BAR_ID;
        // Deux lignes quand il y a des extrémités : « aller à » et « revenir » en haut, les vues
        // en dessous — sur une seule ligne, la largeur du panneau coupe au hasard.
        const retourHTML = '<wz-button size="sm" color="text" class="wjn-back" data-wjn="back">&#x21A9; <span data-lbl="back"></span></wz-button>';
        bar.innerHTML = c.A
            ? '<span class="wjn-lbl">' + (c.unique ? t('goTo') : t('goToChain')) + '</span>' + boutonsExtremites(c) + retourHTML +
              '<span class="wjn-br"></span>' + boutonsVues(false)
            : boutonsVues(false) + retourHTML;
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
        if (pop) pop.hidden = true;
    }

    function montrerPop(x, y) {
        const c = cibles();
        if (!c) return;
        if (!pop) {
            pop = document.createElement('div');
            pop.id = POP_ID;
            pop.setAttribute('role', 'toolbar');
            ecouterClics(pop, cacherPop);
            pop.addEventListener('mouseenter', () => clearTimeout(masquageTimer));
            pop.addEventListener('mouseleave', () => { masquageTimer = setTimeout(cacherPop, HIDE_GRACE); });
            document.body.appendChild(pop);
        }
        pop.innerHTML = boutonsExtremites(c) + boutonsVues(true) + (retour ? '<span class="wjn-sep"></span><wz-button size="sm" color="text" data-wjn="back">&#x21A9;</wz-button>' : '');
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
        try { dessin = sdk.Editing.isDrawingInProgress(); } catch (e) { }
        if (dessin) { cacherPop(); return; }
        const dessus = surLaSelection(ev.clientX, ev.clientY);
        const visible = pop && !pop.hidden;
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
        let prevu = null;
        vue.addEventListener('mousemove', ev => {
            if (prevu) return;
            prevu = requestAnimationFrame(() => { prevu = null; surMouvement(ev); });
        });
        vue.addEventListener('mousedown', () => { boutonEnfonce = true; cacherPop(); });
        window.addEventListener('mouseup', () => { boutonEnfonce = false; });
        vue.addEventListener('mouseleave', ev => {
            if (pop && !pop.hidden && pop.contains(ev.relatedTarget)) return;
            clearTimeout(survolTimer);
            if (pop && !pop.hidden) masquageTimer = setTimeout(cacherPop, HIDE_GRACE);
        });
        document.addEventListener('keydown', ev => { if (ev.key === 'Escape' && pop && !pop.hidden) cacherPop(); });
        try { sdk.Events.on({ eventName: 'wme-map-move', eventHandler: cacherPop }); } catch (e) { }
    }

    // =====================================================================
    //  Onglet Scripts et raccourcis
    // =====================================================================

    async function poserOnglet() {
        try {
            const res = await sdk.Sidebar.registerScriptTab();
            res.tabLabel.innerHTML = '<span title="' + SCRIPT_NAME + '" style="font-size:15px">&#x21E4;&#x21E5;</span>';
            res.tabPane.innerHTML =
                '<div id="wjn-pane"><h4>' + SCRIPT_NAME + ' <small>' + VERSION + '</small></h4>' +
                '<label><input type="checkbox" id="wjn-survol"> <span>' + t('pHover') + '</span></label>' +
                '<p>' + t('pHoverHelp') + '</p><p>' + t('pKeys') + '</p></div>';
            const cb = res.tabPane.querySelector('#wjn-survol');
            cb.checked = opts.survol;
            cb.addEventListener('change', () => { opts.survol = cb.checked; ecrireOpts(); if (!opts.survol) cacherPop(); });
        } catch (e) { log('onglet : ' + e.message); }
    }

    // Déclarés sans touches, pour ne rien prendre à un autre script : chacun les attribue
    // dans Paramètres › Raccourcis clavier.
    function poserRaccourcis() {
        const defs = [
            { id: 'wjn-node-a', desc: 'scA', act: 'A' },
            { id: 'wjn-node-b', desc: 'scB', act: 'B' },
            { id: 'wjn-fit', desc: 'scFit', act: 'fit' },
            { id: 'wjn-middle', desc: 'scMid', act: 'mid' },
            { id: 'wjn-back', desc: 'scBack', act: 'back' },
        ];
        for (const d of defs) {
            try {
                sdk.Shortcuts.createShortcut({ shortcutId: d.id, shortcutKeys: null, description: t(d.desc), callback: () => agir(d.act) });
            } catch (e) { log('raccourci ' + d.id + ' : ' + e.message); }
        }
    }

    // =====================================================================
    //  INIT
    // =====================================================================

    const init = () => {
        if (window.__WJN_LOADED) return;
        window.__WJN_LOADED = true;

        sdk = window.getWmeSdk({ scriptId: SCRIPT_ID, scriptName: SCRIPT_NAME });
        _lang = detectLang();
        opts = lireOpts();

        const st = document.createElement('style');
        st.textContent = CSS;
        document.head.appendChild(st);

        poserCalqueFlash();
        poserRaccourcis();
        poserOnglet();
        brancherSurvol();

        try { sdk.Events.on({ eventName: 'wme-selection-changed', eventHandler: () => { cacherPop(); planifierPlacement(); } }); }
        catch (e) { log('événement sélection : ' + e.message); }
        // Le panneau se re-rend aussi sans changement de sélection (onglets, enregistrement).
        const panneau = document.getElementById('edit-panel') || document.body;
        new MutationObserver(planifierPlacement).observe(panneau, { childList: true, subtree: true });

        planifierPlacement();
        log('v' + VERSION + ' prêt — langue ' + _lang);
    };

    if (window.W?.userscripts?.state?.isReady) init();
    else document.addEventListener('wme-ready', init, { once: true });

})();
