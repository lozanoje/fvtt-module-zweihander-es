//
// Mark special traits (zweihander) v0.6
// By Rex
//

const macroName = "Mark special traits";
const macroVersion = "0.6";
const macroImage = "icons/tools/fasteners/bolt-steel-blue.webp";

let alreadyChecked = [];

const professionsPack = game.packs.get("fvtt-module-zweihander-es.zh-professions-es");
const professionsList = await professionsPack.getDocuments();

const migrateSpecialTrait = async (p, log, exec) => {
  let specialTraitName = p.system.specialTrait.name;

  if (specialTraitName === '') return;
  if (alreadyChecked.includes(specialTraitName)) return;

  alreadyChecked.push(specialTraitName);

  const specialTrait = await globalThis.findItemWorldWide(
    "trait",
    specialTraitName
  );
	
if (!specialTrait) console.log("---------------------\n" + specialTraitName + ' not found\n---------------------')

  if (log) console.log(`Migrating Special Trait for ${p.name}:`, specialTraitName);
  if (exec) await specialTrait.update({ ['system.category']: 'special' });
};

const log = false;
const exec = false;

professionsList.forEach(async (p) => {
  await migrateSpecialTrait(p, log, exec);
});