//
// Professions uuid updater (zweihander) v0.3
// By Rex
//

const macroName = "Professions uuid updater";
const macroVersion = "0.3";
const macroImage = "icons/tools/fasteners/bolt-brass-yellow.webp";

const professionsPack = game.packs.get("fvtt-module-zweihander-es.zh-professions-es");
const professionsList = await professionsPack.getDocuments();

const migrateProfessionalTrait = async (p, log) => {
  let professionalTraitName = p.system.professionalTrait.name;

  const professionalTrait = await globalThis.findItemWorldWide(
    "trait",
    professionalTraitName
  );

  if (log) console.log(`Migrating Professional Trait for ${p.name}:`, professionalTrait.uuid);
  await p.update({ ['system.professionalTrait.uuid']: professionalTrait.uuid });
};

const migrateSpecialTrait = async (p, log) => {
  let specialTraitName = p.system.specialTrait.name;

  if (specialTraitName === '') return;

  const specialTrait = await globalThis.findItemWorldWide(
    "trait",
    specialTraitName
  );

  if (log) console.log(`Migrating Special Trait for ${p.name}:`, specialTrait.uuid);
	await p.update({ ['system.specialTrait.uuid']: specialTrait.uuid });
};

const migrateDrawback = async (p, log) => {
  
  let drawbackName = p.system.drawback.name;

  if (drawbackName === '') return;

  const drawback = await globalThis.findItemWorldWide(
    "drawback",
    drawbackName
  );

  if (log) console.log(`Migrating Drawback for ${p.name}:`, drawback.name);
	await p.update({ ['system.drawback.uuid']: drawback.uuid });
};

const migrateTalents = async (p, log) => {
  let talentList = p.system.talents;

  let updatedTalentList = (await findItemsWorldWide('talent', talentList.map((t) => t.name))).flat().map((t, i) => ({...talentList[i], uuid: t.uuid}));

  if (log) console.log(`Migrating Talents for ${p.name}:`, updatedTalentList);
  await p.update({ ['system.talents']: updatedTalentList });
};

const migrateRequirements = async (p, log) => {
  if (log) console.log(`Migrating Requirements for ${p.name}:`, p.system.expert.requirements);
	await p.update({ ['system.expert.requirements']: { additional: "", skillRanks: [] } });
};

const log = true;

professionsList.forEach(async (p) => {
  await migrateProfessionalTrait(p, log);
  await migrateSpecialTrait(p, log);
  await migrateDrawback(p, log);
  await migrateTalents(p, log);
  await migrateRequirements(p, log);
});