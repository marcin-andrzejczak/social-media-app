export class User {

  constructor(Id?: string, FirstName?: string, LastName?: string, ProfilePictureUrl?: string) {

    this.Id = Id;
    this.FirstName = FirstName;
    this.LastName = LastName;
    this.ProfilePictureUrl = ProfilePictureUrl;
  }

  public Id: string;
  public FirstName: string;
  public LastName: string;
  public ProfilePictureUrl: string;
}
