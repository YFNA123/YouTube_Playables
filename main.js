const yt = window.ytgame;

const sections = [
  "Venue",
  "Stage",
  "Band",
  "Dancers",
  "Lights",
  "Decoration",
  "Outfit",
  "Song"
];

const venues = [
  { id: "school", name: "School Gym", image: "venue_school_gym.jpg" },
  { id: "outdoor", name: "Outdoor Medium Stage", image: "venue_outdoor_stage.jpg" },
  { id: "snow", name: "Snow Forest Stage", image: "venue_snow_forest.jpg" },
  { id: "arena", name: "Large Arena", image: "venue_large_arena.jpg" },
  { id: "front-row", name: "Front Row", image: "venue_front_row.jpg" }
];

const stageTools = [
  { type: "yafania", label: "Yafania", limit: 1 },
  { type: "mic", label: "Vocal Mic", limit: 1 },
  { type: "speaker-left", label: "Left Speaker", limit: 1 },
  { type: "speaker-right", label: "Right Speaker", limit: 1 },
  { type: "speaker-center", label: "Center Speaker", limit: 1 }
];

const bandTools = [
  { type: "drummer", label: "Drummer", limit: 1 },
  { type: "bassist", label: "Bassist", limit: 1 },
  { type: "keys", label: "Keys", limit: 1 },
  { type: "guitarist", label: "Guitarist", limit: 1 }
];

const lightTools = [
  { type: "light-red", label: "Red", color: "#ff4d63" },
  { type: "light-blue", label: "Blue", color: "#5ca7ff" },
  { type: "light-yellow", label: "Yellow", color: "#ffdf5a" },
  { type: "light-green", label: "Green", color: "#63c96b" },
  { type: "light-purple", label: "Purple", color: "#bd78ff" }
];

const decorations = [
  { id: "neon", name: "Neon Yafania Sign" },
  { id: "banner", name: "Plain Yafania Banner" }
];

const outfits = [
  { id: "the-right-guy", name: "The Right Guy Outfit", song: "the-right-guy", image: "chibi_the_right_guy.jpg" },
  { id: "dont-you-want-to-be-with-me", name: "Don't You Want To Be With Me Outfit", song: "dont-you-want", image: "chibi_dont_you_want_to_be_with_me.jpg" },
  { id: "the-last-goodbye", name: "The Last Goodbye Outfit", song: "last-goodbye", image: "chibi_the_last_goodbye.jpeg" },
  { id: "when-im-with-you", name: "When I'm With You Outfit", song: "when-im-with-you", image: "chibi_when_im_with_you.jpg" },
  { id: "front-row", name: "Front Row Outfit", song: "front-row", image: "chibi_front_row.jpg" }
];

const clipTypes = [
  { id: "vocal", name: "Vocal" },
  { id: "instrumental", name: "Instrumental" },
  { id: "hook", name: "Hook" }
];

const songs = [
  {
    id: "the-right-guy",
    name: "The Right Guy",
    venue: ["school"],
    outfit: "the-right-guy",
    clips: {
      vocal: "the_right_guy_vocal.mp3",
      instrumental: "the_right_guy_instrumental.mp3",
      hook: "the_right_guy_hook.mp3"
    }
  },
  {
    id: "dont-you-want",
    name: "Don't You Want To Be With Me",
    venue: ["arena"],
    outfit: "dont-you-want-to-be-with-me",
    clips: {
      vocal: "dont_you_want_to_be_with_me_vocal.mp3",
      instrumental: "dont_you_want_to_be_with_me_instrumental.mp3",
      hook: "dont_you_want_to_be_with_me_hook.mp3"
    }
  },
  {
    id: "last-goodbye",
    name: "The Last Goodbye",
    venue: ["snow"],
    outfit: "the-last-goodbye",
    clips: {
      vocal: "the_last_goodbye_vocal.mp3",
      instrumental: "the_last_goodbye_instrumental.mp3",
      hook: "the_last_goodbye_hook.mp3"
    }
  },
  {
    id: "when-im-with-you",
    name: "When I'm With You",
    venue: ["school", "outdoor"],
    outfit: "when-im-with-you",
    clips: {
      vocal: "when_im_with_you_vocal.mp3",
      instrumental: "when_im_with_you_instrumental.mp3",
      hook: "when_im_with_you_hook.mp3"
    }
  },
  {
    id: "front-row",
    name: "Front Row",
    venue: ["front-row"],
    outfit: "front-row",
    clips: {
      vocal: "front_row_vocal.mp3",
      instrumental: "front_row_instrumental.mp3",
      hook: "front_row_hook.mp3"
    }
  }
];

const state = {
  section: "Venue",
  venue: "school",
  activeTool: null,
  decoration: "neon",
  outfit: "the-right-guy",
  song: "the-right-guy",
  clip: "vocal",
  items: [
    { id: "starter-yafania", type: "yafania", x: 50, y: 53 },
    { id: "starter-mic", type: "mic", x: 50, y: 43 },
    { id: "starter-speaker-left", type: "speaker-left", x: 20, y: 70 },
    { id: "starter-speaker-right", type: "speaker-right", x: 80, y: 70 },
    { id: "starter-light-blue", type: "light-blue", x: 32, y: 24 },
    { id: "starter-light-yellow", type: "light-yellow", x: 68, y: 24 }
  ],
  isPaused: false,
  isPerforming: false,
  audio: null
};

const tabs = document.querySelector("#tabs");
const panel = document.querySelector("#panel");
const venueEl = document.querySelector("#venue");
const stage = document.querySelector("#stage");
const placedItems = document.querySelector("#placedItems");
const backdrop = document.querySelector("#backdrop");
const stageHint = document.querySelector("#stageHint");
const performButton = document.querySelector("#performButton");
const scoreScreen = document.querySelector("#scoreScreen");
const closeScore = document.querySelector("#closeScore");
const replayButton = document.querySelector("#replayButton");

function sdkCall(path, ...args) {
  const fn = path.split(".").reduce((obj, key) => obj && obj[key], yt);
  if (typeof fn === "function") fn(...args);
}

function setupSdk() {
  if (!yt) return;
  if (yt.system) {
    registerSdkHandler("onPause", pauseGame);
    registerSdkHandler("onResume", resumeGame);
    if (typeof yt.system.onAudioEnabledChange === "function") {
      yt.system.onAudioEnabledChange((enabled) => {
        if (state.audio) state.audio.muted = !enabled;
      });
    }
  }
}

function registerSdkHandler(name, handler) {
  if (typeof yt.system[name] === "function") {
    try {
      yt.system[name](handler);
      return;
    } catch (error) {
      // Some SDK shims expose these handlers as assignable properties.
    }
  }
  yt.system[name] = handler;
}

function renderTabs() {
  tabs.innerHTML = "";
  sections.forEach((name) => {
    const button = document.createElement("button");
    button.className = `tab ${state.section === name ? "active" : ""}`;
    button.type = "button";
    button.textContent = name;
    button.addEventListener("click", () => {
      state.section = name;
      render();
    });
    tabs.append(button);
  });
}

function renderPanel() {
  const builders = {
    Venue: venuePanel,
    Stage: () => toolPanel("Tap a stage tool, then tap the stage.", stageTools),
    Band: () => toolPanel("Place each musician once.", bandTools),
    Dancers: dancerPanel,
    Lights: lightPanel,
    Decoration: decorationPanel,
    Outfit: outfitPanel,
    Song: songPanel
  };
  panel.innerHTML = "";
  panel.append(builders[state.section]());
}

function venuePanel() {
  return choices(
    "Pick the concert setting.",
    venues,
    state.venue,
    (venue) => {
      state.venue = venue.id;
      render();
    }
  );
}

function toolPanel(message, tools) {
  const wrap = document.createElement("div");
  wrap.append(meta(message));
  const grid = document.createElement("div");
  grid.className = "option-grid";
  tools.forEach((tool) => {
    const button = chip(tool.label, state.activeTool === tool.type);
    button.addEventListener("click", () => {
      state.activeTool = tool.type;
      render();
    });
    grid.append(button);
  });
  wrap.append(grid);
  return wrap;
}

function dancerPanel() {
  const wrap = document.createElement("div");
  wrap.append(meta(`${countItems("dancer")} of 5 dancers placed.`));
  const grid = document.createElement("div");
  grid.className = "option-grid";
  const add = chip("Place Dancer", state.activeTool === "dancer");
  add.addEventListener("click", () => {
    state.activeTool = "dancer";
    render();
  });
  const clear = chip("Clear Dancers", false);
  clear.addEventListener("click", () => {
    state.items = state.items.filter((item) => item.type !== "dancer");
    render();
  });
  grid.append(add, clear);
  wrap.append(grid);
  return wrap;
}

function lightPanel() {
  return toolPanel(`${countLights()} of 5 lights placed.`, lightTools);
}

function decorationPanel() {
  return choices(
    "Choose one decoration.",
    decorations,
    state.decoration,
    (decoration) => {
      state.decoration = decoration.id;
      render();
    }
  );
}

function outfitPanel() {
  return choices(
    "Choose Yafania's outfit. This can also change during performance.",
    outfits,
    state.outfit,
    (outfit) => {
      state.outfit = outfit.id;
      updateYafaniaLabel();
      render();
    }
  );
}

function songPanel() {
  const wrap = document.createElement("div");
  wrap.append(choices("Choose a song.", songs, state.song, (song) => {
    state.song = song.id;
    render();
  }));
  const versions = document.createElement("div");
  versions.className = "option-grid";
  clipTypes.forEach((clip) => {
    const button = chip(clip.name, state.clip === clip.id);
    button.addEventListener("click", () => {
      state.clip = clip.id;
      render();
    });
    versions.append(button);
  });
  wrap.append(meta("Use approved 15-20 second local clips."));
  wrap.append(versions);
  return wrap;
}

function choices(message, options, selected, onSelect) {
  const wrap = document.createElement("div");
  wrap.append(meta(message));
  const grid = document.createElement("div");
  grid.className = "option-grid";
  options.forEach((option) => {
    const button = chip(option.name, selected === option.id);
    button.addEventListener("click", () => onSelect(option));
    grid.append(button);
  });
  wrap.append(grid);
  return wrap;
}

function chip(label, active) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `chip ${active ? "active" : ""}`;
  button.textContent = label;
  return button;
}

function meta(text) {
  const p = document.createElement("p");
  p.className = "meta";
  p.textContent = text;
  return p;
}

function placeItem(event) {
  if (!state.activeTool || state.isPaused) return;
  const rect = stage.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;
  const tool = [...stageTools, ...bandTools, ...lightTools].find((entry) => entry.type === state.activeTool);

  if (state.activeTool === "dancer" && countItems("dancer") >= 5) return;
  if (state.activeTool.startsWith("light") && countLights() >= 5) return;
  if (tool && tool.limit && countItems(tool.type) >= tool.limit) {
    state.items = state.items.filter((item) => item.type !== tool.type);
  }

  state.items.push({
    id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
    type: state.activeTool,
    x: Math.max(5, Math.min(95, x)),
    y: Math.max(14, Math.min(88, y))
  });
  stageHint.classList.add("hidden");
  renderStage();
}

function renderStage() {
  venueEl.className = `venue ${state.venue} ${state.isPerforming ? "performing" : ""}`;
  const venue = venues.find((entry) => entry.id === state.venue);
  venueEl.style.setProperty("--venue-image", venue ? `url("${venue.image}")` : "none");
  backdrop.textContent = state.decoration === "neon" ? "YAFANIA" : "Yafania Live";
  placedItems.innerHTML = "";
  state.items.forEach((item) => {
    const el = document.createElement("div");
    el.className = `item ${classForItem(item.type)}`;
    el.style.left = `${item.x}%`;
    el.style.top = `${item.y}%`;
    const light = lightTools.find((entry) => entry.type === item.type);
    if (light) el.style.color = light.color;
    if (item.type === "yafania") {
      el.append(yafaniaImage());
    } else {
      el.textContent = labelForItem(item.type);
    }
    placedItems.append(el);
  });
  updateYafaniaLabel();
}

function yafaniaImage() {
  const img = document.createElement("img");
  const outfit = outfits.find((entry) => entry.id === state.outfit);
  img.src = outfit ? outfit.image : "chibi_the_right_guy.jpg";
  img.alt = outfit ? `Yafania ${outfit.name}` : "Yafania";
  img.addEventListener("error", () => {
    img.remove();
    document.querySelectorAll(".item.yafania").forEach((el) => {
      if (!el.textContent) el.textContent = "Yafania";
    });
  }, { once: true });
  return img;
}

function classForItem(type) {
  if (type === "yafania") return "yafania";
  if (type === "dancer") return "dancer";
  if (type.startsWith("light")) return "light";
  return "";
}

function labelForItem(type) {
  const labels = {
    yafania: "Yafania",
    mic: "Mic",
    "speaker-left": "Speaker",
    "speaker-right": "Speaker",
    "speaker-center": "Speaker",
    drummer: "Drums",
    bassist: "Bass",
    keys: "Keys",
    guitarist: "Guitar",
    dancer: "Dance"
  };
  const light = lightTools.find((entry) => entry.type === type);
  return light ? "" : labels[type] || type;
}

function updateYafaniaLabel() {
  document.querySelectorAll(".item.yafania").forEach((el) => {
    const img = el.querySelector("img");
    const outfit = outfits.find((entry) => entry.id === state.outfit);
    if (img && outfit) {
      img.src = outfit.image;
      img.alt = `Yafania ${outfit.name}`;
    } else if (!img) {
      el.textContent = outfit ? outfit.name.replace(" Outfit", "") : "Yafania";
    }
  });
}

function countItems(type) {
  return state.items.filter((item) => item.type === type).length;
}

function countLights() {
  return state.items.filter((item) => item.type.startsWith("light")).length;
}

function selectedSong() {
  return songs.find((song) => song.id === state.song) || songs[0];
}

function performConcert() {
  if (state.isPerforming) return;
  state.isPerforming = true;
  scoreScreen.classList.add("hidden");
  renderStage();
  playAudio();
  setTimeout(() => {
    if (state.isPerforming) finishConcert();
  }, 18000);
}

function playAudio() {
  stopAudio();
  const song = selectedSong();
  const src = song.clips[state.clip];
  state.audio = new Audio(src);
  state.audio.muted = !sdkAudioEnabled();
  state.audio.addEventListener("ended", finishConcert, { once: true });
  state.audio.addEventListener("error", () => {
    state.audio = null;
  }, { once: true });
  state.audio.play().catch(() => {
    state.audio = null;
  });
}

function sdkAudioEnabled() {
  if (!yt || !yt.system || yt.system.isAudioEnabled === undefined) return true;
  return typeof yt.system.isAudioEnabled === "function"
    ? yt.system.isAudioEnabled()
    : yt.system.isAudioEnabled !== false;
}

function stopAudio() {
  if (!state.audio) return;
  state.audio.pause();
  state.audio.currentTime = 0;
  state.audio = null;
}

function finishConcert() {
  state.isPerforming = false;
  stopAudio();
  renderStage();
  showScore();
}

function scoreConcert() {
  const song = selectedSong();
  const bandCount = ["drummer", "bassist", "keys", "guitarist"].filter((type) => countItems(type)).length;
  const speakerCount = ["speaker-left", "speaker-right", "speaker-center"].filter((type) => countItems(type)).length;
  const hasYafania = countItems("yafania") > 0;
  const lightCount = countLights();
  const dancerCount = countItems("dancer");
  const outfitMatch = state.outfit === song.outfit;
  const venueMatch = song.venue.includes(state.venue);
  const symmetry = dancerCount >= 2 && dancersAreBalanced();

  const design = Math.min(25, (hasYafania ? 8 : 0) + (state.decoration ? 5 : 0) + (speakerCount >= 2 ? 7 : speakerCount * 3) + (venueMatch ? 5 : 2));
  const lighting = Math.min(25, lightCount * 5);
  const band = Math.min(20, bandCount * 5);
  const outfit = outfitMatch ? 15 : 6;
  const audience = Math.min(15, dancerCount * 2 + (symmetry ? 5 : 0) + (speakerCount >= 2 ? 3 : 0));

  const total = Math.round(design + lighting + band + outfit + audience);
  return {
    total,
    stars: Math.max(1, Math.min(5, Math.ceil(total / 20))),
    lines: [
      `Stage Design: ${design}/25`,
      `Lighting: ${lighting}/25`,
      `Band Setup: ${band}/20`,
      `Outfit Match: ${outfit}/15`,
      `Audience Excitement: ${audience}/15`,
      outfitMatch ? "Bonus feel: outfit matches the song." : "Try matching the outfit to the song.",
      venueMatch ? "Bonus feel: venue matches the song mood." : "Try matching the venue to the song mood."
    ]
  };
}

function dancersAreBalanced() {
  const dancers = state.items.filter((item) => item.type === "dancer");
  const left = dancers.filter((item) => item.x < 46).length;
  const right = dancers.filter((item) => item.x > 54).length;
  return Math.abs(left - right) <= 1 && left > 0 && right > 0;
}

function showScore() {
  const score = scoreConcert();
  document.querySelector("#scoreTitle").textContent = `${score.stars} Star${score.stars === 1 ? "" : "s"}`;
  document.querySelector("#stars").textContent = "★★★★★".slice(0, score.stars);
  document.querySelector("#scoreNumber").textContent = `${score.total}/100 total score`;
  const list = document.querySelector("#scoreBreakdown");
  list.innerHTML = "";
  score.lines.forEach((line) => {
    const li = document.createElement("li");
    li.textContent = line;
    list.append(li);
  });
  scoreScreen.classList.remove("hidden");
}

function pauseGame() {
  state.isPaused = true;
  if (state.audio) state.audio.pause();
  venueEl.classList.remove("performing");
}

function resumeGame() {
  state.isPaused = false;
  renderStage();
  if (state.audio && state.isPerforming) state.audio.play().catch(() => {});
}

function render() {
  renderTabs();
  renderPanel();
  renderStage();
}

stage.addEventListener("click", placeItem);
performButton.addEventListener("click", performConcert);
replayButton.addEventListener("click", performConcert);
closeScore.addEventListener("click", () => scoreScreen.classList.add("hidden"));

setupSdk();
render();
requestAnimationFrame(() => {
  sdkCall("game.firstFrameReady");
  sdkCall("game.gameReady");
});
