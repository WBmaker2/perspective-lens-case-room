# Perspective Lens Case Room E2E CI Implementation Plan

**Goal:** Codex macOS 샌드박스에서 반복되는 Chromium `MachPortRendezvousServer` 권한 오류를 앱 결함과 분리하고, Ubuntu GitHub Actions에서 Playwright E2E를 재현 가능한 정식 품질 게이트로 실행한다. `main`의 Pages 배포는 E2E가 통과한 뒤에만 진행하며, 로컬에서는 외부 Terminal/iTerm 실행 절차를 제공한다.

**Architecture:** 앱 런타임·도메인·저장 경계는 변경하지 않는다. PR에서는 독립적인 `e2e.yml`이 Ubuntu Chromium 검사를 실행하고, `pages.yml`의 `build` job도 같은 브라우저 설치·E2E 단계를 완료한 뒤에만 Pages artifact를 업로드한다. 배포 job은 기존처럼 `build` 성공에 의존한다. 로컬 Codex 샌드박스는 브라우저 실행 경로에서 제외하고 외부 셸 또는 CI를 사용한다.

**Tech Stack:** GitHub Actions `ubuntu-latest`, Node.js 22, `npm ci`, Playwright 1.62, `npx playwright install --with-deps chromium`, Vite preview webServer, Vitest 4, TypeScript 6.

**Spec:** `docs/superpowers/plans/2026-08-28-elementary-learner-improvements.md`, `.github/workflows/pages.yml`, 현재 Codex macOS Chromium sandbox failure evidence.

## Global Constraints

- React/TypeScript 앱 코드, 판정 로직, 세션·메모·읽기 설정 저장 키, 학생 개인정보 경계를 수정하지 않는다.
- E2E는 `--no-sandbox`, `--single-process`, Mach 기능 비활성화 플래그로 우회하지 않는다. Ubuntu CI의 표준 Chromium 실행을 사용한다.
- Pages 배포는 E2E 실패 시 artifact 업로드와 deploy job을 실행하지 않는다.
- CI workflow에는 외부 데이터 전송·학생 데이터·AI·분석 SDK를 추가하지 않는다.
- PR 검사는 `contents: read`만 사용하고, Pages workflow의 `pages: write`·`id-token: write` 권한은 배포 workflow에만 남긴다.
- 현재 앱의 `base: './'`, 375px·640px 반응형, keyboard-only, ARIA/axe, reduced motion, 인쇄, `gi-pulse` 검증을 그대로 실행한다.
- VoiceOver 구현·호출·검증은 수행하지 않는다.
- workflow 문서와 테스트도 저장소의 기존 명명 규칙을 따르며, 소스·테스트 파일은 500줄 미만으로 유지한다.
- 로컬 외부 셸 절차는 실행 명령만 문서화하고, 이 계획 구현에서는 사용자 브라우저를 강제로 종료하거나 광범위한 캐시를 삭제하지 않는다.

## Expected Files and Responsibilities

| Path | Responsibility |
| --- | --- |
| `.github/workflows/e2e.yml` | PR·수동 실행용 Ubuntu Playwright 품질 게이트, Node/npm/browser 설치, build와 전체 E2E 실행 |
| `.github/workflows/pages.yml` | `main` Pages build job에서 E2E를 deploy 전 필수 단계로 실행 |
| `src/test/ciWorkflow.test.ts` | 두 workflow의 trigger, 권한, Node 22, browser install, E2E-before-upload 계약 회귀 테스트 |
| `README.md` | CI가 정식 브라우저 검증 경로임을 설명하고 외부 Terminal 로컬 실행 명령과 4173 포트 주의사항 기록 |
| `docs/superpowers/plans/2026-08-28-e2e-ci-workflow.md` | 이 변경의 설계·TDD·명령·커밋 절차 |

## Workflow Contracts

```ts
interface E2EWorkflowContract {
  readonly pullRequestBranches: readonly ['main'];
  readonly runner: 'ubuntu-latest';
  readonly nodeVersion: 22;
  readonly browserInstallCommand: 'npx playwright install --with-deps chromium';
  readonly buildCommand: 'npm run build';
  readonly e2eCommand: 'npx playwright test';
  readonly permissions: { readonly contents: 'read' };
}

interface PagesWorkflowGateContract {
  readonly e2eStepPrecedesArtifactUpload: true;
  readonly deployNeeds: 'build';
  readonly pagesBuildType: 'workflow';
}
```

## Sequential Implementation Tasks

### Task 1: Lock the CI and deployment-gate contracts with failing tests

**Files:**
- Create: `src/test/ciWorkflow.test.ts`

**TDD steps:**

1. Read `.github/workflows/e2e.yml`, `.github/workflows/pages.yml`, and `README.md` as text in the test and assert the exact workflow names, `pull_request` target `main`, `ubuntu-latest`, `node-version: 22`, `npm ci`, browser installation command, `npm run build`, `npx playwright test`, `contents: read`, E2E-before-upload order, and external Terminal command.
2. Run:

       npm test -- src/test/ciWorkflow.test.ts

   Expected: FAIL because `.github/workflows/e2e.yml` is absent, Pages has no browser install/E2E gate, and README has no external-shell procedure.

3. Keep the assertions narrow enough to validate behavior rather than YAML whitespace. Do not add a YAML parser dependency.

### Task 2: Add the PR Ubuntu E2E workflow

**Files:**
- Create: `.github/workflows/e2e.yml`

**Minimum implementation:**

- Name the workflow `Playwright E2E`.
- Trigger on `pull_request` targeting `main` and `workflow_dispatch`.
- Set only `permissions: contents: read`.
- Use `ubuntu-latest` and Node.js 22 with npm cache.
- Run `npm ci`, `npx playwright install --with-deps chromium`, `npm run build`, and `npx playwright test` in that order.
- Let the checked-in `playwright.config.ts` start its Vite preview webServer; do not add a second server or hard-code a repository-root URL.

**Verification:**

    npm test -- src/test/ciWorkflow.test.ts

Expected: the PR workflow contract assertions for `.github/workflows/e2e.yml` pass while Pages-gate assertions remain red until Task 3.

### Task 3: Gate Pages deployment on E2E

**Files:**
- Modify: `.github/workflows/pages.yml`

**Minimum implementation:**

- After `npm run build` and before `Upload Pages artifact`, install Chromium with `npx playwright install --with-deps chromium` and run `npx playwright test`.
- Keep all existing unit, type, lint, filesize, build, artifact, and deploy steps unchanged.
- Preserve `deploy.needs: build`, Pages permissions, concurrency, and `workflow_dispatch`.

**Verification:**

    npm test -- src/test/ciWorkflow.test.ts

Expected: E2E-before-upload and deploy-needs-build assertions pass; the test still fails if the E2E step is moved below artifact upload.

### Task 4: Document the two supported execution paths

**Files:**
- Modify: `README.md`

**Minimum implementation:**

- State that GitHub Actions Ubuntu is the canonical Chromium/E2E environment and Pages deploy waits for its E2E step.
- Add this local fallback with the repository path quoted:

      cd "/Volumes/ External Drive 256G/Dev2/codex/perspective-lens-case-room"
      npx playwright test --workers=1

- Explain that `MachPortRendezvousServer`/`Permission denied (1100)` in Codex macOS sandbox is an execution-environment limitation, not a learner-flow result. Do not recommend insecure browser flags.
- Explain that if port `4173` is already occupied, inspect the known Vite process or use a clean port; do not kill unrelated applications.
- Preserve the existing public Pages link, HVC link, privacy boundary, VoiceOver exclusion, and update-history instructions.

**Verification:**

    npm test -- src/test/ciWorkflow.test.ts
    npm test
    npm run typecheck
    npm run lint
    npm run lint:filesize
    npm run build
    git diff --check

Expected: 145 or more unit tests pass including the new contract test, static checks pass, and the README contains both supported execution paths without implying local Codex Chromium success.

### Task 5: Run the local and remote release-quality checks

**Files:**
- Verify: `.github/workflows/e2e.yml`, `.github/workflows/pages.yml`, `README.md`, `src/test/ciWorkflow.test.ts`

**Commands to run later:**

    npx playwright test --workers=1
    git status --short --branch
    git diff --check
    git push origin codex/fix-lens-layout

Expected local result: external Terminal/iTerm launches Chromium and all configured E2E specs pass. If the Codex sandbox rejects the launch, record that environment result without weakening tests; do not retry the same sandbox path more than three times.

After pushing the branch, open the GitHub Actions PR workflow and confirm `Playwright E2E` succeeds on Ubuntu. The later explicit release step may fast-forward `main` and Pages; this plan does not perform remote push or deployment automatically.

## Future Commit Sequence

    git add src/test/ciWorkflow.test.ts .github/workflows/e2e.yml .github/workflows/pages.yml README.md docs/superpowers/plans/2026-08-28-e2e-ci-workflow.md
    git commit -m "ci: move Playwright verification to Ubuntu"

Expected result: one local commit containing only the CI workflow, Pages E2E gate, contract test, README procedure, and this plan; no app runtime or storage changes.

## Self-Review Checklist

- [ ] Both workflows have exact paths and command order.
- [ ] PR permissions do not include Pages deployment permissions.
- [ ] E2E runs before Pages artifact upload and deploy still needs build.
- [ ] The external Terminal path is quoted and does not prescribe destructive process/cache cleanup.
- [ ] No insecure Chromium flags, VoiceOver claims, 임시 지시 문구, or student-data features were added.
- [ ] The existing HVC/public URL and update-history instructions remain intact.
