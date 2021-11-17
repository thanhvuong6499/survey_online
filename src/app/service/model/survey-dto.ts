export class Survey{
    constructor( 
        public SurveyId: number,
        public Type : string,
        public Name: string,
        public Description: string,
        public IsDeleted: boolean,
        public QuestionList: QuestionList[],
        public Code: string
        ){}
}
export class SurveyModel{
        public surveyId: number;
        public name: string;
        public description: string;
        public questionList: QuestionListModel[];
        public code: string
}
export class QuestionListModel{
    public questionId: number;
    public surveyId: number;
    public questionTitle: string;
    public questionType: string;
    public questionContent: string;
    public description: string;
    
}
export class OptionListModel{
    public ID: number;
    public OptionText: number;
    public isSelected: boolean
    
}
export class AnswerModel{
    public answerId: number;
    public questionId: number;
    public answerContent: string
    
}

export class QuestionList{
    constructor( 
        public QuestionId: number,
        public QuestionType: string,
        public QuestionTitle: string,
        public QuestionContent: string,
        public options: Option[],
        public Required: boolean,
        public Remarks: string,
        public hasRemarks : boolean,
        ){}
}

export class Option{
    constructor(
        public ID: number,
        public OptionText: string,
        public OptionColor: string,
        public hasRemarks: boolean
    ){}
}


export class Category {
    constructor(public id: number, 
                public name:string, 
                public hasSubCategory: boolean,
                public parentId: number){ }
  }
  
  export class Product {
    constructor(public id: number,
                public name: string,
                public images: Array<any>,
                public oldPrice: number,
                public newPrice: number,
                public discount: number,
                public ratingsCount: number,
                public ratingsValue: number,
                public description: string,
                public availibilityCount: number,
                public color: Array<string>,
                public size: Array<string>,
                public weight: number,
                public categoryId: number){ }
  }
  