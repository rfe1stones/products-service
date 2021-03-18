export interface LineFixer {
  transform: (line: string) => string,
  select: (line: string, lineNumber: number) => boolean
};

export interface MigrationPlan<T> {
  fileName: string,
  mapper: (array: any[]) => T,
  tableName: string,
  lineFixer?: LineFixer
}
