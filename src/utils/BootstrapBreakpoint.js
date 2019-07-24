export const divecesWidth = {
  mobile: 576,
  tablet: 768,
  desktop: 992,
  largeDesktop: 1200,
}

export function isDesktop () {
  return window.innerWidth >= divecesWidth.desktop
}
export function isTablet () {
  return window.innerWidth <= divecesWidth.tablet
}
