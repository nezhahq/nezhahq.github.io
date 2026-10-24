---
description: Test and contribute to Nezha Monitoring with Go tests, race and vet, frontend checks, documentation builds, pinned cross-repository integration, browser validation, and review evidence.
outline: deep
---

# Testing, contributions, and release checks

Match verification to the layer changed. Documentation-only work need not rebuild Agent; protocol/lifecycle work needs more than a working homepage. These are checks developers can run, not a claim that every project suite has already been executed for each change.

## Go backend and Agent

Prepare Dashboard Swagger and nonempty frontend assets using the [quick start](/en_US/developer/getting-started.html), then run from each repository root:

```bash
go test -mod=readonly -count=1 ./...
go vet ./...
go test -mod=readonly -race -shuffle=on -count=1 ./...
```

`-race` requires a supported platform and C compiler. Functional and race checks are complementary. Regression tests should reproduce the bug, not merely mirror implementation.

Both repositories' `.github/workflows/test.yml` include ordinary, race/quality, and cross-repository stress verification. `agentcompat` uses pinned source combinations and dedicated build tags. For reporting, reconnection, exactly-once task execution, or shutdown changes, reuse those pinned scenarios rather than dropping steps or replacing revisions with arbitrary latest versions.

## User theme

```bash
pnpm install --frozen-lockfile
pnpm verify
```

The current script combines code checks, coverage, type checking, and production build. Coverage does not prove chart appearance; mocks/doubles do not prove real authorization, recovery, or asset publication. Check frontend main and the Dashboard manifest's bundled version separately.

## Admin frontend

```bash
npm ci
npm run lint
npm test
npm run build
```

For real login/form/routing integration, start an isolated backend following the repository README, then prepare browsers and run Playwright:

```bash
npm run e2e:install
npm run e2e
```

E2E changes admin state: never point it at production. Preserve reports, backend logs, and failing URLs while removing credentials.

## Documentation

Run from the documentation repository root:

```bash
npm ci
npm test
git diff --check
```

`npm test` includes VitePress build, SEO/bilingual-page/internal-link auditing, and MCP component tests. New pages need synchronized Chinese/English navigation, related links, and appropriate `llms.txt` entries. Descriptions should accurately state the problem a page solves.

## Browser verification matrix

| Dimension | Minimum coverage |
| --- | --- |
| Identity | Guest, member, admin, expired session, mandatory login |
| Routing | Direct open/refresh, client navigation, HTTP status, asset base |
| Data | Empty fleet, offline, missing fields, TSDB on/off, empty history |
| Failure | Network loss/recovery, timeouts, out-of-order requests, retryable failures |
| Layout | Desktop, narrow screens, long text, light/dark, keyboard focus |

Record browser and viewport. Simulated narrow screens are not physical-phone tests. Mark unrun checks as unverified instead of substituting unit results for visual findings.

## Submission and rollback

Use an isolated branch. Describe the issue, change, compatibility, and checks actually run. Follow repository lockfile/generated-output rules. Never submit development databases, logged tokens, or test-user credentials.

Retain prior theme artifacts; provide [backup/recovery](/en_US/guide/q5.html) for storage/configuration changes; record paired Dashboard/Agent commits for protocol work. Publishing, merging, and deploying are distinct from local verification: a successful build does not mean a change is live.
