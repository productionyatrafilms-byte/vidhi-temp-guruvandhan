# index.html — Build Instructions

## Navigation
← from: (entry point — no previous page)
→ to: (single-page video slate, no other pages; states are transitions within this page)

## Notes on scope (read first)
- This is a single "video slate" screen with 4 Figma frames that represent **states of the same
  screen**, not 4 separate pages: idle poster → ready/poster-with-controls → playing (expanded) →
  paused/expanded-with-replay.
- Open items carried over from Figma (flag, do not silently invent): the Hindi/Gujarati title text
  is not provided (only English "Meghkumar" exists in the design) — use the English text for all
  three `.english/.hindi/.gujrati` spans until real translations are supplied. No real video file
  is attached in Figma — wire the `<video>` element to a placeholder/poster image and leave the
  `src` empty with a clear comment, do not break layout.

## Frame 1 Guidelines — node-id=1-1057 (idle poster state)
  1- read frame 1 from figma mcp local server https://www.figma.com/design/cU8RBPhJ1fuaCRZc43UApz/Story-Video-slates?node-id=1-1057&m=dev
     for image reference use @assets/images/

    1.1- `home` (root frame, 12px #fffec8 border, 45px radius) — full-bleed background photo (mother
         and baby), use @assets/images/bg2.png or bg 4 1.png (verify against Figma screenshot — pick
         whichever matches the palace/curtain scene; both are candidates in assets/images)
      1.1.1- rounded corners + cream border wrap the entire slate frame

    1.2- `_video-16:9` panel — small collapsed video box (567px tall in design), white 12px border,
         30px radius, drop shadow — this is the not-yet-expanded video container
      1.2.1- inside: shaka-player-control bar (time "0:15 / 10:35", play button, volume slider,
             playback slider, fullscreen + more buttons) — hidden/inactive in this idle frame
             (kept in DOM for the expanded states, class it as `.player-controls`)

    1.3- decorative curtain/arch image (`Rectangle 7`) behind video panel — @assets/images/Rectangle 7.png
    1.4- bottom floor/vignette strip (`Rectangle 5`) — full width, bottom of frame — @assets/images/Rectangle 5.png

    1.5- `tittle 1` group — large "Meghkumar" title (180px Spirax font, white, text-shadow,
         letter-spacing -7.2px), currently `opacity:0` in this frame (title is not shown yet at
         this stage) — build the element but keep it hidden via `.title-large.is-hidden`
      1.5.1- left/right flourish icons either side of title (`Isolation_Mode`), also opacity:0 —
             @assets/images/decoleft.png / decoright.png

    1.6- big center play-button ellipse (`Ellipse 12`) behind the play icon — decorative glow circle
    1.7- `Lag` (language switch pill, E/H/G circles) — `opacity:0` in this frame (hidden until ready
         state) — class `.lang-switch.is-hidden`
    1.8- `Home` icon top-left — fully visible — @assets/images/HOME.png, class `[left-corner]`
         (never touch per global rules)
    1.9- `ButtonPlay1` / `ButtonPlay2` (two stacked play-icon states) — layered center play button,
         visible — @assets/images/play.png

    1.10- on click of the video panel / big play button → transition to Frame 3 state (expand video,
          start playing)

## Frame 2 Guidelines — node-id=1-1080 (ready state, title collapses to top pill)
  2- read frame 2 from figma mcp local server https://www.figma.com/design/cU8RBPhJ1fuaCRZc43UApz/Story-Video-slates?node-id=1-1080&m=dev

    2.1- same `_video-16:9` collapsed panel as frame 1 (567px), still not expanded
    2.2- `tittle 1` large title — now visible (no opacity:0), still 180px, same position as frame 1
    2.3- new `text box` + `tittle` group at TOP of frame — a pill-shaped banner (890px wide, red/maroon
         gradient `#dc3d40 → #620002`, white 4px border, 84px radius) containing the SAME title text
         at smaller size (120px), with the same flourish icons either side — @assets/images/decoleft.png,
         decoright.png
      2.3.1- this is the "title pill" that will persist once the video expands (frames 3 & 4) — build
             it as `.title-pill` positioned top-center, visible across ready/playing/paused states
    2.4- `Lag` (language switch, E/H/G) — now fully visible top-right — class `.lang-switch`
    2.5- `Home` icon top-left — visible — unchanged from frame 1
    2.6- two stacked play-button layers (`_button-play 7`, `_button-play 6`) — visible over the poster
      2.6.1- these replace the frame-1 play icon graphics — @assets/images/play.png (verify exact
             icon vs assets/images/refresh.png if Figma shows a re-try affordance)

    2.7- on click of play button → transition to Frame 3 state (video expands to 1281×737, controls bar
         becomes active)

## Frame 3 Guidelines — node-id=1-1103 (playing / expanded state)
  3- read frame 3 from figma mcp local server https://www.figma.com/design/cU8RBPhJ1fuaCRZc43UApz/Story-Video-slates?node-id=1-1103&m=dev

    3.1- `_video-16:9` panel now EXPANDED — 1281px wide × 737px tall, centered, white 12px border,
         30px radius, drop shadow — class `.video-panel.is-expanded`
      3.1.1- `shaka-player-control` bar now ACTIVE inside the panel (bottom-anchored, gradient
             scrim, time text "0:15 / 10:35", play icon, volume slider w/ handle, playback
             slider w/ handle + buffer fill, fullscreen icon, more (⋮) icon)
        3.1.1.1- play/pause icon in the control bar — @assets/images/figma-pause-icon.svg (or
                 pause.png), toggles state on click
    3.2- `title-pill` (top banner, same as frame 2.3) — persists, unchanged position
    3.3- `Lag` (E/H/G language switch) — unchanged, top-right
    3.4- `Home` icon — unchanged, top-left
    3.5- large `Ellipse 12` glow circle + single centered play icon over the video (paused-preview
         affordance before actual playback starts) — @assets/images/play.png

    3.6- on click of the center play icon or control-bar play/pause button → toggle to Frame 4
         state (paused overlay with replay/pause icons)
    3.7- on click of control-bar play icon while playing → pause (show Frame 4 overlay)

## Frame 4 Guidelines — node-id=1-1126 (paused / replay overlay state)
  4- read frame 4 from figma mcp local server https://www.figma.com/design/cU8RBPhJ1fuaCRZc43UApz/Story-Video-slates?node-id=1-1126&m=dev

    4.1- `_video-16:9` panel — same expanded size as frame 3 (1281×737)
    4.2- TWO center icons side by side over the video: `ButtonPlay1` (pause icon, left,
         @assets/images/pause.png) and a second button (`_button-play 6`, right,
         @assets/images/refresh.png) — this is the paused state showing "pause" + "replay/skip"
         controls together
      4.2.1- clicking the left (pause) icon → resumes playback → back to Frame 3 state
      4.2.2- clicking the right (refresh) icon → restarts video from 0:00, resumes Frame 3 state
    4.3- `title-pill` top banner — unchanged, persists
    4.4- `Lag` (E/H/G) — unchanged, top-right
    4.5- `Home` icon — unchanged, top-left
    4.6- control bar at bottom of video panel — same as frame 3, reflects paused playback position

## Global / cross-frame elements — never touch, build once
    - `[bg-img]` full-bleed background photo — shared across all 4 states (Frame 1.1)
    - `[left-corner]` Home icon link → `./index.html` — shared across all 4 states
    - `[language]` E/H/G switch — hidden only in Frame 1 (poster idle), visible in Frames 2–4

## State machine summary (as implemented in index.js / index.css)
    - `data-state="poster"` → panel.png (front layer, mother+baby art) + arc.png (bottom layer)
      cover bg-home.png (back layer) at rest — Frame 1's bare-poster look. Hovering (or tapping,
      on touch) the poster reveals the play button and slides the title (+ decoleft/decoright
      flourishes) up from inside the arc — all via GSAP (assets/plugins/gsap.min.js), not CSS
      transitions, per the animation spec.
    - Play click → GSAP timeline: arc.png slides down off-screen, panel.png slides up
      off-screen simultaneously (both clipped by `.main-container`'s own overflow:hidden),
      revealing bg-home.png underneath; the video panel — parked off-screen above at rest —
      then slides down to center. `data-state="video-ready"` once this settles: video panel
      visible with a single center play icon (paused, not yet started) — Frame 3.
    - `data-state="video-playing"` → pause + replay icons shown together, video element
      actually playing — Frame 4. Reached by clicking the single play icon.
    - Transitions: poster → video-ready (poster play click, GSAP slide sequence) →
      video-playing (video play click) → video-ready (pause click, or video reaches its end)
      → video-playing (replay click, seeks to 0 and keeps playing)
    - Title pill (top banner) fades in (plain CSS opacity transition) once `video-ready` is
      reached, and stays visible through `video-playing`.
