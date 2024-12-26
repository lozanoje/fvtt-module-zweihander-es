//
// Professions uuid updater (zweihander) v0.5
// By Rex
//

const macroName = "Professions uuid updater";
const macroVersion = "0.5";
const macroImage = "icons/tools/fasteners/bolt-brass-yellow.webp";

const professionsPack = game.packs.get("fvtt-module-zweihander-es.zh-professions-es");
const professionsList = await professionsPack.getDocuments();

const migrateProfessionalTrait = async (p, log, exec) => {
  let professionalTraitName = p.system.professionalTrait.name;

  const professionalTrait = await globalThis.findItemWorldWide(
    "trait",
    professionalTraitName
  );
if (!professionalTrait) console.log("---------------------\n" + professionalTraitName + ' not found\n---------------------')

  if (log) console.log(`Migrating Professional Trait for ${p.name}:`, professionalTrait.uuid);
  if (exec) await p.update({ ['system.professionalTrait.uuid']: professionalTrait.uuid });
};

const migrateSpecialTrait = async (p, log, exec) => {
  let specialTraitName = p.system.specialTrait.name;

  if (specialTraitName === '') return;

  const specialTrait = await globalThis.findItemWorldWide(
    "trait",
    specialTraitName
  );
if (!specialTrait) console.log("---------------------\n" + specialTraitName + ' not found\n---------------------')

  if (log) console.log(`Migrating Special Trait for ${p.name}:`, specialTrait.uuid);
	if (exec) await p.update({ ['system.specialTrait.uuid']: specialTrait.uuid });
};

const migrateDrawback = async (p, log, exec) => {
  
  let drawbackName = p.system.drawback.name;

  if (drawbackName === '') return;

  const drawback = await globalThis.findItemWorldWide(
    "drawback",
    drawbackName
  );
if (!drawback) console.log("---------------------\n" + drawbackName + ' not found\n---------------------')

  if (log) console.log(`Migrating Drawback for ${p.name}:`, drawback.name);
	if (exec) await p.update({ ['system.drawback.uuid']: drawback.uuid });
};

const migrateTalents = async (p, log, exec) => {
  let talentList = p.system.talents;

  let updatedTalentList = (await findItemsWorldWide('talent', talentList.map((t) => t.name))).flat().map((t, i) => ({...talentList[i], uuid: t.uuid}));
if (!updatedTalentList) console.log("---------------------\n" + talentList + ' not found\n---------------------')

  if (log) console.log(`Migrating Talents for ${p.name}:`, updatedTalentList);
  if (exec) await p.update({ ['system.talents']: updatedTalentList });
};

const migrateRequirements = async (p, log, exec) => {
  if (log) console.log(`Migrating Requirements for ${p.name}:`, p.system.expert.requirements);
	if (exec) await p.update({ ['system.expert.requirements']: { additional: p.system.expert.requirements, skillRanks: [] } });
};

const log = false;
const exec = false;

professionsList.forEach(async (p) => {
  await migrateProfessionalTrait(p, log, exec);
  await migrateSpecialTrait(p, log, exec);
  await migrateDrawback(p, log, exec);
  await migrateTalents(p, log, exec);
  await migrateRequirements(p, log, exec);
});