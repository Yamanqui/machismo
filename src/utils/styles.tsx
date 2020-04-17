import '../fonts/fonts.css';

// Colors
export const darkBlue = '##22466a';
export const yellow = '#fffd38';
export const lightBlue = '#e2f0fc';
export const lightGreen = '#9dfecd';
export const purple = '#a05fde';
export const darkYellow = '#f4f754';

// Typography
const sansSerif = "'Roboto', 'Helvetica Neue', Helvetica, sans-serif";
const monospace = "'Fira Mono', 'Courier New', Courier, monospace";
const letterSpacing = 'normal';
const fontSize = 11;

// Strokes
const strokeLinecap = 'round';
const strokeLinejoin = 'round';

const baseLabelStyles = {
  fontFamily: sansSerif,
  fontSize,
  letterSpacing,
  padding: 6,
  fill: yellow,
  stroke: 'transparent',
  strokeWidth: 0,
};

const centeredLabelStyles = {
  textAnchor: 'middle',
  ...baseLabelStyles,
};

const darkNumberStyles = {
  ...baseLabelStyles,
  fill: darkBlue,
  fontFamily: monospace,
  verticalAnchor: 'start',
};

export const singleLineGridStyle = {
  grid: {
    stroke: (datum: { tick: number }) => datum.tick !== 0 ? 'transparent' : lightGreen
  }
};

export const purpleBarStyle = {
  data: {
    fill: purple
  }
};

export const yellowBarStyle = {
  data: {
    fill: darkYellow
  }
};

export const backgroundStyle = {
  fill: lightBlue,
  stroke: lightGreen,
  strokeWidth: 1,
};

export const leftNumberStyle = {
  ...darkNumberStyles,
  textAnchor: 'start',
} as React.CSSProperties;

export const rightNumberStyle = {
  ...darkNumberStyles,
  textAnchor: 'end',
} as React.CSSProperties;

export const titleStyle = {
  ...centeredLabelStyles,
  fontSize: 14,
  fontWeight: 900,
  verticalAnchor: 'start',
} as React.CSSProperties;

export const leftTextStyle = {
  ...baseLabelStyles,
  fontSize: 7,
  textAnchor: 'start',
  verticalAnchor: 'end',
} as React.CSSProperties;

export const yearTextStyle = {
  ...baseLabelStyles,
  textAnchor: 'end',
  verticalAnchor: 'end',
  fontSize: 14,
  fontWeight: 900,
} as React.CSSProperties;

export const totalsTextStyle = {
  ...baseLabelStyles,
  fontFamily: monospace,
  textAnchor: 'end',
  verticalAnchor: 'end',
} as React.CSSProperties;

export const totalsNumberStyle = {
  ...totalsTextStyle,
  textAnchor: 'start',
} as React.CSSProperties;


function makeTheme(
  width: number,
  height: number,
  yearLabelsFontSize: number,
  axisFontSize: number,
) {
  const baseProps = {
    width,
    height,
    padding: 50,
  };

  const baseAxisStyle = {
    axis: {
      fill: 'transparent',
      stroke: lightGreen,
      strokeWidth: 2,
      strokeLinecap,
      strokeLinejoin,
    } as React.CSSProperties,
    axisLabel: {
      ...baseLabelStyles,
      padding: 20,
      fontSize: axisFontSize + 2,
    } as React.CSSProperties,
    grid: {
      stroke: 'transparent',
      strokeWidth: 0,
    },
  };

  const theme = {
    chart: {
      ...baseProps,
    },
    dependentAxis: {
      ...baseProps,
      style: {
        ...baseAxisStyle,
        ticks: {
          size: 4,
          stroke: lightGreen,
          strokeWidth: 2,
          strokeLinecap,
          strokeLinejoin,
        } as React.CSSProperties,
        tickLabels: {
          ...baseLabelStyles,
          fontSize: axisFontSize,
          padding: 1,
        },
      },
    },
    independentAxis: {
      ...baseProps,
      style: {
        ...baseAxisStyle,
        ticks: {
          strokeWidth: 0,
        },
        tickLabels: {
          ...baseLabelStyles,
          fontSize: yearLabelsFontSize,
        }
      },
    },
    bar: {
      ...baseProps,
      style: {
        data: {
          fill: purple,
          stroke: 'black',
          strokeWidth: .2,
        }
      }
    }
  };

  return theme;

}

export default makeTheme;