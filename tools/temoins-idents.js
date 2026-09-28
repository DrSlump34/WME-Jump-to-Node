// Le contrôle des identifiants doit ÉCHOUER sur chacune de ces mutations du fichier livré, et
// désigner la bonne ligne. Sans ce témoin, un check-idents aveugle dit « OK » : jusqu'au 28/09/2026,
// l'étalement [...nom] passait pour une propriété, et les lignes signalées dérivaient (correction
// reprise de WME BAN Coverage, 26/09). tools/temoins.js vérifie l'échec ; celui-ci vérifie aussi la LIGNE.
// Usage : node tools/temoins-idents.js
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');
const racine = path.join(__dirname, '..');
const brut = fs.readFileSync(path.join(racine, 'WME-Jump-to-Node.user.js'), 'utf8');
const lignes = brut.split('\n');
const controle = path.join(__dirname, 'check-idents.js');

// Chaque témoin : un motif présent UNE fois, remplacé par un nom qui n'existe pas.
const TEMOINS = [
    ['étalement ...variable', 'const bouts = [...parNoeud.entries()]', 'const bouts = [...parNoeudDisparu.entries()]', 'parNoeudDisparu'],
    ['étalement ...fonction()', 'const bouts = [...parNoeud.entries()]', 'const bouts = [...entreesDisparues(parNoeud)]', 'entreesDisparues'],
    ['appel simple', 'total += metres(coords[i - 1], coords[i]);', 'total += metresDisparu(coords[i - 1], coords[i]);', 'metresDisparu'],
    ['référence sans appel', 'new MutationObserver(planifierPlacement)', 'new MutationObserver(planifierPlacementDisparu)', 'planifierPlacementDisparu'],
];
let ko = 0;
for (const [nom, avant, apres, attendu] of TEMOINS) {
    const n = brut.split(avant).length - 1;
    if (n !== 1) { console.error('témoin « ' + nom + ' » : motif trouvé ' + n + ' fois (attendu 1) — le témoin a vieilli'); ko++; continue; }
    const ligne = lignes.findIndex(l => l.includes(avant)) + 1;
    const f = path.join(os.tmpdir(), 'wjn-temoin-idents.user.js');
    fs.writeFileSync(f, brut.replace(avant, () => apres));
    const r = spawnSync(process.execPath, [controle, f], { encoding: 'utf8' });
    fs.unlinkSync(f);
    const sortie = (r.stdout || '') + (r.stderr || '');
    const m = new RegExp(attendu + ' [(]~l[.] (\\d+)[)]').exec(sortie);
    if (r.status === 0 || !m) { console.error('témoin « ' + nom + ' » : le contrôle NE VOIT PAS ' + attendu); ko++; continue; }
    if (Number(m[1]) !== ligne) { console.error('témoin « ' + nom + ' » : vu, mais ligne ' + m[1] + ' au lieu de ' + ligne); ko++; continue; }
    console.log('  témoin « ' + nom + ' » : vu, ligne ' + ligne);
}
if (ko) process.exit(1);
console.log('OK — ' + TEMOINS.length + ' témoins, le contrôle les voit tous à la bonne ligne');
