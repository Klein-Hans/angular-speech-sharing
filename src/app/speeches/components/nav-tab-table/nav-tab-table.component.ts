import { Component, OnInit, Input } from '@angular/core';
import { Speech } from 'app/speeches/models';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-nav-tab-table',
  templateUrl: './nav-tab-table.component.html',
  styleUrls: ['./nav-tab-table.component.scss']
})
export class NavTabTableComponent implements OnInit {

  @Input() speeches: any;
  @Input() viewSpeech: Speech;
  
  constructor() { }

  ngOnInit() {
    console.log(this.speeches);
    // this.speeches.map((item,index) => {
    //   if(index === 0){
    //     item.isActive = true
    //     // let publishedDate = new FormControl(new Date(item.publishedDate));
    //     let publishedDate = new Date(item.publishedDate);
    //     this.viewSpeech = { ...item, publishedDate};
    //   }else{
    //     item.isActive = false;
    //   }
    // });
  }

  ngOnChanges()	{
    console.log(this.speeches);
  }


  onEnterSpeech(e) {
    e.preventDefault();
    console.log(e, "test");
  }

  onSelectSpeech(id) {
    // this.speeches.map((item) => {
    //   if(item.id === id){
    //     item.isActive = true
    //     let publishedDate = new Date(item.publishedDate);
    //     this.viewSpeech = { ...item, publishedDate};
    //     console.log(this.viewSpeech);
    //   }
    //   else 
    //   {
    //     item.isActive = false;
    //   }
    // });
  }
}
