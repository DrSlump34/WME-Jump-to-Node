// Les 8 dictionnaires ont les mêmes clés, chaque t('clé') du code existe, et le français
// porte ses espaces insécables (avant : ; ! ? », après «).
// Usage : node tools/check-i18n.js [fichier]
const fs = require('fs');
const path = require('path');
const f = process.argv[2] || path.join(__dirname, '..', 'WME-Jump-to-Node.user.js');
const brut = fs.readFileSync(f, 'utf8');

// Le littéral const DICO = { … }; : on suit les accolades hors chaînes, puis on l'évalue seul.
const debut = brut.indexOf('const DICO = {');
if (debut < 0) { console.error('DICO introuvable'); process.exit(1); }
let i = brut.indexOf('{', debut), prof = 0, fin = -1;
for (; i < brut.length; i++) {
    const c = brut[i];
    if (c === "'" || c === '"' || c === '`') { const q = c; i++; while (i < brut.length && brut[i] !== q) i += brut[i] === '\\' ? 2 : 1; continue; }
    if (c === '{') prof++;
    else if (c === '}' && --prof === 0) { fin = i; break; }
}
const DICO = new Function('return ' + brut.slice(brut.indexOf('{', debut), fin + 1))();

const erreurs = [];
const LANGUES = ['en', 'fr', 'de', 'es', 'it', 'pt-BR', 'pt-PT', 'he'];
for (const l of LANGUES) if (!DICO[l]) erreurs.push('langue absente : ' + l);
const ref = Object.keys(DICO.en).sort();
for (const l of LANGUES.filter(x => DICO[x])) {
    const k = Object.keys(DICO[l]);
    const manque = ref.filter(x => !k.includes(x)), trop = k.filter(x => !ref.includes(x));
    if (manque.length) erreurs.push(l + ' : clés manquantes ' + manque.join(', '));
    if (trop.length) erreurs.push(l + ' : clés inconnues de en ' + trop.join(', '));
    for (const x of k) if (typeof DICO[l][x] !== typeof DICO.en[x]) erreurs.push(l + '.' + x + ' : type différent de en');
}

// Toute clé appelée en dur existe.
for (const m of brut.matchAll(/\bt\(\s*'([A-Za-z0-9_]+)'/g)) if (!(m[1] in DICO.en)) erreurs.push("t('" + m[1] + "') : clé inconnue");
// Les clés passées autrement ({ desc: 'scA' }, c.A ? 'tipMid' : 'tipMidBox'…) : hors du DICO,
// toute chaîne qui a la forme d'une clé (un préfixe de clé connu, puis une majuscule) doit en être une.
const prefixes = new Set(ref.map(k => (k.match(/^[a-z]+(?=[A-Z])/) || [])[0]).filter(Boolean));
const horsDico = brut.slice(0, debut) + brut.slice(fin + 1);
for (const m of horsDico.matchAll(/'([a-z]+)([A-Z][A-Za-z0-9]*)'/g))
    if (prefixes.has(m[1]) && !((m[1] + m[2]) in DICO.en)) erreurs.push("'" + m[1] + m[2] + "' : clé inconnue");

// Typographie française : sur le texte VISIBLE (balises et entités retirées).
const visible = s => s.replace(/<[^>]*>/g, '').replace(/&#x?[0-9a-f]+;|&[a-z]+;/gi, '_');
// Une fonction se lit sur ses deux branches (singulier et pluriel).
const echantillon = v => typeof v === 'function' ? v('12 m', 1) + ' / ' + v('12 m', 3) : v;
for (const [k, v] of Object.entries(DICO.fr || {})) {
    const s = visible(echantillon(v));
    if (/ [:;!?»]/.test(s)) erreurs.push('fr.' + k + ' : espace ordinaire devant : ; ! ? ou » — « ' + s.match(/.{0,20} [:;!?»]/)[0] + ' »');
    if (/« /.test(s)) erreurs.push('fr.' + k + ' : espace ordinaire après «');
    if (/[^\s  ][:;!?](\s|$)/.test(s) && !/https?:/.test(s)) erreurs.push('fr.' + k + ' : ponctuation haute collée — « ' + s.match(/.{0,20}[^\s  ][:;!?](\s|$)/)[0] + ' »');
}

if (erreurs.length) { console.error(erreurs.join('\n')); process.exit(1); }
console.log('OK — ' + LANGUES.length + ' langues, ' + ref.length + ' clés chacune, typographie française conforme');
