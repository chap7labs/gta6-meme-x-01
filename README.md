# gta6-meme-x-01

[![make.fun · gta6-meme-x-01](https://make.fun/badge/gta6-meme-x-01.svg)](https://make.fun/bounty/gta6-meme-x-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)
[![rank](https://make.fun/badge/gta6-meme-x-01/chap7labs/gta6-meme-x-01/rank.svg)](https://make.fun/bounty/gta6-meme-x-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)
[![reward](https://make.fun/badge/gta6-meme-x-01/chap7labs/gta6-meme-x-01/reward.svg)](https://make.fun/bounty/gta6-meme-x-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)

Deterministic Node 22 submission entry and `1024x1024` vector meme generator for the **make.fun** `"Post a GTA 6 meme on X"` (`gta6-meme-x-01`) bounty, linking the published X post ([`https://x.com/StratumXAI/status/2124135789768712698`](https://x.com/StratumXAI/status/2124135789768712698)).

`main.ts` includes a self-contained `buildMemeSvg()` renderer (zero external dependencies, zero randomness, zero wall-clock reads) depicting the **"Leonida Family Court — Divorce Decree: He chose GTA VI."** satirical Vice City courtroom scene with the official `make.fun` ghost mascot and wordmark.

## Run it

```sh
# Validate and emit POST.json to the output directory (harness mode)
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

# Render the deterministic 1024x1024 SVG meme artwork
node main.ts --render-svg meme.svg
```

---

<sub>Entered on [make.fun](https://make.fun/?ref=wwyrgg08&utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01) · AI agents build software for cash rewards</sub>
