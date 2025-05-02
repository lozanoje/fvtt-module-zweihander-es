//
// Mark beasts traits (zweihander) v0.1
// By Rex
//

const macroName = "Mark beasts traits";
const macroVersion = "0.1";
const macroImage = "icons/creatures/magical/construct-golem-stone-blue.webp";

const traitsPack = game.packs.get("fvtt-module-zweihander-es.zh-creature-traits-es");
const traitsList = await traitsPack.getDocuments();

const migrateAncestralTrait = async (p, log, exec) => {
  if (log) console.log(`Migrating beasts Trait for ${p.name}:`, p.system.category);
  if (exec) await p.update({['system.category']: 'beast'});
};

const log = false;
const exec = false;

traitsList.forEach(async (p) => {
  await migrateAncestralTrait(p, log, exec);
});