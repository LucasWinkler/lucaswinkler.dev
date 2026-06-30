type FocusVisibleOptions = FocusOptions & { focusVisible?: boolean };

export function focusVisible(element: HTMLElement | null | undefined): void {
  if (!element) {
    return;
  }

  element.focus({ focusVisible: true } as FocusVisibleOptions);
}
