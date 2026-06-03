//
// Suprised! (zweihander) v0.1
// By Rex
//

const macroName = "Suprised!";
const macroVersion = "0.1";
const macroImage = "icons/skills/melee/shield-damaged-broken-gold.webp";

const actors = canvas.tokens.controlled.map((t) => t.actor);

if (!actors.length) return;

for (const a of actors) {
  console.log("ACTOR:", a);
  let ae = await ActiveEffect.fromStatusEffect('surprised');
  await ActiveEffect.create({ ...ae.toObject() }, { parent: a });
}