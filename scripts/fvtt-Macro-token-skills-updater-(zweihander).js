//
// Token items updater (zweihander) v0.3
// By Viriato139ac
//

const macroName = "Token preferred skills updater";
const macroVersion = "0.3";
const macroImage = "icons/sundries/books/book-symbol-hexagram-silver-red.webp";

updateTokenItems();

async function updateTokenItems() {

  const worldLanguage = game.settings.get("core", "language");

  if (canvas.tokens.controlled.length === 0) {
    ui.notifications.error(`No token selected`);
    return;
  }
  
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
await canvas.tokens.controlled[0].actor.update(updates);

}

