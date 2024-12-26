//
// Mark ancestral traits (zweihander) v0.6
// By Rex
//

const macroName = "Mark ancestral traits";
const macroVersion = "0.6";
const macroImage = "icons/tools/fasteners/screw-flat-steel-brown.webp";

const traitsPack = game.packs.get("fvtt-module-zweihander-es.zh-ancestral-traits-es");
const traitsList = await traitsPack.getDocuments();

const migrateAncestralTrait = async (p, log, exec) => {
  if (log) console.log(`Migrating ancestral Trait for ${p.name}:`, p.system.category);
  if (exec) await p.update({['system.category']: 'ancestral'});
};

const log = false;
const exec = false;

traitsList.forEach(async (p) => {
  await migrateAncestralTrait(p, log, exec);
});