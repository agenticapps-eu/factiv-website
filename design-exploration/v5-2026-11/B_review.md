# Review Entwurf B · Live-Leitung (13.11.2026)

Geprüft mit Hallmark (Floor), Impeccable (craft-floor), Emil Kowalski (emil-design-eng, review-animations), UI UX Pro Max (Prioritäten 1–7). Umsetzung: `B_live-leitung_v2.html`.

## Befunde und Fixes

| # | Befund | Quelle | Fix in v2 |
|---|---|---|---|
| 1 | Wellenform animiert `height` per rAF **und** CSS-Transition auf 32 Elementen, läuft endlos, auch unsichtbar | Emil Std. 7, Hallmark Floor 2 | Feste Höhe, nur `transform: scaleY`, keine Transition; rAF stoppt außerhalb des Viewports, bei verstecktem Tab und bei Pause |
| 2 | Auto-Loop ohne Pause (WCAG 2.2.2), `aria-live` fehlt bzw. würde vorlesen-spammen | UI UX Pro Max P1, Impeccable States | Pause-Button, Transkript `aria-hidden`, Kurzfassung für Screenreader, nur das Ergebnis `aria-live="polite"` |
| 3 | h1 wird per JS gebaut, Inhalte `.rv` ohne JS unsichtbar (SEO + No-JS) | Hallmark Floor 7 | h1 im HTML, Scroll-Reveals entfernt (Impeccable: ein Moment, nicht jede Sektion gleich) |
| 4 | Eyebrows, Versal-Labels in Mono, Pill mit Status-Punkt, „Läuft gerade in Praxen und Betrieben“ (unbelegt) | Hallmark Floor 8–10, Impeccable Refuse | Alle Kicker/Eyebrows gestrichen, Labels in Body-Schrift, Behauptung entfernt |
| 5 | Statusangaben „live/Pilot/Labor/bald“ in Branchenkarten unbelegt | Hallmark Floor 8 | Entfernt, nur Module gelistet |
| 6 | Unicode/Emoji als Icons (☎ ≋ ☑ → ← +), Buchstaben-Kacheln im Menü | Impeccable Refuse, UI UX Pro Max P4 | Eigenes SVG-Icon-Set (eine Strichstärke), Plus/Minus per CSS |
| 7 | Karte-in-Karte (Kacheln in Branchenkarten, Queue-Boxen) | Hallmark Floor 11 | Zeilen mit Haarlinien |
| 8 | Mittelpunkt-Ketten („Anruf · 18:42“, „Albers · Kontrolle · vormittags“) | Hallmark Floor 10 | Normale Sätze/Kommas |
| 9 | Mega-Menü nur per Hover, kein `aria-expanded`, kein Escape; auf Mobile gar keine Navigation | UI UX Pro Max P1/P9 | Disclosure per Klick/Tastatur, Hover nur bei feinem Zeiger, Escape, Burger-Menü mobil |
| 10 | Tabs ohne Pfeiltasten/Tabpanel, Ziele 36px | WAI-ARIA Tabs, UI UX Pro Max P2 | Roving tabindex, Pfeile/Home/End, `role=tabpanel`, alle Ziele ≥44px |
| 11 | Kein `:focus-visible` | Hallmark Floor 6 | Einheitlicher Fokusring in Coral |
| 12 | Hover-Bewegungen ungegatet | Emil Std. 8 | `@media (hover:hover) and (pointer:fine)` |
| 13 | Puls-Punkt animiert `left` | Emil Std. 7 | `translateX` über Container-Query-Einheit |
| 14 | Bubbles/Ergebnis mit Federkurve 450–500ms, Headline-Blur 800ms | Emil Std. 3–4 | 260ms/280ms ease-out, Headline 500ms mit 50ms Stagger |
| 15 | Literale Farben nach dem Token-Block, kein `overflow-x: clip` | Hallmark Floor 1, 4 | Alle Farben als Tokens, `overflow-x: clip` auf html/body |
| 16 | Hero-Satz 35 Wörter | Hallmark Floor 13 | Ein Satz mit 11 Wörtern |

## Bewusst behalten
Charakter (Nachtgrün, Coral, Live-Anruf als Signatur), Glas-Navigation (funktional über wechselnden Hintergründen), Bento mit Prüfliste.

## Offen
- Sloplint/Impeccable-Detector nicht ausgeführt (Skripte bewusst nicht gestartet).
- Demo-Nummer, Beispielnamen und Ratgeber-Link sind Platzhalter.
- Kein Bild-/Screenshot-Material: echter Portal-Screenshot würde die Prüfliste stärker machen als das nachgebaute Bento.
