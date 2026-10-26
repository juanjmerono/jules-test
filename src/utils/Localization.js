// Multi-language support module for CTO: Save the Company

export const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Castellano' },
  { code: 'ca', label: 'Català' },
  { code: 'eu', label: 'Euskera' },
  { code: 'gl', label: 'Galego' },
  { code: 'pa', label: 'Panocho' }
];

let currentLang = localStorage.getItem('cto_game_lang') || 'es';
const listeners = new Set();

export function getLanguage() {
  return currentLang;
}

export function setLanguage(langCode) {
  if (LANGUAGES.some(l => l.code === langCode)) {
    currentLang = langCode;
    localStorage.setItem('cto_game_lang', langCode);
    listeners.forEach(cb => cb(langCode));
  }
}

export function onLanguageChange(callback) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

export const TRANSLATIONS = {
  en: {
    // Boot
    title: 'CTO: SAVE THE COMPANY',
    subtitle: 'Implement AI before 5:00 PM or face a $1 buyout!',
    start_prompt: 'PRESS [SPACE] TO START THE LOOP',
    lang_select: 'LANGUAGE / IDIOMA:',

    // Rooms
    room_cto: '1. CTO OFFICE',
    room_dev: '2. DEV BAY',
    room_server: '3. SERVER ROOM',
    room_boardroom: '4. BOARDROOM',

    // HUD
    hud_loop: 'LOOP #',
    hud_time: 'TIME:',
    hud_adoption: 'AI ADOPTION:',
    hud_prod: 'PROD:',
    hud_val: 'VAL:',

    // Doors & Keys
    door1_name: 'DEV BAY DOOR',
    door2_name: 'SERVER ROOM DOOR',
    door3_name: 'BOARDROOM DOOR',

    // Interaction Prompts
    prompt_whiteboard: '[E] AI Strategy Roadmap Quiz',
    prompt_cto_laptop: '[E] Code Audit Quiz',
    prompt_door1: '[E] Unlock Dev Bay Door',
    prompt_dev_team: '[E] Train Devs on AI Copilot',
    prompt_coffee: '[E] Grab Coffee (Speed Boost)',
    prompt_door2: '[E] Unlock Server Room Door',
    prompt_server_engineer: '[E] Deploy AI GPU Cluster',
    prompt_door3: '[E] Unlock Boardroom Door',
    prompt_boardroom_ceo: '[E] Pitch AI ROI to CEO',

    // Notifications & Hints
    already_completed: 'Already completed this task!',
    prereq_whiteboard: 'Plan AI Roadmap on Whiteboard first!',
    prereq_dev_team: 'Train Devs on AI Copilot first!',
    prereq_boardroom: 'CEO wants >= 75% AI Adoption before pitch!',
    door_already_unlocked: 'Door is already unlocked!',
    door1_hint: 'Complete Strategy Roadmap on Whiteboard first!',
    door2_hint: 'Complete Dev Team AI Copilot training first!',
    door3_hint: 'Deploy AI Cluster in Server Room first!',
    unlocked_msg: 'UNLOCKED!',
    access_denied: 'ACCESS DENIED!',
    coffee_boost: 'Espresso Power! ⚡ Speed Boost',

    notif_whiteboard: '✨ DEV BAY KEYCARD OBTAINED!\n+15% AI Adoption, +10% Prod',
    notif_cto_laptop: '✨ Code Audit Complete!\n+15% Productivity, +$500k Val',
    notif_dev_team: '✨ SERVER ROOM CLEARANCE OBTAINED!\n+30% Adoption, +25% Prod',
    notif_server_engineer: '✨ BOARDROOM PASS OBTAINED!\n+30% Adoption, +$3.0M Val',
    notif_boardroom_ceo: '🎉 CEO APPROVED PITCH!\n100% AI ADOPTION ACHIEVED!',

    // Quizzes
    quiz_whiteboard_title: '📋 WHITEBOARD: AI STRATEGY ROADMAP',
    quiz_whiteboard_q: 'How should we handle legacy monolith migration to AI microservices?',
    quiz_whiteboard_o1: '1) Implement RAG pipeline & auto-generate CI/CD tests',
    quiz_whiteboard_f1: 'Correct! RAG pipeline accelerates legacy transition!',
    quiz_whiteboard_o2: '2) Rewrite 500k lines of code manually in Assembly',
    quiz_whiteboard_f2: 'Failed! Manual rewrite caused huge project delay (+30m).',
    quiz_whiteboard_o3: '3) Ignore legacy systems and hope AI solves it by magic',
    quiz_whiteboard_f3: 'Failed! Systems crashed without maintenance (+45m).',

    quiz_laptop_title: '💻 CTO LAPTOP: CODE REPOSITORY AUDIT',
    quiz_laptop_q: 'Which model architecture is safest for on-premise code synthesis?',
    quiz_laptop_o1: '1) Send all proprietary source code to unvetted public cloud API',
    quiz_laptop_f1: 'Failed! Data leak triggered corporate security alarm! (-$1.0M)',
    quiz_laptop_o2: '2) Fine-tuned 14B parameter Code-LLM hosted on local GPUs',
    quiz_laptop_f2: 'Correct! High performance with total data privacy!',
    quiz_laptop_o3: '3) Use a random regex script from Stack Overflow',
    quiz_laptop_f3: 'Failed! Script caused syntax errors across repos (+25m).',

    quiz_dev_title: '👩‍💻 DEV BAY: AI COPILOT ONBOARDING',
    quiz_dev_q: 'Devs fear AI code hallucinations. How do you ensure code quality?',
    quiz_dev_o1: '1) Tell devs to accept all AI suggestions without checking',
    quiz_dev_f1: 'Failed! Blind trust produced critical bugs (+30m, -15% prod).',
    quiz_dev_o2: '2) Mandatory automated unit testing & Human-in-the-Loop review',
    quiz_dev_f2: 'Correct! Devs gain 2x speed with zero quality loss!',
    quiz_dev_o3: '3) Ban AI completely and force devs to use punch cards',
    quiz_dev_f3: 'Failed! Developers threatened to quit (+30m, -20% prod).',

    quiz_server_title: '🖥️ SERVER ROOM: AI CLUSTER DEPLOYMENT',
    quiz_server_q: 'The GPU cluster overheats during fine-tuning. How do you resolve it?',
    quiz_server_o1: '1) Pour iced coffee directly onto GPU PCIe slots',
    quiz_server_f1: 'Failed! Hardware fried by iced coffee! (-$500k)',
    quiz_server_o2: '2) Optimize batch size, FP16 precision & liquid cooling loops',
    quiz_server_f2: 'Correct! Maximum TFLOPS achieved at optimal thermals!',
    quiz_server_o3: '3) Turn off server fans to make the room quiet',
    quiz_server_f3: 'Failed! Server rack melted and shut down (+35m).',

    quiz_board_title: '📊 BOARDROOM: CEO PITCH',
    quiz_board_q: 'The CEO asks: "How does AI guarantee our market leadership?"',
    quiz_board_o1: '1) "AI boosts productivity by 3x & delivers customized solutions."',
    quiz_board_f1: 'Success! Board approves full AI transformation!',
    quiz_board_o2: '2) "We will replace all humans with a basic chatbot."',
    quiz_board_f2: 'Failed! Share price plunged on bad PR (-$2.0M).',
    quiz_board_o3: '3) "AI is just a buzzword, let\'s stick to fax machines."',
    quiz_board_f3: 'Failed! CEO lost confidence in your vision (+30m).',

    // Game Over
    game_over_title: '5:00 PM - WORKDAY OVER!',
    game_over_adoption: 'AI ADOPTION ACHIEVED: {adoption}% / 100%',
    game_over_box_title: '💸 BUYOUT EXECUTED 💸',
    game_over_desc: 'An AI Megacorp has acquired your company\nfor $1.00 USD. You are ruined.',
    game_over_restart: 'PRESS [R] TO RESTART TIME LOOP (LOOP #{loop})',

    // Victory
    victory_title: '🎉 COMPANY SAVED! 🎉',
    victory_subtitle: 'YOU BROUGHT AI ADOPTION TO 100%!',
    victory_val: 'COMPANY VALUATION: ${val} MILLION',
    victory_desc: 'You broke the time loop in {loop} {loops_word}!\nYour software firm is now an AI-powered market leader.',
    victory_loop_single: 'loop',
    victory_loop_plural: 'loops',
    victory_restart: 'PRESS [R] TO PLAY AGAIN'
  },

  es: {
    // Boot
    title: 'CTO: SAVE THE COMPANY',
    subtitle: '¡Implementa IA antes de las 5:00 PM o te comprarán por $1!',
    start_prompt: 'PULSA [ESPACIO] PARA INICIAR EL BUCLE',
    lang_select: 'IDIOMA / LANGUAGE:',

    // Rooms
    room_cto: '1. DESPACHO CTO',
    room_dev: '2. ÁREA DE DEVS',
    room_server: '3. SERVIDORES',
    room_boardroom: '4. SALA DE JUNTAS',

    // HUD
    hud_loop: 'BUCLE #',
    hud_time: 'HORA:',
    hud_adoption: 'ADOPCIÓN IA:',
    hud_prod: 'PROD:',
    hud_val: 'VAL:',

    // Doors & Keys
    door1_name: 'PUERTA ÁREA DEVS',
    door2_name: 'PUERTA SERVIDORES',
    door3_name: 'PUERTA SALA JUNTAS',

    // Interaction Prompts
    prompt_whiteboard: '[E] Cuestionario Estrategia IA',
    prompt_cto_laptop: '[E] Cuestionario Auditoría Código',
    prompt_door1: '[E] Abrir Puerta Área Devs',
    prompt_dev_team: '[E] Formar Devs en AI Copilot',
    prompt_coffee: '[E] Tomar Café (+Velocidad)',
    prompt_door2: '[E] Abrir Puerta Servidores',
    prompt_server_engineer: '[E] Desplegar Clúster GPU',
    prompt_door3: '[E] Abrir Puerta Sala Juntas',
    prompt_boardroom_ceo: '[E] Presentar ROI de IA al CEO',

    // Notifications & Hints
    already_completed: '¡Tarea ya completada!',
    prereq_whiteboard: '¡Diseña la hoja de ruta en la pizarra primero!',
    prereq_dev_team: '¡Capacita a los desarrolladores primero!',
    prereq_boardroom: '¡El CEO exige >= 75% de adopción de IA!',
    door_already_unlocked: '¡La puerta ya está abierta!',
    door1_hint: '¡Completa la hoja de ruta en la pizarra primero!',
    door2_hint: '¡Completa la formación del equipo dev primero!',
    door3_hint: '¡Despliega el clúster en la sala de servidores primero!',
    unlocked_msg: '¡DESBLOQUEADA!',
    access_denied: '¡ACCESO DENEGADO!',
    coffee_boost: '¡Chute de Expreso! ⚡ Más Velocidad',

    notif_whiteboard: '✨ ¡TARJETA ÁREA DEVS OBTENIDA!\n+15% Adopción IA, +10% Prod',
    notif_cto_laptop: '✨ ¡Auditoría de Código Completa!\n+15% Productividad, +$500k Val',
    notif_dev_team: '✨ ¡PASE A SERVIDORES OBTENIDO!\n+30% Adopción, +25% Prod',
    notif_server_engineer: '✨ ¡PASE A SALA DE JUNTAS OBTENIDO!\n+30% Adopción, +$3.0M Val',
    notif_boardroom_ceo: '🎉 ¡EL CEO APROBÓ LA PROPUESTA!\n¡100% ADOPCIÓN DE IA LOGRADA!',

    // Quizzes
    quiz_whiteboard_title: '📋 PIZARRA: HOJA DE RUTA ESTRATEGIA IA',
    quiz_whiteboard_q: '¿Cómo afrontar la migración de un monolito heredado a microservicios con IA?',
    quiz_whiteboard_o1: '1) Implementar pipeline RAG y autogenerar tests de CI/CD',
    quiz_whiteboard_f1: '¡Correcto! El pipeline RAG acelera la transición heredada.',
    quiz_whiteboard_o2: '2) Reescribir 500k líneas de código a mano en Ensamblador',
    quiz_whiteboard_f2: '¡Error! La reescritura manual retrasó enormemente el proyecto (+30m).',
    quiz_whiteboard_o3: '3) Ignorar sistemas heredados y esperar que la IA lo resuelva por magia',
    quiz_whiteboard_f3: '¡Error! Los sistemas cayeron por falta de mantenimiento (+45m).',

    quiz_laptop_title: '💻 PORTÁTIL CTO: AUDITORÍA DE CÓDIGO',
    quiz_laptop_q: '¿Qué arquitectura de modelos es más segura para síntesis de código local?',
    quiz_laptop_o1: '1) Enviar todo el código fuente privado a una API pública sin auditar',
    quiz_laptop_f1: '¡Error! La fuga de datos disparó la alarma de seguridad (-$1.0M).',
    quiz_laptop_o2: '2) LLM de código de 14B parámetros ajustado y alojado en GPUs locales',
    quiz_laptop_f2: '¡Correcto! Alto rendimiento con total privacidad de datos.',
    quiz_laptop_o3: '3) Usar un script regex aleatorio copiado de Stack Overflow',
    quiz_laptop_f3: '¡Error! El script causó errores de sintaxis masivos (+25m).',

    quiz_dev_title: '👩‍💻 ÁREA DEVS: INTEGRACIÓN DE AI COPILOT',
    quiz_dev_q: 'Los devs temen las alucinaciones de código de la IA. ¿Cómo asegurar la calidad?',
    quiz_dev_o1: '1) Decir a los devs que acepten todas las sugerencias de IA sin revisar',
    quiz_dev_f1: '¡Error! La confianza ciega generó bugs críticos (+30m, -15% prod).',
    quiz_dev_o2: '2) Pruebas unitarias automáticas obligatorias y revisión humana',
    quiz_dev_f2: '¡Correcto! Los devs duplican su velocidad sin perder calidad.',
    quiz_dev_o3: '3) Prohibir la IA por completo y obligar a usar tarjetas perforadas',
    quiz_dev_f3: '¡Error! Los desarrolladores amenazaron con dimitir (+30m, -20% prod).',

    quiz_server_title: '🖥️ SERVIDORES: DESPLIEGUE DEL CLÚSTER IA',
    quiz_server_q: 'El clúster de GPUs se sobrecalienta durante el entrenamiento. ¿Cómo resolverlo?',
    quiz_server_o1: '1) Verter café con hielo directamente sobre las ranuras PCIe',
    quiz_server_f1: '¡Error! ¡El hardware se frió por culpa del café! (-$500k)',
    quiz_server_o2: '2) Optimizar tamaño de batch, precisión FP16 y refrigeración líquida',
    quiz_server_f2: '¡Correcto! Máximos TFLOPS alcanzados con térmica óptima.',
    quiz_server_o3: '3) Apagar los ventiladores para que la sala esté en silencio',
    quiz_server_f3: '¡Error! El rack de servidores se derritió y se apagó (+35m).',

    quiz_board_title: '📊 SALA DE JUNTAS: PRESENTACIÓN AL CEO',
    quiz_board_q: 'El CEO pregunta: "¿Cómo garantiza la IA nuestro liderazgo de mercado?"',
    quiz_board_o1: '1) "La IA triplica la productividad y ofrece soluciones a medida."',
    quiz_board_f1: '¡Éxito! ¡El consejo aprueba la transformación digital completa!',
    quiz_board_o2: '2) "Reemplazaremos a todos los humanos con un chatbot básico."',
    quiz_board_f2: '¡Error! Las acciones cayeron por mala reputación (-$2.0M).',
    quiz_board_o3: '3) "La IA es solo una moda, sigamos usando máquinas de fax."',
    quiz_board_f3: '¡Error! El CEO perdió la confianza en tu visión (+30m).',

    // Game Over
    game_over_title: '5:00 PM - ¡FIN DE LA JORNADA!',
    game_over_adoption: 'ADOPCIÓN DE IA LOGRADA: {adoption}% / 100%',
    game_over_box_title: '💸 ADQUISICIÓN EJECUTADA 💸',
    game_over_desc: 'Una Megacorp de IA ha comprado la empresa\npor $1.00 USD. Estás arruinado.',
    game_over_restart: 'PULSA [R] PARA REINICIAR EL BUCLE (BUCLE #{loop})',

    // Victory
    victory_title: '🎉 ¡EMPRESA SALVADA! 🎉',
    victory_subtitle: '¡HAS LLEVADO LA ADOPCIÓN DE IA AL 100%!',
    victory_val: 'VALORACIÓN DE LA EMPRESA: ${val} MILLONES',
    victory_desc: '¡Rompiste el bucle temporal en {loop} {loops_word}!\nTu empresa es ahora líder de mercado impulsada por IA.',
    victory_loop_single: 'bucle',
    victory_loop_plural: 'bucles',
    victory_restart: 'PULSA [R] PARA JUGAR DE NUEVO'
  },

  ca: {
    // Boot
    title: 'CTO: SAVE THE COMPANY',
    subtitle: '¡Implementa IA abans de les 5:00 PM o et compraran per $1!',
    start_prompt: 'PREM [ESPAI] PER INICIAR EL BUCLE',
    lang_select: 'IDIOMA / LANGUAGE:',

    // Rooms
    room_cto: '1. DESPATX CTO',
    room_dev: '2. ÀREA DE DEVS',
    room_server: '3. SALA DE SERVIDORS',
    room_boardroom: '4. SALA DE REUNIONS',

    // HUD
    hud_loop: 'BUCLE #',
    hud_time: 'HORA:',
    hud_adoption: 'ADOPCIÓ IA:',
    hud_prod: 'PROD:',
    hud_val: 'VAL:',

    // Doors & Keys
    door1_name: 'PORTA ÀREA DEVS',
    door2_name: 'PORTA SERVIDORS',
    door3_name: 'PORTA SALA REUNIONS',

    // Interaction Prompts
    prompt_whiteboard: '[E] Qüestionari Estratègia IA',
    prompt_cto_laptop: '[E] Qüestionari Auditoria Codi',
    prompt_door1: '[E] Obrir Porta Àrea Devs',
    prompt_dev_team: '[E] Formar Devs en AI Copilot',
    prompt_coffee: '[E] Prendre Cafè (+Velocitat)',
    prompt_door2: '[E] Obrir Porta Servidors',
    prompt_server_engineer: '[E] Desplegar Clúster GPU',
    prompt_door3: '[E] Obrir Porta Sala Reunions',
    prompt_boardroom_ceo: '[E] Presentar ROI d\'IA al CEO',

    // Notifications & Hints
    already_completed: '¡Tasca ja completada!',
    prereq_whiteboard: '¡Dissenya el full de ruta a la pissarra primer!',
    prereq_dev_team: '¡Capacita els desenvolupadors primer!',
    prereq_boardroom: '¡El CEO exigeix >= 75% d\'adopció d\'IA!',
    door_already_unlocked: '¡La porta ja està oberta!',
    door1_hint: '¡Completa el full de ruta a la pissarra primer!',
    door2_hint: '¡Completa la formació de l\'equip dev primer!',
    door3_hint: '¡Desplega el clúster a la sala de servidors primer!',
    unlocked_msg: '¡DESBLOCADA!',
    access_denied: '¡ACCÉS DENEGAT!',
    coffee_boost: '¡Cafè Express! ⚡ Més Velocitat',

    notif_whiteboard: '✨ ¡TARGETA ÀREA DEVS OBTENGUDA!\n+15% Adopció IA, +10% Prod',
    notif_cto_laptop: '✨ ¡Auditoria de Codi Completa!\n+15% Productivitat, +$500k Val',
    notif_dev_team: '✨ ¡PASS A SERVIDORS OBTENGUT!\n+30% Adopció, +25% Prod',
    notif_server_engineer: '✨ ¡PASS A SALA DE REUNIONS OBTENGUT!\n+30% Adopció, +$3.0M Val',
    notif_boardroom_ceo: '🎉 ¡EL CEO HA APROBAT LA PROPOSTA!\n¡100% ADOPCIÓ D\'IA ACONSEGUIDA!',

    // Quizzes
    quiz_whiteboard_title: '📋 PISSARRA: FULL DE RUTA ESTRATÈGIA IA',
    quiz_whiteboard_q: 'Com afrontar la migració d\'un monòlit a microserveis amb IA?',
    quiz_whiteboard_o1: '1) Implementar pipeline RAG i autogenerar tests de CI/CD',
    quiz_whiteboard_f1: '¡Correcte! El pipeline RAG accelera la transició.',
    quiz_whiteboard_o2: '2) Reesriure 500k línies de codi a mà en Ensamblador',
    quiz_whiteboard_f2: '¡Error! La reescriptura manual ha intretardat el projecte (+30m).',
    quiz_whiteboard_o3: '3) Ignorar sistemes antics i esperar que la IA ho resolgui per màgia',
    quiz_whiteboard_f3: '¡Error! Els sistemes han caigut per falta de manteniment (+45m).',

    quiz_laptop_title: '💻 PORTÀTIL CTO: AUDITORIA DE CODI',
    quiz_laptop_q: 'Quina arquitectura de models és més segura per a síntesi de codi local?',
    quiz_laptop_o1: '1) Enviar tot el codi font privat a una API pública sense auditar',
    quiz_laptop_f1: '¡Error! La fuga de dades ha disparat l\'alarma de seguretat (-$1.0M).',
    quiz_laptop_o2: '2) LLM de codi de 14B paràmetres ajustat i allotjat en GPUs locals',
    quiz_laptop_f2: '¡Correcte! Alt rendiment amb total privacitat de dades.',
    quiz_laptop_o3: '3) Utilitzar un script regex aleatori de Stack Overflow',
    quiz_laptop_f3: '¡Error! L\'script ha causat errors de sintaxi massius (+25m).',

    quiz_dev_title: '👩‍💻 ÀREA DEVS: INTEGRACIÓ D\'AI COPILOT',
    quiz_dev_q: 'Els devs temen les al·lucinacions de codi de la IA. Com assegurar la qualitat?',
    quiz_dev_o1: '1) Dir als devs que acceptin totes les suggerències d\'IA sense revisar',
    quiz_dev_f1: '¡Error! La confiança meua ha generat bugs crítics (+30m, -15% prod).',
    quiz_dev_o2: '2) Proves unitàries automàtiques obligatòries i revisió humana',
    quiz_dev_f2: '¡Correcte! Els devs dupliquen la velocitat sense perdre qualitat.',
    quiz_dev_o3: '3) Prohibir la IA completament i obligar a utilitzar targetes perforades',
    quiz_dev_f3: '¡Error! Els desenvolupadors han amenaçat amb dimitir (+30m, -20% prod).',

    quiz_server_title: '🖥️ SERVIDORS: DESPLEGAMENT DEL CLÚSTER IA',
    quiz_server_q: 'El clúster de GPUs es sobreescalfa durant l\'entrenament. Com resoldre-ho?',
    quiz_server_o1: '1) Vocar cafè amb gel directament sobre les ranures PCIe',
    quiz_server_f1: '¡Error! ¡El maquinari s\'ha fregit pel cafè! (-$500k)',
    quiz_server_o2: '2) Optimitzar mida de batch, precisió FP16 i refrigeració líquida',
    quiz_server_f2: '¡Correcte! Màxims TFLOPS aconseguits amb tèrmica òptima.',
    quiz_server_o3: '3) Apagar els ventiladors perquè la sala estigui en silenci',
    quiz_server_f3: '¡Error! El bastidor de servidors s\'ha tret i apagat (+35m).',

    quiz_board_title: '📊 SALA DE REUNIONS: PRESENTACIÓ AL CEO',
    quiz_board_q: 'El CEO pregunta: "Com garanteix la IA el nostre lideratge de mercat?"',
    quiz_board_o1: '1) "La IA triplica la productivitat i ofereix solucions a mida."',
    quiz_board_f1: '¡Èxit! ¡El consell aprova la transformació digital completa!',
    quiz_board_o2: '2) "Substituirem tots els humans amb un chatbot bàsic."',
    quiz_board_f2: '¡Error! Les accions han caigut per mala reputació (-$2.0M).',
    quiz_board_o3: '3) "La IA és només una moda, seguim utilitzant faxos."',
    quiz_board_f3: '¡Error! El CEO ha perdut la confiança en la teva visió (+30m).',

    // Game Over
    game_over_title: '5:00 PM - ¡FINAL DE LA JORNADA!',
    game_over_adoption: 'ADOPCIÓ D\'IA ACONSEGUIDA: {adoption}% / 100%',
    game_over_box_title: '💸 ADQUISICIÓ EJECUTADA 💸',
    game_over_desc: 'Una Megacorp d\'IA ha comprat l\'empresa\nper $1.00 USD. Estàs arruïnat.',
    game_over_restart: 'PREM [R] PER REINICIAR EL BUCLE (BUCLE #{loop})',

    // Victory
    victory_title: '🎉 ¡EMPRESA SALVADA! 🎉',
    victory_subtitle: '¡HAS PORTAT L\'ADOPCIÓ D\'IA AL 100%!',
    victory_val: 'VALORACIÓ DE L\'EMPRESA: ${val} MILIONS',
    victory_desc: '¡Vas trencar el bucle temporal en {loop} {loops_word}!\nLa teva empresa és ara líder de mercat impulsada per IA.',
    victory_loop_single: 'bucle',
    victory_loop_plural: 'bucles',
    victory_restart: 'PREM [R] PER JUGAR DE NOU'
  },

  eu: {
    // Boot
    title: 'CTO: SAVE THE COMPANY',
    subtitle: 'Inplementatu AI 17:00ak baino lehen edo $1gatik erosiko zaituzte!',
    start_prompt: 'SAKATU [SPAZIOA] BUKLEA HASTEKO',
    lang_select: 'HIZKUNTZA / LANGUAGE:',

    // Rooms
    room_cto: '1. CTO BULEGOA',
    room_dev: '2. GARATZAILE AROA',
    room_server: '3. ZERBITZARI GELA',
    room_boardroom: '4. BAZKIDEEN GELA',

    // HUD
    hud_loop: 'BUKLEA #',
    hud_time: 'ORDUA:',
    hud_adoption: 'IA ADOPZIOA:',
    hud_prod: 'PROD:',
    hud_val: 'BAL:',

    // Doors & Keys
    door1_name: 'GARATZAILE ATEA',
    door2_name: 'ZERBITZARI ATEA',
    door3_name: 'BAZKIDEEN ATEA',

    // Interaction Prompts
    prompt_whiteboard: '[E] IA Estrategia Galdetegia',
    prompt_cto_laptop: '[E] Kode Ikuskaritza Galdetegia',
    prompt_door1: '[E] Ireki Garatzaile Atea',
    prompt_dev_team: '[E] Garatzaileak Formatu AI Copilot-en',
    prompt_coffee: '[E] Hartu Kafea (+Abiadura)',
    prompt_door2: '[E] Ireki Zerbitzari Atea',
    prompt_server_engineer: '[E] Inplementatu GPU Klusterra',
    prompt_door3: '[E] Ireki Bazkideen Atea',
    prompt_boardroom_ceo: '[E] Aurkeztu IA ROI-a CEOari',

    // Notifications & Hints
    already_completed: 'Ataza hau eginda dago jada!',
    prereq_whiteboard: 'Diseinatu bide-orria arbeilean lehenik!',
    prereq_dev_team: 'Formatu garatzaileak lehenik!',
    prereq_boardroom: 'CEOak >= %75 AI inplementazioa nahi du!',
    door_already_unlocked: 'Atea zabalik dago jada!',
    door1_hint: 'Osatu estrategiako bide-orria arbeilean lehenik!',
    door2_hint: 'Osatu garatzaileen prestakuntza lehenik!',
    door3_hint: 'Inplementatu AI Klusterra zerbitzari gelan lehenik!',
    unlocked_msg: 'DESBLOKEATUTA!',
    access_denied: 'SARRERA DEBEKATUA!',
    coffee_boost: 'Espresso Indarra! ⚡ Lasterrago',

    notif_whiteboard: '✨ GARATZAILE AROKO TXARTELA LORTUTA!\n+%15 IA Adopzioa, +%10 Prod',
    notif_cto_laptop: '✨ Kode Ikuskaritza Eginda!\n+%15 Produktibitatea, +$500k Bal',
    notif_dev_team: '✨ ZERBITZARI GELAKO LEKUA LORTUTA!\n+%30 Adopzioa, +%25 Prod',
    notif_server_engineer: '✨ BAZKIDEEN GELAKO TXARTELA LORTUTA!\n+%30 Adopzioa, +$3.0M Bal',
    notif_boardroom_ceo: '🎉 CEOAK PROPOSAMENA ONARTU DU!\n%100 IA ADOPZIOA LORTUTA!',

    // Quizzes
    quiz_whiteboard_title: '📋 ARBEILA: IA ESTRATEGIA BIDE-ORRIA',
    quiz_whiteboard_q: 'Nola kudeatu monolito zaharraren migrazioa AI mikrozerbitzuetara?',
    quiz_whiteboard_o1: '1) Inplementatu RAG kanala eta CI/CD testak autogeneratu',
    quiz_whiteboard_f1: 'Zuzena! RAG kanalak migrazioa azkartzen du!',
    quiz_whiteboard_o2: '2) Berriz idatzi 500k kode lerro eskuz Assembler-en',
    quiz_whiteboard_f2: 'Okerra! Eskuz berriz idazteak egitasmoa atzeratu du (+30m).',
    quiz_whiteboard_o3: '3) Ez ikusi egin zaharrei eta utzi IAri magiaz konpontzen',
    quiz_whiteboard_f3: 'Okerra! Sistemak erori dira mantentze eza dela eta (+45m).',

    quiz_laptop_title: '💻 CTO PORTATILA: KODE IKUSKARITZA',
    quiz_laptop_q: 'Zein eredu arkitektura da seguruena tokiko kodea sortzeko?',
    quiz_laptop_o1: '1) Bidali iturburu-kode guztiak cloud API publiko bati',
    quiz_laptop_f1: 'Okerra! Datu-ihustuketak segurtasun alertea piztu du (-$1.0M).',
    quiz_laptop_o2: '2) Tokiko GPUetan ostotutako 14B parametrodun Code-LLM',
    quiz_laptop_f2: 'Zuzena! Errendimendu handia datuen pribatutasun osoarekin!',
    quiz_laptop_o3: '3) Erabili Stack Overflow-ko ausazko regex script bat',
    quiz_laptop_f3: 'Okerra! Scriptak sintaxi akats masiboak eragin ditu (+25m).',

    quiz_dev_title: '👩‍💻 GARATZAILE AROA: AI COPILOT HASIERA',
    quiz_dev_q: 'Garatzaileek IAk kode haluzinazioak izateko beldurra dute. Nola bermatuko dugu kalitatea?',
    quiz_dev_o1: '1) Esan garatzaileei IAren iradokizun guztiak berrikusi gabe onartzeko',
    quiz_dev_f1: 'Okerra! Itsu konfiantzak akats kritikoak sortu ditu (+30m, -%15 prod).',
    quiz_dev_o2: '2) Nahitaezko unitate-test automatizatuak eta giza berrikuspena',
    quiz_dev_f2: 'Zuzena! Garatzaileek abiadura bikoizten dute kalitatea galdu gabe!',
    quiz_dev_o3: '3) Erabat debekatu IA eta behartu txartel zulatuak erabiltzera',
    quiz_dev_f3: 'Okerra! Garatzaileek dimisioa emateko mehatxua egin dute (+30m, -%20 prod).',

    quiz_server_title: '🖥️ ZERBITZARIAK: AI KLUSTER INPLEMENTAZIOA',
    quiz_server_q: 'GPU klusterra berotzen ari da entrenamenduan. Nola konpondu?',
    quiz_server_o1: '1) Bota kafe izoztua zuzenean GPU PCIe zirrikituetara',
    quiz_server_f1: 'Okerra! Hardwarea erre egin da kafeagatik! (-$500k)',
    quiz_server_o2: '2) Optimizatu batch tamaina, FP16 doitasuna eta hozte likidoa',
    quiz_server_f2: 'Zuzena! TFLOPS handienak lortu dira tenperatura egokian!',
    quiz_server_o3: '3) Itzali zerbitzariko haizagailuak gela vaikzean egon dadin',
    quiz_server_f3: 'Okerra! Zerbitzariak urtu eta itzali egin dira (+35m).',

    quiz_board_title: '📊 BAZKIDEEN GELA: CEO TRATUA',
    quiz_board_q: 'CEOak galdetu du: "Nola bermatzen du IAk gure merkatuko lidergoa?"',
    quiz_board_o1: '1) "IAk produktibitatea x3 handitzen du eta neurriko irtenbideak eskaintzen ditu."',
    quiz_board_f1: 'Arrakasta! Zuzendaritzak eraldaketa digital osoa onartu du!',
    quiz_board_o2: '2) "Gizaki guztiak chatbot oinarrizko batekin ordezkatuko ditugu."',
    quiz_board_f2: 'Okerra! Akzioak erori egin dira ospe txarragatik (-$2.0M).',
    quiz_board_o3: '3) "IA moda bat besterik ez da, jarrai dezagun fax makinekin."',
    quiz_board_f3: 'Okerra! CEOak konfiantza galdu du zure ikuspegian (+30m).',

    // Game Over
    game_over_title: '17:00 - LANALDIA AMAITU DA!',
    game_over_adoption: 'LORTUTAKO IA ADOPZIOA: %{adoption} / %100',
    game_over_box_title: '💸 EROSKETA EGIN DA 💸',
    game_over_desc: 'IA Megakorporazio batek enpresa erosi du\n$1.00 USD truke. Arruinatuta zaude.',
    game_over_restart: 'SAKATU [R] BUKLEA BERRIRO HASTEKO (BUKLEA #{loop})',

    // Victory
    victory_title: '🎉 ENPRESA SALBATUTA! 🎉',
    victory_subtitle: 'IA ADOPZIOA %100ERA ERAMAN DUZU!',
    victory_val: 'ENPRESAREN BALORAZIOA: ${val} MILIOI',
    victory_desc: 'Denbora-buklea hautsi duzu {loop} {loops_word}tan!\nZure software enpresa merkatuko liderra da orain AIari esker.',
    victory_loop_single: 'buklean',
    victory_loop_plural: 'bukletan',
    victory_restart: 'SAKATU [R] BERRIRO JOLASTEKO'
  },

  gl: {
    // Boot
    title: 'CTO: SAVE THE COMPANY',
    subtitle: '¡Implementa IA antes das 5:00 PM ou xortaránte por $1!',
    start_prompt: 'PREME [ESPAZO] PARA INICIAR O BUCLE',
    lang_select: 'IDIOMA / LANGUAGE:',

    // Rooms
    room_cto: '1. DESPACHO CTO',
    room_dev: '2. ÁREA DE DEVS',
    room_server: '3. SALA DE SERVIDORES',
    room_boardroom: '4. SALA DE XUNTAS',

    // HUD
    hud_loop: 'BUCLE #',
    hud_time: 'HORA:',
    hud_adoption: 'ADOPCIÓN IA:',
    hud_prod: 'PROD:',
    hud_val: 'VAL:',

    // Doors & Keys
    door1_name: 'PORTA ÁREA DEVS',
    door2_name: 'PORTA SERVIDORES',
    door3_name: 'PORTA SALA XUNTAS',

    // Interaction Prompts
    prompt_whiteboard: '[E] Cuestionario Estratexia IA',
    prompt_cto_laptop: '[E] Cuestionario Auditoría Código',
    prompt_door1: '[E] Abrir Porta Área Devs',
    prompt_dev_team: '[E] Formar Devs en AI Copilot',
    prompt_coffee: '[E] Tomar Café (+Velocidade)',
    prompt_door2: '[E] Abrir Porta Servidores',
    prompt_server_engineer: '[E] Despregar Clúster GPU',
    prompt_door3: '[E] Abrir Porta Sala Xuntas',
    prompt_boardroom_ceo: '[E] Presentar ROI de IA ao CEO',

    // Notifications & Hints
    already_completed: '¡Tasca xa completada!',
    prereq_whiteboard: '¡Deseña a folla de ruta na pisarra primeiro!',
    prereq_dev_team: '¡Capacita os desenvolvedores primeiro!',
    prereq_boardroom: '¡O CEO esixe >= 75% de adopción de IA!',
    door_already_unlocked: '¡A porta xa está aberta!',
    door1_hint: '¡Completa a folla de ruta na pisarra primeiro!',
    door2_hint: '¡Completa a formación do equipo dev primeiro!',
    door3_hint: '¡Desprega o clúster na sala de servidores primeiro!',
    unlocked_msg: '¡DESBLOQUEADA!',
    access_denied: '¡ACCESO DENEGADO!',
    coffee_boost: '¡Chute de Café! ⚡ Máis Velocidade',

    notif_whiteboard: '✨ ¡TARXETA ÁREA DEVS OBTIDA!\n+15% Adopción IA, +10% Prod',
    notif_cto_laptop: '✨ ¡Auditoría de Código Completa!\n+15% Productividade, +$500k Val',
    notif_dev_team: '✨ ¡PASE A SERVIDORES OBTIDO!\n+30% Adopción, +25% Prod',
    notif_server_engineer: '✨ ¡PASE A SALA DE XUNTAS OBTIDO!\n+30% Adopción, +$3.0M Val',
    notif_boardroom_ceo: '🎉 ¡O CEO APROBOU A PROPOSTA!\n100% ADOPCIÓN DE IA CONSEGUIDA!',

    // Quizzes
    quiz_whiteboard_title: '📋 PISARRA: FOLLA DE RUTA ESTRATEXIA IA',
    quiz_whiteboard_q: 'Como afrontar a migración dun monólito a microservizos con IA?',
    quiz_whiteboard_o1: '1) Implementar pipeline RAG e autoxerar tests de CI/CD',
    quiz_whiteboard_f1: '¡Correcto! O pipeline RAG acelera a transición.',
    quiz_whiteboard_o2: '2) Reescribir 500k liñas de código a man en Ensamblador',
    quiz_whiteboard_f2: '¡Erro! A reescritura manual atrasou enormemente o proxecto (+30m).',
    quiz_whiteboard_o3: '3) Ignorar sistemas antigos e agardar que a IA o solucione por maxia',
    quiz_whiteboard_f3: '¡Erro! Os sistemas caeron por falta de mantemento (+45m).',

    quiz_laptop_title: '💻 PORTÁTIL CTO: AUDITORÍA DE CÓDIGO',
    quiz_laptop_q: 'Que arquitectura de modelos é máis segura para síntese de código local?',
    quiz_laptop_o1: '1) Enviar todo o código fonte privado a unha API pública sen auditar',
    quiz_laptop_f1: '¡Erro! A fuga de datos disparou a alarma de seguridade (-$1.0M).',
    quiz_laptop_o2: '2) LLM de código de 14B parámetros axustado en GPUs locais',
    quiz_laptop_f2: '¡Correcto! Alto rendemento con total privacidade de datos.',
    quiz_laptop_o3: '3) Usar un script regex aleatorio copiado de Stack Overflow',
    quiz_laptop_f3: '¡Erro! O script causou erros de sintaxe masivos (+25m).',

    quiz_dev_title: '👩‍💻 ÁREA DEVS: INTEGRACIÓN DE AI COPILOT',
    quiz_dev_q: 'Os devs temen as alucinacións de código da IA. Como asegurar a calidade?',
    quiz_dev_o1: '1) Dicir aos devs que acepten todas as suxestións de IA sen revisar',
    quiz_dev_f1: '¡Erro! A confianza cega xerou bugs críticos (+30m, -15% prod).',
    quiz_dev_o2: '2) Probas unitarias automáticas obrigatorias e revisión humana',
    quiz_dev_f2: '¡Correcto! Os devs duplican a velocidade sen perder calidade.',
    quiz_dev_o3: '3) Prohibir a IA por completo e obrigar a usar tarxetas perforadas',
    quiz_dev_f3: '¡Erro! Os desenvolvedores ameazaron con dimitir (+30m, -20% prod).',

    quiz_server_title: '🖥️ SERVIDORES: DESPREGAMENTO DO CLÚSTER IA',
    quiz_server_q: 'O clúster de GPUs quéntase moito durante o adestramento. Como resolvelo?',
    quiz_server_o1: '1) Botar café con xeo directamente sobre as rañuras PCIe',
    quiz_server_f1: '¡Erro! ¡O hardware friuse polo café! (-$500k)',
    quiz_server_o2: '2) Optimizar tamaño de batch, precisión FP16 e refrixeración líquida',
    quiz_server_f2: '¡Correcto! Máximos TFLOPS acadados con térmica óptima.',
    quiz_server_o3: '3) Apagar os ventiladores para que a sala estea en silencio',
    quiz_server_f3: '¡Erro! O rack de servidores derreteuse e apagouse (+35m).',

    quiz_board_title: '📊 SALA DE XUNTAS: PRESENTACIÓN AO CEO',
    quiz_board_q: 'O CEO pregunta: "Como garante a IA o noso liderado de mercado?"',
    quiz_board_o1: '1) "A IA triplica a productividade e ofrece solucións a medida."',
    quiz_board_f1: '¡Éxito! ¡O consello aproba a transformación dixital completa!',
    quiz_board_o2: '2) "Substituiremos a tódolos humanos cun chatbot básico."',
    quiz_board_f2: '¡Erro! As accións caeron por mala reputación (-$2.0M).',
    quiz_board_o3: '3) "A IA é só unha moda, sigamos usando máquinas de fax."',
    quiz_board_f3: '¡Erro! O CEO perdeu a confianza na túa visión (+30m).',

    // Game Over
    game_over_title: '5:00 PM - ¡FIN DA XORNADA!',
    game_over_adoption: 'ADOPCIÓN DE IA CONSEGUIDA: {adoption}% / 100%',
    game_over_box_title: '💸 ADQUISICIÓN EXECUTADA 💸',
    game_over_desc: 'Unha Megacorp de IA comprou a empresa\npor $1.00 USD. Estás arruinado.',
    game_over_restart: 'PREME [R] PARA REINICIAR O BUCLE (BUCLE #{loop})',

    // Victory
    victory_title: '🎉 ¡EMPRESA SALVADA! 🎉',
    victory_subtitle: '¡LEVACHES A ADOPCIÓN DE IA AO 100%!',
    victory_val: 'VALORACIÓN DA EMPRESA: ${val} MILLÓNS',
    victory_desc: '¡Rrompiches o bucle temporal en {loop} {loops_word}!\nA túa empresa é agora líder de mercado impulsada por IA.',
    victory_loop_single: 'bucle',
    victory_loop_plural: 'bucles',
    victory_restart: 'PREME [R] PARA XOGAR DE NOVO'
  },

  pa: {
    // Boot (Panocho / Murciano)
    title: 'CTO: SAVE THE COMPANY',
    subtitle: '¡Aplica IA antes de las 5 de la tarde o nos compran por un real!',
    start_prompt: '¡DALE AL [ESPACIO] PA EMPEZAR EL BUCLE!',
    lang_select: 'HABLA / LANG:',

    // Rooms
    room_cto: '1. DESPACHO DEL CTO',
    room_dev: '2. LA CUEVA LOS DEVS',
    room_server: '3. EL CUARTO LOS SERVIDORES',
    room_boardroom: '4. EL SALÓN DE LOS JEFES',

    // HUD
    hud_loop: 'BUCLE #',
    hud_time: 'HORA:',
    hud_adoption: 'ADOPCIÓN IA:',
    hud_prod: 'PROD:',
    hud_val: 'VAL:',

    // Doors & Keys
    door1_name: 'PUERTA LOS DEVS',
    door2_name: 'PUERTA SERVIDORES',
    door3_name: 'PUERTA LOS JEFES',

    // Interaction Prompts
    prompt_whiteboard: '[E] Examen del Plan de IA',
    prompt_cto_laptop: '[E] Examen de Revisión de Código',
    prompt_door1: '[E] Abrir Puerta de los Devs',
    prompt_dev_team: '[E] Enseñar AI Copilot a los Muchachos',
    prompt_coffee: '[E] Echar un Cafeico (+Velocidá)',
    prompt_door2: '[E] Abrir Puerta Servidores',
    prompt_server_engineer: '[E] Poner a Tocar el Clúster GPU',
    prompt_door3: '[E] Abrir Puerta de los Jefes',
    prompt_boardroom_ceo: '[E] Venderle la Moto de la IA al CEO',

    // Notifications & Hints
    already_completed: '¡Esa faena ya está hecha!',
    prereq_whiteboard: '¡Pinta primero el plan en la pizarra, pijo!',
    prereq_dev_team: '¡Enseña primero a los zagales!',
    prereq_boardroom: '¡El CEO quiere al menos un 75% de IA antes de la charla!',
    door_already_unlocked: '¡Si la puerta ya está abierta, zagala!',
    door1_hint: '¡Termina la pizarra primero, muchacho!',
    door2_hint: '¡Enseña a los muchachos primero!',
    door3_hint: '¡Pon a funcionar los servidores primero, zagal!',
    unlocked_msg: '¡ABIERTA DE PAR EN PAR!',
    access_denied: '¡DE ESO NADA, ACCESO DENEGAO!',
    coffee_boost: '¡Un cafeico güeno! ⚡ A to meter',

    notif_whiteboard: '✨ ¡TARJETICA DE LOS DEVS CONSIGUIÁ!\n+15% Adopción IA, +10% Prod',
    notif_cto_laptop: '✨ ¡Revisión de Código Lista!\n+15% Productividá, +$500k Val',
    notif_dev_team: '✨ ¡PASE A SERVIDORES OBTENÍO!\n+30% Adopción, +25% Prod',
    notif_server_engineer: '✨ ¡PASE PA LOS JEFES CONSIGUIÓ!\n+30% Adopción, +$3.0M Val',
    notif_boardroom_ceo: '🎉 ¡EL CEO SE HA QUEDAO ACONGOJAO!\n¡100% DE IA LOGRAO, PIJO!',

    // Quizzes
    quiz_whiteboard_title: '📋 PIZARRA: PLAN DE ESTRATEGIA DE IA',
    quiz_whiteboard_q: '¿Cómo migramos el sistema viejo a microservicios con IA sin liarla?',
    quiz_whiteboard_o1: '1) Poner tubería RAG y sacar tests de CI/CD solos',
    quiz_whiteboard_f1: '¡Abonico! La tubería RAG acelera que da gusto.',
    quiz_whiteboard_o2: '2) Reescribir medio millón de líneas a mano en Ensamblador',
    quiz_whiteboard_f2: '¡Menudo empanado! Reescribir a mano nos ha retrasao (+30m).',
    quiz_whiteboard_o3: '3) Pasar del sistema viejo y esperar que la IA lo arregle de milagro',
    quiz_whiteboard_f3: '¡Cagada! Los servidores petaron por falta de mantenimiento (+45m).',

    quiz_laptop_title: '💻 PORTÁTIL CTO: REVISIÓN DE CÓDIGO',
    quiz_laptop_q: '¿Qué modelo es más seguro pa sintesis de código aquí en el despacho?',
    quiz_laptop_o1: '1) Mandar tol código a una API pública sin saber de quién es',
    quiz_laptop_f1: '¡Acho pijo! Se filtró el código y saltó la alarma (-$1.0M).',
    quiz_laptop_o2: '2) Un LLM de código de 14B montao en nuestras GPUs locales',
    quiz_laptop_f2: '¡Pata negra! Máximo rendimiento y nadie nos roba na.',
    quiz_laptop_o3: '3) Copiar un script churro de Stack Overflow',
    quiz_laptop_f3: '¡Lioso! El script llenó de fallos los programas (+25m).',

    quiz_dev_title: '👩‍💻 CUEVA DEVS: ENSEÑAR EL COPILOT A LOS ZAGALES',
    quiz_dev_q: 'Los zagales tienen miedo de las alucinaciones de la IA. ¿Cómo lo arreglamos?',
    quiz_dev_o1: '1) Decirles que le den a todo que sí sin mirar',
    quiz_dev_f1: '¡Cagajón! La confianza ciega metió fallos gordos (+30m, -15% prod).',
    quiz_dev_o2: '2) Pruebas automáticas obligatorias y revisión del programador',
    quiz_dev_f2: '¡Hermoso! Los zagales van el doble de rápido y sin fallos.',
    quiz_dev_o3: '3) Prohibir la IA y ponerlos a picar código en tarjetas',
    quiz_dev_f3: '¡Menuda risa! Los muchachos querían salir huyendo (+30m, -20% prod).',

    quiz_server_title: '🖥️ SERVIDORES: PONER A TOCAR LAS GPUS',
    quiz_server_q: 'Las GPUs se calientan como un demonio en verano. ¿Qué hacemos, zagal?',
    quiz_server_o1: '1) Echarle un granizao de limón directamente a las tarjetas',
    quiz_server_f1: '¡Achucharro! Quemaste los circuitos con el granizao (-$500k).',
    quiz_server_o2: '2) Ajustar tamaño de batch, precisión FP16 y refrigeración líquida',
    quiz_server_f2: '¡Abonico! Van finas finas y sin calentarse.',
    quiz_server_o3: '3) Apagar los ventiladores pa no oír el zumbío',
    quiz_server_f3: '¡Madre mía! Se derritió el armario de servidores (+35m).',

    quiz_board_title: '📊 EL SALÓN DE LOS JEFES: HABLAR CON EL CEO',
    quiz_board_q: 'El CEO dice: "¿Cómo nos asegura la IA ser los amos del bancal?"',
    quiz_board_o1: '1) "La IA triplica la faena y saca cosas a medida de los clientes."',
    quiz_board_f1: '¡Ole tu madre! ¡El consejo aprueba todo el plan!',
    quiz_board_o2: '2) "Vamos a echar a todos los zagales y poner un bot simplón."',
    quiz_board_f2: '¡Vaya ruina! Las acciones cayeron por dar mala imagen (-$2.0M).',
    quiz_board_o3: '3) "La IA es una tontería, sigamos mandando faxes."',
    quiz_board_f3: '¡Lioso! El CEO vio que no tienes ni idea (+30m).',

    // Game Over
    game_over_title: '5:00 DE LA TARDE - ¡A LA CALLE!',
    game_over_adoption: 'IA CONSEGUIDA: {adoption}% / 100%',
    game_over_box_title: '💸 VENDÍOS POR UN REAL 💸',
    game_over_desc: 'Una empresa gorda de IA nos ha comprao\npor un pavo ($1.00 USD). Menuda ruina.',
    game_over_restart: 'DALE A LA [R] PA EMPEZAR DE NUEVO EL BUCLE (BUCLE #{loop})',

    // Victory
    victory_title: '🎉 ¡EMPRESA SALVÁ, PIJO! 🎉',
    victory_subtitle: '¡HAS LLEVAO LA IA AL 100%!',
    victory_val: 'VALORACIÓN DE LA EMPRESA: ${val} MILLONES',
    victory_desc: '¡Rompiste el bucle en {loop} {loops_word}!\nNuestra empresa es ahora la ama del bancal con la IA.',
    victory_loop_single: 'bucle',
    victory_loop_plural: 'bucles',
    victory_restart: 'PULSA [R] PA JUGAR OTRA VEZ'
  }
};

export function t(key, params = {}) {
  const langDict = TRANSLATIONS[currentLang] || TRANSLATIONS['es'];
  let text = langDict[key] || TRANSLATIONS['en'][key] || key;
  Object.keys(params).forEach(param => {
    text = text.replace(new RegExp(`\\{${param}\\}`, 'g'), params[param]);
  });
  return text;
}
