export class Chat {
  public text: any = [];

  public toJson() {
    return {
      text: this.text,
    };
  }
}
