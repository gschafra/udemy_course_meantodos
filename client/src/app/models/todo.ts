import { Model } from 'premiere';

export class Todo extends Model {
    static path: string = 'todos';
    static keyColumn: string = '_id';
    title: string;
    isCompleted: boolean;
}