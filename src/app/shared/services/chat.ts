export class Chat {
  public name: any;
  public text: any = [];

  public toJson() {
    return {
      name: this.name,
      text: this.text,
    };
  }
}
