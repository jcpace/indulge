import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Camera } from 'ionic-native';
import { Addreview } from '../../providers/addreview';
import { Platform } from 'ionic-angular';
import {ViewChild, ViewChildren, QueryList, ElementRef} from '@angular/core'
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'page-review',
  templateUrl: 'review.html'
})

export class ReviewPage {

  @ViewChild('myname') 
  input: any; 
  @ViewChild('video') 
  video: any;
  width: any = 320;
  height: any = 240;
  canvas: any;
  photo: any = null;
  
  data: any;
  imageUrl: any = null;
  vidFlag: any = true;
  cloudinaryUrl: any;
  buttonFlag: any = false;
  readyMark: any = false;
  nativeElement : any;
  // markers: any = {
  //   firstName: 'George',
  //   lastName: 'Cantstanya',
  //   insta: 'georgy-castans',
  //   pic: 'http://vignette1.wikia.nocookie.net/seinfeld/images/7/76/George-costanza.jpg/revision/latest?cb=20110406222711',
  // }


  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private userReview: Addreview, public platform: Platform,  public http: Http, private elementRef: ElementRef) {
    this.data = Object.assign(this.navParams.get("pastApp")[0], this.navParams.get("clientInfo"));
    this.platform = platform;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviewPage, data ', this.data);
  }


    ngAfterViewInit() {


  }



   dismiss() {
    this.viewCtrl.dismiss();
  }

  submitReview(review) {
    //console.log('review submitted!', review)
    let content = Object.assign(this.data, review)
    this.userReview.addReview(content)
      .subscribe(
        (data: any) => {
          console.log('heres the data from review services', data)
          this.dismiss();
      });
  }

  takepicture() {
    this.canvas = document.getElementById('canvas')
    console.log('canvas ', this.canvas)
    let context = this.canvas.getContext('2d');
    if (this.width && this.height) {
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      context.drawImage(this.video, 0, 0, this.width, this.height);
      this.vidFlag = false;
      this.imageUrl = this.canvas.toDataURL('image/png');
    }
  }

  clearImage() {
    // let context = this.canvas.getContext('2d');
    // context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.imageUrl = null
    this.vidFlag = true
    // this.imageUrl = this.canvas.toDataURL('image/png');
    this.video = document.getElementById('video');
    // this.takePhoto();
    // console.log('finished clear ', this.video)
    // console.log('finished clear ', this.video.elementRef)
    // console.log('finished clear ', this.video)
  }

  takePhoto() {
    // console.log('taking photo')
    // console.log(this.platform.platforms());
    // console.log('heres the check photo ', this.platform.is("core"))
    if (this.platform.is("core")) {
      this.buttonFlag = true
      //console.log('opening laptop camera ')
      console.log('heres video!! ', this.video)
      this.video = this.video.nativeElement;
      console.log('heres video!! ', this.video)
      
      if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: false })
          .then(stream => {
              this.video.src = window.URL.createObjectURL(stream);
              this.video.play();
            })
          }
    }
    else {
      Camera.getPicture().then((imageData) => {
      this.imageUrl = imageData
      console.log('heres the image from photo shot ', imageData)
      }, (err) => {
        console.log('Error on review takePhoto function ', err)
      })
    }
  }

   accessGallery(){
   Camera.getPicture({
     sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
     destinationType: Camera.DestinationType.DATA_URL
    }).then((imageData) => {
      this.imageUrl = 'data:image/jpeg;base64,'+imageData;
     }, (err) => {
      console.log(err);
    });
  }

  saveImage(image) {
    //console.log('heres the image ', image)
    //console.log('heres the imageUrl ', this.imageUrl)
      let body = {
        "file": image,
        "upload_preset": "yi4d6zwf"
      }
      return this.http.post("https://api.cloudinary.com/v1_1/ddy7oiu4u/image/upload", body)
        .map((data: Response) => {
          console.log('heres the data page ', data)
          console.log('heres the data page ', data.json().url)
          return data.json().url;
        })
        .subscribe(url => {
          console.log("saved image results ", url)
          this.cloudinaryUrl = url
          this.readyMark = true;
        })
      }
  
}
