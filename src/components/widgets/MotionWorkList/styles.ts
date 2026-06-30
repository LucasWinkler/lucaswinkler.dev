export const panelShellClass =
  'work-panel-shell relative isolate min-w-0 shrink-0 rounded-(--radius-panel) max-[640px]:flex-[0_0_calc(100vw-var(--section-padding-x)-1.5rem)] min-[641px]:[flex:var(--panel-grow)_1_0] min-[641px]:[transition:flex-grow_0.44s_cubic-bezier(0.23,1,0.32,1)]';

export const panelSurfaceClass =
  'work-panel relative h-full w-full overflow-hidden rounded-(--radius-panel) shadow-(--shadow-panel) [contain:layout_style]';

export const panelSnapClass = 'max-[640px]:snap-start';

export const listClass =
  '@container work-list flex h-[clamp(18rem,52vh,34rem)] w-full select-none gap-2 [contain:layout] max-[900px]:h-[clamp(16rem,44vh,22rem)] max-[640px]:h-[clamp(20rem,56vh,28rem)] max-[640px]:w-screen max-[640px]:max-w-none max-[640px]:gap-0 max-[640px]:py-1 max-[640px]:[margin-inline:calc(50%-50vw)] max-[640px]:snap-x max-[640px]:snap-proximity max-[640px]:[scroll-padding-inline:var(--section-padding-x)] max-[640px]:overflow-x-auto max-[640px]:[overflow-anchor:none] max-[640px]:[-webkit-overflow-scrolling:touch] max-[640px]:[scrollbar-width:none] max-[640px]:[&::-webkit-scrollbar]:hidden';

export const panelInsetClass = 'max-[640px]:ms-(--section-padding-x)';
export const panelGapClass = 'max-[640px]:ms-2';
export const panelEndInsetClass = 'max-[640px]:me-(--section-padding-x)';
