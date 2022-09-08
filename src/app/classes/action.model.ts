export interface IAction {
    name: string,
    method(): any,
    template: any
}