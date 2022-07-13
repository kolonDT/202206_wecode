const calcRem = size => `${size / 16}rem`;

const fontSizes = {
  // ! 15px은 16px or 14px 선택, 13px은 12px로 바꿔쓰세요.
  xs: calcRem(12),
  small: calcRem(14),
  base: calcRem(16),
  lg: calcRem(18),
  xl: calcRem(20),
  xxl: calcRem(24),
  titleSize: calcRem(32),
};

const fontWeights = {
  thin: '200',
  light: '300',
  regular: '400',
  bold: '500',
  semiBold: '600',
  extraBold: '700',
};

const paddings = {
  small: calcRem(4),
  base: calcRem(8),
  large: calcRem(16),
  xl: calcRem(20),
  xxl: calcRem(24),
  xxxl: calcRem(40),
};

const margins = {
  small: calcRem(4),
  base: calcRem(8),
  large: calcRem(16),
  xl: calcRem(20),
  xxl: calcRem(24),
  xxxl: calcRem(40),
  xxxxl: calcRem(50),
};
// kolon mobility의 bi 색상을 따릅니다.
const colors = {
  superBlue: '#0051BA',
  heartPink: '#F8485E',
  blackC: '#2D2926',
  white: '#ffffff',
  skyMint: '#2AD2C9',
  green: '#009473',
  trueGold: '#8B6F4E',
  darkGray: '#929599',
  gray: '#A7A9AC',
  evBlue: '#0E8CCC',
  disabled: '#ebebeb',
  background: '#fafafa',
  primaryBlue: '#085ed6',
};

const flex = {
  flexBox: (direction = 'row', align = 'center', justify = 'center') => `
    display: flex;
    flex-direction: ${direction};
    align-items: ${align};
    justify-content: ${justify};
  `,
};

const theme = {
  fontSizes,
  fontWeights,
  paddings,
  margins,
  colors,
  flex,
};

export default theme;
