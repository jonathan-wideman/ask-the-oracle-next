export function classNames(...items) {
  return items.filter((text) => text != null).join(' ');
}

export function styleAnimationDelay(ms) { return { "--delay": `${ms}ms` } }
