export class Chat {
  public name: any;
  public text: any = [];


  /**
   * This function return the class to json.
   * 
   * @returns {json} 
   */
  public toJson() {
    return {
      name: this.name,
      text: this.text,
    };
  }
}
