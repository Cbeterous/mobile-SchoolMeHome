export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Wiki: undefined;
  Detail: undefined;
  Profil: undefined;
  Slides: undefined;
  Login: undefined;
};


export type ProfilParamList = {
  ProfilScreen: undefined;
  EditProfil : undefined;
  TakePicture: undefined;
  ShowPicture: undefined;
}
export type SlidesView = {
  SlidesViewScreen: undefined;
};

export type WikiParamList = {
  Wiki: undefined;
  Detail: undefined;
};
export type LoginParamList = {
  LoginComponent: undefined;
};

export type User = {
  _id : string,
  firstName : string | null,
  lastName : string | null,
  email : string,
  phone : string | null,
  birthdate : string | null,
  street : string | null,
  zipcode : string | null,
  city : string | null,
}