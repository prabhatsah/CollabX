// export interface SessionUser {
//   authUserId: string;
//   email: string;
//   fullName: string;
//   organizations: {
//     id: string;
//     name: string;
//     role: 'ADMIN' | 'SUPPORT' | 'USER';
//   }[];
//   currentOrg?: {
//     id: string;
//     name: string;
//     role: 'ADMIN' | 'SUPPORT' | 'USER';
//   };
// }

export interface SessionUser {
  // authUserId: string;
  // email: string;
  // fullName: string;
  // organizations: {
  //   id: string;
  //   name: string;
  //   role: 'ADMIN' | 'SUPPORT' | 'USER';
  // }[];
  // currentOrg?: {
  //   id: string;
  //   name: string;
  //   role: 'ADMIN' | 'SUPPORT' | 'USER';
  // };

  userInfo: {
    id: string;
    authUserId: string;
    fullName: string;
    email: string;
  };
  organizations: {
    id: string;
    name: string;
    role: 'ADMIN' | 'SUPPORT' | 'USER';
  }[];
  currentOrg?: {
    id: string;
    name: string;
    role: 'ADMIN' | 'SUPPORT' | 'USER';
  };
  defaultOrg?: {
    id: string;
    name: string;
    role: 'ADMIN' | 'SUPPORT' | 'USER';
  };
}
