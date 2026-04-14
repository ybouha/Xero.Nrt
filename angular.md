# Angular Expert Rules

## Tech Stack
- Angular 17+ (Prefer Angular 18 features)
- Strict TypeScript
- RxJS & Angular Signals

## Architecture & Components
- Use Standalone Components exclusively. Do not use `NgModules` unless interfacing with legacy libraries.
- Enforce `ChangeDetectionStrategy.OnPush` on all components.
- Use modern Control Flow syntax (`@if`, `@for`, `@switch`) instead of structural directives (`*ngIf`, `*ngFor`).
- Extract business logic into Injectable Services (provided in root or specific components). Components should only handle presentation logic.

## State Management & Reactivity
- Favor **Signals** (`signal`, `computed`, `effect`) for synchronous state and UI reactivity.
- Use **RxJS** strictly for asynchronous operations (HTTP calls, WebSocket streams, event listeners).
- Use `toSignal` and `toObservable` to bridge RxJS and Signals cleanly.
- Unsubscribe from Observables automatically using `takeUntilDestroyed()` or the `AsyncPipe` (if not using Signals). 

## Typing & Forms
- Enable `strict` mode in `tsconfig.json`. Avoid `any`; use `unknown` or define proper interfaces/types.
- Use Reactive Forms (`FormBuilder`, `FormGroup`, `FormControl`) with strict typing. Never use Template-Driven forms.

## API Integration
- Use the functional `provideHttpClient()` with `withInterceptors()` for intercepting requests (e.g., attaching JWTs, global error handling).
- Create dedicated Http Services that return typed Observables.