import { Injectable } from '@angular/core';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root',
})
export class CloudstorageService {
  constructor(public userService: UserService) {}

  fileToUpload: any;
  imageURL: any = [];
  storage: any = getStorage();
  chatImages: any = [];
  currentUserIMG: any;
  userImageUpload: boolean = false;

  /**
   * This function handle the img file.
   *
   * @param  {any} event
   * @param {string} location
   */
  handleFileInput(event: any, location: string) {
    this.fileToUpload = event.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      let imageResult = reader.result as string;
      if (location == 'chat') {
        this.imageURL.push({
          name: this.fileToUpload.name,
          src: imageResult,
          uploaded: false,
        });
      } else {
        this.currentUserIMG = imageResult;
      }
    };
    reader.readAsDataURL(this.fileToUpload);
  }

  /**
   * This function upload the img to Firebase storage.
   *
   * @param {string} folder
   */
  uploadImg(folder: string) {
    this.userImageUpload = true;
    console.log(this.fileToUpload);

    const storageRef = ref(this.storage, folder + '/' + this.fileToUpload.name);

    uploadBytes(storageRef, this.fileToUpload).then((snapshot) => {
      this.fetchImgUrl(folder);
    });
  }

  /**
   * This function fetch the Image url.
   *
   * @param {string} folder
   */
  fetchImgUrl(folder: string) {
    const storage = getStorage();
    getDownloadURL(ref(storage, folder + '/' + this.fileToUpload.name))
      .then((url) => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (event) => {
          const blob = xhr.response;
        };
        xhr.open('GET', url);
        xhr.send();

        this.handleFetchImgUrl(folder, url);
      })
      .catch((error) => {
        console.log('error', error);
      });
  }


  /**
   * This function handle the Fetch img url.
   * 
   * @param {string} folder 
   * @param {string} url 
   */
  handleFetchImgUrl(folder: string, url: string) {
    if (folder == 'users') {
      this.userImageUpload = false;
      this.userService.user.photoURL = url;
      this.userService.saveUserData();

    } else if (folder == 'chat') {
      this.chatImages.push({
        name: this.fileToUpload.name,
        src: url,
      });

      for (let i = 0; i < this.imageURL.length; i++) {
        this.imageURL[i].uploaded = true;
      }
      this.userImageUpload = false;
    }
  }


  /**
   * This function delete the picked img.
   * 
   * @param {any} img 
   */
  deletePickedImg(img: any) {
    const desertRef = ref(this.storage, 'chat' + '/' + img.name);
    let spiceIndex = this.imageURL.indexOf(img);

  
    deleteObject(desertRef)
      .then(() => {
        this.chatImages.splice(spiceIndex, 1);
        this.imageURL.splice(spiceIndex, 1);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
}
