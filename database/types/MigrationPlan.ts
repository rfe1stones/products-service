export interface LineFixer {
  transform: (line: string) => string,
  select: (line: string) => boolean,
  skip?: (line: string) => boolean
};

export interface MigrationPlan<T> {
  fileName: string,
  mapper: (array: any[]) => T,
  query: string,
  toArray: (item: T) => any[],
  lineFixer?: LineFixer,
}
