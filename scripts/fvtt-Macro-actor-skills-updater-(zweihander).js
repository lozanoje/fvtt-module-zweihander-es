//
// Actor items updater (zweihander) v0.3
// By Viriato139ac
//

const macroName = "Actor preferred skills updater";
const macroVersion = "0.3";
const macroImage = "icons/sundries/books/book-tooled-blue-yellow.webp";

for (let a of Array.from(game.actors)) {
  updateActorItems(a)
}
ui.notifications.info('Finished updating');

async function updateActorItems(myactor) {

  const worldLanguage = game.settings.get("core", "language");
  
    if (worldLanguage !== "es") {
    ui.notifications.error(`No spanish`);
    return;
  }

  let updates = {
	  "flags.zweihander.actorConfig.parrySkills": [
          "A simples CaC",
          "A marciales CaC",
          "Ardides",
          "Carisma",
          "Encantamiento"
        ],
	  "flags.zweihander.actorConfig.dodgeSkills": [
          "Coordinación",
          "Ardides",
          "Conducción",
          "Equitación"
        ],
	  "flags.zweihander.actorConfig.magickSkills": [
          "Encantamiento",
          "Folclore"
        ]
	  }
await myactor.update(updates);

}
