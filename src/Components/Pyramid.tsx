import React from 'react';
import axios from 'axios';
import { FlexBox, Heading } from 'spectacle';
import { VictoryBar, VictoryChart } from 'victory';

enum DataState {
  Ready,
  Loading,
  Error,
}

type PyramidState = {
  dataState: DataState,
  isPlaying: boolean,
  frame: number,
};

type Data = {
  title: string,
  sources: string[],
  times: string[],
  maxValue: number,
  males: PlotData[],
  females: PlotData[],
};

type PlotData = {
  group: string,
  values: number[],
};

function parseLine(line:string) {
  const lineRegex = /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,\s]*(?:\s+[^,\s]+)*))\s*(?:,|$)/g;
  const result:string[] = [];
  line.replace(lineRegex, (match:string, g1:string, g2:string, g3:string) => {
    let data = '';
    if (g1 !== undefined) {
      data = g1;
    } else if (g2 !== undefined) {
      data = g2;
    } else if (g3 !== undefined) {
      data = g3;
    }
    data.replace(/\\'/g, '\'');
    data.replace(/\\"/g, '"');
    // data.replace(/\\n/g, '\n');
    result.push(data);
    return '';
  });
  return result;
}


function parseCSV(csvData: string): Data {
  const data = csvData.split('\n').map(parseLine);
  const title = data.shift()![0];
  const sources = data.shift()!.slice(1);
  const times = data.shift()!.slice(1);

  let maxValue = 0;

  const males:PlotData[] = [];

  let nextLine = data.shift();
  while (nextLine !== undefined && nextLine[0] !== 'Mujeres') {
    const group = nextLine.shift()!;
    const values = nextLine.map((value) => {
      const parsed = Number.parseFloat(value);
      if (Number.isNaN(parsed)) return 0;
      return parsed;
    });
    const localMaxValue = values.reduce((a, b) => Math.max(a, b));
    maxValue = Math.max(maxValue, localMaxValue);
    males.push({ group, values });
    nextLine = data.shift();
  }

  const females:PlotData[] = [];

  nextLine = data.shift();
  while (nextLine !== undefined && nextLine[0] !== undefined) {
    const group = nextLine!.shift()!;
    const values = nextLine.map((value) => {
      const parsed = Number.parseFloat(value);
      if (Number.isNaN(parsed)) return 0;
      return parsed;
    });
    const localMaxValue = values.reduce((a, b) => Math.max(a, b));
    maxValue = Math.max(maxValue, localMaxValue);
    females.push({ group, values });
    nextLine = data.shift();
  }

  let lastSource = '';
  for (let i = 0; i < sources.length; i += 1) {
    if (sources[i] === '') {
      sources[i] = lastSource;
    } else {
      lastSource = sources[i];
    }
  }

  return ({
    title, sources, times, maxValue, males, females,
  });
}

class Pyramid extends React.Component<{}, PyramidState> {
  data:Data | null = null;

  timer:number | undefined = undefined;

  constructor(props: {}) {
    super(props);

    this.state = {
      dataState: DataState.Loading,
      isPlaying: false,
      frame: 0,
    };
  }

  componentDidMount() {
    this.setState({ dataState: DataState.Loading });
    document.addEventListener('keyup', this.handleKeyPressed);

    axios.get(`${process.env.PUBLIC_URL}/data/Nacional1910.csv`).then((result) => {
      this.data = parseCSV(result.data);
      this.setState({ dataState: DataState.Ready });
    }).catch(() => {
      this.setState({ dataState: DataState.Error });
    });
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.handleKeyPressed);
  }

  handleKeyPressed = (event: KeyboardEvent) => {
    if (event.key === ' ') {
      this.playPause();
    } else if (event.key === 'ArrowUp') {
      this.stop();
      this.back();
    } else if (event.key === 'ArrowDown') {
      this.stop();
      this.advance();
    }
  };

  advance = () => {
    const { dataState } = this.state;
    if (dataState === DataState.Ready) {
      this.setState((state) => {
        let nextFrame = state.frame + 1;
        if (nextFrame >= this.data!.times.length) {
          nextFrame = 0;
        }
        return ({ frame: nextFrame });
      });
    }
  };

  back = () => {
    const { dataState } = this.state;
    if (dataState === DataState.Ready) {
      this.setState((state) => {
        let prevFrame = state.frame - 1;
        if (prevFrame < 0) {
          prevFrame = this.data!.times.length - 1;
        }
        return ({ frame: prevFrame });
      });
    }
  };

  play = () => {
    const { dataState, isPlaying } = this.state;
    if (dataState === DataState.Ready && !isPlaying) {
      this.setState({ isPlaying: true });
      this.timer = window.setInterval(() => this.advance(), 30);
    }
  };

  stop = () => {
    window.clearInterval(this.timer);
    this.setState({ isPlaying: false });
  };

  playPause = () => {
    const { isPlaying } = this.state;
    if (isPlaying) {
      this.stop();
    } else {
      this.play();
    }
  };

  render() {
    const { dataState, frame } = this.state;

    if (dataState === DataState.Loading) {
      return (<Heading>Cargando...</Heading>);
    }
    if (dataState === DataState.Error) {
      return (<Heading>Error...</Heading>);
    }

    return (
      <FlexBox width="70%" alignSelf="center" bg="grey" flexDirection="column">
        <VictoryChart horizontal domain={{ y: [0, this.data!.maxValue] }}>
          <VictoryBar
            data={this.data?.females}
            x="group"
            y={(datum:PlotData) => datum.values[frame]}
          />
        </VictoryChart>
      </FlexBox>
    );
  }
}

export default Pyramid;
