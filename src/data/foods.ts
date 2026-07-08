import type { Food } from '../lib/types'
import { normalize } from '../lib/fodmap'

/**
 * Monash-aligned low-FODMAP food database (source: plan Anexa B).
 * Classifications are stable; gram values are indicative and periodically
 * retested by Monash — see `flag` on retested foods. `dial` is present only on
 * portion-dependent foods, where the status shifts with serving size.
 */
export const foods: Food[] = [
  // ── Fructe ──────────────────────────────────────────────
  { id: 'banana-ferma', nameRo: 'Banană fermă', nameEn: 'Banana, firm', category: 'fruits', emoji: '🍌', status: 'green', serving: '1 medie (100 g)', groups: [], note: 'Necoaptă — mai puțini fructani decât cea coaptă.', confidence: 'monash' },
  { id: 'banana-coapta', nameRo: 'Banană coaptă', nameEn: 'Banana, ripe', category: 'fruits', emoji: '🍌', status: 'amber', serving: '1/3 (35 g)', groups: ['fructans'], note: 'Fructanii cresc pe măsură ce se coace.', confidence: 'monash', dial: [{ grams: '≤ 35 g', note: '1/3', status: 'green' }, { grams: '~1/2', note: '', status: 'amber' }, { grams: 'întreagă', note: '', status: 'red' }] },
  { id: 'afine', nameRo: 'Afine', nameEn: 'Blueberry', category: 'fruits', emoji: '🫐', status: 'green', serving: '1 cană (125 g)', groups: [], note: 'Retestat 2022 în sus (era 40 g).', confidence: 'monash', flag: 'retestat — porție mărită' },
  { id: 'capsuni', nameRo: 'Căpșuni', nameEn: 'Strawberry', category: 'fruits', emoji: '🍓', status: 'green', serving: '5 medii (65 g)', groups: [], note: 'Peste 6 bucăți → moderat.', confidence: 'monash' },
  { id: 'zmeura', nameRo: 'Zmeură', nameEn: 'Raspberry', category: 'fruits', emoji: '🍓', status: 'green', serving: '60 g (1/3 cană)', groups: ['fructans'], confidence: 'monash' },
  { id: 'mure', nameRo: 'Mure', nameEn: 'Blackberry', category: 'fruits', emoji: '🫐', status: 'red', groups: ['sorbitol'], note: 'Bogate în sorbitol.', confidence: 'monash' },
  { id: 'portocala', nameRo: 'Portocală', nameEn: 'Orange', category: 'fruits', emoji: '🍊', status: 'green', serving: '1 medie (130 g)', groups: [], note: 'Swap clasic pentru măr.', confidence: 'monash' },
  { id: 'mandarine', nameRo: 'Mandarine', nameEn: 'Mandarin', category: 'fruits', emoji: '🍊', status: 'green', serving: '2 buc', groups: [], confidence: 'monash' },
  { id: 'lamaie', nameRo: 'Lămâie', nameEn: 'Lemon', category: 'fruits', emoji: '🍋', status: 'green', serving: 'suc, liber', groups: [], note: 'Bază de aromă fără FODMAP.', confidence: 'monash' },
  { id: 'lime', nameRo: 'Lime', nameEn: 'Lime', category: 'fruits', emoji: '🍋', status: 'green', serving: 'suc, liber', groups: [], confidence: 'monash' },
  { id: 'struguri', nameRo: 'Struguri', nameEn: 'Grapes', category: 'fruits', emoji: '🍇', status: 'amber', serving: 'porție mică', groups: ['fructose'], note: 'Monash a strâns porția în 2024 (era ~150 g).', confidence: 'monash', flag: 'retestat — verifică' },
  { id: 'kiwi', nameRo: 'Kiwi', nameEn: 'Kiwifruit', category: 'fruits', emoji: '🥝', status: 'green', serving: '2 mici (150 g)', groups: [], confidence: 'monash' },
  { id: 'ananas', nameRo: 'Ananas', nameEn: 'Pineapple', category: 'fruits', emoji: '🍍', status: 'green', serving: '1 cană (140 g)', groups: [], confidence: 'monash' },
  { id: 'pepene-galben', nameRo: 'Pepene galben', nameEn: 'Cantaloupe', category: 'fruits', emoji: '🍈', status: 'green', serving: '3/4 cană (90 g)', groups: [], note: 'Porție mare → oligozaharide.', confidence: 'monash' },
  { id: 'pepene-rosu', nameRo: 'Pepene roșu', nameEn: 'Watermelon', category: 'fruits', emoji: '🍉', status: 'red', groups: ['fructose', 'fructans', 'mannitol'], note: 'Triplu FODMAP.', confidence: 'monash' },
  { id: 'mar', nameRo: 'Măr', nameEn: 'Apple', category: 'fruits', emoji: '🍎', status: 'red', groups: ['fructose', 'sorbitol'], note: 'Swap → portocală, kiwi.', confidence: 'monash' },
  { id: 'para', nameRo: 'Pere', nameEn: 'Pear', category: 'fruits', emoji: '🍐', status: 'red', groups: ['fructose', 'sorbitol'], confidence: 'monash' },
  { id: 'mango', nameRo: 'Mango', nameEn: 'Mango', category: 'fruits', emoji: '🥭', status: 'red', groups: ['fructose'], note: 'Low doar sub 40 g.', confidence: 'monash' },
  { id: 'cirese', nameRo: 'Cireșe', nameEn: 'Cherry', category: 'fruits', emoji: '🍒', status: 'red', groups: ['fructose', 'sorbitol'], confidence: 'monash' },
  { id: 'piersica', nameRo: 'Piersică', nameEn: 'Peach', category: 'fruits', emoji: '🍑', status: 'amber', serving: '30 g', groups: ['sorbitol'], confidence: 'monash' },
  { id: 'prune', nameRo: 'Prune', nameEn: 'Plum', category: 'fruits', emoji: '🫐', status: 'red', groups: ['sorbitol'], confidence: 'monash' },
  { id: 'caise', nameRo: 'Caise', nameEn: 'Apricot', category: 'fruits', emoji: '🍑', status: 'red', groups: ['sorbitol'], confidence: 'monash' },
  { id: 'avocado', nameRo: 'Avocado', nameEn: 'Avocado', category: 'fruits', emoji: '🥑', status: 'amber', serving: '60 g (~1/3)', groups: ['sorbitol'], note: 'Retestat de la 30 g; rămâne galben pt. sensibilii la polioli.', confidence: 'monash', flag: 'retestat — verifică', dial: [{ grams: '≤ 60 g', note: '~1/3 fruct', status: 'green' }, { grams: '~80 g', note: '~1/2 fruct', status: 'amber' }, { grams: 'mai mult', note: 'fruct întreg', status: 'red' }] },
  { id: 'papaya', nameRo: 'Papaya', nameEn: 'Papaya', category: 'fruits', emoji: '🫐', status: 'green', serving: '1 cană', groups: [], confidence: 'monash' },
  { id: 'rubarba', nameRo: 'Rubarbă', nameEn: 'Rhubarb', category: 'fruits', emoji: '🌿', status: 'green', serving: 'liber', groups: [], confidence: 'monash' },
  { id: 'nuca-cocos', nameRo: 'Nucă de cocos (miez)', nameEn: 'Coconut flesh', category: 'fruits', emoji: '🥥', status: 'green', serving: '2/3 cană (64 g)', groups: [], confidence: 'monash' },
  { id: 'rodie', nameRo: 'Rodie', nameEn: 'Pomegranate', category: 'fruits', emoji: '🫐', status: 'amber', serving: '45 g', groups: [], confidence: 'monash' },
  { id: 'smochine', nameRo: 'Smochine', nameEn: 'Figs', category: 'fruits', emoji: '🫐', status: 'red', groups: ['fructose', 'fructans'], confidence: 'monash' },
  { id: 'curmale', nameRo: 'Curmale', nameEn: 'Dates', category: 'fruits', emoji: '🫐', status: 'red', groups: ['fructans', 'fructose'], note: 'Uscate, foarte concentrate.', confidence: 'monash' },
  { id: 'stafide', nameRo: 'Stafide', nameEn: 'Raisins', category: 'fruits', emoji: '🍇', status: 'amber', serving: '1 lg (13 g)', groups: ['fructans'], confidence: 'monash' },

  // ── Legume ──────────────────────────────────────────────
  { id: 'ceapa', nameRo: 'Ceapă', nameEn: 'Onion', category: 'vegetables', emoji: '🧅', status: 'red', groups: ['fructans'], note: 'Swap → ulei infuzat / partea verde a cepei verzi.', confidence: 'monash' },
  { id: 'usturoi', nameRo: 'Usturoi', nameEn: 'Garlic', category: 'vegetables', emoji: '🧄', status: 'red', groups: ['fructans'], note: 'Swap → ulei infuzat cu usturoi (fructanii nu-s liposolubili).', confidence: 'monash' },
  { id: 'praz', nameRo: 'Praz (bulb alb)', nameEn: 'Leek bulb', category: 'vegetables', emoji: '🥬', status: 'red', groups: ['fructans'], note: 'Frunzele verzi sunt permise.', confidence: 'monash' },
  { id: 'ceapa-verde', nameRo: 'Ceapă verde (verdele)', nameEn: 'Spring onion, green', category: 'vegetables', emoji: '🌱', status: 'green', serving: 'liber', groups: [], note: 'Doar partea verde; albul e roșu.', confidence: 'monash' },
  { id: 'morcov', nameRo: 'Morcov', nameEn: 'Carrot', category: 'vegetables', emoji: '🥕', status: 'green', serving: 'liber', groups: [], confidence: 'monash' },
  { id: 'cartof', nameRo: 'Cartof', nameEn: 'Potato', category: 'vegetables', emoji: '🥔', status: 'green', serving: 'liber', groups: [], note: 'Staple sigur.', confidence: 'monash' },
  { id: 'cartof-dulce', nameRo: 'Cartof dulce', nameEn: 'Sweet potato', category: 'vegetables', emoji: '🍠', status: 'amber', serving: '1/2 cană (75 g)', groups: ['mannitol'], confidence: 'monash', dial: [{ grams: '≤ 75 g', note: '1/2 cană', status: 'green' }, { grams: '~100 g', status: 'amber' }, { grams: '> 112 g', status: 'red' }] },
  { id: 'rosie', nameRo: 'Roșie', nameEn: 'Tomato', category: 'vegetables', emoji: '🍅', status: 'green', serving: '1/2 (65 g)', groups: [], note: 'Cherry sunt tot verzi.', confidence: 'monash' },
  { id: 'castravete', nameRo: 'Castravete', nameEn: 'Cucumber', category: 'vegetables', emoji: '🥒', status: 'green', serving: '75 g', groups: [], confidence: 'monash' },
  { id: 'ardei-rosu', nameRo: 'Ardei roșu', nameEn: 'Red bell pepper', category: 'vegetables', emoji: '🫑', status: 'amber', serving: '43 g', groups: ['fructose'], note: 'Retestat (era „FODMAP-free").', confidence: 'monash', flag: 'retestat' },
  { id: 'ardei-verde', nameRo: 'Ardei verde', nameEn: 'Green bell pepper', category: 'vegetables', emoji: '🫑', status: 'green', serving: '75 g', groups: [], confidence: 'monash' },
  { id: 'ardei-galben', nameRo: 'Ardei galben', nameEn: 'Yellow bell pepper', category: 'vegetables', emoji: '🫑', status: 'amber', serving: '35 g', groups: ['fructose'], note: 'Cea mai mică porție dintre ardei — mai copt, deci mai multă fructoză. Verde: 75 g.', confidence: 'monash', flag: 'retestat' },
  { id: 'spanac', nameRo: 'Spanac baby', nameEn: 'Baby spinach', category: 'vegetables', emoji: '🥬', status: 'green', serving: '75 g', groups: [], confidence: 'monash' },
  { id: 'vanata', nameRo: 'Vânătă', nameEn: 'Eggplant', category: 'vegetables', emoji: '🍆', status: 'green', serving: '1 cană (75 g)', groups: ['sorbitol'], note: 'Porție mare → sorbitol.', confidence: 'monash' },
  { id: 'dovlecel', nameRo: 'Dovlecel', nameEn: 'Zucchini', category: 'vegetables', emoji: '🥒', status: 'green', serving: '65 g', groups: ['fructans'], note: 'Peste 100 g → roșu.', confidence: 'monash' },
  { id: 'fasole-verde', nameRo: 'Fasole verde', nameEn: 'Green beans', category: 'vegetables', emoji: '🫛', status: 'green', serving: '15 buc (75 g)', groups: ['sorbitol'], confidence: 'monash' },
  { id: 'salata', nameRo: 'Salată verde', nameEn: 'Lettuce', category: 'vegetables', emoji: '🥬', status: 'green', serving: 'liber', groups: [], confidence: 'monash' },
  { id: 'broccoli', nameRo: 'Broccoli (buchete)', nameEn: 'Broccoli heads', category: 'vegetables', emoji: '🥦', status: 'green', serving: '3/4 cană (75 g)', groups: ['fructose'], note: 'Tulpinile: galben peste 45 g.', confidence: 'monash' },
  { id: 'kale', nameRo: 'Kale', nameEn: 'Kale', category: 'vegetables', emoji: '🥬', status: 'green', serving: '75 g', groups: [], confidence: 'monash' },
  { id: 'fenicul', nameRo: 'Fenicul (bulb)', nameEn: 'Fennel bulb', category: 'vegetables', emoji: '🌿', status: 'amber', serving: '75 g', groups: [], note: 'Înlocuiește ceapa în sofrito.', confidence: 'monash' },
  { id: 'dovleac-kabocha', nameRo: 'Dovleac kabocha', nameEn: 'Kabocha pumpkin', category: 'vegetables', emoji: '🎃', status: 'green', serving: '1/3 cană (75 g)', groups: [], confidence: 'monash' },
  { id: 'dovleac-butternut', nameRo: 'Dovleac butternut', nameEn: 'Butternut squash', category: 'vegetables', emoji: '🎃', status: 'amber', serving: '1/4 cană (45 g)', groups: ['mannitol', 'gos'], confidence: 'monash', flag: 'verifică porția' },
  { id: 'porumb', nameRo: 'Porumb dulce', nameEn: 'Sweet corn', category: 'vegetables', emoji: '🌽', status: 'amber', serving: '1/2 știulete (75 g)', groups: ['sorbitol', 'fructans'], confidence: 'monash' },
  { id: 'telina', nameRo: 'Țelină (tulpină)', nameEn: 'Celery', category: 'vegetables', emoji: '🥬', status: 'amber', serving: '10 g (< 5 cm)', groups: ['mannitol'], confidence: 'monash' },
  { id: 'varza', nameRo: 'Varză albă', nameEn: 'Cabbage', category: 'vegetables', emoji: '🥬', status: 'green', serving: '3/4 cană (75 g)', groups: ['fructans'], confidence: 'monash' },
  { id: 'conopida', nameRo: 'Conopidă', nameEn: 'Cauliflower', category: 'vegetables', emoji: '🥦', status: 'green', serving: '3/4 cană (75 g)', groups: ['mannitol'], note: 'Retestat mai 2025 (era roșu).', confidence: 'monash', flag: 'retestat — verifică' },
  { id: 'ciuperci', nameRo: 'Ciuperci champignon', nameEn: 'Button mushroom', category: 'vegetables', emoji: '🍄', status: 'red', groups: ['mannitol'], note: 'Cele stridii (oyster) sunt verzi.', confidence: 'monash' },
  { id: 'sparanghel', nameRo: 'Sparanghel', nameEn: 'Asparagus', category: 'vegetables', emoji: '🌿', status: 'red', groups: ['fructose', 'fructans'], confidence: 'monash' },
  { id: 'mazare-verde', nameRo: 'Mazăre verde', nameEn: 'Green peas', category: 'vegetables', emoji: '🫛', status: 'amber', serving: '15 g', groups: ['gos', 'fructans'], confidence: 'monash' },
  { id: 'ridichi', nameRo: 'Ridichi', nameEn: 'Radish', category: 'vegetables', emoji: '🌶️', status: 'green', serving: 'liber', groups: [], confidence: 'monash' },
  { id: 'pastarnac', nameRo: 'Păstârnac', nameEn: 'Parsnip', category: 'vegetables', emoji: '🥕', status: 'green', serving: 'liber', groups: [], confidence: 'monash' },
  { id: 'ghimbir', nameRo: 'Ghimbir', nameEn: 'Ginger', category: 'vegetables', emoji: '🫚', status: 'green', serving: 'liber', groups: [], confidence: 'monash' },
  { id: 'masline', nameRo: 'Măsline', nameEn: 'Olives', category: 'vegetables', emoji: '🫒', status: 'green', serving: '60 g', groups: [], confidence: 'monash' },

  // ── Cereale & pâine ─────────────────────────────────────
  { id: 'orez', nameRo: 'Orez (alb/brun)', nameEn: 'Rice', category: 'grains', emoji: '🍚', status: 'green', serving: '1 cană fiert (190 g)', groups: [], note: 'Staple sigur.', confidence: 'monash' },
  { id: 'ovaz', nameRo: 'Ovăz (fulgi)', nameEn: 'Rolled oats', category: 'grains', emoji: '🌾', status: 'green', serving: '1/2 cană (52 g)', groups: [], confidence: 'monash' },
  { id: 'quinoa', nameRo: 'Quinoa', nameEn: 'Quinoa', category: 'grains', emoji: '🌾', status: 'green', serving: '1 cană (155 g)', groups: [], confidence: 'monash' },
  { id: 'hrisca', nameRo: 'Hrișcă', nameEn: 'Buckwheat', category: 'grains', emoji: '🌾', status: 'green', serving: 'liber', groups: [], confidence: 'monash' },
  { id: 'mamaliga', nameRo: 'Mămăligă / polenta', nameEn: 'Polenta', category: 'grains', emoji: '🌽', status: 'green', serving: '1 cană (255 g)', groups: [], note: 'Din mălai — staple românesc sigur.', confidence: 'monash' },
  { id: 'paste-gf', nameRo: 'Paste fără gluten', nameEn: 'GF pasta', category: 'grains', emoji: '🍝', status: 'green', serving: '1 cană fierte (145 g)', groups: [], confidence: 'monash' },
  { id: 'taitei-orez', nameRo: 'Tăiței de orez', nameEn: 'Rice noodles', category: 'grains', emoji: '🍜', status: 'green', serving: 'liber', groups: [], confidence: 'monash' },
  { id: 'paine-alba', nameRo: 'Pâine albă de grâu', nameEn: 'White wheat bread', category: 'grains', emoji: '🍞', status: 'amber', serving: '1 felie (35 g)', groups: ['fructans'], note: '2 felii → roșu.', confidence: 'monash', dial: [{ grams: '1 felie', note: '35 g', status: 'green' }, { grams: '2 felii', note: '70 g', status: 'red' }] },
  { id: 'paine-sourdough', nameRo: 'Pâine sourdough', nameEn: 'Sourdough bread', category: 'grains', emoji: '🍞', status: 'green', serving: '2 felii (97 g)', groups: [], note: 'Fermentarea consumă fructanii.', confidence: 'monash' },
  { id: 'paine-gf', nameRo: 'Pâine fără gluten', nameEn: 'GF bread', category: 'grains', emoji: '🍞', status: 'green', serving: '1 felie (32 g)', groups: [], confidence: 'monash' },
  { id: 'tortilla-porumb', nameRo: 'Tortilla de porumb', nameEn: 'Corn tortilla', category: 'grains', emoji: '🫓', status: 'green', serving: '3 buc', groups: [], confidence: 'monash' },
  { id: 'paste-grau', nameRo: 'Paste de grâu', nameEn: 'Wheat pasta', category: 'grains', emoji: '🍝', status: 'red', groups: ['fructans'], note: 'Swap → paste GF / de orez.', confidence: 'monash' },
  { id: 'cuscus', nameRo: 'Cușcuș', nameEn: 'Couscous', category: 'grains', emoji: '🌾', status: 'red', groups: ['fructans'], note: 'Din grâu.', confidence: 'monash' },
  { id: 'covrig', nameRo: 'Covrig', nameEn: 'Pretzel', category: 'grains', emoji: '🥨', status: 'amber', serving: 'porție mică', groups: ['fructans'], note: 'Un covrig întreg depășește pragul de făină de grâu.', confidence: 'inferred', flag: 'estimat' },

  // ── Lactate & alternative ───────────────────────────────
  { id: 'lapte-fara-lactoza', nameRo: 'Lapte fără lactoză', nameEn: 'Lactose-free milk', category: 'dairy', emoji: '🥛', status: 'green', serving: 'liber', groups: [], note: 'Swap pentru laptele normal.', confidence: 'monash' },
  { id: 'lapte-migdale', nameRo: 'Lapte de migdale', nameEn: 'Almond milk', category: 'dairy', emoji: '🥛', status: 'green', serving: '250 ml', groups: [], confidence: 'monash' },
  { id: 'lapte-vaca', nameRo: 'Lapte de vacă', nameEn: "Cow's milk", category: 'dairy', emoji: '🥛', status: 'red', groups: ['lactose'], note: 'Swap → fără lactoză.', confidence: 'monash' },
  { id: 'cheddar', nameRo: 'Cheddar', nameEn: 'Cheddar', category: 'dairy', emoji: '🧀', status: 'green', serving: '40 g', groups: [], note: 'Maturat — lactoză neglijabilă.', confidence: 'monash' },
  { id: 'mozzarella', nameRo: 'Mozzarella', nameEn: 'Mozzarella', category: 'dairy', emoji: '🧀', status: 'green', serving: '1/2 cană (60 g)', groups: [], confidence: 'monash' },
  { id: 'parmezan', nameRo: 'Parmezan', nameEn: 'Parmesan', category: 'dairy', emoji: '🧀', status: 'green', serving: 'liber', groups: [], confidence: 'monash' },
  { id: 'telemea', nameRo: 'Telemea', nameEn: 'Brined cheese (feta)', category: 'dairy', emoji: '🧀', status: 'green', serving: '40 g', groups: [], note: 'Analog feta — lactoză minimă.', confidence: 'analogy', flag: 'estimat' },
  { id: 'cascaval', nameRo: 'Cașcaval', nameEn: 'Kashkaval', category: 'dairy', emoji: '🧀', status: 'green', serving: '40 g', groups: [], note: 'Analog cheddar — maturat.', confidence: 'analogy', flag: 'estimat' },
  { id: 'branza-vaci', nameRo: 'Brânză de vaci', nameEn: 'Cottage cheese', category: 'dairy', emoji: '🧀', status: 'amber', serving: '40 g', groups: ['lactose'], confidence: 'analogy', flag: 'estimat' },
  { id: 'urda', nameRo: 'Urdă', nameEn: 'Ricotta-type whey cheese', category: 'dairy', emoji: '🧀', status: 'amber', serving: '40 g', groups: ['lactose'], note: 'Analog ricotta.', confidence: 'analogy', flag: 'estimat' },
  { id: 'smantana', nameRo: 'Smântână', nameEn: 'Sour cream', category: 'dairy', emoji: '🥛', status: 'green', serving: '2 lg (40 g)', groups: ['lactose'], note: '≥ 1/4 cană → roșu.', confidence: 'monash' },
  { id: 'unt', nameRo: 'Unt', nameEn: 'Butter', category: 'dairy', emoji: '🧈', status: 'green', serving: 'liber', groups: [], note: 'Grăsime — lactoză practic zero.', confidence: 'monash' },
  { id: 'iaurt', nameRo: 'Iaurt simplu', nameEn: 'Yogurt', category: 'dairy', emoji: '🥛', status: 'red', serving: '20 g', groups: ['lactose'], note: 'Fără lactoză: verde până la 500 g.', confidence: 'monash' },
  { id: 'kefir', nameRo: 'Kefir / sana', nameEn: 'Kefir', category: 'dairy', emoji: '🥛', status: 'red', groups: ['lactose'], note: 'Fermentarea nu elimină lactoza. Fără lactoză: OK.', confidence: 'monash' },
  { id: 'oua', nameRo: 'Ouă', nameEn: 'Eggs', category: 'dairy', emoji: '🥚', status: 'green', serving: 'liber', groups: [], note: 'Zero carbohidrați ⇒ zero FODMAP.', confidence: 'monash' },

  // ── Proteine ────────────────────────────────────────────
  { id: 'pui', nameRo: 'Pui', nameEn: 'Chicken', category: 'protein', emoji: '🍗', status: 'green', serving: 'liber', groups: [], note: 'Simplu, fără marinadă cu ceapă/usturoi.', confidence: 'monash' },
  { id: 'vita', nameRo: 'Vită', nameEn: 'Beef', category: 'protein', emoji: '🥩', status: 'green', serving: 'liber', groups: [], confidence: 'monash' },
  { id: 'porc', nameRo: 'Porc', nameEn: 'Pork', category: 'protein', emoji: '🥩', status: 'green', serving: 'liber', groups: [], confidence: 'monash' },
  { id: 'peste', nameRo: 'Pește', nameEn: 'Fish', category: 'protein', emoji: '🐟', status: 'green', serving: 'liber', groups: [], confidence: 'monash' },
  { id: 'somon', nameRo: 'Somon', nameEn: 'Salmon', category: 'protein', emoji: '🐟', status: 'green', serving: 'liber', groups: [], confidence: 'monash' },
  { id: 'creveti', nameRo: 'Creveți', nameEn: 'Shrimp', category: 'protein', emoji: '🦐', status: 'green', serving: 'liber', groups: [], confidence: 'monash' },
  { id: 'curcan', nameRo: 'Curcan', nameEn: 'Turkey', category: 'protein', emoji: '🦃', status: 'green', serving: 'liber', groups: [], confidence: 'monash' },
  { id: 'tofu-ferm', nameRo: 'Tofu ferm', nameEn: 'Firm tofu', category: 'protein', emoji: '🧊', status: 'green', serving: '170 g', groups: [], note: 'Presat — fără oligozaharide.', confidence: 'monash' },
  { id: 'tofu-moale', nameRo: 'Tofu moale (silken)', nameEn: 'Silken tofu', category: 'protein', emoji: '🧊', status: 'red', groups: ['gos'], confidence: 'monash' },
  { id: 'tempeh', nameRo: 'Tempeh', nameEn: 'Tempeh', category: 'protein', emoji: '🧊', status: 'green', serving: '100 g', groups: [], note: 'Fermentat.', confidence: 'monash' },
  { id: 'bacon', nameRo: 'Bacon', nameEn: 'Bacon', category: 'protein', emoji: '🥓', status: 'green', serving: 'verifică aditivi', groups: [], confidence: 'monash' },
  { id: 'mici', nameRo: 'Mici', nameEn: 'Mici (grilled minced meat)', category: 'protein', emoji: '🍢', status: 'red', groups: ['fructans'], note: 'Pasta tradițională are usturoi/ceapă. Fără ele (ulei infuzat) = verde.', confidence: 'inferred', flag: 'estimat' },
  { id: 'carnati', nameRo: 'Cârnați', nameEn: 'Sausages', category: 'protein', emoji: '🌭', status: 'red', groups: ['fructans'], note: 'De obicei conțin ceapă/usturoi — verifică.', confidence: 'inferred', flag: 'verifică eticheta' },

  // ── Leguminoase ─────────────────────────────────────────
  { id: 'naut-conserva', nameRo: 'Năut conservă (clătit)', nameEn: 'Canned chickpeas', category: 'legumes', emoji: '🫘', status: 'amber', serving: '1/4 cană (42 g)', groups: ['gos'], note: 'Conservarea scoate GOS în lichid.', confidence: 'monash' },
  { id: 'linte-conserva', nameRo: 'Linte conservă (clătită)', nameEn: 'Canned lentils', category: 'legumes', emoji: '🫘', status: 'amber', serving: '1/2 cană (46 g)', groups: ['gos'], confidence: 'monash' },
  { id: 'edamame', nameRo: 'Edamame', nameEn: 'Edamame', category: 'legumes', emoji: '🫛', status: 'green', serving: '1/2 cană (75 g)', groups: [], confidence: 'monash' },
  { id: 'fasole-uscata', nameRo: 'Fasole uscată gătită', nameEn: 'Dried cooked beans', category: 'legumes', emoji: '🫘', status: 'red', groups: ['gos'], confidence: 'monash' },
  { id: 'hummus', nameRo: 'Hummus', nameEn: 'Hummus', category: 'legumes', emoji: '🫘', status: 'amber', serving: '2 lg', groups: ['gos', 'fructans'], note: 'Și usturoi.', confidence: 'monash' },

  // ── Nuci & semințe ──────────────────────────────────────
  { id: 'migdale', nameRo: 'Migdale', nameEn: 'Almonds', category: 'nuts-seeds', emoji: '🥜', status: 'amber', serving: '10 buc (12 g)', groups: ['gos'], note: 'Peste 20 buc → roșu.', confidence: 'monash' },
  { id: 'nuci', nameRo: 'Nuci', nameEn: 'Walnuts', category: 'nuts-seeds', emoji: '🥜', status: 'green', serving: '30 g', groups: [], confidence: 'monash' },
  { id: 'arahide', nameRo: 'Arahide', nameEn: 'Peanuts', category: 'nuts-seeds', emoji: '🥜', status: 'green', serving: '32 buc (28 g)', groups: [], confidence: 'monash' },
  { id: 'unt-arahide', nameRo: 'Unt de arahide', nameEn: 'Peanut butter', category: 'nuts-seeds', emoji: '🥜', status: 'green', serving: '2 lg (50 g)', groups: [], confidence: 'monash' },
  { id: 'macadamia', nameRo: 'Macadamia', nameEn: 'Macadamia', category: 'nuts-seeds', emoji: '🥜', status: 'green', serving: '20 g', groups: [], confidence: 'monash' },
  { id: 'caju', nameRo: 'Caju', nameEn: 'Cashews', category: 'nuts-seeds', emoji: '🥜', status: 'red', groups: ['gos', 'fructans'], confidence: 'monash' },
  { id: 'fistic', nameRo: 'Fistic', nameEn: 'Pistachios', category: 'nuts-seeds', emoji: '🥜', status: 'red', groups: ['gos', 'fructans'], confidence: 'monash' },
  { id: 'seminte-dovleac', nameRo: 'Semințe de dovleac', nameEn: 'Pumpkin seeds', category: 'nuts-seeds', emoji: '🌰', status: 'green', serving: '2 lg (23 g)', groups: [], confidence: 'monash' },
  { id: 'chia', nameRo: 'Semințe de chia', nameEn: 'Chia seeds', category: 'nuts-seeds', emoji: '🌰', status: 'green', serving: '2 lg (24 g)', groups: [], confidence: 'monash' },
  { id: 'in', nameRo: 'Semințe de in', nameEn: 'Flaxseed', category: 'nuts-seeds', emoji: '🌰', status: 'green', serving: '1 lg', groups: [], confidence: 'monash' },
  { id: 'pecan', nameRo: 'Pecan', nameEn: 'Pecans', category: 'nuts-seeds', emoji: '🥜', status: 'green', serving: '15 jumătăți (40 g)', groups: [], confidence: 'monash' },
  { id: 'susan', nameRo: 'Susan / tahini', nameEn: 'Sesame / tahini', category: 'nuts-seeds', emoji: '🌰', status: 'green', serving: '1 lg', groups: [], confidence: 'monash' },

  // ── Îndulcitori ─────────────────────────────────────────
  { id: 'zahar', nameRo: 'Zahăr', nameEn: 'Sugar', category: 'sweeteners', emoji: '🍬', status: 'green', serving: 'moderat', groups: [], confidence: 'monash' },
  { id: 'sirop-artar', nameRo: 'Sirop de arțar', nameEn: 'Maple syrup', category: 'sweeteners', emoji: '🍁', status: 'green', serving: '2 lg', groups: [], note: 'Swap pentru miere.', confidence: 'monash' },
  { id: 'miere', nameRo: 'Miere', nameEn: 'Honey', category: 'sweeteners', emoji: '🍯', status: 'amber', serving: '1 lgț (7 g)', groups: ['fructose'], note: 'Peste 28 g → roșu.', confidence: 'monash', dial: [{ grams: '≤ 7 g', note: '1 lgț', status: 'green' }, { grams: '14 g', status: 'amber' }, { grams: '28 g', status: 'red' }] },
  { id: 'agave', nameRo: 'Sirop de agave', nameEn: 'Agave', category: 'sweeteners', emoji: '🍶', status: 'red', groups: ['fructose'], confidence: 'monash' },
  { id: 'hfcs', nameRo: 'Sirop de porumb (HFCS)', nameEn: 'High-fructose corn syrup', category: 'sweeteners', emoji: '🌽', status: 'red', groups: ['fructose'], note: 'Capcană pe etichete.', confidence: 'monash' },
  { id: 'ciocolata-neagra', nameRo: 'Ciocolată neagră', nameEn: 'Dark chocolate', category: 'sweeteners', emoji: '🍫', status: 'green', serving: '30 g', groups: [], confidence: 'monash' },
  { id: 'stevia', nameRo: 'Stevia (pură)', nameEn: 'Stevia', category: 'sweeteners', emoji: '🌿', status: 'green', serving: 'moderat', groups: [], note: 'Blend-urile pot avea inulină — verifică.', confidence: 'monash' },
  { id: 'sorbitol-e', nameRo: 'Îndulcitori polioli', nameEn: 'Polyol sweeteners', category: 'sweeteners', emoji: '🚫', status: 'red', groups: ['sorbitol', 'mannitol'], note: 'Sorbitol/xilitol/maltitol — în „fără zahăr".', confidence: 'monash' },
  { id: 'inulina', nameRo: 'Inulină / cicoare', nameEn: 'Inulin / chicory root', category: 'sweeteners', emoji: '🚫', status: 'red', groups: ['fructans'], note: 'Fibră „prebiotică" adăugată.', confidence: 'monash' },

  // ── Condimente & sosuri ─────────────────────────────────
  { id: 'ulei-usturoi', nameRo: 'Ulei infuzat cu usturoi', nameEn: 'Garlic-infused oil', category: 'condiments', emoji: '🫗', status: 'green', serving: 'liber', groups: [], note: 'Fructanii nu-s liposolubili — doar aromă.', confidence: 'monash' },
  { id: 'asafoetida', nameRo: 'Asafoetida (hing)', nameEn: 'Asafoetida', category: 'condiments', emoji: '🧂', status: 'green', serving: 'vârf de cuțit', groups: [], note: 'Substitut de ceapă/usturoi.', confidence: 'monash' },
  { id: 'sos-soia', nameRo: 'Sos de soia / tamari', nameEn: 'Soy sauce', category: 'condiments', emoji: '🍶', status: 'green', serving: '2 lg', groups: [], confidence: 'monash' },
  { id: 'sos-peste', nameRo: 'Sos de pește', nameEn: 'Fish sauce', category: 'condiments', emoji: '🐟', status: 'green', serving: 'liber', groups: [], confidence: 'monash' },
  { id: 'mustar', nameRo: 'Muștar (Dijon)', nameEn: 'Mustard', category: 'condiments', emoji: '🌭', status: 'green', serving: '1 lg', groups: [], confidence: 'monash' },
  { id: 'pasta-tomate', nameRo: 'Pastă de tomate', nameEn: 'Tomato paste', category: 'condiments', emoji: '🍅', status: 'green', serving: '2 lg', groups: [], confidence: 'monash' },
  { id: 'passata', nameRo: 'Roșii conservă / passata', nameEn: 'Canned tomatoes', category: 'condiments', emoji: '🍅', status: 'green', serving: '92 g', groups: ['fructose'], note: 'Limita oricărui sos de roșii.', confidence: 'monash' },
  { id: 'maioneza', nameRo: 'Maioneză', nameEn: 'Mayonnaise', category: 'condiments', emoji: '🥚', status: 'green', serving: 'verifică ceapă/usturoi', groups: [], confidence: 'monash' },
  { id: 'ierburi', nameRo: 'Ierburi proaspete', nameEn: 'Fresh herbs', category: 'condiments', emoji: '🌿', status: 'green', serving: 'liber', groups: [], note: 'Busuioc, oregano, cimbru, pătrunjel, mărar…', confidence: 'monash' },
  { id: 'praf-ceapa-usturoi', nameRo: 'Praf de ceapă / usturoi', nameEn: 'Onion / garlic powder', category: 'condiments', emoji: '🚫', status: 'red', groups: ['fructans'], note: 'Capcană ascunsă în mixuri și cuburi de supă.', confidence: 'monash' },
  { id: 'cub-supa', nameRo: 'Cuburi de supă comerciale', nameEn: 'Stock cubes', category: 'condiments', emoji: '🧊', status: 'red', groups: ['fructans'], note: 'De obicei ceapă/usturoi — fă acasă.', confidence: 'inferred', flag: 'verifică eticheta' },

  // ── Băuturi ─────────────────────────────────────────────
  { id: 'apa', nameRo: 'Apă', nameEn: 'Water', category: 'beverages', emoji: '💧', status: 'green', serving: 'liber', groups: [], confidence: 'monash' },
  { id: 'cafea', nameRo: 'Cafea neagră', nameEn: 'Black coffee', category: 'beverages', emoji: '☕', status: 'green', serving: 'moderat', groups: [], note: 'Cu lapte normal → lactoză.', confidence: 'monash' },
  { id: 'ceai-negru', nameRo: 'Ceai negru (slab)', nameEn: 'Black tea', category: 'beverages', emoji: '🍵', status: 'green', serving: '1 cană', groups: [], note: 'Tare/oolong → galben.', confidence: 'monash' },
  { id: 'ceai-menta', nameRo: 'Ceai de mentă', nameEn: 'Peppermint tea', category: 'beverages', emoji: '🍵', status: 'green', serving: '1 cană', groups: [], confidence: 'monash' },
  { id: 'ceai-musetel', nameRo: 'Ceai de mușețel', nameEn: 'Chamomile tea', category: 'beverages', emoji: '🍵', status: 'red', groups: ['fructans'], confidence: 'monash' },
  { id: 'suc-portocale', nameRo: 'Suc de portocale', nameEn: 'Orange juice', category: 'beverages', emoji: '🧃', status: 'amber', serving: '125 ml', groups: ['fructose'], confidence: 'monash' },
  { id: 'suc-mere', nameRo: 'Suc de mere', nameEn: 'Apple juice', category: 'beverages', emoji: '🧃', status: 'red', groups: ['fructose'], confidence: 'monash' },
  { id: 'vin', nameRo: 'Vin (sec)', nameEn: 'Wine', category: 'beverages', emoji: '🍷', status: 'amber', serving: '1 pahar (150 ml)', groups: [], note: 'Dulci/desert — de evitat.', confidence: 'monash' },
  { id: 'bere', nameRo: 'Bere', nameEn: 'Beer', category: 'beverages', emoji: '🍺', status: 'amber', serving: '1 doză (375 ml)', groups: [], confidence: 'monash' },
  { id: 'tuica', nameRo: 'Țuică / palincă', nameEn: 'Plum brandy', category: 'beverages', emoji: '🥃', status: 'green', serving: '30 ml', groups: [], note: 'Distilarea lasă FODMAP-urile în cazan.', confidence: 'analogy', flag: 'estimat' },
  { id: 'rom', nameRo: 'Rom', nameEn: 'Rum', category: 'beverages', emoji: '🥃', status: 'red', groups: ['fructose'], confidence: 'monash' },

  // ── Gustări ─────────────────────────────────────────────
  { id: 'chipsuri', nameRo: 'Chipsuri de cartofi (simple)', nameEn: 'Potato chips', category: 'snacks', emoji: '🥔', status: 'green', serving: '50 g', groups: [], note: 'Evită aromele cu ceapă/usturoi.', confidence: 'monash' },
  { id: 'popcorn', nameRo: 'Popcorn (simplu)', nameEn: 'Popcorn', category: 'snacks', emoji: '🍿', status: 'green', serving: '7 căni (56 g)', groups: [], confidence: 'monash' },
  { id: 'crackers-orez', nameRo: 'Crackers de orez', nameEn: 'Rice crackers', category: 'snacks', emoji: '🍘', status: 'amber', serving: '20 buc', groups: ['fructans'], confidence: 'monash' },
  { id: 'baton-granola', nameRo: 'Batoane granola', nameEn: 'Granola bars', category: 'snacks', emoji: '🍫', status: 'red', groups: ['fructans', 'fructose'], note: 'Inulină, miere, fructe uscate.', confidence: 'monash' },
  { id: 'varza-murata', nameRo: 'Varză murată', nameEn: 'Sauerkraut', category: 'snacks', emoji: '🥬', status: 'red', serving: '1 lg (20 g)', groups: ['mannitol'], note: 'Fermentarea creează manitol — mai rea decât crudă.', confidence: 'monash' },
  { id: 'castraveti-murati', nameRo: 'Castraveți murați (oțet)', nameEn: 'Pickled cucumbers', category: 'snacks', emoji: '🥒', status: 'green', serving: '75 g (~3 buc)', groups: [], note: 'Atenție la usturoiul din borcan.', confidence: 'monash' },

  // ── Completări (pește gras, ulei de măsline, fermentate, prebiotice) ──
  { id: 'sardine', nameRo: 'Sardine', nameEn: 'Sardines', category: 'protein', emoji: '🐟', status: 'green', serving: 'liber', groups: [], note: 'Pește gras mic — bogat în omega-3.', confidence: 'monash' },
  { id: 'macrou', nameRo: 'Macrou', nameEn: 'Mackerel', category: 'protein', emoji: '🐟', status: 'green', serving: 'liber', groups: [], note: 'Pește gras — omega-3.', confidence: 'monash' },
  { id: 'hering', nameRo: 'Hering', nameEn: 'Herring', category: 'protein', emoji: '🐟', status: 'green', serving: 'liber', groups: [], note: 'Pește gras — omega-3.', confidence: 'monash' },
  { id: 'orez-negru', nameRo: 'Orez negru', nameEn: 'Black rice', category: 'grains', emoji: '🍚', status: 'green', serving: '1 cană fiert', groups: [], note: 'Fără gluten, bogat în antociani.', confidence: 'monash' },
  { id: 'iaurt-cocos', nameRo: 'Iaurt de cocos', nameEn: 'Coconut yogurt', category: 'dairy', emoji: '🥥', status: 'green', serving: 'liber', groups: [], note: 'Fără lactoză.', confidence: 'monash' },
  { id: 'ulei-masline', nameRo: 'Ulei de măsline extravirgin', nameEn: 'Extra virgin olive oil', category: 'condiments', emoji: '🫒', status: 'green', serving: 'liber', groups: [], note: 'Grăsime — fără FODMAP.', confidence: 'monash' },
  { id: 'turmeric', nameRo: 'Turmeric', nameEn: 'Turmeric', category: 'condiments', emoji: '🧂', status: 'green', serving: 'liber', groups: [], note: 'Condiment antiinflamator; cu piper negru.', confidence: 'monash' },
  { id: 'anghinare', nameRo: 'Anghinare', nameEn: 'Artichoke', category: 'vegetables', emoji: '🌿', status: 'red', groups: ['fructans'], note: 'Foarte bogată în inulină (fructani).', confidence: 'monash' },
  { id: 'kimchi', nameRo: 'Kimchi', nameEn: 'Kimchi', category: 'snacks', emoji: '🥬', status: 'red', groups: ['fructans'], note: 'Fermentat, dar cu varză chinezească + usturoi/ceapă.', confidence: 'inferred', flag: 'estimat' },
]

const byId = new Map(foods.map((f) => [f.id, f]))

export function getFoodById(id: string): Food | undefined {
  return byId.get(id)
}

/** Diacritics-insensitive match on Romanian and English names. */
export function foodMatchesQuery(food: Food, query: string): boolean {
  if (!query) return true
  const q = normalize(query)
  return normalize(food.nameRo).includes(q) || normalize(food.nameEn ?? '').includes(q)
}
