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
