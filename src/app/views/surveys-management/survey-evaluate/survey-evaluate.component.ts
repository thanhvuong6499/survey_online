import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SurveysService } from '../../../service/api/survey.service';
import { AnswerModel, Option, OptionListModel, QuestionList, QuestionListModel, Survey, SurveyModel } from '../../../service/model/survey-dto';
// import { RecipeService } from 'src/app/service/api/recipe.service';
// import { RecipeDto } from 'src/app/service/model/recipe-dto';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export interface QuestionType {
  value: string;
  viewValue: string;
}
export class Guid {
  static newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
@Component({
  selector: 'app-survey-evaluate',
  templateUrl: './survey-evaluate.component.html',
  styleUrls: ['./survey-evaluate.component.scss']
})
export class EvaluateSurveyComponent implements OnInit {
  surveyForm: FormGroup;
  answerForm: FormGroup;
  public Editor = ClassicEditor;
  surveyModel: SurveyModel;
  questionListModel: QuestionListModel[] = [];
  optionListSingleModel: OptionListModel[] = [];
  optionListMultiModel: OptionListModel[] = [];
  surveyName: string;
  answerModel: AnswerModel;
  answers: FormArray[]
  selectedOption = [];
  surveyAnswerItem: FormGroup;
  surveyCode: string
  editMode = false;
  surveyTypes = [
    { id: 0, value: 'Training' },
    { id: 1, value: 'HR' }
  ];
  name = 'ng2-ckeditor';
  ckeConfig: any;
  mycontent: string;
  log: string = '';
  temp: string = "";
  // @ViewChild("myckeditor") ckeditor: any;
  questions: QuestionType[] = [
    { value: 'Single choice', viewValue: 'Single choice' },
    { value: 'Multi choice', viewValue: 'Multi choice' },
    { value: 'Text', viewValue: 'Text' },
    { value: 'Paragraph', viewValue: 'Paragraph' }
  ];
  questionOptionItem: FormGroup;


  constructor(
    // private surveyService: SurveyService,
    private _service: SurveysService,
    private router: Router,
    public toastr: ToastrService,
    private activateRoute: ActivatedRoute,

  ) { }

  ngOnInit() {
    var prev = null;
    this.surveyModel = new SurveyModel()
    // this.surveyModel = new Survey<Survey()>;
    this.answerModel = new AnswerModel()
    // this.questionListModel = new QuestionListModel()
    // this.surveyAnswerItem = new AnswerModel()
    this.surveyCode = this.activateRoute.snapshot.params.code;
    this.getSurveyByCode(this.surveyCode)
    // this.initForm();
    // console.log(this.surveyCode)
    // console.log(this.surveyModel.name)

  }


  getSurveyByCode(code) {
    this.answerForm = new FormGroup({
      // 'questionId': new FormControl(surveyTitle),
      // 'answerContent': new FormControl(description, [Validators.required]),
      // 'surveyType': new FormControl(surveyType, [Validators.required]),
      'answers': new FormArray([])
      // 'surveyQuestions': surveyQuestions,
      // 'IsAnonymous': new FormControl(false, [Validators.required])
    });
    this._service.getSurveyByCode(code).then(res => {
      this.surveyModel = res.item
      console.log('a model is' + this.surveyModel.questionList[0])
      this.questionListModel = this.surveyModel.questionList
      for (let index = 0; index < this.questionListModel.length; index++) {

        // this.answers = this.questionListModel
        this.surveyAnswerItem = new FormGroup({
          'questionId': new FormControl(this.questionListModel[index].questionId),
          'questionTitle': new FormControl(this.questionListModel[index].questionTitle),
          'questionContent': new FormControl(this.questionListModel[index].questionContent),
          'questionType': new FormControl(this.questionListModel[index].questionType),
          'questionOptions': new FormArray([]),
          'answerContent': new FormControl('', Validators.required),
          // 'questionContent': new FormControl(''),
          // 'questionGroup': new FormGroup({})
        });
        if (this.questionListModel[index].questionType == 'Multi choice' || this.questionListModel[index].questionType == 'Single choice') {
          this.optionListMultiModel = JSON.parse(this.questionListModel[index].questionContent)
          for (let index = 0; index < this.optionListMultiModel.length; index++) {
            this.questionOptionItem = new FormGroup({
              'optionText': new FormControl(this.optionListMultiModel[index].OptionText),
              'isSelected': new FormControl(false),
            });
            (<FormArray>this.surveyAnswerItem.get('questionOptions')).push(this.questionOptionItem);
            console.log(this.surveyAnswerItem)

          }

        }
        // if () {
        //   this.optionListSingleModel = JSON.parse(this.questionListModel[index].questionContent)
        //   console.log(this.optionListSingleModel)
        // }

        // console.log(surveyAnswerItem)
        (<FormArray>this.answerForm.get('answers')).push(this.surveyAnswerItem);
        // (<FormArray>this.surveyForm.get('surveyQuestions')).push(surveyQuestionItem);
      }
      // console.log('b model is'+ this.questionListModel.questionTitle)
      console.log(this.answerForm)


    })
    // this.initForm()
  }
  // initForm() {
  //   let description = '';
  //   let surveyType = '';
  //   let surveyQuestions = new FormArray([]);
  //   let answers = new FormArray([]);

  //  console.log()
  //   let surveyTitle = '';
  //   console.log('title is'+ surveyTitle)
  //   // this.surveyForm = new FormGroup({
  //   //   'surveyTitle': new FormControl(surveyTitle),
  //   //   'description': new FormControl(description, [Validators.required]),
  //   //   // 'surveyType': new FormControl(surveyType, [Validators.required]),
  //   //   'surveyQuestions': surveyQuestions,
  //   //   // 'IsAnonymous': new FormControl(false, [Validators.required])
  //   // });
  //   this.answerForm = new FormGroup({
  //     // 'questionId': new FormControl(surveyTitle),
  //     // 'answerContent': new FormControl(description, [Validators.required]),
  //     // 'surveyType': new FormControl(surveyType, [Validators.required]),
  //     'answers': answers
  //     // 'surveyQuestions': surveyQuestions,
  //     // 'IsAnonymous': new FormControl(false, [Validators.required])
  //   });
  //   const surveyAnswerItem = new FormGroup({
  //     'questionId': new FormControl('', Validators.required),
  //     'answerContent': new FormControl('', Validators.required),
  //     // 'questionContent': new FormControl(''),
  //     // 'questionGroup': new FormGroup({})
  //   });
  //   (<FormArray>this.answerForm.get('answers')).push(surveyAnswerItem);
  //   // this.onAddQuestion();

  // }


  private clearFormArray(formArray: FormArray) {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }

  getControlLabel(text: string) {
    return this.answerForm.get('answers')['controls'].value;
  }






  postAnswer() {

    // let formData = this.surveyForm.value;
    // console.log(formData);
    // console.log();
    // let SurveyId = 0;
    // let Type = formData.surveyType;
    // let Name = formData.surveyTitle;
    // let Description = formData.description;
    // let IsDeleted = false;
    // // let IsAnonymous = formData.IsAnonymous;
    // //  let Question: Question[] = [];
    // let QuestionList = [];
    // let Code = Guid.newGuid();
    // let surveyQuestions = formData.surveyQuestions;
    // // let optionArray = formData.surveyQuestions[0].questionGroup.options[0].optionText
    // let survey = new Survey(SurveyId, Type, Name, Description, IsDeleted, QuestionList, Code);


    // surveyQuestions.forEach((question, index, array) => {


    //   let questionItem = {
    //     'QuestionId': 0,
    //     "QuestionType": question.questionType,
    //     "QuestionTitle": question.questionTitle,
    //     "QuestionContent": '',
    //     "options": [],
    //     "Required": false,
    //     "Remarks": "",
    //     "hasRemarks": false

    //   }
    //   if (question.questionGroup.hasOwnProperty('showRemarksBox')) {
    //     questionItem.hasRemarks = question.questionGroup.showRemarksBox;
    //   }
    //   if (question.questionGroup.hasOwnProperty('content')) {
    //     questionItem.QuestionContent = question.questionGroup.content;
    //   }


    //   if (question.questionGroup.hasOwnProperty('options')) {



    //     question.questionGroup.options.forEach(option => {
    //       let optionItem: Option = {
    //         "ID": 0,
    //         "OptionText": option.optionText,
    //         "OptionColor": "",
    //         "hasRemarks": false

    //       }
    //       questionItem.options.push(optionItem)
    //       questionItem.QuestionContent = JSON.stringify(questionItem.options)
    //     });
    //   }


    //   survey.QuestionList.push(questionItem)


    // });


    // console.log(survey);
    // console.log('posting survey');
    // if (survey.Name == '') {
    //   this.toastr.error('Thêm mới thất bại', 'Error', {
    //     timeOut: 3000,
    //   });
    // } else {
    //   this._service.addNewSurvey(survey).subscribe((response) => {
    //     console.log(response);
    //     this.router.navigate(['/surveys']);
    //     this.toastr.success('Thêm mới thành công', 'Success', {
    //       timeOut: 3000,
    //     });
    //   }, (error) => {
    //     console.log(error);
    //     this.toastr.error('Thêm mới thất bại', 'Error', {
    //       timeOut: 3000,
    //     });
    //   });
    // }
  }


  onSubmit() {

    let formData = this.answerForm.value;
    console.log(formData);
    // console.log(this.surveyAnswerItem.questionId)
    this.postAnswer();

  }


}
