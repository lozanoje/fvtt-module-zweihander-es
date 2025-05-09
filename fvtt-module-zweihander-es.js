Hooks.once("ready", async function () {
  function updateMacro(macroFile) {
    fetch(macroFile)
      .then((res) => res.text())
      .then((content) => {
        let macroContents = content.split(`\n`);
        let versionLine = -1;
        for (var i = 0; i < macroContents.length; i++) {
          if (macroContents[i].search(/macroVersion/) > -1) {
            versionLine = i;
            break;
          }
        }
        let macroVersion = parseFloat(
          macroContents[versionLine]
            .split("=")[1]
            .replace(/\;/g, "")
            .replace(/\"/g, "")
        );
        let nameLine = -1;
        for (var i = 0; i < macroContents.length; i++) {
          if (macroContents[i].search(/macroName/) > -1) {
            nameLine = i;
            break;
          }
        }
        let macroName = macroContents[nameLine]
          .split("=")[1]
          .replace(/\;/g, "")
          .replace(/\"/g, "")
          .trim();
        let imageLine = -1;
        for (var i = 0; i < macroContents.length; i++) {
          if (macroContents[i].search(/macroImage/) > -1) {
            imageLine = i;
            break;
          }
        }
        let macroImage = macroContents[imageLine]
          .split("=")[1]
          .replace(/\;/g, "")
          .replace(/\"/g, "")
          .trim();

        let instMacro = game.macros.getName(macroName);
        let instVersion = instMacro ? instMacro.flags.version : 0;
        console.log("Analizando: " + macroFile);

        if (
          !instMacro ||
          instVersion === undefined ||
          parseFloat(instVersion) < macroVersion
        ) {
          if (instMacro) {
            console.log(
              "Macro: " +
                macroName +
                ", Versión: " +
                macroVersion +
                ", Instalada: ",
              instVersion,
              " --- Actualizamos macro actual"
            );

            instMacro.update({
              name: macroName,
              type: "script",
              img: macroImage,
              command: content,
              flags: {
                version: macroVersion,
              },
            });
          } else {
            console.log(
              "Macro: " +
                macroName +
                ", Versión: " +
                macroVersion +
                ", Instalada: ",
              instVersion,
              " --- Creamos macro"
            );

            Macro.create({
              name: macroName,
              type: "script",
              img: macroImage,
              command: content,
              flags: {
                version: macroVersion,
              },
            });
          }
        } else {
          console.log(
            "Macro: " +
              macroName +
              ", Versión: " +
              macroVersion +
              ", Instalada: ",
            instVersion,
            " --- No hacemos nada"
          );
        }
      });
  }

  if (game.user.isGM) {
    let ficherosjs = await FilePicker.browse(
      "data",
      "/modules/fvtt-module-zweihander-es/scripts"
    ).then((picker) => picker.files);
    for (var i = 0; i < ficherosjs.length; i++) {
      if (ficherosjs[i].search(/\.js/) > -1) updateMacro(ficherosjs[i]);
    }

    if (game.settings.get("core", "language") === "es") {
      document.getElementById("logo").src = "modules/fvtt-module-zweihander-es/images/fvtt-zweihander-es.webp";
      document.getElementById("logo").style = "display: unset;filter: unset;";	  

      game.settings.set("zweihander","skillPack","fvtt-module-zweihander-es.skills-es");
      game.settings.set("zweihander","ancestralTraitPack","fvtt-module-zweihander-es.zh-ancestral-traits-es");
      game.settings.set("zweihander","ancestryPack","fvtt-module-zweihander-es.zh-ancestries-es");
      game.settings.set("zweihander","characterCreationList","fvtt-module-zweihander-es.zh-charactercreation-tables-es");
      game.settings.set("zweihander","creatureTraitPack","fvtt-module-zweihander-es.zh-creature-traits-es");
      game.settings.set("zweihander","diseasePack","fvtt-module-zweihander-es.zh-diseases-es");
      game.settings.set("zweihander","disorderPack","fvtt-module-zweihander-es.zh-disorders-es");
      game.settings.set("zweihander","drawbackPack","fvtt-module-zweihander-es.zh-drawbacks-es");
      game.settings.set("zweihander","injuryList","fvtt-module-zweihander-es.zh-gm-tables-es");
      game.settings.set("zweihander","injuryPack","fvtt-module-zweihander-es.zh-injuries-es");
      game.settings.set("zweihander","spellPack","fvtt-module-zweihander-es.zh-magick-es");
      game.settings.set("zweihander","professionPack","fvtt-module-zweihander-es.zh-professions-es");
      game.settings.set("zweihander","qualityPack","fvtt-module-zweihander-es.zh-qualities-es");
      game.settings.set("zweihander","ritualPack","fvtt-module-zweihander-es.zh-rituals-es");
      game.settings.set("zweihander","talentPack","fvtt-module-zweihander-es.zh-talents-es");
      game.settings.set("zweihander","traitPack","fvtt-module-zweihander-es.zh-traits-es");
      game.settings.set("zweihander","taintPack","fvtt-module-zweihander-es.zh-taints-es");
      game.settings.set("zweihander","armorPack","fvtt-module-zweihander-es.zh-armor-es");
      game.settings.set("zweihander","weaponPack","fvtt-module-zweihander-es.zh-weapons-es");
      game.settings.set("zweihander","weaponAltPack","fvtt-module-zweihander-es.zh-weapons-alt-damage-es");
      game.settings.set("zweihander","trappingPack","fvtt-module-zweihander-es.zh-trappings-es");

      game.settings.set("zweihander","defaultParrySkills","A simples CaC, A marciales CaC, Ardides, Carisma, Encantamiento");
      game.settings.set("zweihander","defaultDodgeSkills","Coordinación, Ardides, Conducción, Equitación");
      game.settings.set("zweihander","defaultMagickSkills","Encantamiento, Folclore");

      game.settings.set("zweihander","defaultPerilSkill","Disciplina");
      game.settings.set("zweihander","defaultDiseaseSkill","Resistencia");
      game.settings.set("zweihander","defaultCreatureDodgeSkill","Coordinación");
      game.settings.set("zweihander","defaultCreatureMagickSkill","Encantamiento");
	  
    }
  }
});
