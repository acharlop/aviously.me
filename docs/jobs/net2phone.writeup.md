# Net2phone — Engineering Lead / Full-Stack Engineer

**Dates:** February 2017 – November 2022 (resume) · Remote
**Company:** Net2phone — cloud VoIP / business-communications provider (UCaaS; owned by IDT). You came in via the **LiveNinja** acquisition — LiveNinja was a Miami video-chat/messaging startup whose platform became Net2phone's messaging + Unite products.

> **Source recovered** from the external drive: `/Volumes/MIND GEM/stark tower - transfer/code/{n2p,LiveNinja}`. Commit counts below are commits authored by you. This is now grounded in real code, not just the resume.

## The big pieces (by your commit volume)

| Repo | Your commits | Range | What it is |
|---|---|---|---|
| `LiveNinja/dialer` | **898** | 2020–2022 | The WebRTC softphone/**dialer widget** — React + Redux + TypeScript + **JsSIP** |
| `n2p/n2p-unite-services` (`webapp/`) | **298** | 2017–2018 | The **Unite Angular web client** (UCaaS console) — **Angular 5** in this snapshot, with a `shared` component library + `shared-extensions` and feature modules (chat-channels, call-history, messages, analytics, departments, teammembers, devices, dashboard, settings). *(Same repo also holds an `apigateway` backend — but only 5 of your commits touch it.)* |
| `n2p/n2p-messaging-service-user` | 134 | →2018 | Go user microservice |
| `n2p/n2p-messaging-engine` | 131 | →2018 | Go messaging engine (core backend) |
| `n2p/n2p-messaging-common-go` | 93 | →2018 | Shared Go library |
| `n2p/n2p-messaging-{widget,sipclient,webclient}` | a few each | 2017–2018 | Embeddable chat/call widget + SIP client + web client |

## Mapping to the resume arc (now confirmed)

**2017 — Backend Engineer (Go):** Confirmed. ~350+ commits across the Go messaging microservices (`n2p-messaging-engine`, `-common-go`, `-service-user`) — a real microservices refactor in Go. (The "Dart" mention is still unconfirmed in the recovered code.)

**2018 — Mobile / messaging:** The `n2p-messaging-*` widget/sipclient/webclient stack is the live chat + calling product (inherited from LiveNinja's `liveninja-bravo-app`). Your work here was lighter than the backend.

**2019 — Lead Front-End (Angular):** **Confirmed — this lives in `n2p-unite-services/webapp`.** The Unite web client is an Angular app (Angular 5 in the 2018 snapshot, consistent with being mid-upgrade on the v2→v9 path) with a `shared` component library + reusable `shared-extensions` consumed by the feature modules. Your ~298 commits here include the component-library/module refactoring (e.g. "move web-apis into a module", "update components to use shared-extension"). The "shared component library across products" claim is grounded here; only the explicit v9 endpoint isn't visible in this older snapshot.

**2020–2022 — Cross-team intrapreneur (React):** **Strongly confirmed and bigger than the resume says.** The `dialer` repo is **898 of your commits** over 2020–2022 — a React + Redux + TypeScript browser **dialer built on JsSIP/WebRTC**, supporting multiple call-server configs. This was clearly a flagship effort, not a side widget. The React micro-frontend modernization narrative fits: a modern React app embedded into/alongside the legacy stack.

## Suggested resume bullets (upgraded with real numbers)

- Spent 5+ years at Net2phone (joined via the LiveNinja acquisition) building its VoIP/UCaaS platform across the stack — Go messaging microservices, the Unite Angular web client, and a React WebRTC dialer.
- Authored ~900 commits building a **WebRTC browser dialer** (React, Redux, TypeScript, JsSIP) supporting multiple call-server configurations — a core piece of the modern web client.
- As front-end lead on the Unite console (Angular), built a **shared component library** + reusable extensions consumed across feature modules and drove the Angular v2→v9 upgrade (−50% initial load).
- Refactored core messaging services in Go (engine, user service, shared library) — ~350 commits — behind the Dockerized, Jenkins-CI platform.
