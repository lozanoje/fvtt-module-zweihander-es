//
// PC creator wizard (zweihander) v1.6
// by Viriato139ac
//

const macroName = "PC creator wizard";
const macroVersion = "1.6";
const macroImage = "icons/magic/death/grave-tombstone-glow-teal.webp";

const myDialogOptions = {
  width: 800,
  resizable: true,
  //height: 800,
  //top: 500,
  //left: 500
};

const tablesPack = game.packs.get("fvtt-module-zweihander-es.zh-pccreation-es");
const tablesIndex = await tablesPack.getIndex();
let tableEntry;
let rollTable;
let diceRoll;
let diceResult;

let paso1 = await Dialog.wait({
  title: "PASO I: COMIENZA EL NIVEL BÁSICO",
  content: `
<p><strong>Asistente de creación de PJs v${macroVersion}.</strong></p>
<hr>
<p>En ZWEIHÄNDER, hay tres niveles: Básico, Intermedio y Avanzado. Cuando creas por primera vez un Personaje, comienzas en el nivel Básico.</p>
`,
  buttons: {
    buttonA: {
      label: "Vale",
      callback: () => 1,
    },
  },
  default: "buttonA",
    myDialogOptions
});

let paso2 = await Dialog.wait({
  title: "PASO II: ATRIBUTOS PRIMARIOS",
  content: `
<p>Los Atributos Primarios son los elementos básicos de la creación, determinando el potencial y capacidades de un Personaje. Representan sus características físicas, mentales y sociales. Cuanto mayor sea este valor, mayor será su capacidad.</p>
<p>&nbsp;</p>
<p><strong>BONIFICADOR DE ATRIBUTOS PRIMARIOS</strong></p>
<p>Los Atributos Primarios también tienen un bonificador asociado. Estos se aplican a las mecánicas de juego de varias formas. Dichos bonificadores se determinan cogiendo el dígito de la decena del Atributo Primario asociado y sumando o restando cualquier modificador de ancestro.</p>
<p>Los atributos primarios han sido generados aleatoriamente al crear al PJ.</p>
`,
  buttons: {
    buttonA: {
      label: "Vale",
      callback: () => 1,
    },
  },
  default: "buttonA",
});

let genero = await Dialog.wait({
  title: "PASO III: GÉNERO Y ANCESTRO",
  content: `
<p><b>DETERMINA TU GÉNERO</b></p>
<p>ZWEIHÄNDER no hace distinciones físicas, intelectuales o sociales basadas en las diferencias entre hombres y mujeres de cualquier ancestro.</p>
<fieldset>
<legend>Seleccione el género del PJ:</legend>
<div>
  <input type="radio" id="hombre" name="genero" value="Hombre" />
  <label for="huey">Hombre</label>
</div>
<div>
  <input type="radio" id="mujer" name="genero" value="Mujer" />
  <label for="dewey">Mujer</label>
</div>
  <div>
  <input type="radio" id="mujer" name="genero" value="Otro" checked />
  <label for="dewey">Otro</label>
</div>
</fieldset>
`,
  buttons: {
    buttonA: {
      label: "Vale",
      callback: ([html]) =>
        html.querySelector("input[name=genero]:checked").value,
    },
  },
  default: "buttonA",
    myDialogOptions
});

let paso32 = await Dialog.wait({
  title: "PASO III: GÉNERO Y ANCESTRO",
  content: `
<blockquote>
    <p>Tu género es: ${genero}, anótalo a mano en la hoja de PJ</p>
</blockquote>
<hr>
<p><strong>DETERMINA TU ANCESTRO</strong></p>
<p>Los humanos son el ancestro por defecto para los jugadores. Suponiendo que vuestro DJ esté abierto a permitir ancestros de semihumanos en su mundo de campaña, podéis determinar aleatoriamente un ancestro lanzando 1D100 y consultando la siguiente tabla.</p>
<p>&nbsp;</p>
<p><strong>MODIFICADORES DE ANCESTRO</strong></p>
<p>Cada ancestro tiene fortalezas y debilidades únicas en sus capacidades mentales y físicas, las cuales podrían tener un origen ancestral y se habrían transmitido de generación en generación. En pocas palabras, cada ancestro aplica modificadores tanto positivos como negativos a ciertos bonificadores de los Atributos Primarios.</p>
<hr>
<blockquote>
    <p>¿Será tu PJ humano o quieres generar aleatoriamente su ancestro?</p>
</blockquote>
  `,
  buttons: {
    buttonA: {
      label: "Humano",
      callback: () => 1,
    },
    buttonB: {
      label: "Tirar",
      callback: () => 2,
    },
  },
  default: "buttonA",
    myDialogOptions
});

if (!paso32) return;

let ancestro = "Humano";
if (paso32 === 2) {
  tableEntry = tablesIndex.find((table) => table.name.includes("01. Ancestro"));
  rollTable = await tablesPack.getDocument(tableEntry._id);
  diceRoll = await rollTable.roll();
  diceResult = await rollTable.draw({ roll: diceRoll });
  ancestro = diceResult.results[0].text;
}

game.packs.get("fvtt-module-zweihander-es.zh-ancestries-es").render(true);

let paso33 = await Dialog.wait({
  title: "PASO III: GÉNERO Y ANCESTRO",
  content: `
<blockquote>
    <p>Tu ancestro es: ${ancestro}</p>
</blockquote>
<blockquote>
    <p>Ahora arrastra del compendio tu ancestro a la hoja de personaje</p>
</blockquote>
<hr>
<p><strong>RASGOS DE ANCESTRO</strong></p>
<p>Cada ancestro tiene sus características propias llamadas rasgos de ancestro. Estas distinciones culturales ayudan a crear diferencias entre los ancestros principales y la diversidad étnica dentro de los de su propia especie.</p>
<hr>
<blockquote>
    <p>Ahora debes tirar tu rasgo de ancestro</p>
</blockquote>
  `,
  buttons: {
    buttonA: {
      label: "Tirar",
      callback: () => 1,
    },
  },
  default: "buttonA",
    myDialogOptions
});

if (!paso33) return;

let rasgoancestro;
if (paso33 === 1) {
  tableEntry = tablesIndex.find(
    (table) =>
      table.name.includes("Rasgo de ancestro") &&
      table.name.includes(ancestro.toLowerCase())
  );
  rollTable = await tablesPack.getDocument(tableEntry._id);
  diceRoll = await rollTable.roll();
  diceResult = await rollTable.draw({ roll: diceRoll });
  rasgoancestro = diceResult.results[0].text;
}

let paso41 = await Dialog.wait({
  title: "PASO IV: ARQUETIPO Y PROFESIÓN",
  content: `
<blockquote>
    <p>Tu rasgo de ancestro es: ${rasgoancestro}</p>
    <p>Ahora edita el ancestro y en rasgo ancestral escribe el nombre del rasgo de ancestro</p>
</blockquote>
<hr>
<p><strong>DETERMINA TU ARQUETIPO</strong></p>
<p>El Arquetipo sienta las bases de cómo inicias la historia y determina cómo puedes hacer que tu Personaje crezca en el primer puñado de sesiones de juego. Cada uno de estos Arquetipos define en términos generales qué papel desempeñas en el grupo, especialmente cuando consideras las fortalezas y debilidades de los demás en cuanto a habilidades y Talentos.</p>
<p>También influye en qué enseres posees cuando inicias el juego. Por último, determina tu profesión de inicio en el nivel Básico y otras profesiones que podrás adoptar en los niveles Intermedio y Avanzado.</p>
<blockquote>
    <p>Genera aleatoriamente tu Arquetipo lanzando 1D100, y consultando la siguiente tabla.</p>
</blockquote>
  `,
  buttons: {
    buttonA: {
      label: "Tirar",
      callback: () => 1,
    },
  },
  default: "buttonA",
    myDialogOptions
});

let arquetipo;
tableEntry = tablesIndex.find((table) => table.name.includes("02. Arquetipo"));
rollTable = await tablesPack.getDocument(tableEntry._id);
diceRoll = await rollTable.roll();
diceResult = await rollTable.draw({ roll: diceRoll });
arquetipo = diceResult.results[0].text;

let paso42 = await Dialog.wait({
  title: "PASO IV: ARQUETIPO Y PROFESIÓN",
  content: `
<blockquote>
    <p>Tu arquetipo es: ${arquetipo}</p>
    <p>No hace falta que anotes el arquetipo en tu hoja de PJ.</p>
</blockquote>
<hr>
<p><strong>DETERMINA TU PROFESIÓN</strong></p>
<blockquote>
    <p>Después, decide tu primera profesión lanzando 1D100 y consultando la tabla de cada Arquetipo.</p>
</blockquote>
    `,
  buttons: {
    buttonA: {
      label: "Tirar",
      callback: () => 1,
    },
  },
  default: "buttonA",
    myDialogOptions
});

let profesion;

tableEntry = tablesIndex.find(
  (table) =>
    table.name.includes("Profesión de") &&
    table.name.includes(arquetipo.toLowerCase())
);
rollTable = await tablesPack.getDocument(tableEntry._id);
diceRoll = await rollTable.roll();
diceResult = await rollTable.draw({ roll: diceRoll });
profesion = diceResult.results[0].text;

console.log(profesion);

let paso5 = await Dialog.wait({
  title: "PASO V: ATRIBUTOS SECUNDARIOS",
  content: `
<blockquote>
    <p>Tu profesión es: ${profesion}</p>
    <p>Arrastra la profesión del chat a la pestaña de Niveles de la hoja de PJ.</p>
</blockquote>
<hr>
<p>Cada Personaje posee unos Atributos Secundarios. Estos se centran en las estadísticas de combate, que se basan en los bonificadores de los Atributos Primarios como referencia. La combinación de estas características determina cuánto puedes transportar contigo cómodamente en una lucha, tu capacidad de reacción ante el peligro, lo rápido que te mueves, cuántos golpes puedes recibir antes de morir y la tensión que puedes soportar antes de desmayarte.</p>
<p>Se calculan automáticamente en la hoja de personaje.</p>
    `,
  buttons: {
    buttonA: {
      label: "Vale",
      callback: () => 1,
    },
  },
  default: "buttonA",
    myDialogOptions
});

let paso61 = await Dialog.wait({
  title: "PASO VI: TRASFONDO",
  content: `
<p><strong>ESTACIÓN DE NACIMIENTO</strong></p>
<p>Las guerras van y vienen, la gente muere y a las bestias se las puede aniquilar, pero el tiempo no se detiene. Donde mejor se refleja esto es en el ciclo de las estaciones: de la primavera al verano, del otoño al invierno, y vuelta a empezar, el interminable ciclo es a la vez reconfortante e imponente.</p>
<hr>
<blockquote>
    <p>Determina en qué estación naciste lanzando un D100 y consulta la siguiente tabla.</p>
</blockquote>
      `,
  buttons: {
    buttonA: {
      label: "Tirar",
      callback: () => 1,
    },
  },
  default: "buttonA",
    myDialogOptions
});

let estacion;
tableEntry = tablesIndex.find((table) =>
  table.name.includes("03. Estación de nacimiento")
);
rollTable = await tablesPack.getDocument(tableEntry._id);
diceRoll = await rollTable.roll();
diceResult = await rollTable.draw({ roll: diceRoll });
estacion = diceResult.results[0].text;

let paso62 = await Dialog.wait({
  title: "PASO VI: TRASFONDO",
  content: `
<blockquote>
    <p>Tu estación de nacimiento es: ${estacion}</p>
    <p>Escribe tu estación en el apartado Nacimiento de tu hoja de PJ.</p>
</blockquote>
<hr>
<p><strong>TU PREDESTINACIÓN</strong></p>
<p>En ZWEIHÄNDER, la superstición es una parte aceptada de la realidad. Algunas veces, la vida se ve como algo absurdo: es breve, brutal y aparentemente caprichosa. Cada faceta de la vida está guiada, de forma voluntaria o no, por los sutiles movimientos de las estrellas. A la edad de diez años, es habitual que los niños se reúnan con un agorero para conocer su Predestinación: la forma en la que morirán.</p>
<hr>
<blockquote>
    <p>Determina tu predestinación tirando en la siguiente tabla.</p>
</blockquote>
`,
  buttons: {
    buttonA: {
      label: "Tirar",
      callback: () => 1,
    },
  },
  default: "buttonA",
    myDialogOptions
});

let predestinacion;

tableEntry = tablesIndex.find(
  (table) =>
    table.name.includes("Predestinaciones de") &&
    table.name.includes(estacion.toLowerCase())
);
rollTable = await tablesPack.getDocument(tableEntry._id);
diceRoll = await rollTable.roll();
diceResult = await rollTable.draw({ roll: diceRoll });
predestinacion = diceResult.results[0].text;

let paso63 = await Dialog.wait({
  title: "PASO VI: TRASFONDO",
  content: `
<blockquote>
    <p>Tu predestinacion es: ${predestinacion}</p>
    <p>Escribe tu predestinacion en el apartado predestinacion de tu hoja de PJ.</p>
</blockquote>
<hr>
<p><strong>CATEGORÍA DE EDAD</strong></p>
<p>La edad no tiene un impacto inmediato en tus Atributos Primarios.</p>
<hr>
<blockquote>
    <p>Determina tu edad tirando en la siguiente tabla.</p>
</blockquote>
          `,
  buttons: {
    buttonA: {
      label: "Tirar",
      callback: () => 1,
    },
  },
  default: "buttonA",
    myDialogOptions
});

let edad;
tableEntry = tablesIndex.find((table) =>
  table.name.includes("04. Categoría de edad")
);
rollTable = await tablesPack.getDocument(tableEntry._id);
diceRoll = await rollTable.roll();
diceResult = await rollTable.draw({ roll: diceRoll });
edad = diceResult.results[0].text;

let paso64 = await Dialog.wait({
  title: "PASO VI: TRASFONDO",
  content: `
<blockquote>
    <p>Tu categoría de edad es: ${edad}</p>
    <p>Escribe tu categoría de edad en el apartado Categ. edad de tu hoja de PJ.</p>
</blockquote>
<hr>
<p><strong>RASGOS DISTINTIVOS</strong></p>
<p>Más allá de la simple apariencia, todos los Personajes poseen algún tipo de rasgo inusual o distintivo en su cuerpo, o un comportamiento particular visible.</p>
<p><i>JOVEN</i>: No tienes Rasgos Distintivos a esta edad.</p>
<p><i>ADULTO</i>: Debes tirar una vez en la tabla de Rasgos Distintivos.</p>
<p><i>MADURO</i>: Debes tirar dos veces en la tabla de Rasgos Distintivos.</p>
<p><i>ANCIANO</i>: Debes tirar tres veces en la tabla de Rasgos Distintivos.</p>
<hr>
<blockquote>
    <p>Determina tus rasgos distintivos en la siguiente tabla.</p>
</blockquote>
            `,
  buttons: {
    buttonA: {
      label: "Tirar",
      callback: () => 1,
    },
  },
  default: "buttonA",
    myDialogOptions
});

let nedad = 0;
nedad = edad === "Adulto" ? 1 : nedad;
nedad = edad === "Maduro" ? 2 : nedad;
nedad = edad === "Anciano" ? 3 : nedad;

const rasgosdistintivos = [];
tableEntry = tablesIndex.find((table) =>
  table.name.includes("04.01. Rasgos distintivos")
);
rollTable = await tablesPack.getDocument(tableEntry._id);
if (nedad > 0) {
  for (let i = 0; i < nedad; i++) {
    diceRoll = await rollTable.roll();
    diceResult = await rollTable.draw({ roll: diceRoll });
    rasgosdistintivos.push([diceResult.results[0].text]);
  }
}

let paso65 = await Dialog.wait({
  title: "PASO VI: TRASFONDO",
  content:
    (nedad > 0
      ? `<blockquote><p>Tus rasgos distintivos son: ${rasgosdistintivos}</p><p>Escribe tus rasgos distintivos en el apartado Rasgos Distintivos de tu hoja de PJ.</p></blockquote>`
      : `<blockquote><p>No tienes rasgos distintivos</p></blockquote>`) +
    `
<hr>
<p><strong>TONO DE PIEL</strong></p>
<p>Un mundo sombrío y peligroso está poblado por un variado y rico tapiz de gentes y tonos de piel.</p>
<p><strong>COMPLEXIÓN</strong></p>
<p>De forma similar a la edad del Personaje, la Complexión no conlleva ningún tipo de bonificación o penalización a los Atributos Primarios.</p>
<p><strong>ALTURA Y PESO</strong></p>
<p>Tu altura y peso sirven como características físicas adicionales para ilustrar mejor el aspecto de tu Personaje. No implican ningún tipo de bonificación o penalización a tus Atributos Primarios.</p>
<p><strong>COLOR DEL PELO</strong></p>
<p>Lanza 1D100 para determinar de forma aleatoria cuál será el color del pelo del Personaje. Ten en cuenta que cada ancestro posee sus propios atributos únicos.</p>
<p><strong>COLOR DE OJOS</strong></p>
<p>Lanza 1D100 para determinar de forma aleatoria cuál será el color de ojos del Personaje. Ten en cuenta que cada ancestro posee sus propios atributos únicos.</p>
<hr>
<blockquote>
    <p>Tira en las tablas siguientes el resto de características de tu PJ.</p>
</blockquote>
`,
  buttons: {
    buttonA: {
      label: "Tirar",
      callback: () => 1,
    },
  },
  default: "buttonA",
    myDialogOptions
});

let tonopiel;
tableEntry = tablesIndex.find((table) =>
  table.name.includes("05. Tono de piel")
);
rollTable = await tablesPack.getDocument(tableEntry._id);
diceRoll = await rollTable.roll();
diceResult = await rollTable.draw({ roll: diceRoll });
tonopiel = diceResult.results[0].text;
let complexion;
tableEntry = tablesIndex.find((table) => table.name.includes("06. Complexión"));
rollTable = await tablesPack.getDocument(tableEntry._id);
diceRoll = await rollTable.roll();
diceResult = await rollTable.draw({ roll: diceRoll });
edad = diceResult.results[0].text;

let alturapeso;
tableEntry = tablesIndex.find(
  (table) =>
    table.name.includes("Altura y peso") &&
    table.name.includes(
      ancestro.toLowerCase().slice(0, -1) + (genero === "Hombre" ? "o" : "a")
    )
);
rollTable = await tablesPack.getDocument(tableEntry._id);
diceRoll = await rollTable.roll();
diceResult = await rollTable.draw({ roll: diceRoll });
alturapeso = diceResult.results[0].text;
let pelo;
tableEntry = tablesIndex.find((table) =>
  table.name.includes("08. Color del pelo")
);
rollTable = await tablesPack.getDocument(tableEntry._id);
diceRoll = await rollTable.roll();
diceResult = await rollTable.draw({ roll: diceRoll });
pelo = diceResult.results[0].text;
let ojos;
tableEntry = tablesIndex.find((table) =>
  table.name.includes("09. Color de ojos")
);
rollTable = await tablesPack.getDocument(tableEntry._id);
diceRoll = await rollTable.roll();
diceResult = await rollTable.draw({ roll: diceRoll });
ojos = diceResult.results[0].text;

let paso66 = await Dialog.wait({
  title: "PASO VI: TRASFONDO",
  content: `
<blockquote>
    <p>Escribe todas características en la hoja de PJ: piel, complexión, altura, peso y ojos.</p>
</blockquote>
<hr>
<p><strong>EDUCACIÓN</strong></p>
<p>Si es innata o adquirida es un debate antiguo, pero no hay lugar a dudas de que el entorno en el que creces te afecta profundamente. Tu familia, si tenías una, inculca valores y costumbres en ti incluso sin que te des cuenta de ello.</p>
<hr>
<blockquote>
    <p>Tira en la tabla siguiente tu educación.</p>
</blockquote>
`,
  buttons: {
    buttonA: {
      label: "Tirar",
      callback: () => 1,
    },
  },
  default: "buttonA",
    myDialogOptions
});

let educacion;
tableEntry = tablesIndex.find((table) => table.name.includes("10. Educación"));
rollTable = await tablesPack.getDocument(tableEntry._id);
diceRoll = await rollTable.roll();
diceResult = await rollTable.draw({ roll: diceRoll });
educacion = diceResult.results[0].text;

let paso67 = await Dialog.wait({
  title: "PASO VI: TRASFONDO",
  content: `
<blockquote>
    <p>Tu educación es: ${educacion}</p>
    <p>Escríbela en el apartado educación de la hoja de PJ.</p>
</blockquote>
<hr>
<p><strong>CLASE SOCIAL</strong></p>
<p>Cada sociedad, sin importar lo pequeña o grande que sea, reconoce una jerarquía social determinada por el nacimiento de cada uno. Sin importar tu ancestro, la Clase Social juega un papel destacado en cómo se crio tu Personaje y las convenciones sociales que ha vivido.</p>
<hr>
<blockquote>
    <p>Tira tu clase social en la tabla siguiente.</p>
</blockquote>
`,
  buttons: {
    buttonA: {
      label: "Tirar",
      callback: () => 1,
    },
  },
  default: "buttonA",
    myDialogOptions
});

let clasetexto;
tableEntry = tablesIndex.find((table) =>
  table.name.includes("11. Clase social")
);
rollTable = await tablesPack.getDocument(tableEntry._id);
diceRoll = await rollTable.roll();
diceResult = await rollTable.draw({ roll: diceRoll });
clasetexto = diceResult.results[0].text;

let clase = clasetexto.substring(3, clasetexto.indexOf("</b>"));
let dinerotexto = clasetexto.substring(
  clasetexto.indexOf("</b>") + 10,
  clasetexto.length
);
let dineroformula = dinerotexto.substring(0, dinerotexto.indexOf(" "));
let dinerounidades = dinerotexto.substring(
  dinerotexto.indexOf(" ") + 1,
  dinerotexto.length
);

diceRoll = await new Roll(dineroformula).evaluate();
diceRoll.toMessage({
  flavor: `${dineroformula}`,
});
let dinero = diceRoll._total;

let paso68 = await Dialog.wait({
  title: "PASO VI: TRASFONDO",
  content: `
<blockquote>
    <p>Tu clase social es: ${clase} y comienzas con ${dinero} ${dinerounidades}</p>
    <p>Escríbela en el apartado Clase social de la hoja de PJ y anota el dinero inicial.</p>
</blockquote>
<hr>
<p><strong>IDIOMAS</strong></p>
<p>Tu Personaje comienza el juego con el idioma de su región de procedencia. Este puede ser un idioma de un ancestro, cultural u otra «jerga» aceptada como lengua común. Es mejor trabajar junto con el DJ para determinar qué idiomas encajan con la temática del trasfondo de tu Personaje y el mundo de campaña. Cuando conoces un idioma, esto significa que puedes emplear pruebas de habilidad basadas en la Empatía para comunicarte con otros en ese idioma.</p>
<hr>
<blockquote>
    <p>Edita la lista de idiomas y añade al menos uno.</p>
</blockquote>
      `,
  buttons: {
    buttonA: {
      label: "Vale",
      callback: () => 1,
    },
  },
  default: "buttonA",
    myDialogOptions
});

let paso69 = await Dialog.confirm({
  title: "PASO VI: TRASFONDO",
  content: `
<p><strong>DESVENTAJAS</strong></p>
<p>Las Desventajas proporcionan un mejor retrato de quién era tu Personaje antes de alejarse de su profesión. Son excelentes herramientas para invitar a la interpretación. También pueden ser indicativas de una reputación o afiliación pasada. Por ejemplo, Danziger pasó muchos años en la ciudad como matón callejero sin licencia, así que podría tener una historia criminal que es conocida entre los legisladores locales. Esto puede jugar en su contra de muchas formas, incluso si ha abandonado la ciudad. La reputación tiene tendencia a seguir a quién se la crea. ¡Quizás lo que el DJ sabe, pero Danziger no, es que tiene a varios cazadores de recompensas tras su rastro! «Estigmatizado» o incluso «Némesis» podrían ser unas Desventajas adecuadas en esta situación.</p>
<hr>
<blockquote>
    <p>¿Quieres tener una desventaja? Te otorgará un punto de destino adicional.</p>
</blockquote>
      `,
});
let desventaja;
let destino = 1;
if (paso69) {
  destino++;
  tableEntry = tablesIndex.find((table) =>
    table.name.includes("12. Desventaja")
  );
  rollTable = await tablesPack.getDocument(tableEntry._id);
  diceRoll = await rollTable.roll();
  diceResult = await rollTable.draw({ roll: diceRoll });
  desventaja = diceResult.results[0].text;
}

let paso71 = await Dialog.wait({
  title: "PASO VII: LA MANO DEL DESTINO",
  content:
    (paso69
      ? `<blockquote><p>Tu desventaja es: ${desventaja}</p><p>Arrastra la desventaja del chat a la hoja de PJ.</p></blockquote>`
      : `<blockquote><p>No comienzas con ninguna desventaja.</p></blockquote>`) +
    `
<p><strong>PUNTOS DE DESTINO INICIALES</strong></p>
<p>Cuando creas por primera vez tu Personaje en el nivel Básico para una partida de ZWEIHÄNDER, comienzas el juego con un punto de Destino. Sin embargo, si elegiste recibir una Desventaja, comenzarás con dos puntos de Destino. Apunta tus puntos de Destino en la primera página de tu hoja de Personaje.</p>
<hr>
<blockquote>
    <p>Comienzas la aventura con ${destino} puntos de destino, anótalo en tu hoja de PJ.</p>
</blockquote>
      `,
  buttons: {
    buttonA: {
      label: "Vale",
      callback: () => 1,
    },
  },
  default: "buttonA",
    myDialogOptions
});

let paso81 = await Dialog.wait({
  title: "PASO VIII: ALINEAMIENTO",
  content: `
<p><strong>ALINEAMIENTOS DEL ORDEN Y DEL CAOS</strong></p>
<p>¿Cuál es la principal motivación para tu Personaje en la vida? Un vistazo rápido a tu Destino sería la pasión por algo, tanto si es la comida, una recompensa, las comodidades, la amabilidad, combatir, la sabiduría o incluso la salvación. Es importante considerar los aspectos generales de lo que persigues, puesto que el juego en sí mismo (y tus decisiones) determinarán si tu búsqueda es pura o corrupta.</p>
<hr>
<blockquote>
    <p>Tira tu alineamiento en la siguiente tabla.</p>
</blockquote>
`,
  buttons: {
    buttonA: {
      label: "Tirar",
      callback: () => 1,
    },
  },
  default: "buttonA",
    myDialogOptions
});

let alineamiento;
tableEntry = tablesIndex.find((table) =>
  table.name.includes("13. Alineamiento")
);
rollTable = await tablesPack.getDocument(tableEntry._id);
diceRoll = await rollTable.roll();
diceResult = await rollTable.draw({ roll: diceRoll });
alineamiento = diceResult.results[0].text;

let paso91 = await Dialog.wait({
  title: "PASO IX: INICIA TU PROFESIÓN",
  content: `
<blockquote>
    <p>Tu clase alineamiento es: ${alineamiento}</p>
    <p>Anótalo en la hoja de PJ.</p>
</blockquote>
<hr>
<p>Ahora que has completado los elementos básicos del proceso de creación del Personaje, apunta 1.000 puntos de Recompensa en la tercera página de tu ficha de Personaje. En el Capítulo 4: Profesiones, gastarás estos puntos de Recompensa para concluir la creación. Una vez completado, ¡estarás listo para jugar una partida de ZWEIHÄNDER!</p>
<hr>
<blockquote>
    <p>Asigna tus puntos de recompensa a tu PJ.</p>
</blockquote>
`,
  buttons: {
    buttonA: {
      label: "Vale",
      callback: () => 1,
    },
  },
  default: "buttonA",
    myDialogOptions
});
