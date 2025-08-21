// import { Controller } from '@nestjs/common';
// import { UserOrgServce } from './user-org.service';
// import {
//   CreateUserAndOrgRequest,
//   GetOrganizationRequest,
//   GetUsersInOrgRequest,
//   HealthCheckRequest,
//   UserOrgServiceController,
//   UserOrgServiceControllerMethods,
// } from '@app/common/proto/user-org';

// @Controller()
// @UserOrgServiceControllerMethods()
// export class UserOrgController implements UserOrgServiceController {
//   constructor(private readonly userOrgService: UserOrgServce) {}

//   createUserAndOrg(request: CreateUserAndOrgRequest) {
//     console.log('Received at user org controller');

//     return this.userOrgService.createUserAndOrg(request);
//   }

//   getOrganization(request: GetOrganizationRequest) {
//     return {
//       organizationId: 'string',
//       organizationName: 'string',
//       createdAt: 'string',
//     };
//   }

//   getUsersInOrg(request: GetUsersInOrgRequest) {
//     return {
//       users: [
//         {
//           userId: 'string',
//           fullName: 'string',
//           email: 'string',
//           role: 'string',
//         },
//       ],
//     };
//   }

//   checkHealth(request: HealthCheckRequest) {
//     return {
//       serviceUp: true,
//       databaseConnected: true,
//       dependenciesHealthy: true,
//       statusMessage: 'User Organization service is up and running ...',
//     };
//   }
// }
