export function classNames(...items) {
  return items.filter((text) => text != null).join(" ");
}

export function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export const animationDelay = 500;
export function styleAnimationDelay(factor) {
  return { "--delay": `${Math.round(animationDelay * factor)}ms` };
}
