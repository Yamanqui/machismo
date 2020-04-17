import type { PlotData, Data } from './types';


function parseLine(line: string) {
  const lineRegex = /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,\s]*(?:\s+[^,\s]+)*))\s*(?:,|$)/g;
  const result: string[] = [];
  line.replace(
    lineRegex, (match: string, g1: string, g2: string, g3: string) => {
      let data = '';
      if (g1 !== undefined) {
        data = g1;
      } else if (g2 !== undefined) {
        data = g2;
      } else if (g3 !== undefined) {
        data = g3;
      }
      data = data.replace(/\\'/g, '\'');
      data = data.replace(/\\"/g, '"');
      data = data.replace(/\\n/g, '\n');
      result.push(data);
      return '';
    }
  );
  return result;
}

function getTotals(data: PlotData[]) {
  return data[0].values.map((_, index) =>
    data.map((element) =>
      element.values[index]).reduce((acc, curr) => acc + curr, 0)
  );
}

function addTotals(positive: number[], negative: number[]) {
  return positive.map((pos, index) => pos - negative[index]);
}

function fixMaxValue(value: number) {
  const radix = Math.floor(Math.log10(value));
  const reducedValue = Math.ceil(value / Math.pow(10, radix));
  const maxValue = reducedValue * Math.pow(10, radix);

  let factor: number;
  let label: string;

  if (radix >= 9) {
    factor = Math.pow(10, 9);
    label = 'Miles de millones de personas';
  } else if (radix >= 6) {
    factor = Math.pow(10, 6);
    label = 'Millones de personas';
  } else if (radix >= 3) {
    factor = Math.pow(10, 3);
    label = 'Miles de personas';
  } else {
    factor = 1;
    label = 'Personas';
  }

  return ({ maxValue, factor, label });
}

function parseCSV(csvData: string): Data {
  const data = csvData.split('\n').map(parseLine);
  const title = data.shift()![0];
  const sources = data.shift()!.slice(1);
  const times = data.shift()!.slice(1);

  let dataMaxValue = 0;

  const left: PlotData[] = [];

  let nextLine = data.shift();
  while (nextLine !== undefined && nextLine[0] !== 'Mujeres') {
    const group = nextLine.shift()!;
    const values = nextLine.map((value) => {
      const parsed = Number.parseFloat(value);
      if (Number.isNaN(parsed)) return 0;
      return -parsed;
    });
    const localMaxValue = -values.reduce((a, b) => Math.min(a, b));
    dataMaxValue = Math.max(dataMaxValue, localMaxValue);
    left.push({ group, values });
    nextLine = data.shift();
  }

  const totalsLeft = getTotals(left);

  const right: PlotData[] = [];

  nextLine = data.shift();
  while (nextLine !== undefined && nextLine[0] !== undefined) {
    const group = nextLine!.shift()!;
    const values = nextLine.map((value) => {
      const parsed = Number.parseFloat(value);
      if (Number.isNaN(parsed)) return 0;
      return parsed;
    });
    const localMaxValue = values.reduce((a, b) => Math.max(a, b));
    dataMaxValue = Math.max(dataMaxValue, localMaxValue);
    right.push({ group, values });
    nextLine = data.shift();
  }

  const totalsRight = getTotals(right);

  const totals = addTotals(totalsRight, totalsLeft);

  const { maxValue, factor, label } = fixMaxValue(dataMaxValue);

  let lastSource = '';
  for (let i = 0; i < sources.length; i += 1) {
    if (sources[i] === '') {
      sources[i] = lastSource;
    } else {
      lastSource = sources[i];
    }
  }

  return ({
    title,
    sources,
    times,
    left,
    right,
    totals,
    totalsLeft,
    totalsRight,
    maxValue,
    factor,
    label
  });
}

export default parseCSV;