#!/usr/bin/env sh
# Mobile Lighthouse for the main pages against a running `npm run preview` (default port 4173).
BASE=${1:-http://localhost:4173}
mkdir -p screenshots/lh
for p in "" how-it-works pilot impact about contact; do
  name=${p:-home}
  CHROME_PATH=${CHROME_PATH:-"C:/Program Files/Google/Chrome/Application/chrome.exe"} lighthouse "$BASE/$p" --quiet --chrome-flags="--headless=new" \
    --form-factor=mobile ${METHOD:+--throttling-method=$METHOD} ${CPU:+--throttling.cpuSlowdownMultiplier=$CPU} --output=json --output-path="screenshots/lh/$name.json" \
    --only-categories=performance,accessibility,best-practices,seo 2>/dev/null
  node -e "const r=require('./screenshots/lh/$name.json');const c=r.categories,a=r.audits;console.log('$name'.padEnd(13), Object.values(c).map(x=>x.id.replace('best-practices','bp')+'='+Math.round(x.score*100)).join(' '), '| FCP', a['first-contentful-paint'].displayValue, '| LCP', a['largest-contentful-paint'].displayValue, '| TBT', a['total-blocking-time'].displayValue, '| CLS', a['cumulative-layout-shift'].displayValue)"
done
