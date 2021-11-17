/// <reference types="@types/ckeditor" />
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CKEditorComponent } from 'ng2-ckeditor';
import { Survey, Option } from '../../../service/model/survey-dto';
import { UserLogin } from '../../../service/model/user-dto';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { SurveysService } from '../../../service/api/survey.service';
import { ToastrService } from 'ngx-toastr';
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
  selector: 'app-create-edit-surveys',
  templateUrl: './create-edit-surveys.component.html',
  styleUrls: ['./create-edit-surveys.component.scss']
})
export class CreateEditSurveysComponent implements OnInit {
  surveyForm: FormGroup;
  public Editor = ClassicEditor;
  selectedOption = [];

  editMode = false;
  surveyTypes = [
    { id: 0, value: 'Training' },
    { id: 1, value: 'HR' }
  ];
  name = 'ng2-ckeditor';
  ckeConfig: any;
  mycontent: string;
  log: string = '';
  @ViewChild("myckeditor") ckeditor: any;
  questions: QuestionType[] = [
    { value: 'Single choice', viewValue: 'Single choice' },
    { value: 'Multi choice', viewValue: 'Multi choice' },
    { value: 'Text', viewValue: 'Text' },
    { value: 'Paragraph', viewValue: 'Paragraph' }
  ];

  config = {
    uiColor: '#ffffff',
    toolbarGroups: [
      //   { name: 'clipboard', groups: ['clipboard', 'undo'] },
      // { name: 'editing', groups: ['find', 'selection', 'spellchecker'] },
      // { name: 'links' }, { name: 'insert' },
      // { name: 'document', groups: ['mode', 'document', 'doctools'] },
      { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
      { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align'] },
      { name: 'styles' },
      { name: 'colors' }],
    skin: 'kama',
    resize_enabled: false,
    removePlugins: 'elementspath,save,magicline',
    extraPlugins: 'divarea,smiley,justify,indentblock,colordialog',
    colorButton_foreStyle: {
      element: 'font',
      attributes: { 'color': '#(color)' }
    },
    height: 188,
    removeDialogTabs: 'image:advanced;link:advanced',
    removeButtons: 'Subscript,Superscript,Anchor,Source,Table',
    format_tags: 'p;h1;h2;h3;pre;div'
  }
  constructor(
    // private surveyService: SurveyService,
    private _service: SurveysService,
    private router: Router,
    public toastr: ToastrService
  ) { }

  ngOnInit() {
    this.initForm();
    this.ckeConfig = {
      allowedContent: false,
      forcePasteAsPlainText: true,
      font_names: 'Arial;Times New Roman;Verdana',
      toolbarGroups: [
        { name: 'document', groups: ['mode', 'document', 'doctools'] },
        { name: 'clipboard', groups: ['clipboard', 'undo'] },
        { name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'] },
        { name: 'forms', groups: ['forms'] },
        '/',
        { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
        { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph'] },
        { name: 'links', groups: ['links'] },
        { name: 'insert', groups: ['insert'] },
        '/',
        { name: 'styles', groups: ['styles'] },
        { name: 'colors', groups: ['colors'] },
        { name: 'tools', groups: ['tools'] },
        { name: 'others', groups: ['others'] },
        { name: 'about', groups: ['about'] }
      ],
      removeButtons: 'Source,Save,NewPage,Preview,Print,Templates,Cut,Copy,Paste,PasteText,PasteFromWord,Undo,Redo,Find,Replace,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Strike,Subscript,Superscript,CopyFormatting,RemoveFormat,Outdent,Indent,CreateDiv,Blockquote,BidiLtr,BidiRtl,Language,Unlink,Anchor,Image,Flash,Table,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe,Maximize,ShowBlocks,About'
    };
  }

  private initForm() {
    let surveyTitle = '';
    let description = '';
    let surveyType = '';
    let surveyQuestions = new FormArray([]);

    this.surveyForm = new FormGroup({
      'surveyTitle': new FormControl(surveyTitle, [Validators.required]),
      'description': new FormControl(description, [Validators.required]),
      // 'surveyType': new FormControl(surveyType, [Validators.required]),
      'surveyQuestions': surveyQuestions,
      // 'IsAnonymous': new FormControl(false, [Validators.required])
    });

    this.onAddQuestion();

  }

  onAddQuestion() {
    console.log(this.surveyForm);

    const surveyQuestionItem = new FormGroup({
      'questionTitle': new FormControl('', Validators.required),
      'questionType': new FormControl('', Validators.required),
      // 'questionContent': new FormControl(''),
      'questionGroup': new FormGroup({})
    });

    (<FormArray>this.surveyForm.get('surveyQuestions')).push(surveyQuestionItem);

  }

  onRemoveQuestion(index) {


    this.surveyForm.controls.surveyQuestions['controls'][index].controls.questionGroup = new FormGroup({});
    this.surveyForm.controls.surveyQuestions['controls'][index].controls.questionType = new FormControl({});

    (<FormArray>this.surveyForm.get('surveyQuestions')).removeAt(index);
    this.selectedOption.splice(index, 1);
    console.log(this.surveyForm);

  }


  onSeletQuestionType(questionType, index) {
    if (questionType === 'Single choice' || questionType === 'Multi choice') {
      this.addOptionControls(questionType, index)
    }
    if (questionType === 'Paragraph') {
      let content = new FormControl('');
      (this.surveyForm.controls.surveyQuestions['controls'][index].controls.questionGroup).addControl('content', content);

    }
  }

  addOptionControls(questionType, index) {

    let options = new FormArray([]);
    let showRemarksBox = new FormControl(false);

    (this.surveyForm.controls.surveyQuestions['controls'][index].controls.questionGroup).addControl('options', options);
    (this.surveyForm.controls.surveyQuestions['controls'][index].controls.questionGroup).addControl('showRemarksBox', showRemarksBox);

    this.clearFormArray((<FormArray>this.surveyForm.controls.surveyQuestions['controls'][index].controls.questionGroup.controls.options));

    this.addOption(index);
    this.addOption(index);
  }


  private clearFormArray(formArray: FormArray) {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }


  addOption(index) {
    const optionGroup = new FormGroup({
      'optionText': new FormControl('', Validators.required),
    });
    (<FormArray>this.surveyForm.controls.surveyQuestions['controls'][index].controls.questionGroup.controls.options).push(optionGroup);
  }

  removeOption(questionIndex, itemIndex) {
    (<FormArray>this.surveyForm.controls.surveyQuestions['controls'][questionIndex].controls.questionGroup.controls.options).removeAt(itemIndex);
  }







  postSurvey() {

    let formData = this.surveyForm.value;
    console.log(formData);

    console.log();
    let SurveyId = 0;
    let Type = formData.surveyType;
    let Name = formData.surveyTitle;
    let Description = formData.description;
    let IsDeleted = false;
    // let IsAnonymous = formData.IsAnonymous;
    //  let Question: Question[] = [];
    let QuestionList = [];
    let Code = Guid.newGuid();
    let surveyQuestions = formData.surveyQuestions;
    // let optionArray = formData.surveyQuestions[0].questionGroup.options[0].optionText
    let survey = new Survey(SurveyId, Type, Name, Description, IsDeleted, QuestionList, Code);


    surveyQuestions.forEach((question, index, array) => {


      let questionItem = {
        'QuestionId': 0,
        "QuestionType": question.questionType,
        "QuestionTitle": question.questionTitle,
        "QuestionContent": '',
        "options": [],
        "Required": false,
        "Remarks": "",
        "hasRemarks": false

      }
      if (question.questionGroup.hasOwnProperty('showRemarksBox')) {
        questionItem.hasRemarks = question.questionGroup.showRemarksBox;
      }
      if (question.questionGroup.hasOwnProperty('content')) {
        questionItem.QuestionContent = question.questionGroup.content;
      }


      if (question.questionGroup.hasOwnProperty('options')) {



        question.questionGroup.options.forEach(option => {
          let optionItem: Option = {
            "ID": 0,
            "OptionText": option.optionText,
            "OptionColor": "",
            "hasRemarks": false

          }
          questionItem.options.push(optionItem)
          questionItem.QuestionContent = JSON.stringify(questionItem.options)
        });
      }


      survey.QuestionList.push(questionItem)


    });


    console.log(survey);
    console.log('posting survey');
    if (survey.Name == '') {
      this.toastr.error('Thêm mới thất bại', 'Error', {
        timeOut: 3000,
      });
    } else {
      this._service.addNewSurvey(survey).subscribe((response) => {
        console.log(response);
        this.router.navigate(['/surveys']);
        this.toastr.success('Thêm mới thành công', 'Success', {
          timeOut: 3000,
        });
      }, (error) => {
        console.log(error);
        this.toastr.error('Thêm mới thất bại', 'Error', {
          timeOut: 3000,
        });
      });
    }
  }


  onSubmit() {

    this.postSurvey();

  }
}
