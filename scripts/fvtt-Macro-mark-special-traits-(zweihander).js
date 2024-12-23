//
// Mark special traits (zweihander) v0.1
// By Rex
//

const macroName = "Mark special traits";
const macroVersion = "0.1";
const macroImage = "icons/tools/fasteners/bolt-steel-blue.webp";

let alreadyChecked = [];

const professionsPack = game.packs.get("fvtt-module-zweihander-es.zh-professions-es");
const professionsList = await professionsPack.getDocuments();

const traitsPack = game.packs.get("fvtt-module-zweihander-es.zh-traits-es");
const traitsList = await traitsPack.getDocuments();

const migrateSpecialTrait = async (p, log) => {
  let specialTraitName = p.system.specialTrait.name;

  if (specialTraitName === '') return;
  if (alreadyChecked.includes(specialTraitName)) return;

  alreadyChecked.push(specialTraitName);

  const specialTrait = await globalThis.findItemWorldWide(
    "trait",
    specialTraitName
  );

  log ? console.log(`Migrating Special Trait for ${p.name}:`, specialTraitName) : await specialTrait.update({ ['system.category']: 'special' });
};

const log = true;

professionsList.forEach(async (p) => {
  await migrateSpecialTrait(p, log);
});