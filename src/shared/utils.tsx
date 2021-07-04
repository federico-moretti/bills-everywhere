export function handleExecuteKeyActions(e: React.KeyboardEvent, action: () => void) {
  if (e.code === 'Enter' || e.code === 'Space') action();
}
