import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpProviderService } from 'src/app/services/http-provider.service';
import { FormService } from 'src/app/services/form.service';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-form-current',
  templateUrl: './form-current.component.html',
  styleUrls: ['./form-current.component.css']
})
export class FormCurrentComponent implements OnInit {
  id: any;
  formDetail: any = []
  PropsForm: any = [];

  Objarr: any = {};
  data_put: any = {};
  fieldsForm;
  formsProps: any;
  errors: any = {};
  submitted = false;
  error = false;
  is_required = false;

  constructor(
    private route: ActivatedRoute, 
    private httpProvider: HttpProviderService,
    private fb: FormBuilder    ){
      this.fieldsForm = this.fb.group({})
      this.formsProps = [];
    }
  
    
  ngOnInit(): void {
      this.id = this.route.snapshot.params["id"];
      this.getFormDetailById();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.fieldsForm.controls;
  }

  get f_data(): { [key: string]: AbstractControl } {
    return this.fieldsForm.value;
  }

  getFormDetailById(){
    this.httpProvider.getFormById(this.id)
      .subscribe(
        (data: any) => {
          if (data != null && data.body != null){
            var result = data.body;
            if(result){
              this.formDetail = result; 
              this.PropsForm = result.properties;
              Object.keys(this.PropsForm).forEach((k)=>{ 
                const validators = []
                for (let index = 0; index < result.required.length; index++) {
                  if(k == result.required[index]){
                    this.is_required= true;                                     
                  }               
                  
                }              
                if(this.is_required){
                  validators.push(Validators.required);
                }
                if(this.PropsForm[k].pattern){
                  validators.push(Validators.pattern(this.PropsForm[k].pattern));
                }
                this.Objarr[k] = new FormControl(this.PropsForm[k].value, validators);
                this.formsProps.push({
                  key: k,
                  label: this.PropsForm[k].title,
                  type: this.PropsForm[k].format
                });
                this.is_required = false;
              });
              this.fieldsForm = this.fb.group(this.Objarr);
              
            }
          }
        }
      );  
  }

  onSubmit(){
    this.submitted = true;
    this.error = false;    
    if (this.fieldsForm.invalid) {
      this.error = true;
      for(const i in this.f){
        if(this.f[i].status == 'INVALID'){
          this.errors[i] = this.f[i].errors; 
                  
        }        
      }
      console.log(this.errors);
      return;      
    } 
    console.log(JSON.stringify(this.fieldsForm.value, null, 2));   
    
    Object.keys(this.fieldsForm.value).forEach((k)=>{
      this.data_put = this.formDetail;
      this.data_put.properties[k].value = this.f_data[k];
     
     }); 
    this.httpProvider.putFormById(this.id, this.data_put)
    .subscribe({
      next: (res)=>{
        console.log(res);        
        console.log(res.headers.status);
        if(res.status == 200){          
          Swal.fire({
            icon: 'success',
            title: res.body.title,
            text: res.body.description,
            showConfirmButton: false,
            html:            
            '<a href="/">Home</a> ',
          })
        }
        if(res.status == 400){

        }

      }
    });

    
      
  }



}


