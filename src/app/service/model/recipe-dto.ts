import { MaterialDTO } from './material-dto';
import { StepDTO } from './step-dto';

export class Recipe {
    userId: number;
    name: string;
    description: string;
    imgUrl: string;
    stepList: string;
}

export class RecipeDto {
    imageBackgroundUrl: string;
    name: string;
    note: string;
    id: number;
    userid: number;
    contestId: number;
    stepList: Array<StepDTO>;
    status: number;
    materialList: Array<MaterialDTO>;
    categoryId: number;
}