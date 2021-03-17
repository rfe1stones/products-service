export default interface MigrationPlan<T> {
  fileName: string,
  mapper: (array: any[]) => T,
  tableName: string
}
