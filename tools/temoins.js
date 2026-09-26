// Les contrôles savent-ils voir ce qu'ils prétendent surveiller ? Chaque témoin abîme une copie
// du fichier livré et EXIGE que le contrôle visé échoue ; le fichier intact, lui, doit tout passer.
// Un contrôle qui dit « OK » sur un témoin ment : c'est ce qu'a fait check-idents jusqu'à la 0.05.01.
// Usage : node tools/temoins.js
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const racine = path.join(__dirname, '..');
const livre = fs.readFileSync(path.join(racine, 'WME-Jump-to-Node.user.js'), 'utf8');
const CONTROLES = ['check-idents.js', 'check-i18n.js', 'banc-navigation.js'];
const lancer = (ctrl, fichier) => spawnSync(process.execPath, [path.join(__dirname, ctrl), fichier], { encoding: 'utf8' }).status;

const TEMOINS = [
    // check-idents
    ['check-idents.js', 'fonction disparue, homonyme d\'un paramètre (metres)', 'function metres(', 'function metresX('],
    ['check-idents.js', 'référence mal orthographiée, sans appel', 'new MutationObserver(planifierPlacement)', 'new MutationObserver(planifierPlacment)'],
    ['check-idents.js', 'fonction du démarrage disparue (la 0.03.00)', 'const detectLang = ', 'const detectLangX = '],
    ['check-idents.js', 'constante disparue', 'const HOVER_PX = ', 'const HOVER_PXX = '],
    ['check-idents.js', 'variable utilisée hors de son bloc', "        const esp = '", "        { const espBloc = 1; }\n        const esp = espBloc && '"],
    // check-i18n
    ['check-i18n.js', 'clé absente d\'une langue', "            tipMidBox: 'Mitte: ", "            tipMidBoxX: 'Mitte: "],
    ['check-i18n.js', 'clé appelée qui n\'existe pas', "mid: c.A ? 'tipMid' : 'tipMidBox'", "mid: c.A ? 'tipMid' : 'tipMidZone'"],
    ['check-i18n.js', 'espace ordinaire devant deux-points en français', "tipFit: 'Tout voir\\u00a0: ", "tipFit: 'Tout voir : "],
    // banc-navigation
    ['banc-navigation.js', 'Revenir qui oublie les déplacements à la main (la 0.05.01)', '        if (retour && !memeVue(v, pose)) retour = null;\n', ''],
    ['banc-navigation.js', 'saut qui ne note pas où il a laissé la carte', '        noterPose();\n        majBarre();', '        majBarre();'],
    ['banc-navigation.js', 'chaîne qui ne suit plus le sens du premier segment', 'return sensPremier ? trace : trace.reverse();', 'return trace;'],
    ['banc-navigation.js', 'versions comparées comme des chaînes', 'majCmp(VERSION, m[1]) >= 0) return;', 'VERSION >= m[1]) return;'],
    ['banc-navigation.js', 'pastille allumée sur une page d\'erreur', '        if (r.status < 200 || r.status >= 300) { retenir(null); return; }\n', ''],
    ['banc-navigation.js', 'touches oubliées au chargement', 'creer(versFormatSdk(touches[d.id]));', 'creer(null);'],
    ['banc-navigation.js', 'touche numérique rendue telle quelle (affichée vide par WME)', 'if (!m) return k || null;', 'return k || null;'],
    ['banc-navigation.js', 'touches jamais enregistrées', "        pw.addEventListener('beforeunload', retenirTouches);\n", ''],
    ['banc-navigation.js', 'onglet sans changement qui écrase les touches', '        if (s === touchesConnues) return;\n', ''],
    ['banc-navigation.js', 'nœuds A et B inversés', "const pt = action === 'A' ? c.A : action === 'B' ? c.B", "const pt = action === 'A' ? c.B : action === 'B' ? c.A"],
];

let faux = 0;
const tmp = path.join(os.tmpdir(), 'wjn-temoin.user.js');
fs.writeFileSync(tmp, livre);
for (const c of CONTROLES) {
    const st = lancer(c, tmp);
    console.log((st === 0 ? 'ok     ' : 'ÉCHEC  ') + 'fichier intact : ' + c + (st === 0 ? ' passe' : ' échoue'));
    if (st !== 0) faux++;
}
for (const [ctrl, nom, avant, apres] of TEMOINS) {
    if (livre.split(avant).length !== 2) { console.log('ÉCHEC  témoin périmé (texte introuvable) : ' + nom); faux++; continue; }
    fs.writeFileSync(tmp, livre.replace(avant, apres));
    const st = lancer(ctrl, tmp);
    console.log((st !== 0 ? 'ok     ' : 'ÉCHEC  ') + ctrl + ' voit : ' + nom + (st !== 0 ? '' : ' — il a dit OK'));
    if (st === 0) faux++;
}
fs.unlinkSync(tmp);
if (faux) { console.error('\n' + faux + ' contrôle(s) qui mentent'); process.exit(1); }
console.log('\nOK — chaque contrôle passe sur le fichier intact et échoue sur ses ' + TEMOINS.length + ' témoins');
