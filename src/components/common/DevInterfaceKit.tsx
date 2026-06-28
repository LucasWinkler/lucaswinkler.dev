import { InterfaceKit } from 'interface-kit/react';

export function DevInterfaceKit() {
  if (!import.meta.env.DEV) {
    return null;
  }

  return <InterfaceKit enabled />;
}
