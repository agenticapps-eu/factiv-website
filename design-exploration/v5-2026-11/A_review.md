# Review Entwurf A · Betriebsanleitung (13.11.2026)

Geprüft mit Hallmark 2.0 (Floor), Impeccable 4.9 (craft-floor), Emil Kowalski (emil-design-eng, review-animations), UI UX Pro Max (Accessibility, Typo/Farbe). Ergebnis: `A_betriebsanleitung_v2.html`. Hinweis: Die Skript-Werkzeuge (sloplint, impeccable context) habe ich bewusst nicht ausgeführt, nur die Regeln gelesen.

## KI-Muster (Hallmark, Impeccable)
| Befund | Quelle | Fix in v2 |
|---|---|---|
| Eyebrow „KI-ASSISTENTEN … · EU-GEHOSTET“ über der H1 | Impeccable Bann, Hallmark Floor 9 | entfernt |
| Labels in Mono, Versalien, gesperrt („BRANCHEN“, „F-01“) | Hallmark 9, Impeccable „Mono als Kostüm“ | Labels in der Fließtextschrift, Mono nur noch für Uhrzeiten im Protokoll |
| Abschnittsnummern 01–05, Teilenummern F-01–F-08 | Impeccable „Section numbers“ | entfernt |
| 8 gleich große Karten als Lösungsraster | Impeccable „Same-size cards“ | ein Hauptmodul (Telefon) + Katalogliste |
| Harter Block-Schatten `8px 8px 0` an der Schalttafel | Impeccable „Hard offset shadows“ | weicher Schatten mit Versatz |
| Pulsierender grüner Status-Punkt, Mittelpunkte in Meta-Zeilen, Pfeil-Zeichen im Linktext | Hallmark 10 | entfernt bzw. durch SVG-Icon mit Abstand ersetzt |
| „Mehr Betrieb.“ als einzige farbige Zeile in der H1 | Hallmark Craft 38iii (eine Farbe pro Überschrift) | H1 einfarbig |
| Hero-Text 35 Wörter | Hallmark 12/13 (ein Satz ≤ 12 Wörter) | 11 Wörter, Rest wandert in Abschnitte |

## Typografie und Farbe (UI UX Pro Max)
- `--ink-3` #8A8577 auf Papier: 3,2:1, zu schwach → #6B665A (5,0:1).
- Signalorange #D9480F für Text 3,7:1 → Text in #B93C0B (4,9:1), helles Orange nur noch in Grafik.
- Rohe Hex-Werte im Markup (SVG-Logo, #FBFAF6, #BDB7A8) → alles über Tokens (Hallmark 1).
- H1 auf 72px gedeckelt, Zeilen nowrap: bei 1440px brach „Weniger Telefon.“ um.

## Animationen (Emil)
- Höhe animiert (Balken in Modulkarten, Equalizer im CTA, FAQ über grid-rows) → nur noch `transform: scaleY`, FAQ ohne Höhen-Tween.
- Zeilen-Hover 450ms ease-in-out → 280ms ease-out, Hover nur bei `(hover:hover) and (pointer:fine)`.
- Zwei Dauerbewegungen im Hero (Schalter + Ticker alle 2,2s) → die Schalter sind die eine Bewegung; Protokoll nur alle 4s und pausiert außerhalb des Sichtfelds; Pegel läuft nur sichtbar.
- Scroll-Linie: Scroll-Listener ohne rAF, SVG-Dasharray → rAF-gedrosselt, `scaleX` auf einem Balken.
- Reduced Motion schaltete alles hart ab → jetzt sanftere Fades statt Bewegung (Emil Standard 8).

## Accessibility und Mobile
- Kein `:focus-visible` → einheitlicher Fokusring (Hallmark 6, UI UX Pro Max Prio 1).
- Mega-Menü nur per Hover/focus-within → `aria-expanded`, Klick, Escape, Schließen beim Fokusverlust.
- Mobil gab es gar keine Navigation → Menü-Button mit Blatt (Touch-Ziele ≥ 44px).
- Inhalte mit `.rv` ohne JavaScript unsichtbar → Ausblenden nur mit Klasse `js` (Hallmark 7).
- `overflow-x: clip` auf html/body (Hallmark 4).

## Offen
- Demo-Nummer, echte Branchen-Unterseiten und Ratgeber-Links sind Platzhalter.
- Sloplint/Impeccable-Detector einmal lokal laufen lassen, sobald der Mac verbunden ist.
