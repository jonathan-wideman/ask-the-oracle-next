export function classNames(...items) {
  return items.filter((text) => text != null).join(' ');
}

export const animationDelay = 500
export function styleAnimationDelay(factor) { return { "--delay": `${Math.round(animationDelay * factor)}ms` } }
