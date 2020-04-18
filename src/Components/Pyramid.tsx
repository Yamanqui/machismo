import React from 'react';
import axios from 'axios';
import { Heading } from 'spectacle';
import { VictoryChart, VictoryBar, VictoryAxis, VictoryLabel } from 'victory';
import parseCSV from '../utils/csv-utils';
import { DataState } from '../utils/types';
import type { Data, PlotData } from '../utils/types';
import useKeyboardControl from '../hooks/use-keyboard-control';
import makeTheme, {
  backgroundStyle,
  singleLineGridStyle,
  purpleBarStyle,
  yellowBarStyle,
  titleStyle,
  leftTextStyle,
  yearTextStyle,
  totalsTextStyle,
  totalsNumberStyle,
  leftNumberStyle,
  rightNumberStyle,
} from '../utils/styles';
import lentes from '../images/lentes.svg';


type PyramidProps = {
  file: string,
  width?: number,
  height?: number,
  padding?: {
    top: number,
    bottom: number,
    left: number,
    right: number,
  },
  yearLabelsFontSize?: number,
  axisFontSize?: number,
  speed?: number,
  repeat?: boolean,
};

Pyramid.defaultProps = {
  width: 560,
  height: 300,
  padding: {
    top: 50,
    bottom: 50,
    left: 70,
    right: 30
  },
  yearLabelsFontSize: 9,
  axisFontSize: 10,
  speed: 15,
  repeat: false,
};

type BackgroundProps = {
  width: number,
  height: number,
  padding: {
    top: number,
    bottom: number,
    left: number,
    right: number,
  }
};

function Background(props: BackgroundProps) {
  const myWidth = props.width - props.padding.left - props.padding.right;
  const myHeight = props.height - props.padding.top - props.padding.bottom;
  const imageFillX = 0.5;
  const imageFillY = 0.8;
  const imageMargin = 10;

  return (
    <>
      <rect
        x={props.padding.left}
        y={props.padding.top}
        width={myWidth}
        height={myHeight}
        style={backgroundStyle}
      />
      <image
        href={lentes}
        x={props.padding.left + imageMargin}
        y={props.padding.top + imageMargin}
        width={(myWidth / 2) * imageFillX}
        height={myHeight * imageFillY}
      />
      <image
        href={lentes}
        x={props.width - props.padding.right
          - imageMargin - imageFillX * (myWidth / 2)}
        y={props.padding.top + imageMargin}
        width={(myWidth / 2) * imageFillX}
        height={myHeight * imageFillY}
      />
    </>
  );
}

function Pyramid(props: PyramidProps) {
  const [dataState, setDataState] = React.useState(DataState.Loading);
  const [frame, setFrame] = React.useState(0);
  const data = React.useRef<Data | null>(null);

  const labelMargin = 2;

  const {
    file,
    width, height, padding,
    yearLabelsFontSize, axisFontSize,
    speed, repeat,
  } = props;

  const theme = makeTheme(width!, height!, yearLabelsFontSize!, axisFontSize!);

  React.useEffect(() => {
    setDataState(DataState.Loading);
    axios.get(`${process.env.PUBLIC_URL}/data/${file}.csv`).then((result) => {
      data.current = parseCSV(result.data);
      setDataState(DataState.Ready);
    }).catch(() => setDataState(DataState.Error));
  }, [file]);

  useKeyboardControl(dataState, data.current!, setFrame, speed!, repeat!);

  if (dataState === DataState.Loading) {
    return (<Heading>Cargando...</Heading>);
  }
  if (dataState === DataState.Error) {
    return (<Heading>Error...</Heading>);
  }

  return (
    <VictoryChart
      horizontal
      singleQuadrantDomainPadding={{ x: true }}
      padding={padding!}
      domainPadding={{ x: 6 }}
      domain={{ y: [-data.current!.maxValue, data.current!.maxValue] }}
      theme={theme}
    >
      <Background
        width={width!}
        height={height!}
        padding={padding!}
      />
      <VictoryLabel
        x={width! / 2}
        y={0}
        style={titleStyle}
        text={data.current!.title}
      />
      <VictoryLabel
        x={padding!.left}
        y={height}
        style={leftTextStyle}
        text={data.current!.sources[frame]}
      />
      <VictoryLabel
        x={width! - padding!.right}
        y={padding!.top - 2 * labelMargin}
        style={yearTextStyle}
        text={`Año: ${data.current!.times[frame]}`}
      />
      <VictoryAxis
        dependentAxis
        crossAxis={false}
        style={singleLineGridStyle}
        tickCount={11}
        tickFormat={(t) => Math.abs(t / data.current!.factor)}
        label={data.current!.label}
      />
      <VictoryAxis offsetX={padding!.left} />
      <VictoryBar
        data={data.current!.left}
        x="group"
        y={(datum: PlotData) => datum.values[frame]}
        style={purpleBarStyle}
        barRatio={1}
      />
      <VictoryBar
        data={data.current!.right}
        x="group"
        y={(datum: PlotData) => datum.values[frame]}
        style={yellowBarStyle}
        barRatio={1}
      />
      <VictoryLabel
        x={padding!.left + labelMargin}
        y={padding!.top + labelMargin}
        style={leftNumberStyle}
        text={[
          (-data.current!.totalsLeft[frame]).toLocaleString('es-MX'),
          `(${(100 * -data.current!.totalsLeft[frame] / data.current!.totals[frame]).toFixed(1)}%)`,
        ]}
      />
      <VictoryLabel
        x={width! - padding!.right - labelMargin}
        y={padding!.top + labelMargin}
        style={rightNumberStyle}
        text={[
          (data.current!.totalsRight[frame]).toLocaleString('es-MX'),
          `(${(100 * data.current!.totalsRight[frame] / data.current!.totals[frame]).toFixed(1)}%)`,
        ]}
      />
      <VictoryLabel
        x={width! / 2 - labelMargin}
        y={padding!.top - labelMargin}
        style={totalsTextStyle}
        text="Total: "
      />
      <VictoryLabel
        x={width! / 2 + labelMargin}
        y={padding!.top - labelMargin}
        style={totalsNumberStyle}
        text={data.current!.totals[frame].toLocaleString('es-MX')}
      />
    </VictoryChart>
  );
}

export default Pyramid;