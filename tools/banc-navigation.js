// Banc de navigation : fait tourner le fichier LIVRÉ dans node, avec un faux SDK, et le pilote
// par ses raccourcis clavier (le même chemin que les boutons : agir()). Rien n'est recopié du
// script : on ne voit que ce qu'il fait de la carte.
// Le SDK de WME passe en mode async (seul mode au 01/01/2027) : chaque scénario tourne DEUX fois,
// avec un faux SDK synchrone puis avec un faux SDK dont chaque méthode rend une promesse.
// Usage : node tools/banc-navigation.js [fichier]
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const f = process.argv[2] || path.join(__dirname, '..', 'WME-Jump-to-Node.user.js');
const code = fs.readFileSync(f, 'utf8');

// maj : { installee, reponse: { status, responseText } } pour la pastille de nouvelle version.
// stock : contenu initial du localStorage ; touchesWme : ce que getAllShortcuts rend (touches posées à la main).
// Laisse passer les promesses en attente (le faux SDK async n'utilise que des micro-tâches).
const vider = async () => { for (let i = 0; i < 30; i++) await new Promise(r => setImmediate(r)); };
let MODE = 'sync';
// En mode async, chaque méthode du faux SDK rend une promesse — sauf Events.on, un abonnement.
const enAsync = sdk => {
    for (const [mod, o] of Object.entries(sdk)) {
        if (mod === 'Events' || mod === 'Sidebar') continue;
        for (const [k, f] of Object.entries(o)) if (typeof f === 'function') o[k] = (...a) => Promise.resolve().then(() => f(...a));
    }
    return sdk;
};

async function monter(segments, maj, stock = {}, touchesWme = {}) {
    let horloge = 1e12;
    const etat = { lon: 3.8, lat: 43.6, zoom: 17, sel: [] };
    const handlers = {}, raccourcis = {}, touchesPosees = {}, ecouteurs = {};
    const ls = new Map(Object.entries(stock));
    const pastille = { hidden: true, span: { textContent: '' }, querySelector() { return this.span; } };
    const el = () => ({ addEventListener() { }, setAttribute() { }, querySelector: () => null, style: {}, appendChild() { } });
    const emettre = n => (handlers[n] || []).forEach(h => h());
    const sdk = {
        Map: {
            getMapCenter: () => ({ lon: etat.lon, lat: etat.lat }),
            getZoomLevel: () => etat.zoom,
            setMapCenter: ({ lonLat, zoomLevel }) => { etat.lon = lonLat.lon; etat.lat = lonLat.lat; if (zoomLevel != null) etat.zoom = zoomLevel; emettre('wme-map-move'); },
            zoomToExtent: ({ bbox }) => { etat.lon = (bbox[0] + bbox[2]) / 2; etat.lat = (bbox[1] + bbox[3]) / 2; etat.zoom = 15; emettre('wme-map-move'); },
            getPixelFromLonLat: ({ lonLat }) => ({ x: lonLat.lon * 100 * 2 ** etat.zoom, y: -lonLat.lat * 100 * 2 ** etat.zoom }),
            getMapViewportElement: el,
            addLayer() { }, removeAllFeaturesFromLayer() { }, addFeatureToLayer() { },
        },
        Editing: { getSelection: () => ({ objectType: 'segment', ids: etat.sel }), isDrawingInProgress: () => false },
        DataModel: { Segments: { getById: ({ segmentId }) => segments[segmentId] || null } },
        Settings: { getUserSettings: () => ({ isImperial: false }) },
        Events: { on: ({ eventName, eventHandler }) => { (handlers[eventName] = handlers[eventName] || []).push(eventHandler); } },
        Shortcuts: {
            createShortcut: ({ shortcutId, shortcutKeys, callback }) => { raccourcis[shortcutId] = callback; touchesPosees[shortcutId] = shortcutKeys; },
            getAllShortcuts: () => Object.keys(raccourcis).map(id => ({ shortcutId: id, description: '', shortcutKeys: touchesWme[id] || null })),
        },
        Sidebar: { registerScriptTab: () => new Promise(() => { }) },
    };
    const ctx = {
        console: { log() { }, error: console.error }, Math, JSON, Object, Array, Number, String, Boolean, Map, Set, Promise, Intl,
        Infinity, NaN, isNaN, parseInt, parseFloat, Error,
        setTimeout: () => 0, clearTimeout() { }, setInterval: () => 0, clearInterval() { }, Date: { now: () => horloge },
        localStorage: { getItem: k => ls.has(k) ? ls.get(k) : null, setItem: (k, v) => { ls.set(k, String(v)); } }, navigator: { language: 'fr' },
        MutationObserver: class { observe() { } }, GM_info: { script: { version: maj ? maj.installee : 'banc' } },
        GM_xmlhttpRequest: o => { if (maj) o.onload(maj.reponse); },
        document: {
            documentElement: { lang: 'fr' }, head: el(), body: el(), createElement: el,
            querySelector: () => null, getElementById: id => id === 'wjn-sb-maj' ? pastille : null, addEventListener() { },
        },
        W: { userscripts: { state: { isReady: true, locale: 'fr' } } },
        getWmeSdk: () => MODE === 'async' ? enAsync(sdk) : sdk,
    };
    ctx.window = ctx;
    ctx.addEventListener = (n, f) => { (ecouteurs[n] = ecouteurs[n] || []).push(f); };
    ctx.unsafeWindow = ctx;
    vm.runInNewContext(code, ctx);
    await vider();
    return {
        touchesPosees, ls, fermer: async () => { (ecouteurs.beforeunload || []).forEach(f => f()); await vider(); },
        etat, pastille,
        touche: async id => { await vider(); await raccourcis[id](); await vider(); },
        // L'éditeur fait glisser la carte, plus tard que le saut.
        glisser: async (lon, lat) => { horloge += 5000; etat.lon = lon; etat.lat = lat; emettre('wme-map-move'); await vider(); },
        attendre: ms => { horloge += ms; },
        choisir: ids => { etat.sel = ids; },
    };
}

const seg = (id, from, to, coords) => ({ id, fromNodeId: from, toNodeId: to, geometry: { coordinates: coords }, length: 100 });
// Chaîne S1 (n1→n2), S2 (n3→n2, tracé à l'envers), S3 (n3→n4), d'ouest en est.
const SEGS = {
    1: seg(1, 11, 12, [[0, 0], [1, 0]]),
    2: seg(2, 13, 12, [[2, 0], [1, 0]]),
    3: seg(3, 13, 14, [[2, 0], [3, 0]]),
    9: seg(9, 91, 92, [[10, 10], [10, 11], [10, 13]]),
};

const echecs = [];
const verifier = (nom, ok, detail) => { console.log((ok ? 'ok     ' : 'ÉCHEC  ') + nom + (ok ? '' : ' — ' + detail)); if (!ok) echecs.push(nom); };
const pos = e => '(' + e.lon + ', ' + e.lat + ')';

(async () => {
for (MODE of ['sync', 'async']) {
{   // Segment seul : A et B sont le premier et le dernier point du tracé.
    const b = await monter(SEGS); b.choisir([9]);
    await b.touche('wjn-node-a'); verifier('[' + MODE + '] ' + 'segment seul : A = premier point', b.etat.lon === 10 && b.etat.lat === 10, pos(b.etat));
    await b.touche('wjn-node-b'); verifier('[' + MODE + '] ' + 'segment seul : B = dernier point', b.etat.lon === 10 && b.etat.lat === 13, pos(b.etat));
    await b.touche('wjn-middle'); verifier('[' + MODE + '] ' + 'segment seul : milieu le long du tracé', b.etat.lon === 10 && Math.abs(b.etat.lat - 11.5) < 0.01, pos(b.etat));
}
{   // A puis B puis Revenir ramène au point de départ.
    const b = await monter(SEGS); b.choisir([9]);
    await b.touche('wjn-node-a'); b.attendre(200); await b.touche('wjn-node-b'); b.attendre(200); await b.touche('wjn-back');
    verifier('[' + MODE + '] ' + 'A, B, Revenir : retour au départ', b.etat.lon === 3.8 && b.etat.lat === 43.6 && b.etat.zoom === 17, pos(b.etat));
}
{   // Saut, puis l'éditeur part ailleurs à la main, puis nouveau saut : Revenir ramène là où il
    // était allé, pas au départ de la session (M1 de l'audit du 26/09).
    const b = await monter(SEGS); b.choisir([9]);
    await b.touche('wjn-node-a');
    await b.glisser(4.36, 43.84);
    await b.touche('wjn-node-b'); await b.touche('wjn-back');
    verifier('[' + MODE + '] ' + 'déplacement à la main entre deux sauts : Revenir ramène là où on était allé', b.etat.lon === 4.36 && b.etat.lat === 43.84, pos(b.etat));
}
{   // Le cadrage bouge la carte lui-même : ce déplacement-là ne doit pas passer pour un geste de l'éditeur.
    const b = await monter(SEGS); b.choisir([9]);
    await b.touche('wjn-fit'); b.attendre(200); await b.touche('wjn-node-a'); await b.touche('wjn-back');
    verifier('[' + MODE + '] ' + 'Tout voir puis A puis Revenir : retour au départ', b.etat.lon === 3.8 && b.etat.lat === 43.6 && b.etat.zoom === 17, pos(b.etat));
}
{   // Chaîne : A ne dépend que du premier segment sélectionné (M2).
    const r = [];
    for (const ordre of [[2, 1, 3], [2, 3, 1], [1, 2, 3], [3, 1, 2]]) {
        const b = await monter(SEGS); b.choisir(ordre); await b.touche('wjn-node-a'); r.push(ordre.join('') + '→' + b.etat.lon);
    }
    // S2 est tracé de n3 (x=2) vers n2 (x=1) : son nœud A est côté est, donc A = x=3.
    verifier('[' + MODE + '] ' + 'chaîne 2-1-3 et 2-3-1 : même A', r[0].endsWith('→3') && r[1].endsWith('→3'), r.join(', '));
    verifier('[' + MODE + '] ' + 'chaîne commençant par S1 : A côté ouest', r[2].endsWith('→0'), r.join(', '));
    verifier('[' + MODE + '] ' + 'chaîne commençant par S3 : A côté ouest (n3 est le nœud A de S3)', r[3].endsWith('→0'), r.join(', '));
    const b = await monter(SEGS); b.choisir([1, 2, 3]); await b.touche('wjn-middle');
    verifier('[' + MODE + '] ' + 'chaîne : milieu = milieu de la longueur', Math.abs(b.etat.lon - 1.5) < 0.01, pos(b.etat));
}

{   // Pastille de nouvelle version : allumée seulement sur une version publiée plus récente.
    const essai = async (installee, status, publiee) => (await monter(SEGS, { installee, reponse: { status, responseText: '// ==UserScript==\n// @version      ' + publiee + '\n' } })).pastille;
    let e = await essai('0.06.00', 200, '0.06.01');
    verifier('[' + MODE + '] ' + 'pastille : 0.06.01 publiée, 0.06.00 installée → allumée', !e.hidden && e.span.textContent.includes('0.06.01'), JSON.stringify(e.hidden) + ' ' + e.span.textContent);
    e = await essai('0.06.00', 200, '0.06.00');
    verifier('[' + MODE + '] ' + 'pastille : même version → éteinte', e.hidden, 'allumée');
    e = await essai('0.06.00', 404, '9.99.99');
    verifier('[' + MODE + '] ' + 'pastille : page absente (404) → éteinte', e.hidden, 'allumée');
    e = await essai('0.13.00', 200, '0.9.00');
    verifier('[' + MODE + '] ' + 'pastille : 0.9.00 n\'est pas plus récent que 0.13.00', e.hidden, 'allumée');
}
{   // Touches des raccourcis : WME ne les garde pas d'un chargement à l'autre, le script si.
    let b = await monter(SEGS, null, { 'wjn.raccourcis': JSON.stringify({ 'wjn-node-a': '6,74' }) });
    verifier('[' + MODE + '] ' + 'touche retenue redonnée au chargement, au format du SDK (6,74 → SA+j)', b.touchesPosees['wjn-node-a'] === 'SA+j' && b.touchesPosees['wjn-node-b'] === null, JSON.stringify(b.touchesPosees));
    b = await monter(SEGS, null, {}, { 'wjn-fit': '4,70', 'wjn-middle': '4,38', 'wjn-back': 'A+b' });
    await b.fermer();
    const autre = await monter(SEGS);
    autre.ls.set('wjn.raccourcis', JSON.stringify({ 'wjn-node-a': '6,74' }));   // posée entre-temps dans un autre onglet
    await autre.fermer();
    verifier('[' + MODE + '] ' + 'onglet fermé sans changement : n\'efface pas la touche d\'un autre onglet', autre.ls.get('wjn.raccourcis') === JSON.stringify({ 'wjn-node-a': '6,74' }), String(autre.ls.get('wjn.raccourcis')));
    verifier('[' + MODE + '] ' + 'touches posées enregistrées à la fermeture (4,70 → A+f ; flèche écartée)', b.ls.get('wjn.raccourcis') === JSON.stringify({ 'wjn-fit': 'A+f', 'wjn-back': 'A+b' }), String(b.ls.get('wjn.raccourcis')));
}

}
if (echecs.length) { console.error('\n' + echecs.length + ' échec(s)'); process.exit(1); }
console.log('\nOK — navigation conforme (SDK synchrone et async)');
})().catch(e => { console.error(e); process.exit(1); });
