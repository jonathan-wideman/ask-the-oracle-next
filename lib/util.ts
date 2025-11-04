export function classNames(...items: Array<string | null | undefined | false>) {
  return items.filter((text) => text != null).join(" ");
}

export function toTitleCase(str: string) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export const animationDelay = 500;
export function styleAnimationDelay(factor: number) {
  return { animationDelay: `${Math.round(animationDelay * factor)}ms` };
}
