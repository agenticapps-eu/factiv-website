# factiv.eu Relaunch: Analyse, Informationsarchitektur, SEO/GEO

**Stand:** 13.11.2026 · **Von:** Donald (mit Claude) · **Für:** Bernard (Marketing mit neuroflash), Claude Code (Umsetzung)

## 1. Befund: Was die Seite heute ist

| Punkt | Heute (factiv.eu, Repo `factiv-website`, Stand Mai 2026) | Problem |
|---|---|---|
| Positionierung | „Agentic software that ships“, Studio zu zweit, Zielgruppe Enterprise Versicherung/Finanz | Passt nicht mehr: factiv verkauft heute an **deutsche KMU** (Praxen, Pflege, Gebäudedienste, Handwerk, Beratung) |
| Angebot | 4 abstrakte Leistungen (Workflow, Architektur, Agents, Strategie) | Die echten Produkte fehlen: Telefonassistent (inbound/outbound), Portal mit Modulen, Planung, Belege/E-Rechnung, Content über neuroflash |
| Struktur | One-Pager mit Ankern, EN zuerst, DE als Kopie | Keine Unterseiten, also kaum Suchbegriffe, keine Branchen- oder Themenseiten, nichts, was ein LLM zitieren kann |
| Look | Fast-schwarz + Gold, Bebas Neue in Versalien, Dot-Grid, Radial-Glows, „01 —“-Nummerierung, Pill-Buttons, Kontrastsätze („Demos vs. Software“) | Genau das Muster, das man von KI-generierten Landingpages kennt |
| Personen | Donald + Bernard als Gründer (Text, JSON-LD, „2 Builder“-Pill) | Bernard muss raus (Text, Schema, Status-Pill, Impressum). Die GbR gibt es nicht mehr: **Anbieter im Impressum ist nur Donald Vlahovic (Gewerbe, Geschäftsbezeichnung factiv)**, Impressum und Datenschutz (DE/EN) entsprechend anpassen |
| Technik | Statisches HTML, GitHub Pages, eine sitemap mit 4 URLs | Für 30+ Seiten braucht es einen Generator (Vorschlag: Astro, statisch, Cloudflare Pages) |

## 2. Informationsarchitektur (DE zuerst, EN später)

```
/                                   Startseite
/branchen/                          Übersicht
  /branchen/zahnarztpraxis/         KI-Telefonassistent für Zahnarztpraxen
  /branchen/arztpraxis/             … für Hausarzt- und Facharztpraxen
  /branchen/pflegedienst/           Rückruf, Diktat, Touren- und Dienstplanung
  /branchen/gebaeudedienste/        Rechnungslauf, Belege, Einsatzplanung, Nachkalkulation
  /branchen/handwerk/               Telefon, Angebote, Einsatzplanung
  /branchen/hausverwaltung/         Anfragen, Fristen, Dokumente
  /branchen/beratung-agentur/       Outbound-Terminierung, Content & Leads
/loesungen/                         Übersicht
  /loesungen/ki-telefonassistent/
  /loesungen/outbound-terminierung/
  /loesungen/e-mail-zentrale/
  /loesungen/belege-und-e-rechnung/
  /loesungen/personal-und-tourenplanung/
  /loesungen/wissensassistent/
  /loesungen/content-und-leads/     (neuroflash als Text-Motor)
/plattform/                         factiv Portal: Module, Prüf-Warteschlange, Betriebsmodi, EU-Hosting
/sicherheit/                        DSGVO, EU AI Act (KI-Offenlegung), Datenklassen, Hosting, AVV
/ratgeber/                          Wissensartikel (GEO-Hebel, Bernard + neuroflash)
/ueber-uns/  /kontakt/  /impressum/  /datenschutz/
```

**Menü:** `Branchen ▾` · `Lösungen ▾` · `Plattform` · `Ratgeber` · `Über uns` · CTA `Demo anrufen` (echte Demo-Nummer des Callbots) + `Erstgespräch`.
Branchen und Lösungen als Mega-Menü mit je einer Zeile Nutzen, damit das Menü selbst schon Suchbegriffe trägt.

**Kreuz-Verlinkung:** Jede Branchenseite verlinkt 3–4 Lösungen, jede Lösungsseite die passenden Branchen. Das ist die Matrix aus dem factiv-Kit (Use Case × Branche).

## 3. Vorlage Branchen-Landingpage

1. H1 mit Suchbegriff: „KI-Telefonassistent für Zahnarztpraxen“
2. Antwort-Absatz (40–60 Wörter, sachlich, zitierfähig): was es ist, für wen, was es kostet/wie es startet
3. Alltag heute → mit factiv (konkrete Szenen aus Bernards Branchenanalyse)
4. Passende Module (aus dem Portal-Katalog)
5. Hörbeispiel / Live-Demo (Callbot-Branchen-Template)
6. Ablauf: Labor → Schattenbetrieb → Pilot → Live
7. Sicherheit für diese Branche (z. B. Schweigepflicht, keine Triage, Notfallweiterleitung)
8. FAQ (5–8 echte Fragen aus Verkaufsgesprächen) mit `FAQPage`-Schema
9. CTA: Demo anrufen / Erstgespräch

## 4. SEO

- Ein Haupt-Suchbegriff pro Seite, in Title, H1, URL, erstem Absatz. Beispiele: „KI Telefonassistent Zahnarztpraxis“, „KI Telefonassistent Pflegedienst“, „Tourenplanung Pflegedienst Software“, „E-Rechnung Gebäudereinigung“, „KI Outbound Terminvereinbarung“.
- Statisches HTML, kein Client-Rendering für Inhalte; Core Web Vitals: Animationen nur mit `transform`/`opacity`, Fonts selbst gehostet, `font-display: swap`.
- `hreflang` DE/EN, kanonische URLs, sitemap automatisch aus Astro.
- Interne Links mit sprechendem Ankertext, Breadcrumbs mit `BreadcrumbList`.

## 5. GEO (Sichtbarkeit in ChatGPT, Perplexity, Gemini, Claude)

- **Antwort zuerst:** Jede Seite beginnt mit einem Absatz, den ein LLM wörtlich übernehmen kann (wer, was, für wen, wo gehostet).
- **Strukturierte Daten:** `Organization` (ohne Bernard), `Service` je Lösung mit `areaServed: DE`, `FAQPage`, `BreadcrumbList`, `Article` im Ratgeber mit Autor (Donald, `Person` + `sameAs` LinkedIn).
- **`/llms.txt`** und `/llms-full.txt` mit Kurzbeschreibung, Branchen, Lösungen und Links.
- **Fakten statt Superlative:** konkrete Abläufe, Grenzen („keine medizinische Triage“), Hosting-Orte, Einführungsphasen. Das wird eher zitiert als Werbesprache.
- **Ratgeber-Cluster** (Bernard mit neuroflash, Donald gibt fachlich frei): „Darf eine KI in der Arztpraxis ans Telefon?“, „KI-Offenlegung nach EU AI Act am Telefon“, „E-Rechnung Pflicht 2027 für Handwerk und Gebäudedienste“, „Tourenplanung im ambulanten Pflegedienst“. Pro Artikel eine klare Frage als H1.
- `robots.txt`: KI-Crawler (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) bewusst erlauben.

## 6. Arbeitsteilung

- **Donald / Claude Code:** Impressum/Datenschutz auf Donald als Einzelunternehmer umstellen, Astro-Grundgerüst, Design-System des gewählten Vorschlags, Vorlagen (Branche, Lösung, Ratgeber), Schema, llms.txt.
- **Bernard:** Inhalte je Branche aus seiner Branchenanalyse, Texte mit neuroflash (eigene Brand Voice „factiv“ anlegen), FAQ aus echten Gesprächen. Inhalte als Markdown/MDX in `src/content/`, damit er ohne Code arbeiten kann.

## 7. Design-Vorschläge (Stand 13.11.2026)

Siehe `design-exploration/v5-2026-11/` (v2 = geprüft mit Hallmark, Impeccable, Emil Kowalski, UI UX Pro Max):
- **A · Betriebsanleitung** – hell, redaktionell, Modul-Schalter + Live-Protokoll im Hero
- **B · Live-Leitung** – produktgeführt, simuliertes Telefonat im Hero (Empfehlung)
- ~~C · Branchen-Atlas~~ – verworfen (Donald, 13.11.2026)

Entscheidung A oder B steht aus. Aufgaben: Todoist-Projekt „factiv Website-Relaunch“.
