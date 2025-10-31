# Roadmap

## Requested
- [ ] compound/combined oracles
  - [x] action / theme
  - [x] full npc
  - [x] full settlement
  - [x] full location
  - [x] multiple of the same oracle in one
  - [x] better ux
  - [x] better layout
  - [x] customizable
    - [ ] save to localstorage
  - [ ] DSL for complex oracles like settlement
    - [ ] choice among several oracles, eg ironlander names
    - [ ] dependant, eg settlement name theme, egs
- [ ] oracle & move categories
  - [x] category tabs
  - [ ] cycle between categories
  - [ ] category dropdown menus
- [ ] nicer styles
- [ ] better lightmode

## Dev Goals
- [ ] Add section hash links to moves
- [ ] cleanup
  - [x] refactor moves
- [ ] markdown styles within Oracle results
- [ ] darkmode toggle
- [ ] tailwind
  - [x] add tailwind
  - [x] convert existing css
  - [x] convert existing inline
  - [ ] convert or pick new colors
  - [ ] convert or pick new text sizes
  - [ ] make typography and other atom components
  - [ ] tw-merge sort and other utilities
  - [ ] re-add reduced motion preferences
- [x] upgrade next
- [ ] try tanstack start?
- [x] fix move links not working after categorization
  - [x] because moves no longer gets full list of move names
- [ ] replace animations with animation library, eg.
  - [ ] https://www.react-spring.dev/
  - [ ] https://motion.dev/
- [x] yes/no oracles with likelihoods
- [ ] typescript
- [ ] fix page titles
- [ ] improve page heading content "ask..." etc
- [ ] improve site map (rearrange info arch)
- [ ] build out api
- [ ] create & edit custom oracle tables
- [ ] don't load all oracles on combined page until needed

## Future Scope

### Play Aid
- [ ] rules cheatsheet
- [ ] asset listing
  - [ ] custom assets
- [ ] custom moves

### Character & Rolls
- [ ] character sheet
  - [ ] track stats
  - [ ] progress tracks (vow, journey, combat, delve, etc)
    - [ ] ticks / progess per difficulty hint
  - [ ] track assets
    - [ ] mark asset levels
    - [ ] assets with their own tracks (health, etc)
  - [ ] wounded, encumbered, etc
- [ ] dice roller
  - [ ] plus stat
  - [ ] plus arbitrary bonus
  - [ ] momentum helper
    - [ ] preview what burning momentum would achieve
    - [ ] drop die matching negative momentum
  - [ ] prompt for narrative effect with doubles

### Journal & Notes
- [ ] journal page
  - [ ] rich text edit
  - [ ] markdown edit
  - [ ] multi-cursor edit
  - [ ] vscode shortcuts
- [ ] world truths
- [ ] entity notes
  - [ ] characters (people)
  - [ ] locations (places)
  - [ ] items (things)
- [ ] type @ to reference an entity
  - [ ] character spoken dialogue
    - [ ] with @name "..."
    - [ ] with "...", @name says
  - [ ] maybe use @entity: to aggregate notes about entities from inline journal entries

- [ ] type / to input commands for preformatted blocks
  - [ ] roll
  - [ ] oracle
  - [ ] in-character section
  - [ ] out-of-character section
  
### World & Game saving
- [ ] save player character
- [ ] save setting

### LLM integration
  - [ ] slash command within journal
  - [ ] interpret move/roll results
  - [ ] interpret oracles with/without active game context
  - [ ] character dialogue
  - [ ] setting and action descriptions
  - [ ] auto roll oracles


# Work in Progress

## Missing oracles from moves

- [x] ORACLE:Endure Harm
- [x] ORACLE:Endure Stress
- [x] ORACLE:Pay the Price
- [ ] ORACLE:Ask the Oracle
- [x] ORACLE:Delve the Depths
- [x] ORACLE:Find an Opportunity
- [x] ORACLE:Reveal a Danger
- [x] ORACLE:Reveal a Danger (alternate version)
- [x] ORACLE:Advance a Threat



# Scratch

## Unicode Diamonds

⬥⬦
◆◇
◈
◊ 💍 💎 ⋄ ⬖ ⬗ ⬘ ⬙ 💠 🞜 ♦️ ⃟ ⌺ ⍚ ◆ ◇ ◈ ♢ ♦ ⛋ ❖ ⟐

## Additional Move Markdown

These are other types of `code` blocks within the moves markdown which are not currently explicitly matched or styled:

+1 momentum
+2 momentum
+3 momentum
-1 momentum
(1 harm)
add +1
1 harm
-health
-momentum
-spirit
-supply
-2 momentum
1 experience