import { Model } from 'premiere';

export class Todo extends Model {
    static path: string = 'todos'
    
    title: string;
    isCompleted: boolean;
}