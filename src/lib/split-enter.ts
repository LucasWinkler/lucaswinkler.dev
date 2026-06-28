export type EnterSegment = {
  text: string;
  enterIndex: number;
};

export function splitEnterByLines(lines: readonly string[], startIndex = 1): EnterSegment[] {
  return lines.map((text, index) => ({
    text,
    enterIndex: startIndex + index,
  }));
}

export function splitEnterWordsByLine(lines: readonly string[], startIndex = 1): EnterSegment[][] {
  let index = startIndex;

  return lines.map(line =>
    line
      .split(' ')
      .filter(Boolean)
      .map(text => ({
        text,
        enterIndex: index++,
      })),
  );
}

export function splitEnterByCharacters(text: string, startIndex = 1): EnterSegment[] {
  return [...text].map((char, index) => ({
    text: char,
    enterIndex: startIndex + index,
  }));
}

export function nextEnterIndex(segments: readonly EnterSegment[]): number {
  if (segments.length === 0) {
    return 1;
  }

  return segments[segments.length - 1].enterIndex + 1;
}

export function nextEnterIndexFromNested(segments: readonly (readonly EnterSegment[])[]): number {
  return nextEnterIndex(segments.flat());
}
