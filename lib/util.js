export function classNames(...items) {
  return items.filter((text) => text != null).join(' ');
}