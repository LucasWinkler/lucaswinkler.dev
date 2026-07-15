export const panelShellClass =
  'work-panel-shell relative isolate min-w-0 shrink-0 rounded-(--radius-panel) snap-start flex-[0_0_calc(100%-2*var(--section-padding-x))] md:snap-none md:[flex:var(--panel-grow)_1_0]';

export const panelSurfaceClass =
  'work-panel relative h-full w-full overflow-hidden rounded-(--radius-panel) shadow-(--shadow-panel) [contain:layout_style]';

export const listClass =
  '@container work-list flex h-[clamp(20rem,56vh,28rem)] w-[calc(100%+2*var(--section-padding-x))] max-w-none select-none gap-0 py-1 [contain:layout] [margin-inline:calc(-1*var(--section-padding-x))] snap-x snap-proximity [scroll-padding-inline:var(--section-padding-x)] overflow-x-auto [overflow-anchor:none] [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:h-[clamp(16rem,44vh,22rem)] md:w-full md:gap-2 md:py-0 md:[margin-inline:0] md:snap-none md:overflow-visible md:[scroll-padding-inline:0] work:h-[clamp(18rem,52vh,34rem)]';

export const panelInsetClass = 'ms-(--section-padding-x) md:ms-0';
export const panelGapClass = 'ms-2 md:ms-0';
export const panelEndInsetClass = 'me-(--section-padding-x) md:me-0';
