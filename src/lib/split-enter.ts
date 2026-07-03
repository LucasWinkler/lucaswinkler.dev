export type EnterSegment = {
  text: string;
  enterIndex: number;
};

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
