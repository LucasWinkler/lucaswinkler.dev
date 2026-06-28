export function isInterfaceKitEnabled(): boolean {
  if (!import.meta.env.DEV) {
    return false;
  }

  const value = import.meta.env.INTERFACE_KIT_ENABLED;

  if (value === 'false' || value === '0') {
    return false;
  }

  return true;
}
