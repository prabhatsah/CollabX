
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Organization
 * 
 */
export type Organization = $Result.DefaultSelection<Prisma.$OrganizationPayload>
/**
 * Model Membership
 * 
 */
export type Membership = $Result.DefaultSelection<Prisma.$MembershipPayload>
/**
 * Model Invitation
 * 
 */
export type Invitation = $Result.DefaultSelection<Prisma.$InvitationPayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserStatus: {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  SUSPENDED: 'SUSPENDED',
  PENDING_VERIFICATION: 'PENDING_VERIFICATION'
};

export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus]


export const MembershipRole: {
  ADMIN: 'ADMIN',
  SUPPORT: 'SUPPORT',
  USER: 'USER'
};

export type MembershipRole = (typeof MembershipRole)[keyof typeof MembershipRole]


export const MembershipStatus: {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  SUSPENDED: 'SUSPENDED',
  LEFT: 'LEFT'
};

export type MembershipStatus = (typeof MembershipStatus)[keyof typeof MembershipStatus]


export const InvitationStatus: {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED',
  EXPIRED: 'EXPIRED',
  CANCELLED: 'CANCELLED'
};

export type InvitationStatus = (typeof InvitationStatus)[keyof typeof InvitationStatus]

}

export type UserStatus = $Enums.UserStatus

export const UserStatus: typeof $Enums.UserStatus

export type MembershipRole = $Enums.MembershipRole

export const MembershipRole: typeof $Enums.MembershipRole

export type MembershipStatus = $Enums.MembershipStatus

export const MembershipStatus: typeof $Enums.MembershipStatus

export type InvitationStatus = $Enums.InvitationStatus

export const InvitationStatus: typeof $Enums.InvitationStatus

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.organization`: Exposes CRUD operations for the **Organization** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Organizations
    * const organizations = await prisma.organization.findMany()
    * ```
    */
  get organization(): Prisma.OrganizationDelegate<ExtArgs>;

  /**
   * `prisma.membership`: Exposes CRUD operations for the **Membership** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Memberships
    * const memberships = await prisma.membership.findMany()
    * ```
    */
  get membership(): Prisma.MembershipDelegate<ExtArgs>;

  /**
   * `prisma.invitation`: Exposes CRUD operations for the **Invitation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Invitations
    * const invitations = await prisma.invitation.findMany()
    * ```
    */
  get invitation(): Prisma.InvitationDelegate<ExtArgs>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Organization: 'Organization',
    Membership: 'Membership',
    Invitation: 'Invitation',
    AuditLog: 'AuditLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "organization" | "membership" | "invitation" | "auditLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Organization: {
        payload: Prisma.$OrganizationPayload<ExtArgs>
        fields: Prisma.OrganizationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrganizationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrganizationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          findFirst: {
            args: Prisma.OrganizationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrganizationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          findMany: {
            args: Prisma.OrganizationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>[]
          }
          create: {
            args: Prisma.OrganizationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          createMany: {
            args: Prisma.OrganizationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrganizationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>[]
          }
          delete: {
            args: Prisma.OrganizationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          update: {
            args: Prisma.OrganizationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          deleteMany: {
            args: Prisma.OrganizationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrganizationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.OrganizationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          aggregate: {
            args: Prisma.OrganizationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrganization>
          }
          groupBy: {
            args: Prisma.OrganizationGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrganizationGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrganizationCountArgs<ExtArgs>
            result: $Utils.Optional<OrganizationCountAggregateOutputType> | number
          }
        }
      }
      Membership: {
        payload: Prisma.$MembershipPayload<ExtArgs>
        fields: Prisma.MembershipFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MembershipFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MembershipPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MembershipFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MembershipPayload>
          }
          findFirst: {
            args: Prisma.MembershipFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MembershipPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MembershipFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MembershipPayload>
          }
          findMany: {
            args: Prisma.MembershipFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MembershipPayload>[]
          }
          create: {
            args: Prisma.MembershipCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MembershipPayload>
          }
          createMany: {
            args: Prisma.MembershipCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MembershipCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MembershipPayload>[]
          }
          delete: {
            args: Prisma.MembershipDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MembershipPayload>
          }
          update: {
            args: Prisma.MembershipUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MembershipPayload>
          }
          deleteMany: {
            args: Prisma.MembershipDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MembershipUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MembershipUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MembershipPayload>
          }
          aggregate: {
            args: Prisma.MembershipAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMembership>
          }
          groupBy: {
            args: Prisma.MembershipGroupByArgs<ExtArgs>
            result: $Utils.Optional<MembershipGroupByOutputType>[]
          }
          count: {
            args: Prisma.MembershipCountArgs<ExtArgs>
            result: $Utils.Optional<MembershipCountAggregateOutputType> | number
          }
        }
      }
      Invitation: {
        payload: Prisma.$InvitationPayload<ExtArgs>
        fields: Prisma.InvitationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InvitationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InvitationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload>
          }
          findFirst: {
            args: Prisma.InvitationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InvitationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload>
          }
          findMany: {
            args: Prisma.InvitationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload>[]
          }
          create: {
            args: Prisma.InvitationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload>
          }
          createMany: {
            args: Prisma.InvitationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InvitationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload>[]
          }
          delete: {
            args: Prisma.InvitationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload>
          }
          update: {
            args: Prisma.InvitationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload>
          }
          deleteMany: {
            args: Prisma.InvitationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InvitationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.InvitationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload>
          }
          aggregate: {
            args: Prisma.InvitationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInvitation>
          }
          groupBy: {
            args: Prisma.InvitationGroupByArgs<ExtArgs>
            result: $Utils.Optional<InvitationGroupByOutputType>[]
          }
          count: {
            args: Prisma.InvitationCountArgs<ExtArgs>
            result: $Utils.Optional<InvitationCountAggregateOutputType> | number
          }
        }
      }
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    memberships: number
    createdOrgs: number
    invitations: number
    auditLogs: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    memberships?: boolean | UserCountOutputTypeCountMembershipsArgs
    createdOrgs?: boolean | UserCountOutputTypeCountCreatedOrgsArgs
    invitations?: boolean | UserCountOutputTypeCountInvitationsArgs
    auditLogs?: boolean | UserCountOutputTypeCountAuditLogsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMembershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MembershipWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCreatedOrgsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrganizationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountInvitationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvitationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAuditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
  }


  /**
   * Count Type OrganizationCountOutputType
   */

  export type OrganizationCountOutputType = {
    memberships: number
    invitations: number
    auditLogs: number
  }

  export type OrganizationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    memberships?: boolean | OrganizationCountOutputTypeCountMembershipsArgs
    invitations?: boolean | OrganizationCountOutputTypeCountInvitationsArgs
    auditLogs?: boolean | OrganizationCountOutputTypeCountAuditLogsArgs
  }

  // Custom InputTypes
  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationCountOutputType
     */
    select?: OrganizationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeCountMembershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MembershipWhereInput
  }

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeCountInvitationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvitationWhereInput
  }

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeCountAuditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
  }


  /**
   * Count Type MembershipCountOutputType
   */

  export type MembershipCountOutputType = {
    auditLogs: number
  }

  export type MembershipCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    auditLogs?: boolean | MembershipCountOutputTypeCountAuditLogsArgs
  }

  // Custom InputTypes
  /**
   * MembershipCountOutputType without action
   */
  export type MembershipCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MembershipCountOutputType
     */
    select?: MembershipCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MembershipCountOutputType without action
   */
  export type MembershipCountOutputTypeCountAuditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    fullName: string | null
    profileImage: string | null
    status: $Enums.UserStatus | null
    isEmailVerified: boolean | null
    lastLoginAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    fullName: string | null
    profileImage: string | null
    status: $Enums.UserStatus | null
    isEmailVerified: boolean | null
    lastLoginAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    fullName: number
    profileImage: number
    status: number
    isEmailVerified: number
    lastLoginAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    fullName?: true
    profileImage?: true
    status?: true
    isEmailVerified?: true
    lastLoginAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    fullName?: true
    profileImage?: true
    status?: true
    isEmailVerified?: true
    lastLoginAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    fullName?: true
    profileImage?: true
    status?: true
    isEmailVerified?: true
    lastLoginAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    fullName: string | null
    profileImage: string | null
    status: $Enums.UserStatus
    isEmailVerified: boolean
    lastLoginAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    fullName?: boolean
    profileImage?: boolean
    status?: boolean
    isEmailVerified?: boolean
    lastLoginAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    memberships?: boolean | User$membershipsArgs<ExtArgs>
    createdOrgs?: boolean | User$createdOrgsArgs<ExtArgs>
    invitations?: boolean | User$invitationsArgs<ExtArgs>
    auditLogs?: boolean | User$auditLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    fullName?: boolean
    profileImage?: boolean
    status?: boolean
    isEmailVerified?: boolean
    lastLoginAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    fullName?: boolean
    profileImage?: boolean
    status?: boolean
    isEmailVerified?: boolean
    lastLoginAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    memberships?: boolean | User$membershipsArgs<ExtArgs>
    createdOrgs?: boolean | User$createdOrgsArgs<ExtArgs>
    invitations?: boolean | User$invitationsArgs<ExtArgs>
    auditLogs?: boolean | User$auditLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      memberships: Prisma.$MembershipPayload<ExtArgs>[]
      createdOrgs: Prisma.$OrganizationPayload<ExtArgs>[]
      invitations: Prisma.$InvitationPayload<ExtArgs>[]
      auditLogs: Prisma.$AuditLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      fullName: string | null
      profileImage: string | null
      status: $Enums.UserStatus
      isEmailVerified: boolean
      lastLoginAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    memberships<T extends User$membershipsArgs<ExtArgs> = {}>(args?: Subset<T, User$membershipsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "findMany"> | Null>
    createdOrgs<T extends User$createdOrgsArgs<ExtArgs> = {}>(args?: Subset<T, User$createdOrgsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findMany"> | Null>
    invitations<T extends User$invitationsArgs<ExtArgs> = {}>(args?: Subset<T, User$invitationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "findMany"> | Null>
    auditLogs<T extends User$auditLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$auditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly fullName: FieldRef<"User", 'String'>
    readonly profileImage: FieldRef<"User", 'String'>
    readonly status: FieldRef<"User", 'UserStatus'>
    readonly isEmailVerified: FieldRef<"User", 'Boolean'>
    readonly lastLoginAt: FieldRef<"User", 'DateTime'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.memberships
   */
  export type User$membershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipInclude<ExtArgs> | null
    where?: MembershipWhereInput
    orderBy?: MembershipOrderByWithRelationInput | MembershipOrderByWithRelationInput[]
    cursor?: MembershipWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MembershipScalarFieldEnum | MembershipScalarFieldEnum[]
  }

  /**
   * User.createdOrgs
   */
  export type User$createdOrgsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    where?: OrganizationWhereInput
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    cursor?: OrganizationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * User.invitations
   */
  export type User$invitationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    where?: InvitationWhereInput
    orderBy?: InvitationOrderByWithRelationInput | InvitationOrderByWithRelationInput[]
    cursor?: InvitationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InvitationScalarFieldEnum | InvitationScalarFieldEnum[]
  }

  /**
   * User.auditLogs
   */
  export type User$auditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    cursor?: AuditLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Organization
   */

  export type AggregateOrganization = {
    _count: OrganizationCountAggregateOutputType | null
    _min: OrganizationMinAggregateOutputType | null
    _max: OrganizationMaxAggregateOutputType | null
  }

  export type OrganizationMinAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
    createdById: string | null
  }

  export type OrganizationMaxAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
    createdById: string | null
  }

  export type OrganizationCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    description: number
    createdAt: number
    updatedAt: number
    createdById: number
    _all: number
  }


  export type OrganizationMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    createdById?: true
  }

  export type OrganizationMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    createdById?: true
  }

  export type OrganizationCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    createdById?: true
    _all?: true
  }

  export type OrganizationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Organization to aggregate.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Organizations
    **/
    _count?: true | OrganizationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrganizationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrganizationMaxAggregateInputType
  }

  export type GetOrganizationAggregateType<T extends OrganizationAggregateArgs> = {
        [P in keyof T & keyof AggregateOrganization]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrganization[P]>
      : GetScalarType<T[P], AggregateOrganization[P]>
  }




  export type OrganizationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrganizationWhereInput
    orderBy?: OrganizationOrderByWithAggregationInput | OrganizationOrderByWithAggregationInput[]
    by: OrganizationScalarFieldEnum[] | OrganizationScalarFieldEnum
    having?: OrganizationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrganizationCountAggregateInputType | true
    _min?: OrganizationMinAggregateInputType
    _max?: OrganizationMaxAggregateInputType
  }

  export type OrganizationGroupByOutputType = {
    id: string
    name: string
    slug: string
    description: string | null
    createdAt: Date
    updatedAt: Date
    createdById: string
    _count: OrganizationCountAggregateOutputType | null
    _min: OrganizationMinAggregateOutputType | null
    _max: OrganizationMaxAggregateOutputType | null
  }

  type GetOrganizationGroupByPayload<T extends OrganizationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrganizationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrganizationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrganizationGroupByOutputType[P]>
            : GetScalarType<T[P], OrganizationGroupByOutputType[P]>
        }
      >
    >


  export type OrganizationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdById?: boolean
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    memberships?: boolean | Organization$membershipsArgs<ExtArgs>
    invitations?: boolean | Organization$invitationsArgs<ExtArgs>
    auditLogs?: boolean | Organization$auditLogsArgs<ExtArgs>
    _count?: boolean | OrganizationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["organization"]>

  export type OrganizationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdById?: boolean
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["organization"]>

  export type OrganizationSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdById?: boolean
  }

  export type OrganizationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    memberships?: boolean | Organization$membershipsArgs<ExtArgs>
    invitations?: boolean | Organization$invitationsArgs<ExtArgs>
    auditLogs?: boolean | Organization$auditLogsArgs<ExtArgs>
    _count?: boolean | OrganizationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type OrganizationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $OrganizationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Organization"
    objects: {
      createdBy: Prisma.$UserPayload<ExtArgs>
      memberships: Prisma.$MembershipPayload<ExtArgs>[]
      invitations: Prisma.$InvitationPayload<ExtArgs>[]
      auditLogs: Prisma.$AuditLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      slug: string
      description: string | null
      createdAt: Date
      updatedAt: Date
      createdById: string
    }, ExtArgs["result"]["organization"]>
    composites: {}
  }

  type OrganizationGetPayload<S extends boolean | null | undefined | OrganizationDefaultArgs> = $Result.GetResult<Prisma.$OrganizationPayload, S>

  type OrganizationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<OrganizationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: OrganizationCountAggregateInputType | true
    }

  export interface OrganizationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Organization'], meta: { name: 'Organization' } }
    /**
     * Find zero or one Organization that matches the filter.
     * @param {OrganizationFindUniqueArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrganizationFindUniqueArgs>(args: SelectSubset<T, OrganizationFindUniqueArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Organization that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {OrganizationFindUniqueOrThrowArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrganizationFindUniqueOrThrowArgs>(args: SelectSubset<T, OrganizationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Organization that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFindFirstArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrganizationFindFirstArgs>(args?: SelectSubset<T, OrganizationFindFirstArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Organization that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFindFirstOrThrowArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrganizationFindFirstOrThrowArgs>(args?: SelectSubset<T, OrganizationFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Organizations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Organizations
     * const organizations = await prisma.organization.findMany()
     * 
     * // Get first 10 Organizations
     * const organizations = await prisma.organization.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const organizationWithIdOnly = await prisma.organization.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrganizationFindManyArgs>(args?: SelectSubset<T, OrganizationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Organization.
     * @param {OrganizationCreateArgs} args - Arguments to create a Organization.
     * @example
     * // Create one Organization
     * const Organization = await prisma.organization.create({
     *   data: {
     *     // ... data to create a Organization
     *   }
     * })
     * 
     */
    create<T extends OrganizationCreateArgs>(args: SelectSubset<T, OrganizationCreateArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Organizations.
     * @param {OrganizationCreateManyArgs} args - Arguments to create many Organizations.
     * @example
     * // Create many Organizations
     * const organization = await prisma.organization.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrganizationCreateManyArgs>(args?: SelectSubset<T, OrganizationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Organizations and returns the data saved in the database.
     * @param {OrganizationCreateManyAndReturnArgs} args - Arguments to create many Organizations.
     * @example
     * // Create many Organizations
     * const organization = await prisma.organization.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Organizations and only return the `id`
     * const organizationWithIdOnly = await prisma.organization.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrganizationCreateManyAndReturnArgs>(args?: SelectSubset<T, OrganizationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Organization.
     * @param {OrganizationDeleteArgs} args - Arguments to delete one Organization.
     * @example
     * // Delete one Organization
     * const Organization = await prisma.organization.delete({
     *   where: {
     *     // ... filter to delete one Organization
     *   }
     * })
     * 
     */
    delete<T extends OrganizationDeleteArgs>(args: SelectSubset<T, OrganizationDeleteArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Organization.
     * @param {OrganizationUpdateArgs} args - Arguments to update one Organization.
     * @example
     * // Update one Organization
     * const organization = await prisma.organization.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrganizationUpdateArgs>(args: SelectSubset<T, OrganizationUpdateArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Organizations.
     * @param {OrganizationDeleteManyArgs} args - Arguments to filter Organizations to delete.
     * @example
     * // Delete a few Organizations
     * const { count } = await prisma.organization.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrganizationDeleteManyArgs>(args?: SelectSubset<T, OrganizationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Organizations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Organizations
     * const organization = await prisma.organization.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrganizationUpdateManyArgs>(args: SelectSubset<T, OrganizationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Organization.
     * @param {OrganizationUpsertArgs} args - Arguments to update or create a Organization.
     * @example
     * // Update or create a Organization
     * const organization = await prisma.organization.upsert({
     *   create: {
     *     // ... data to create a Organization
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Organization we want to update
     *   }
     * })
     */
    upsert<T extends OrganizationUpsertArgs>(args: SelectSubset<T, OrganizationUpsertArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Organizations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationCountArgs} args - Arguments to filter Organizations to count.
     * @example
     * // Count the number of Organizations
     * const count = await prisma.organization.count({
     *   where: {
     *     // ... the filter for the Organizations we want to count
     *   }
     * })
    **/
    count<T extends OrganizationCountArgs>(
      args?: Subset<T, OrganizationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrganizationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Organization.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrganizationAggregateArgs>(args: Subset<T, OrganizationAggregateArgs>): Prisma.PrismaPromise<GetOrganizationAggregateType<T>>

    /**
     * Group by Organization.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrganizationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrganizationGroupByArgs['orderBy'] }
        : { orderBy?: OrganizationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrganizationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrganizationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Organization model
   */
  readonly fields: OrganizationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Organization.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrganizationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    createdBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    memberships<T extends Organization$membershipsArgs<ExtArgs> = {}>(args?: Subset<T, Organization$membershipsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "findMany"> | Null>
    invitations<T extends Organization$invitationsArgs<ExtArgs> = {}>(args?: Subset<T, Organization$invitationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "findMany"> | Null>
    auditLogs<T extends Organization$auditLogsArgs<ExtArgs> = {}>(args?: Subset<T, Organization$auditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Organization model
   */ 
  interface OrganizationFieldRefs {
    readonly id: FieldRef<"Organization", 'String'>
    readonly name: FieldRef<"Organization", 'String'>
    readonly slug: FieldRef<"Organization", 'String'>
    readonly description: FieldRef<"Organization", 'String'>
    readonly createdAt: FieldRef<"Organization", 'DateTime'>
    readonly updatedAt: FieldRef<"Organization", 'DateTime'>
    readonly createdById: FieldRef<"Organization", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Organization findUnique
   */
  export type OrganizationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization findUniqueOrThrow
   */
  export type OrganizationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization findFirst
   */
  export type OrganizationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Organizations.
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Organizations.
     */
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * Organization findFirstOrThrow
   */
  export type OrganizationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Organizations.
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Organizations.
     */
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * Organization findMany
   */
  export type OrganizationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organizations to fetch.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Organizations.
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * Organization create
   */
  export type OrganizationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * The data needed to create a Organization.
     */
    data: XOR<OrganizationCreateInput, OrganizationUncheckedCreateInput>
  }

  /**
   * Organization createMany
   */
  export type OrganizationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Organizations.
     */
    data: OrganizationCreateManyInput | OrganizationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Organization createManyAndReturn
   */
  export type OrganizationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Organizations.
     */
    data: OrganizationCreateManyInput | OrganizationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Organization update
   */
  export type OrganizationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * The data needed to update a Organization.
     */
    data: XOR<OrganizationUpdateInput, OrganizationUncheckedUpdateInput>
    /**
     * Choose, which Organization to update.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization updateMany
   */
  export type OrganizationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Organizations.
     */
    data: XOR<OrganizationUpdateManyMutationInput, OrganizationUncheckedUpdateManyInput>
    /**
     * Filter which Organizations to update
     */
    where?: OrganizationWhereInput
  }

  /**
   * Organization upsert
   */
  export type OrganizationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * The filter to search for the Organization to update in case it exists.
     */
    where: OrganizationWhereUniqueInput
    /**
     * In case the Organization found by the `where` argument doesn't exist, create a new Organization with this data.
     */
    create: XOR<OrganizationCreateInput, OrganizationUncheckedCreateInput>
    /**
     * In case the Organization was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrganizationUpdateInput, OrganizationUncheckedUpdateInput>
  }

  /**
   * Organization delete
   */
  export type OrganizationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter which Organization to delete.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization deleteMany
   */
  export type OrganizationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Organizations to delete
     */
    where?: OrganizationWhereInput
  }

  /**
   * Organization.memberships
   */
  export type Organization$membershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipInclude<ExtArgs> | null
    where?: MembershipWhereInput
    orderBy?: MembershipOrderByWithRelationInput | MembershipOrderByWithRelationInput[]
    cursor?: MembershipWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MembershipScalarFieldEnum | MembershipScalarFieldEnum[]
  }

  /**
   * Organization.invitations
   */
  export type Organization$invitationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    where?: InvitationWhereInput
    orderBy?: InvitationOrderByWithRelationInput | InvitationOrderByWithRelationInput[]
    cursor?: InvitationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InvitationScalarFieldEnum | InvitationScalarFieldEnum[]
  }

  /**
   * Organization.auditLogs
   */
  export type Organization$auditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    cursor?: AuditLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * Organization without action
   */
  export type OrganizationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
  }


  /**
   * Model Membership
   */

  export type AggregateMembership = {
    _count: MembershipCountAggregateOutputType | null
    _min: MembershipMinAggregateOutputType | null
    _max: MembershipMaxAggregateOutputType | null
  }

  export type MembershipMinAggregateOutputType = {
    id: string | null
    role: $Enums.MembershipRole | null
    status: $Enums.MembershipStatus | null
    joinedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
    organizationId: string | null
  }

  export type MembershipMaxAggregateOutputType = {
    id: string | null
    role: $Enums.MembershipRole | null
    status: $Enums.MembershipStatus | null
    joinedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
    organizationId: string | null
  }

  export type MembershipCountAggregateOutputType = {
    id: number
    role: number
    status: number
    joinedAt: number
    createdAt: number
    updatedAt: number
    userId: number
    organizationId: number
    _all: number
  }


  export type MembershipMinAggregateInputType = {
    id?: true
    role?: true
    status?: true
    joinedAt?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    organizationId?: true
  }

  export type MembershipMaxAggregateInputType = {
    id?: true
    role?: true
    status?: true
    joinedAt?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    organizationId?: true
  }

  export type MembershipCountAggregateInputType = {
    id?: true
    role?: true
    status?: true
    joinedAt?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    organizationId?: true
    _all?: true
  }

  export type MembershipAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Membership to aggregate.
     */
    where?: MembershipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Memberships to fetch.
     */
    orderBy?: MembershipOrderByWithRelationInput | MembershipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MembershipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Memberships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Memberships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Memberships
    **/
    _count?: true | MembershipCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MembershipMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MembershipMaxAggregateInputType
  }

  export type GetMembershipAggregateType<T extends MembershipAggregateArgs> = {
        [P in keyof T & keyof AggregateMembership]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMembership[P]>
      : GetScalarType<T[P], AggregateMembership[P]>
  }




  export type MembershipGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MembershipWhereInput
    orderBy?: MembershipOrderByWithAggregationInput | MembershipOrderByWithAggregationInput[]
    by: MembershipScalarFieldEnum[] | MembershipScalarFieldEnum
    having?: MembershipScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MembershipCountAggregateInputType | true
    _min?: MembershipMinAggregateInputType
    _max?: MembershipMaxAggregateInputType
  }

  export type MembershipGroupByOutputType = {
    id: string
    role: $Enums.MembershipRole
    status: $Enums.MembershipStatus
    joinedAt: Date
    createdAt: Date
    updatedAt: Date
    userId: string
    organizationId: string
    _count: MembershipCountAggregateOutputType | null
    _min: MembershipMinAggregateOutputType | null
    _max: MembershipMaxAggregateOutputType | null
  }

  type GetMembershipGroupByPayload<T extends MembershipGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MembershipGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MembershipGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MembershipGroupByOutputType[P]>
            : GetScalarType<T[P], MembershipGroupByOutputType[P]>
        }
      >
    >


  export type MembershipSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    role?: boolean
    status?: boolean
    joinedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    organizationId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    auditLogs?: boolean | Membership$auditLogsArgs<ExtArgs>
    _count?: boolean | MembershipCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["membership"]>

  export type MembershipSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    role?: boolean
    status?: boolean
    joinedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    organizationId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["membership"]>

  export type MembershipSelectScalar = {
    id?: boolean
    role?: boolean
    status?: boolean
    joinedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    organizationId?: boolean
  }

  export type MembershipInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    auditLogs?: boolean | Membership$auditLogsArgs<ExtArgs>
    _count?: boolean | MembershipCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MembershipIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }

  export type $MembershipPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Membership"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      organization: Prisma.$OrganizationPayload<ExtArgs>
      auditLogs: Prisma.$AuditLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      role: $Enums.MembershipRole
      status: $Enums.MembershipStatus
      joinedAt: Date
      createdAt: Date
      updatedAt: Date
      userId: string
      organizationId: string
    }, ExtArgs["result"]["membership"]>
    composites: {}
  }

  type MembershipGetPayload<S extends boolean | null | undefined | MembershipDefaultArgs> = $Result.GetResult<Prisma.$MembershipPayload, S>

  type MembershipCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MembershipFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MembershipCountAggregateInputType | true
    }

  export interface MembershipDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Membership'], meta: { name: 'Membership' } }
    /**
     * Find zero or one Membership that matches the filter.
     * @param {MembershipFindUniqueArgs} args - Arguments to find a Membership
     * @example
     * // Get one Membership
     * const membership = await prisma.membership.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MembershipFindUniqueArgs>(args: SelectSubset<T, MembershipFindUniqueArgs<ExtArgs>>): Prisma__MembershipClient<$Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Membership that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {MembershipFindUniqueOrThrowArgs} args - Arguments to find a Membership
     * @example
     * // Get one Membership
     * const membership = await prisma.membership.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MembershipFindUniqueOrThrowArgs>(args: SelectSubset<T, MembershipFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MembershipClient<$Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Membership that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MembershipFindFirstArgs} args - Arguments to find a Membership
     * @example
     * // Get one Membership
     * const membership = await prisma.membership.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MembershipFindFirstArgs>(args?: SelectSubset<T, MembershipFindFirstArgs<ExtArgs>>): Prisma__MembershipClient<$Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Membership that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MembershipFindFirstOrThrowArgs} args - Arguments to find a Membership
     * @example
     * // Get one Membership
     * const membership = await prisma.membership.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MembershipFindFirstOrThrowArgs>(args?: SelectSubset<T, MembershipFindFirstOrThrowArgs<ExtArgs>>): Prisma__MembershipClient<$Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Memberships that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MembershipFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Memberships
     * const memberships = await prisma.membership.findMany()
     * 
     * // Get first 10 Memberships
     * const memberships = await prisma.membership.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const membershipWithIdOnly = await prisma.membership.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MembershipFindManyArgs>(args?: SelectSubset<T, MembershipFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Membership.
     * @param {MembershipCreateArgs} args - Arguments to create a Membership.
     * @example
     * // Create one Membership
     * const Membership = await prisma.membership.create({
     *   data: {
     *     // ... data to create a Membership
     *   }
     * })
     * 
     */
    create<T extends MembershipCreateArgs>(args: SelectSubset<T, MembershipCreateArgs<ExtArgs>>): Prisma__MembershipClient<$Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Memberships.
     * @param {MembershipCreateManyArgs} args - Arguments to create many Memberships.
     * @example
     * // Create many Memberships
     * const membership = await prisma.membership.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MembershipCreateManyArgs>(args?: SelectSubset<T, MembershipCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Memberships and returns the data saved in the database.
     * @param {MembershipCreateManyAndReturnArgs} args - Arguments to create many Memberships.
     * @example
     * // Create many Memberships
     * const membership = await prisma.membership.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Memberships and only return the `id`
     * const membershipWithIdOnly = await prisma.membership.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MembershipCreateManyAndReturnArgs>(args?: SelectSubset<T, MembershipCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Membership.
     * @param {MembershipDeleteArgs} args - Arguments to delete one Membership.
     * @example
     * // Delete one Membership
     * const Membership = await prisma.membership.delete({
     *   where: {
     *     // ... filter to delete one Membership
     *   }
     * })
     * 
     */
    delete<T extends MembershipDeleteArgs>(args: SelectSubset<T, MembershipDeleteArgs<ExtArgs>>): Prisma__MembershipClient<$Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Membership.
     * @param {MembershipUpdateArgs} args - Arguments to update one Membership.
     * @example
     * // Update one Membership
     * const membership = await prisma.membership.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MembershipUpdateArgs>(args: SelectSubset<T, MembershipUpdateArgs<ExtArgs>>): Prisma__MembershipClient<$Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Memberships.
     * @param {MembershipDeleteManyArgs} args - Arguments to filter Memberships to delete.
     * @example
     * // Delete a few Memberships
     * const { count } = await prisma.membership.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MembershipDeleteManyArgs>(args?: SelectSubset<T, MembershipDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Memberships.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MembershipUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Memberships
     * const membership = await prisma.membership.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MembershipUpdateManyArgs>(args: SelectSubset<T, MembershipUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Membership.
     * @param {MembershipUpsertArgs} args - Arguments to update or create a Membership.
     * @example
     * // Update or create a Membership
     * const membership = await prisma.membership.upsert({
     *   create: {
     *     // ... data to create a Membership
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Membership we want to update
     *   }
     * })
     */
    upsert<T extends MembershipUpsertArgs>(args: SelectSubset<T, MembershipUpsertArgs<ExtArgs>>): Prisma__MembershipClient<$Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Memberships.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MembershipCountArgs} args - Arguments to filter Memberships to count.
     * @example
     * // Count the number of Memberships
     * const count = await prisma.membership.count({
     *   where: {
     *     // ... the filter for the Memberships we want to count
     *   }
     * })
    **/
    count<T extends MembershipCountArgs>(
      args?: Subset<T, MembershipCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MembershipCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Membership.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MembershipAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MembershipAggregateArgs>(args: Subset<T, MembershipAggregateArgs>): Prisma.PrismaPromise<GetMembershipAggregateType<T>>

    /**
     * Group by Membership.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MembershipGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MembershipGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MembershipGroupByArgs['orderBy'] }
        : { orderBy?: MembershipGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MembershipGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMembershipGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Membership model
   */
  readonly fields: MembershipFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Membership.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MembershipClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    organization<T extends OrganizationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrganizationDefaultArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    auditLogs<T extends Membership$auditLogsArgs<ExtArgs> = {}>(args?: Subset<T, Membership$auditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Membership model
   */ 
  interface MembershipFieldRefs {
    readonly id: FieldRef<"Membership", 'String'>
    readonly role: FieldRef<"Membership", 'MembershipRole'>
    readonly status: FieldRef<"Membership", 'MembershipStatus'>
    readonly joinedAt: FieldRef<"Membership", 'DateTime'>
    readonly createdAt: FieldRef<"Membership", 'DateTime'>
    readonly updatedAt: FieldRef<"Membership", 'DateTime'>
    readonly userId: FieldRef<"Membership", 'String'>
    readonly organizationId: FieldRef<"Membership", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Membership findUnique
   */
  export type MembershipFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipInclude<ExtArgs> | null
    /**
     * Filter, which Membership to fetch.
     */
    where: MembershipWhereUniqueInput
  }

  /**
   * Membership findUniqueOrThrow
   */
  export type MembershipFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipInclude<ExtArgs> | null
    /**
     * Filter, which Membership to fetch.
     */
    where: MembershipWhereUniqueInput
  }

  /**
   * Membership findFirst
   */
  export type MembershipFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipInclude<ExtArgs> | null
    /**
     * Filter, which Membership to fetch.
     */
    where?: MembershipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Memberships to fetch.
     */
    orderBy?: MembershipOrderByWithRelationInput | MembershipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Memberships.
     */
    cursor?: MembershipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Memberships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Memberships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Memberships.
     */
    distinct?: MembershipScalarFieldEnum | MembershipScalarFieldEnum[]
  }

  /**
   * Membership findFirstOrThrow
   */
  export type MembershipFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipInclude<ExtArgs> | null
    /**
     * Filter, which Membership to fetch.
     */
    where?: MembershipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Memberships to fetch.
     */
    orderBy?: MembershipOrderByWithRelationInput | MembershipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Memberships.
     */
    cursor?: MembershipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Memberships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Memberships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Memberships.
     */
    distinct?: MembershipScalarFieldEnum | MembershipScalarFieldEnum[]
  }

  /**
   * Membership findMany
   */
  export type MembershipFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipInclude<ExtArgs> | null
    /**
     * Filter, which Memberships to fetch.
     */
    where?: MembershipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Memberships to fetch.
     */
    orderBy?: MembershipOrderByWithRelationInput | MembershipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Memberships.
     */
    cursor?: MembershipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Memberships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Memberships.
     */
    skip?: number
    distinct?: MembershipScalarFieldEnum | MembershipScalarFieldEnum[]
  }

  /**
   * Membership create
   */
  export type MembershipCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipInclude<ExtArgs> | null
    /**
     * The data needed to create a Membership.
     */
    data: XOR<MembershipCreateInput, MembershipUncheckedCreateInput>
  }

  /**
   * Membership createMany
   */
  export type MembershipCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Memberships.
     */
    data: MembershipCreateManyInput | MembershipCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Membership createManyAndReturn
   */
  export type MembershipCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Memberships.
     */
    data: MembershipCreateManyInput | MembershipCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Membership update
   */
  export type MembershipUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipInclude<ExtArgs> | null
    /**
     * The data needed to update a Membership.
     */
    data: XOR<MembershipUpdateInput, MembershipUncheckedUpdateInput>
    /**
     * Choose, which Membership to update.
     */
    where: MembershipWhereUniqueInput
  }

  /**
   * Membership updateMany
   */
  export type MembershipUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Memberships.
     */
    data: XOR<MembershipUpdateManyMutationInput, MembershipUncheckedUpdateManyInput>
    /**
     * Filter which Memberships to update
     */
    where?: MembershipWhereInput
  }

  /**
   * Membership upsert
   */
  export type MembershipUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipInclude<ExtArgs> | null
    /**
     * The filter to search for the Membership to update in case it exists.
     */
    where: MembershipWhereUniqueInput
    /**
     * In case the Membership found by the `where` argument doesn't exist, create a new Membership with this data.
     */
    create: XOR<MembershipCreateInput, MembershipUncheckedCreateInput>
    /**
     * In case the Membership was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MembershipUpdateInput, MembershipUncheckedUpdateInput>
  }

  /**
   * Membership delete
   */
  export type MembershipDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipInclude<ExtArgs> | null
    /**
     * Filter which Membership to delete.
     */
    where: MembershipWhereUniqueInput
  }

  /**
   * Membership deleteMany
   */
  export type MembershipDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Memberships to delete
     */
    where?: MembershipWhereInput
  }

  /**
   * Membership.auditLogs
   */
  export type Membership$auditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    cursor?: AuditLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * Membership without action
   */
  export type MembershipDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipInclude<ExtArgs> | null
  }


  /**
   * Model Invitation
   */

  export type AggregateInvitation = {
    _count: InvitationCountAggregateOutputType | null
    _min: InvitationMinAggregateOutputType | null
    _max: InvitationMaxAggregateOutputType | null
  }

  export type InvitationMinAggregateOutputType = {
    id: string | null
    email: string | null
    role: $Enums.MembershipRole | null
    status: $Enums.InvitationStatus | null
    token: string | null
    expiresAt: Date | null
    sentAt: Date | null
    acceptedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    organizationId: string | null
    invitedById: string | null
  }

  export type InvitationMaxAggregateOutputType = {
    id: string | null
    email: string | null
    role: $Enums.MembershipRole | null
    status: $Enums.InvitationStatus | null
    token: string | null
    expiresAt: Date | null
    sentAt: Date | null
    acceptedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    organizationId: string | null
    invitedById: string | null
  }

  export type InvitationCountAggregateOutputType = {
    id: number
    email: number
    role: number
    status: number
    token: number
    expiresAt: number
    sentAt: number
    acceptedAt: number
    createdAt: number
    updatedAt: number
    organizationId: number
    invitedById: number
    _all: number
  }


  export type InvitationMinAggregateInputType = {
    id?: true
    email?: true
    role?: true
    status?: true
    token?: true
    expiresAt?: true
    sentAt?: true
    acceptedAt?: true
    createdAt?: true
    updatedAt?: true
    organizationId?: true
    invitedById?: true
  }

  export type InvitationMaxAggregateInputType = {
    id?: true
    email?: true
    role?: true
    status?: true
    token?: true
    expiresAt?: true
    sentAt?: true
    acceptedAt?: true
    createdAt?: true
    updatedAt?: true
    organizationId?: true
    invitedById?: true
  }

  export type InvitationCountAggregateInputType = {
    id?: true
    email?: true
    role?: true
    status?: true
    token?: true
    expiresAt?: true
    sentAt?: true
    acceptedAt?: true
    createdAt?: true
    updatedAt?: true
    organizationId?: true
    invitedById?: true
    _all?: true
  }

  export type InvitationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Invitation to aggregate.
     */
    where?: InvitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invitations to fetch.
     */
    orderBy?: InvitationOrderByWithRelationInput | InvitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InvitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invitations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Invitations
    **/
    _count?: true | InvitationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InvitationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InvitationMaxAggregateInputType
  }

  export type GetInvitationAggregateType<T extends InvitationAggregateArgs> = {
        [P in keyof T & keyof AggregateInvitation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInvitation[P]>
      : GetScalarType<T[P], AggregateInvitation[P]>
  }




  export type InvitationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvitationWhereInput
    orderBy?: InvitationOrderByWithAggregationInput | InvitationOrderByWithAggregationInput[]
    by: InvitationScalarFieldEnum[] | InvitationScalarFieldEnum
    having?: InvitationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InvitationCountAggregateInputType | true
    _min?: InvitationMinAggregateInputType
    _max?: InvitationMaxAggregateInputType
  }

  export type InvitationGroupByOutputType = {
    id: string
    email: string
    role: $Enums.MembershipRole
    status: $Enums.InvitationStatus
    token: string
    expiresAt: Date
    sentAt: Date
    acceptedAt: Date | null
    createdAt: Date
    updatedAt: Date
    organizationId: string
    invitedById: string | null
    _count: InvitationCountAggregateOutputType | null
    _min: InvitationMinAggregateOutputType | null
    _max: InvitationMaxAggregateOutputType | null
  }

  type GetInvitationGroupByPayload<T extends InvitationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InvitationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InvitationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InvitationGroupByOutputType[P]>
            : GetScalarType<T[P], InvitationGroupByOutputType[P]>
        }
      >
    >


  export type InvitationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    role?: boolean
    status?: boolean
    token?: boolean
    expiresAt?: boolean
    sentAt?: boolean
    acceptedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    organizationId?: boolean
    invitedById?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    invitedBy?: boolean | Invitation$invitedByArgs<ExtArgs>
  }, ExtArgs["result"]["invitation"]>

  export type InvitationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    role?: boolean
    status?: boolean
    token?: boolean
    expiresAt?: boolean
    sentAt?: boolean
    acceptedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    organizationId?: boolean
    invitedById?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    invitedBy?: boolean | Invitation$invitedByArgs<ExtArgs>
  }, ExtArgs["result"]["invitation"]>

  export type InvitationSelectScalar = {
    id?: boolean
    email?: boolean
    role?: boolean
    status?: boolean
    token?: boolean
    expiresAt?: boolean
    sentAt?: boolean
    acceptedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    organizationId?: boolean
    invitedById?: boolean
  }

  export type InvitationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    invitedBy?: boolean | Invitation$invitedByArgs<ExtArgs>
  }
  export type InvitationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    invitedBy?: boolean | Invitation$invitedByArgs<ExtArgs>
  }

  export type $InvitationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Invitation"
    objects: {
      organization: Prisma.$OrganizationPayload<ExtArgs>
      invitedBy: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      role: $Enums.MembershipRole
      status: $Enums.InvitationStatus
      token: string
      expiresAt: Date
      sentAt: Date
      acceptedAt: Date | null
      createdAt: Date
      updatedAt: Date
      organizationId: string
      invitedById: string | null
    }, ExtArgs["result"]["invitation"]>
    composites: {}
  }

  type InvitationGetPayload<S extends boolean | null | undefined | InvitationDefaultArgs> = $Result.GetResult<Prisma.$InvitationPayload, S>

  type InvitationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<InvitationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: InvitationCountAggregateInputType | true
    }

  export interface InvitationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Invitation'], meta: { name: 'Invitation' } }
    /**
     * Find zero or one Invitation that matches the filter.
     * @param {InvitationFindUniqueArgs} args - Arguments to find a Invitation
     * @example
     * // Get one Invitation
     * const invitation = await prisma.invitation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InvitationFindUniqueArgs>(args: SelectSubset<T, InvitationFindUniqueArgs<ExtArgs>>): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Invitation that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {InvitationFindUniqueOrThrowArgs} args - Arguments to find a Invitation
     * @example
     * // Get one Invitation
     * const invitation = await prisma.invitation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InvitationFindUniqueOrThrowArgs>(args: SelectSubset<T, InvitationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Invitation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationFindFirstArgs} args - Arguments to find a Invitation
     * @example
     * // Get one Invitation
     * const invitation = await prisma.invitation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InvitationFindFirstArgs>(args?: SelectSubset<T, InvitationFindFirstArgs<ExtArgs>>): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Invitation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationFindFirstOrThrowArgs} args - Arguments to find a Invitation
     * @example
     * // Get one Invitation
     * const invitation = await prisma.invitation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InvitationFindFirstOrThrowArgs>(args?: SelectSubset<T, InvitationFindFirstOrThrowArgs<ExtArgs>>): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Invitations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Invitations
     * const invitations = await prisma.invitation.findMany()
     * 
     * // Get first 10 Invitations
     * const invitations = await prisma.invitation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const invitationWithIdOnly = await prisma.invitation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InvitationFindManyArgs>(args?: SelectSubset<T, InvitationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Invitation.
     * @param {InvitationCreateArgs} args - Arguments to create a Invitation.
     * @example
     * // Create one Invitation
     * const Invitation = await prisma.invitation.create({
     *   data: {
     *     // ... data to create a Invitation
     *   }
     * })
     * 
     */
    create<T extends InvitationCreateArgs>(args: SelectSubset<T, InvitationCreateArgs<ExtArgs>>): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Invitations.
     * @param {InvitationCreateManyArgs} args - Arguments to create many Invitations.
     * @example
     * // Create many Invitations
     * const invitation = await prisma.invitation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InvitationCreateManyArgs>(args?: SelectSubset<T, InvitationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Invitations and returns the data saved in the database.
     * @param {InvitationCreateManyAndReturnArgs} args - Arguments to create many Invitations.
     * @example
     * // Create many Invitations
     * const invitation = await prisma.invitation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Invitations and only return the `id`
     * const invitationWithIdOnly = await prisma.invitation.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InvitationCreateManyAndReturnArgs>(args?: SelectSubset<T, InvitationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Invitation.
     * @param {InvitationDeleteArgs} args - Arguments to delete one Invitation.
     * @example
     * // Delete one Invitation
     * const Invitation = await prisma.invitation.delete({
     *   where: {
     *     // ... filter to delete one Invitation
     *   }
     * })
     * 
     */
    delete<T extends InvitationDeleteArgs>(args: SelectSubset<T, InvitationDeleteArgs<ExtArgs>>): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Invitation.
     * @param {InvitationUpdateArgs} args - Arguments to update one Invitation.
     * @example
     * // Update one Invitation
     * const invitation = await prisma.invitation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InvitationUpdateArgs>(args: SelectSubset<T, InvitationUpdateArgs<ExtArgs>>): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Invitations.
     * @param {InvitationDeleteManyArgs} args - Arguments to filter Invitations to delete.
     * @example
     * // Delete a few Invitations
     * const { count } = await prisma.invitation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InvitationDeleteManyArgs>(args?: SelectSubset<T, InvitationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Invitations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Invitations
     * const invitation = await prisma.invitation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InvitationUpdateManyArgs>(args: SelectSubset<T, InvitationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Invitation.
     * @param {InvitationUpsertArgs} args - Arguments to update or create a Invitation.
     * @example
     * // Update or create a Invitation
     * const invitation = await prisma.invitation.upsert({
     *   create: {
     *     // ... data to create a Invitation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Invitation we want to update
     *   }
     * })
     */
    upsert<T extends InvitationUpsertArgs>(args: SelectSubset<T, InvitationUpsertArgs<ExtArgs>>): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Invitations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationCountArgs} args - Arguments to filter Invitations to count.
     * @example
     * // Count the number of Invitations
     * const count = await prisma.invitation.count({
     *   where: {
     *     // ... the filter for the Invitations we want to count
     *   }
     * })
    **/
    count<T extends InvitationCountArgs>(
      args?: Subset<T, InvitationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InvitationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Invitation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InvitationAggregateArgs>(args: Subset<T, InvitationAggregateArgs>): Prisma.PrismaPromise<GetInvitationAggregateType<T>>

    /**
     * Group by Invitation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InvitationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InvitationGroupByArgs['orderBy'] }
        : { orderBy?: InvitationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InvitationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInvitationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Invitation model
   */
  readonly fields: InvitationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Invitation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InvitationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    organization<T extends OrganizationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrganizationDefaultArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    invitedBy<T extends Invitation$invitedByArgs<ExtArgs> = {}>(args?: Subset<T, Invitation$invitedByArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Invitation model
   */ 
  interface InvitationFieldRefs {
    readonly id: FieldRef<"Invitation", 'String'>
    readonly email: FieldRef<"Invitation", 'String'>
    readonly role: FieldRef<"Invitation", 'MembershipRole'>
    readonly status: FieldRef<"Invitation", 'InvitationStatus'>
    readonly token: FieldRef<"Invitation", 'String'>
    readonly expiresAt: FieldRef<"Invitation", 'DateTime'>
    readonly sentAt: FieldRef<"Invitation", 'DateTime'>
    readonly acceptedAt: FieldRef<"Invitation", 'DateTime'>
    readonly createdAt: FieldRef<"Invitation", 'DateTime'>
    readonly updatedAt: FieldRef<"Invitation", 'DateTime'>
    readonly organizationId: FieldRef<"Invitation", 'String'>
    readonly invitedById: FieldRef<"Invitation", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Invitation findUnique
   */
  export type InvitationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * Filter, which Invitation to fetch.
     */
    where: InvitationWhereUniqueInput
  }

  /**
   * Invitation findUniqueOrThrow
   */
  export type InvitationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * Filter, which Invitation to fetch.
     */
    where: InvitationWhereUniqueInput
  }

  /**
   * Invitation findFirst
   */
  export type InvitationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * Filter, which Invitation to fetch.
     */
    where?: InvitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invitations to fetch.
     */
    orderBy?: InvitationOrderByWithRelationInput | InvitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Invitations.
     */
    cursor?: InvitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invitations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Invitations.
     */
    distinct?: InvitationScalarFieldEnum | InvitationScalarFieldEnum[]
  }

  /**
   * Invitation findFirstOrThrow
   */
  export type InvitationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * Filter, which Invitation to fetch.
     */
    where?: InvitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invitations to fetch.
     */
    orderBy?: InvitationOrderByWithRelationInput | InvitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Invitations.
     */
    cursor?: InvitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invitations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Invitations.
     */
    distinct?: InvitationScalarFieldEnum | InvitationScalarFieldEnum[]
  }

  /**
   * Invitation findMany
   */
  export type InvitationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * Filter, which Invitations to fetch.
     */
    where?: InvitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invitations to fetch.
     */
    orderBy?: InvitationOrderByWithRelationInput | InvitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Invitations.
     */
    cursor?: InvitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invitations.
     */
    skip?: number
    distinct?: InvitationScalarFieldEnum | InvitationScalarFieldEnum[]
  }

  /**
   * Invitation create
   */
  export type InvitationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * The data needed to create a Invitation.
     */
    data: XOR<InvitationCreateInput, InvitationUncheckedCreateInput>
  }

  /**
   * Invitation createMany
   */
  export type InvitationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Invitations.
     */
    data: InvitationCreateManyInput | InvitationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Invitation createManyAndReturn
   */
  export type InvitationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Invitations.
     */
    data: InvitationCreateManyInput | InvitationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Invitation update
   */
  export type InvitationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * The data needed to update a Invitation.
     */
    data: XOR<InvitationUpdateInput, InvitationUncheckedUpdateInput>
    /**
     * Choose, which Invitation to update.
     */
    where: InvitationWhereUniqueInput
  }

  /**
   * Invitation updateMany
   */
  export type InvitationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Invitations.
     */
    data: XOR<InvitationUpdateManyMutationInput, InvitationUncheckedUpdateManyInput>
    /**
     * Filter which Invitations to update
     */
    where?: InvitationWhereInput
  }

  /**
   * Invitation upsert
   */
  export type InvitationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * The filter to search for the Invitation to update in case it exists.
     */
    where: InvitationWhereUniqueInput
    /**
     * In case the Invitation found by the `where` argument doesn't exist, create a new Invitation with this data.
     */
    create: XOR<InvitationCreateInput, InvitationUncheckedCreateInput>
    /**
     * In case the Invitation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InvitationUpdateInput, InvitationUncheckedUpdateInput>
  }

  /**
   * Invitation delete
   */
  export type InvitationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * Filter which Invitation to delete.
     */
    where: InvitationWhereUniqueInput
  }

  /**
   * Invitation deleteMany
   */
  export type InvitationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Invitations to delete
     */
    where?: InvitationWhereInput
  }

  /**
   * Invitation.invitedBy
   */
  export type Invitation$invitedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Invitation without action
   */
  export type InvitationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
  }


  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogMinAggregateOutputType = {
    id: string | null
    action: string | null
    entity: string | null
    entityId: string | null
    createdAt: Date | null
    userId: string | null
    organizationId: string | null
    membershipId: string | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: string | null
    action: string | null
    entity: string | null
    entityId: string | null
    createdAt: Date | null
    userId: string | null
    organizationId: string | null
    membershipId: string | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    action: number
    entity: number
    entityId: number
    oldValues: number
    newValues: number
    metadata: number
    createdAt: number
    userId: number
    organizationId: number
    membershipId: number
    _all: number
  }


  export type AuditLogMinAggregateInputType = {
    id?: true
    action?: true
    entity?: true
    entityId?: true
    createdAt?: true
    userId?: true
    organizationId?: true
    membershipId?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    action?: true
    entity?: true
    entityId?: true
    createdAt?: true
    userId?: true
    organizationId?: true
    membershipId?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    action?: true
    entity?: true
    entityId?: true
    oldValues?: true
    newValues?: true
    metadata?: true
    createdAt?: true
    userId?: true
    organizationId?: true
    membershipId?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    id: string
    action: string
    entity: string
    entityId: string
    oldValues: JsonValue | null
    newValues: JsonValue | null
    metadata: JsonValue | null
    createdAt: Date
    userId: string | null
    organizationId: string | null
    membershipId: string | null
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    action?: boolean
    entity?: boolean
    entityId?: boolean
    oldValues?: boolean
    newValues?: boolean
    metadata?: boolean
    createdAt?: boolean
    userId?: boolean
    organizationId?: boolean
    membershipId?: boolean
    user?: boolean | AuditLog$userArgs<ExtArgs>
    organization?: boolean | AuditLog$organizationArgs<ExtArgs>
    membership?: boolean | AuditLog$membershipArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    action?: boolean
    entity?: boolean
    entityId?: boolean
    oldValues?: boolean
    newValues?: boolean
    metadata?: boolean
    createdAt?: boolean
    userId?: boolean
    organizationId?: boolean
    membershipId?: boolean
    user?: boolean | AuditLog$userArgs<ExtArgs>
    organization?: boolean | AuditLog$organizationArgs<ExtArgs>
    membership?: boolean | AuditLog$membershipArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectScalar = {
    id?: boolean
    action?: boolean
    entity?: boolean
    entityId?: boolean
    oldValues?: boolean
    newValues?: boolean
    metadata?: boolean
    createdAt?: boolean
    userId?: boolean
    organizationId?: boolean
    membershipId?: boolean
  }

  export type AuditLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | AuditLog$userArgs<ExtArgs>
    organization?: boolean | AuditLog$organizationArgs<ExtArgs>
    membership?: boolean | AuditLog$membershipArgs<ExtArgs>
  }
  export type AuditLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | AuditLog$userArgs<ExtArgs>
    organization?: boolean | AuditLog$organizationArgs<ExtArgs>
    membership?: boolean | AuditLog$membershipArgs<ExtArgs>
  }

  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
      organization: Prisma.$OrganizationPayload<ExtArgs> | null
      membership: Prisma.$MembershipPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      action: string
      entity: string
      entityId: string
      oldValues: Prisma.JsonValue | null
      newValues: Prisma.JsonValue | null
      metadata: Prisma.JsonValue | null
      createdAt: Date
      userId: string | null
      organizationId: string | null
      membershipId: string | null
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditLogs and returns the data saved in the database.
     * @param {AuditLogCreateManyAndReturnArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends AuditLog$userArgs<ExtArgs> = {}>(args?: Subset<T, AuditLog$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    organization<T extends AuditLog$organizationArgs<ExtArgs> = {}>(args?: Subset<T, AuditLog$organizationArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    membership<T extends AuditLog$membershipArgs<ExtArgs> = {}>(args?: Subset<T, AuditLog$membershipArgs<ExtArgs>>): Prisma__MembershipClient<$Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuditLog model
   */ 
  interface AuditLogFieldRefs {
    readonly id: FieldRef<"AuditLog", 'String'>
    readonly action: FieldRef<"AuditLog", 'String'>
    readonly entity: FieldRef<"AuditLog", 'String'>
    readonly entityId: FieldRef<"AuditLog", 'String'>
    readonly oldValues: FieldRef<"AuditLog", 'Json'>
    readonly newValues: FieldRef<"AuditLog", 'Json'>
    readonly metadata: FieldRef<"AuditLog", 'Json'>
    readonly createdAt: FieldRef<"AuditLog", 'DateTime'>
    readonly userId: FieldRef<"AuditLog", 'String'>
    readonly organizationId: FieldRef<"AuditLog", 'String'>
    readonly membershipId: FieldRef<"AuditLog", 'String'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog createManyAndReturn
   */
  export type AuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
  }

  /**
   * AuditLog.user
   */
  export type AuditLog$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * AuditLog.organization
   */
  export type AuditLog$organizationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    where?: OrganizationWhereInput
  }

  /**
   * AuditLog.membership
   */
  export type AuditLog$membershipArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipInclude<ExtArgs> | null
    where?: MembershipWhereInput
  }

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    fullName: 'fullName',
    profileImage: 'profileImage',
    status: 'status',
    isEmailVerified: 'isEmailVerified',
    lastLoginAt: 'lastLoginAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const OrganizationScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    createdById: 'createdById'
  };

  export type OrganizationScalarFieldEnum = (typeof OrganizationScalarFieldEnum)[keyof typeof OrganizationScalarFieldEnum]


  export const MembershipScalarFieldEnum: {
    id: 'id',
    role: 'role',
    status: 'status',
    joinedAt: 'joinedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId',
    organizationId: 'organizationId'
  };

  export type MembershipScalarFieldEnum = (typeof MembershipScalarFieldEnum)[keyof typeof MembershipScalarFieldEnum]


  export const InvitationScalarFieldEnum: {
    id: 'id',
    email: 'email',
    role: 'role',
    status: 'status',
    token: 'token',
    expiresAt: 'expiresAt',
    sentAt: 'sentAt',
    acceptedAt: 'acceptedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    organizationId: 'organizationId',
    invitedById: 'invitedById'
  };

  export type InvitationScalarFieldEnum = (typeof InvitationScalarFieldEnum)[keyof typeof InvitationScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
    id: 'id',
    action: 'action',
    entity: 'entity',
    entityId: 'entityId',
    oldValues: 'oldValues',
    newValues: 'newValues',
    metadata: 'metadata',
    createdAt: 'createdAt',
    userId: 'userId',
    organizationId: 'organizationId',
    membershipId: 'membershipId'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'UserStatus'
   */
  export type EnumUserStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserStatus'>
    


  /**
   * Reference to a field of type 'UserStatus[]'
   */
  export type ListEnumUserStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserStatus[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'MembershipRole'
   */
  export type EnumMembershipRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MembershipRole'>
    


  /**
   * Reference to a field of type 'MembershipRole[]'
   */
  export type ListEnumMembershipRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MembershipRole[]'>
    


  /**
   * Reference to a field of type 'MembershipStatus'
   */
  export type EnumMembershipStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MembershipStatus'>
    


  /**
   * Reference to a field of type 'MembershipStatus[]'
   */
  export type ListEnumMembershipStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MembershipStatus[]'>
    


  /**
   * Reference to a field of type 'InvitationStatus'
   */
  export type EnumInvitationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InvitationStatus'>
    


  /**
   * Reference to a field of type 'InvitationStatus[]'
   */
  export type ListEnumInvitationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InvitationStatus[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    fullName?: StringNullableFilter<"User"> | string | null
    profileImage?: StringNullableFilter<"User"> | string | null
    status?: EnumUserStatusFilter<"User"> | $Enums.UserStatus
    isEmailVerified?: BoolFilter<"User"> | boolean
    lastLoginAt?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    memberships?: MembershipListRelationFilter
    createdOrgs?: OrganizationListRelationFilter
    invitations?: InvitationListRelationFilter
    auditLogs?: AuditLogListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    fullName?: SortOrderInput | SortOrder
    profileImage?: SortOrderInput | SortOrder
    status?: SortOrder
    isEmailVerified?: SortOrder
    lastLoginAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    memberships?: MembershipOrderByRelationAggregateInput
    createdOrgs?: OrganizationOrderByRelationAggregateInput
    invitations?: InvitationOrderByRelationAggregateInput
    auditLogs?: AuditLogOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    fullName?: StringNullableFilter<"User"> | string | null
    profileImage?: StringNullableFilter<"User"> | string | null
    status?: EnumUserStatusFilter<"User"> | $Enums.UserStatus
    isEmailVerified?: BoolFilter<"User"> | boolean
    lastLoginAt?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    memberships?: MembershipListRelationFilter
    createdOrgs?: OrganizationListRelationFilter
    invitations?: InvitationListRelationFilter
    auditLogs?: AuditLogListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    fullName?: SortOrderInput | SortOrder
    profileImage?: SortOrderInput | SortOrder
    status?: SortOrder
    isEmailVerified?: SortOrder
    lastLoginAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    fullName?: StringNullableWithAggregatesFilter<"User"> | string | null
    profileImage?: StringNullableWithAggregatesFilter<"User"> | string | null
    status?: EnumUserStatusWithAggregatesFilter<"User"> | $Enums.UserStatus
    isEmailVerified?: BoolWithAggregatesFilter<"User"> | boolean
    lastLoginAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type OrganizationWhereInput = {
    AND?: OrganizationWhereInput | OrganizationWhereInput[]
    OR?: OrganizationWhereInput[]
    NOT?: OrganizationWhereInput | OrganizationWhereInput[]
    id?: StringFilter<"Organization"> | string
    name?: StringFilter<"Organization"> | string
    slug?: StringFilter<"Organization"> | string
    description?: StringNullableFilter<"Organization"> | string | null
    createdAt?: DateTimeFilter<"Organization"> | Date | string
    updatedAt?: DateTimeFilter<"Organization"> | Date | string
    createdById?: StringFilter<"Organization"> | string
    createdBy?: XOR<UserRelationFilter, UserWhereInput>
    memberships?: MembershipListRelationFilter
    invitations?: InvitationListRelationFilter
    auditLogs?: AuditLogListRelationFilter
  }

  export type OrganizationOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrder
    createdBy?: UserOrderByWithRelationInput
    memberships?: MembershipOrderByRelationAggregateInput
    invitations?: InvitationOrderByRelationAggregateInput
    auditLogs?: AuditLogOrderByRelationAggregateInput
  }

  export type OrganizationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: OrganizationWhereInput | OrganizationWhereInput[]
    OR?: OrganizationWhereInput[]
    NOT?: OrganizationWhereInput | OrganizationWhereInput[]
    name?: StringFilter<"Organization"> | string
    description?: StringNullableFilter<"Organization"> | string | null
    createdAt?: DateTimeFilter<"Organization"> | Date | string
    updatedAt?: DateTimeFilter<"Organization"> | Date | string
    createdById?: StringFilter<"Organization"> | string
    createdBy?: XOR<UserRelationFilter, UserWhereInput>
    memberships?: MembershipListRelationFilter
    invitations?: InvitationListRelationFilter
    auditLogs?: AuditLogListRelationFilter
  }, "id" | "slug">

  export type OrganizationOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrder
    _count?: OrganizationCountOrderByAggregateInput
    _max?: OrganizationMaxOrderByAggregateInput
    _min?: OrganizationMinOrderByAggregateInput
  }

  export type OrganizationScalarWhereWithAggregatesInput = {
    AND?: OrganizationScalarWhereWithAggregatesInput | OrganizationScalarWhereWithAggregatesInput[]
    OR?: OrganizationScalarWhereWithAggregatesInput[]
    NOT?: OrganizationScalarWhereWithAggregatesInput | OrganizationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Organization"> | string
    name?: StringWithAggregatesFilter<"Organization"> | string
    slug?: StringWithAggregatesFilter<"Organization"> | string
    description?: StringNullableWithAggregatesFilter<"Organization"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Organization"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Organization"> | Date | string
    createdById?: StringWithAggregatesFilter<"Organization"> | string
  }

  export type MembershipWhereInput = {
    AND?: MembershipWhereInput | MembershipWhereInput[]
    OR?: MembershipWhereInput[]
    NOT?: MembershipWhereInput | MembershipWhereInput[]
    id?: StringFilter<"Membership"> | string
    role?: EnumMembershipRoleFilter<"Membership"> | $Enums.MembershipRole
    status?: EnumMembershipStatusFilter<"Membership"> | $Enums.MembershipStatus
    joinedAt?: DateTimeFilter<"Membership"> | Date | string
    createdAt?: DateTimeFilter<"Membership"> | Date | string
    updatedAt?: DateTimeFilter<"Membership"> | Date | string
    userId?: StringFilter<"Membership"> | string
    organizationId?: StringFilter<"Membership"> | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    organization?: XOR<OrganizationRelationFilter, OrganizationWhereInput>
    auditLogs?: AuditLogListRelationFilter
  }

  export type MembershipOrderByWithRelationInput = {
    id?: SortOrder
    role?: SortOrder
    status?: SortOrder
    joinedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    organizationId?: SortOrder
    user?: UserOrderByWithRelationInput
    organization?: OrganizationOrderByWithRelationInput
    auditLogs?: AuditLogOrderByRelationAggregateInput
  }

  export type MembershipWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_organizationId?: MembershipUserIdOrganizationIdCompoundUniqueInput
    AND?: MembershipWhereInput | MembershipWhereInput[]
    OR?: MembershipWhereInput[]
    NOT?: MembershipWhereInput | MembershipWhereInput[]
    role?: EnumMembershipRoleFilter<"Membership"> | $Enums.MembershipRole
    status?: EnumMembershipStatusFilter<"Membership"> | $Enums.MembershipStatus
    joinedAt?: DateTimeFilter<"Membership"> | Date | string
    createdAt?: DateTimeFilter<"Membership"> | Date | string
    updatedAt?: DateTimeFilter<"Membership"> | Date | string
    userId?: StringFilter<"Membership"> | string
    organizationId?: StringFilter<"Membership"> | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    organization?: XOR<OrganizationRelationFilter, OrganizationWhereInput>
    auditLogs?: AuditLogListRelationFilter
  }, "id" | "userId_organizationId">

  export type MembershipOrderByWithAggregationInput = {
    id?: SortOrder
    role?: SortOrder
    status?: SortOrder
    joinedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    organizationId?: SortOrder
    _count?: MembershipCountOrderByAggregateInput
    _max?: MembershipMaxOrderByAggregateInput
    _min?: MembershipMinOrderByAggregateInput
  }

  export type MembershipScalarWhereWithAggregatesInput = {
    AND?: MembershipScalarWhereWithAggregatesInput | MembershipScalarWhereWithAggregatesInput[]
    OR?: MembershipScalarWhereWithAggregatesInput[]
    NOT?: MembershipScalarWhereWithAggregatesInput | MembershipScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Membership"> | string
    role?: EnumMembershipRoleWithAggregatesFilter<"Membership"> | $Enums.MembershipRole
    status?: EnumMembershipStatusWithAggregatesFilter<"Membership"> | $Enums.MembershipStatus
    joinedAt?: DateTimeWithAggregatesFilter<"Membership"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Membership"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Membership"> | Date | string
    userId?: StringWithAggregatesFilter<"Membership"> | string
    organizationId?: StringWithAggregatesFilter<"Membership"> | string
  }

  export type InvitationWhereInput = {
    AND?: InvitationWhereInput | InvitationWhereInput[]
    OR?: InvitationWhereInput[]
    NOT?: InvitationWhereInput | InvitationWhereInput[]
    id?: StringFilter<"Invitation"> | string
    email?: StringFilter<"Invitation"> | string
    role?: EnumMembershipRoleFilter<"Invitation"> | $Enums.MembershipRole
    status?: EnumInvitationStatusFilter<"Invitation"> | $Enums.InvitationStatus
    token?: StringFilter<"Invitation"> | string
    expiresAt?: DateTimeFilter<"Invitation"> | Date | string
    sentAt?: DateTimeFilter<"Invitation"> | Date | string
    acceptedAt?: DateTimeNullableFilter<"Invitation"> | Date | string | null
    createdAt?: DateTimeFilter<"Invitation"> | Date | string
    updatedAt?: DateTimeFilter<"Invitation"> | Date | string
    organizationId?: StringFilter<"Invitation"> | string
    invitedById?: StringNullableFilter<"Invitation"> | string | null
    organization?: XOR<OrganizationRelationFilter, OrganizationWhereInput>
    invitedBy?: XOR<UserNullableRelationFilter, UserWhereInput> | null
  }

  export type InvitationOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    role?: SortOrder
    status?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    sentAt?: SortOrder
    acceptedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    organizationId?: SortOrder
    invitedById?: SortOrderInput | SortOrder
    organization?: OrganizationOrderByWithRelationInput
    invitedBy?: UserOrderByWithRelationInput
  }

  export type InvitationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: InvitationWhereInput | InvitationWhereInput[]
    OR?: InvitationWhereInput[]
    NOT?: InvitationWhereInput | InvitationWhereInput[]
    email?: StringFilter<"Invitation"> | string
    role?: EnumMembershipRoleFilter<"Invitation"> | $Enums.MembershipRole
    status?: EnumInvitationStatusFilter<"Invitation"> | $Enums.InvitationStatus
    expiresAt?: DateTimeFilter<"Invitation"> | Date | string
    sentAt?: DateTimeFilter<"Invitation"> | Date | string
    acceptedAt?: DateTimeNullableFilter<"Invitation"> | Date | string | null
    createdAt?: DateTimeFilter<"Invitation"> | Date | string
    updatedAt?: DateTimeFilter<"Invitation"> | Date | string
    organizationId?: StringFilter<"Invitation"> | string
    invitedById?: StringNullableFilter<"Invitation"> | string | null
    organization?: XOR<OrganizationRelationFilter, OrganizationWhereInput>
    invitedBy?: XOR<UserNullableRelationFilter, UserWhereInput> | null
  }, "id" | "token">

  export type InvitationOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    role?: SortOrder
    status?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    sentAt?: SortOrder
    acceptedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    organizationId?: SortOrder
    invitedById?: SortOrderInput | SortOrder
    _count?: InvitationCountOrderByAggregateInput
    _max?: InvitationMaxOrderByAggregateInput
    _min?: InvitationMinOrderByAggregateInput
  }

  export type InvitationScalarWhereWithAggregatesInput = {
    AND?: InvitationScalarWhereWithAggregatesInput | InvitationScalarWhereWithAggregatesInput[]
    OR?: InvitationScalarWhereWithAggregatesInput[]
    NOT?: InvitationScalarWhereWithAggregatesInput | InvitationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Invitation"> | string
    email?: StringWithAggregatesFilter<"Invitation"> | string
    role?: EnumMembershipRoleWithAggregatesFilter<"Invitation"> | $Enums.MembershipRole
    status?: EnumInvitationStatusWithAggregatesFilter<"Invitation"> | $Enums.InvitationStatus
    token?: StringWithAggregatesFilter<"Invitation"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"Invitation"> | Date | string
    sentAt?: DateTimeWithAggregatesFilter<"Invitation"> | Date | string
    acceptedAt?: DateTimeNullableWithAggregatesFilter<"Invitation"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Invitation"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Invitation"> | Date | string
    organizationId?: StringWithAggregatesFilter<"Invitation"> | string
    invitedById?: StringNullableWithAggregatesFilter<"Invitation"> | string | null
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    entity?: StringFilter<"AuditLog"> | string
    entityId?: StringFilter<"AuditLog"> | string
    oldValues?: JsonNullableFilter<"AuditLog">
    newValues?: JsonNullableFilter<"AuditLog">
    metadata?: JsonNullableFilter<"AuditLog">
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
    userId?: StringNullableFilter<"AuditLog"> | string | null
    organizationId?: StringNullableFilter<"AuditLog"> | string | null
    membershipId?: StringNullableFilter<"AuditLog"> | string | null
    user?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    organization?: XOR<OrganizationNullableRelationFilter, OrganizationWhereInput> | null
    membership?: XOR<MembershipNullableRelationFilter, MembershipWhereInput> | null
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    action?: SortOrder
    entity?: SortOrder
    entityId?: SortOrder
    oldValues?: SortOrderInput | SortOrder
    newValues?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    userId?: SortOrderInput | SortOrder
    organizationId?: SortOrderInput | SortOrder
    membershipId?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    organization?: OrganizationOrderByWithRelationInput
    membership?: MembershipOrderByWithRelationInput
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    action?: StringFilter<"AuditLog"> | string
    entity?: StringFilter<"AuditLog"> | string
    entityId?: StringFilter<"AuditLog"> | string
    oldValues?: JsonNullableFilter<"AuditLog">
    newValues?: JsonNullableFilter<"AuditLog">
    metadata?: JsonNullableFilter<"AuditLog">
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
    userId?: StringNullableFilter<"AuditLog"> | string | null
    organizationId?: StringNullableFilter<"AuditLog"> | string | null
    membershipId?: StringNullableFilter<"AuditLog"> | string | null
    user?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    organization?: XOR<OrganizationNullableRelationFilter, OrganizationWhereInput> | null
    membership?: XOR<MembershipNullableRelationFilter, MembershipWhereInput> | null
  }, "id">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    action?: SortOrder
    entity?: SortOrder
    entityId?: SortOrder
    oldValues?: SortOrderInput | SortOrder
    newValues?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    userId?: SortOrderInput | SortOrder
    organizationId?: SortOrderInput | SortOrder
    membershipId?: SortOrderInput | SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuditLog"> | string
    action?: StringWithAggregatesFilter<"AuditLog"> | string
    entity?: StringWithAggregatesFilter<"AuditLog"> | string
    entityId?: StringWithAggregatesFilter<"AuditLog"> | string
    oldValues?: JsonNullableWithAggregatesFilter<"AuditLog">
    newValues?: JsonNullableWithAggregatesFilter<"AuditLog">
    metadata?: JsonNullableWithAggregatesFilter<"AuditLog">
    createdAt?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
    userId?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    organizationId?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    membershipId?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
  }

  export type UserCreateInput = {
    id?: string
    email: string
    fullName?: string | null
    profileImage?: string | null
    status?: $Enums.UserStatus
    isEmailVerified?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    memberships?: MembershipCreateNestedManyWithoutUserInput
    createdOrgs?: OrganizationCreateNestedManyWithoutCreatedByInput
    invitations?: InvitationCreateNestedManyWithoutInvitedByInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    fullName?: string | null
    profileImage?: string | null
    status?: $Enums.UserStatus
    isEmailVerified?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    memberships?: MembershipUncheckedCreateNestedManyWithoutUserInput
    createdOrgs?: OrganizationUncheckedCreateNestedManyWithoutCreatedByInput
    invitations?: InvitationUncheckedCreateNestedManyWithoutInvitedByInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: MembershipUpdateManyWithoutUserNestedInput
    createdOrgs?: OrganizationUpdateManyWithoutCreatedByNestedInput
    invitations?: InvitationUpdateManyWithoutInvitedByNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: MembershipUncheckedUpdateManyWithoutUserNestedInput
    createdOrgs?: OrganizationUncheckedUpdateManyWithoutCreatedByNestedInput
    invitations?: InvitationUncheckedUpdateManyWithoutInvitedByNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    fullName?: string | null
    profileImage?: string | null
    status?: $Enums.UserStatus
    isEmailVerified?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizationCreateInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutCreatedOrgsInput
    memberships?: MembershipCreateNestedManyWithoutOrganizationInput
    invitations?: InvitationCreateNestedManyWithoutOrganizationInput
    auditLogs?: AuditLogCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById: string
    memberships?: MembershipUncheckedCreateNestedManyWithoutOrganizationInput
    invitations?: InvitationUncheckedCreateNestedManyWithoutOrganizationInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutCreatedOrgsNestedInput
    memberships?: MembershipUpdateManyWithoutOrganizationNestedInput
    invitations?: InvitationUpdateManyWithoutOrganizationNestedInput
    auditLogs?: AuditLogUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: StringFieldUpdateOperationsInput | string
    memberships?: MembershipUncheckedUpdateManyWithoutOrganizationNestedInput
    invitations?: InvitationUncheckedUpdateManyWithoutOrganizationNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationCreateManyInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById: string
  }

  export type OrganizationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: StringFieldUpdateOperationsInput | string
  }

  export type MembershipCreateInput = {
    id?: string
    role?: $Enums.MembershipRole
    status?: $Enums.MembershipStatus
    joinedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutMembershipsInput
    organization: OrganizationCreateNestedOneWithoutMembershipsInput
    auditLogs?: AuditLogCreateNestedManyWithoutMembershipInput
  }

  export type MembershipUncheckedCreateInput = {
    id?: string
    role?: $Enums.MembershipRole
    status?: $Enums.MembershipStatus
    joinedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    organizationId: string
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutMembershipInput
  }

  export type MembershipUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumMembershipRoleFieldUpdateOperationsInput | $Enums.MembershipRole
    status?: EnumMembershipStatusFieldUpdateOperationsInput | $Enums.MembershipStatus
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMembershipsNestedInput
    organization?: OrganizationUpdateOneRequiredWithoutMembershipsNestedInput
    auditLogs?: AuditLogUpdateManyWithoutMembershipNestedInput
  }

  export type MembershipUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumMembershipRoleFieldUpdateOperationsInput | $Enums.MembershipRole
    status?: EnumMembershipStatusFieldUpdateOperationsInput | $Enums.MembershipStatus
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    auditLogs?: AuditLogUncheckedUpdateManyWithoutMembershipNestedInput
  }

  export type MembershipCreateManyInput = {
    id?: string
    role?: $Enums.MembershipRole
    status?: $Enums.MembershipStatus
    joinedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    organizationId: string
  }

  export type MembershipUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumMembershipRoleFieldUpdateOperationsInput | $Enums.MembershipRole
    status?: EnumMembershipStatusFieldUpdateOperationsInput | $Enums.MembershipStatus
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MembershipUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumMembershipRoleFieldUpdateOperationsInput | $Enums.MembershipRole
    status?: EnumMembershipStatusFieldUpdateOperationsInput | $Enums.MembershipStatus
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
  }

  export type InvitationCreateInput = {
    id?: string
    email: string
    role?: $Enums.MembershipRole
    status?: $Enums.InvitationStatus
    token: string
    expiresAt: Date | string
    sentAt?: Date | string
    acceptedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    organization: OrganizationCreateNestedOneWithoutInvitationsInput
    invitedBy?: UserCreateNestedOneWithoutInvitationsInput
  }

  export type InvitationUncheckedCreateInput = {
    id?: string
    email: string
    role?: $Enums.MembershipRole
    status?: $Enums.InvitationStatus
    token: string
    expiresAt: Date | string
    sentAt?: Date | string
    acceptedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    organizationId: string
    invitedById?: string | null
  }

  export type InvitationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumMembershipRoleFieldUpdateOperationsInput | $Enums.MembershipRole
    status?: EnumInvitationStatusFieldUpdateOperationsInput | $Enums.InvitationStatus
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutInvitationsNestedInput
    invitedBy?: UserUpdateOneWithoutInvitationsNestedInput
  }

  export type InvitationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumMembershipRoleFieldUpdateOperationsInput | $Enums.MembershipRole
    status?: EnumInvitationStatusFieldUpdateOperationsInput | $Enums.InvitationStatus
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizationId?: StringFieldUpdateOperationsInput | string
    invitedById?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type InvitationCreateManyInput = {
    id?: string
    email: string
    role?: $Enums.MembershipRole
    status?: $Enums.InvitationStatus
    token: string
    expiresAt: Date | string
    sentAt?: Date | string
    acceptedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    organizationId: string
    invitedById?: string | null
  }

  export type InvitationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumMembershipRoleFieldUpdateOperationsInput | $Enums.MembershipRole
    status?: EnumInvitationStatusFieldUpdateOperationsInput | $Enums.InvitationStatus
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvitationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumMembershipRoleFieldUpdateOperationsInput | $Enums.MembershipRole
    status?: EnumInvitationStatusFieldUpdateOperationsInput | $Enums.InvitationStatus
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizationId?: StringFieldUpdateOperationsInput | string
    invitedById?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuditLogCreateInput = {
    id?: string
    action: string
    entity: string
    entityId: string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutAuditLogsInput
    organization?: OrganizationCreateNestedOneWithoutAuditLogsInput
    membership?: MembershipCreateNestedOneWithoutAuditLogsInput
  }

  export type AuditLogUncheckedCreateInput = {
    id?: string
    action: string
    entity: string
    entityId: string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    userId?: string | null
    organizationId?: string | null
    membershipId?: string | null
  }

  export type AuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutAuditLogsNestedInput
    organization?: OrganizationUpdateOneWithoutAuditLogsNestedInput
    membership?: MembershipUpdateOneWithoutAuditLogsNestedInput
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    membershipId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuditLogCreateManyInput = {
    id?: string
    action: string
    entity: string
    entityId: string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    userId?: string | null
    organizationId?: string | null
    membershipId?: string | null
  }

  export type AuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    membershipId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumUserStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | EnumUserStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUserStatusFilter<$PrismaModel> | $Enums.UserStatus
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type MembershipListRelationFilter = {
    every?: MembershipWhereInput
    some?: MembershipWhereInput
    none?: MembershipWhereInput
  }

  export type OrganizationListRelationFilter = {
    every?: OrganizationWhereInput
    some?: OrganizationWhereInput
    none?: OrganizationWhereInput
  }

  export type InvitationListRelationFilter = {
    every?: InvitationWhereInput
    some?: InvitationWhereInput
    none?: InvitationWhereInput
  }

  export type AuditLogListRelationFilter = {
    every?: AuditLogWhereInput
    some?: AuditLogWhereInput
    none?: AuditLogWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type MembershipOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrganizationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type InvitationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AuditLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    fullName?: SortOrder
    profileImage?: SortOrder
    status?: SortOrder
    isEmailVerified?: SortOrder
    lastLoginAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    fullName?: SortOrder
    profileImage?: SortOrder
    status?: SortOrder
    isEmailVerified?: SortOrder
    lastLoginAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    fullName?: SortOrder
    profileImage?: SortOrder
    status?: SortOrder
    isEmailVerified?: SortOrder
    lastLoginAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumUserStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | EnumUserStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUserStatusWithAggregatesFilter<$PrismaModel> | $Enums.UserStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserStatusFilter<$PrismaModel>
    _max?: NestedEnumUserStatusFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type OrganizationCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrder
  }

  export type OrganizationMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrder
  }

  export type OrganizationMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrder
  }

  export type EnumMembershipRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.MembershipRole | EnumMembershipRoleFieldRefInput<$PrismaModel>
    in?: $Enums.MembershipRole[] | ListEnumMembershipRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.MembershipRole[] | ListEnumMembershipRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumMembershipRoleFilter<$PrismaModel> | $Enums.MembershipRole
  }

  export type EnumMembershipStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.MembershipStatus | EnumMembershipStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MembershipStatus[] | ListEnumMembershipStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MembershipStatus[] | ListEnumMembershipStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMembershipStatusFilter<$PrismaModel> | $Enums.MembershipStatus
  }

  export type OrganizationRelationFilter = {
    is?: OrganizationWhereInput
    isNot?: OrganizationWhereInput
  }

  export type MembershipUserIdOrganizationIdCompoundUniqueInput = {
    userId: string
    organizationId: string
  }

  export type MembershipCountOrderByAggregateInput = {
    id?: SortOrder
    role?: SortOrder
    status?: SortOrder
    joinedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    organizationId?: SortOrder
  }

  export type MembershipMaxOrderByAggregateInput = {
    id?: SortOrder
    role?: SortOrder
    status?: SortOrder
    joinedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    organizationId?: SortOrder
  }

  export type MembershipMinOrderByAggregateInput = {
    id?: SortOrder
    role?: SortOrder
    status?: SortOrder
    joinedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    organizationId?: SortOrder
  }

  export type EnumMembershipRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MembershipRole | EnumMembershipRoleFieldRefInput<$PrismaModel>
    in?: $Enums.MembershipRole[] | ListEnumMembershipRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.MembershipRole[] | ListEnumMembershipRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumMembershipRoleWithAggregatesFilter<$PrismaModel> | $Enums.MembershipRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMembershipRoleFilter<$PrismaModel>
    _max?: NestedEnumMembershipRoleFilter<$PrismaModel>
  }

  export type EnumMembershipStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MembershipStatus | EnumMembershipStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MembershipStatus[] | ListEnumMembershipStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MembershipStatus[] | ListEnumMembershipStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMembershipStatusWithAggregatesFilter<$PrismaModel> | $Enums.MembershipStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMembershipStatusFilter<$PrismaModel>
    _max?: NestedEnumMembershipStatusFilter<$PrismaModel>
  }

  export type EnumInvitationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.InvitationStatus | EnumInvitationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.InvitationStatus[] | ListEnumInvitationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.InvitationStatus[] | ListEnumInvitationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumInvitationStatusFilter<$PrismaModel> | $Enums.InvitationStatus
  }

  export type UserNullableRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type InvitationCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    role?: SortOrder
    status?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    sentAt?: SortOrder
    acceptedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    organizationId?: SortOrder
    invitedById?: SortOrder
  }

  export type InvitationMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    role?: SortOrder
    status?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    sentAt?: SortOrder
    acceptedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    organizationId?: SortOrder
    invitedById?: SortOrder
  }

  export type InvitationMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    role?: SortOrder
    status?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    sentAt?: SortOrder
    acceptedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    organizationId?: SortOrder
    invitedById?: SortOrder
  }

  export type EnumInvitationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InvitationStatus | EnumInvitationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.InvitationStatus[] | ListEnumInvitationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.InvitationStatus[] | ListEnumInvitationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumInvitationStatusWithAggregatesFilter<$PrismaModel> | $Enums.InvitationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumInvitationStatusFilter<$PrismaModel>
    _max?: NestedEnumInvitationStatusFilter<$PrismaModel>
  }
  export type JsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type OrganizationNullableRelationFilter = {
    is?: OrganizationWhereInput | null
    isNot?: OrganizationWhereInput | null
  }

  export type MembershipNullableRelationFilter = {
    is?: MembershipWhereInput | null
    isNot?: MembershipWhereInput | null
  }

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    entity?: SortOrder
    entityId?: SortOrder
    oldValues?: SortOrder
    newValues?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    organizationId?: SortOrder
    membershipId?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    entity?: SortOrder
    entityId?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    organizationId?: SortOrder
    membershipId?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    entity?: SortOrder
    entityId?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    organizationId?: SortOrder
    membershipId?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type MembershipCreateNestedManyWithoutUserInput = {
    create?: XOR<MembershipCreateWithoutUserInput, MembershipUncheckedCreateWithoutUserInput> | MembershipCreateWithoutUserInput[] | MembershipUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MembershipCreateOrConnectWithoutUserInput | MembershipCreateOrConnectWithoutUserInput[]
    createMany?: MembershipCreateManyUserInputEnvelope
    connect?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
  }

  export type OrganizationCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<OrganizationCreateWithoutCreatedByInput, OrganizationUncheckedCreateWithoutCreatedByInput> | OrganizationCreateWithoutCreatedByInput[] | OrganizationUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: OrganizationCreateOrConnectWithoutCreatedByInput | OrganizationCreateOrConnectWithoutCreatedByInput[]
    createMany?: OrganizationCreateManyCreatedByInputEnvelope
    connect?: OrganizationWhereUniqueInput | OrganizationWhereUniqueInput[]
  }

  export type InvitationCreateNestedManyWithoutInvitedByInput = {
    create?: XOR<InvitationCreateWithoutInvitedByInput, InvitationUncheckedCreateWithoutInvitedByInput> | InvitationCreateWithoutInvitedByInput[] | InvitationUncheckedCreateWithoutInvitedByInput[]
    connectOrCreate?: InvitationCreateOrConnectWithoutInvitedByInput | InvitationCreateOrConnectWithoutInvitedByInput[]
    createMany?: InvitationCreateManyInvitedByInputEnvelope
    connect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
  }

  export type AuditLogCreateNestedManyWithoutUserInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type MembershipUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<MembershipCreateWithoutUserInput, MembershipUncheckedCreateWithoutUserInput> | MembershipCreateWithoutUserInput[] | MembershipUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MembershipCreateOrConnectWithoutUserInput | MembershipCreateOrConnectWithoutUserInput[]
    createMany?: MembershipCreateManyUserInputEnvelope
    connect?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
  }

  export type OrganizationUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<OrganizationCreateWithoutCreatedByInput, OrganizationUncheckedCreateWithoutCreatedByInput> | OrganizationCreateWithoutCreatedByInput[] | OrganizationUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: OrganizationCreateOrConnectWithoutCreatedByInput | OrganizationCreateOrConnectWithoutCreatedByInput[]
    createMany?: OrganizationCreateManyCreatedByInputEnvelope
    connect?: OrganizationWhereUniqueInput | OrganizationWhereUniqueInput[]
  }

  export type InvitationUncheckedCreateNestedManyWithoutInvitedByInput = {
    create?: XOR<InvitationCreateWithoutInvitedByInput, InvitationUncheckedCreateWithoutInvitedByInput> | InvitationCreateWithoutInvitedByInput[] | InvitationUncheckedCreateWithoutInvitedByInput[]
    connectOrCreate?: InvitationCreateOrConnectWithoutInvitedByInput | InvitationCreateOrConnectWithoutInvitedByInput[]
    createMany?: InvitationCreateManyInvitedByInputEnvelope
    connect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
  }

  export type AuditLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumUserStatusFieldUpdateOperationsInput = {
    set?: $Enums.UserStatus
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type MembershipUpdateManyWithoutUserNestedInput = {
    create?: XOR<MembershipCreateWithoutUserInput, MembershipUncheckedCreateWithoutUserInput> | MembershipCreateWithoutUserInput[] | MembershipUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MembershipCreateOrConnectWithoutUserInput | MembershipCreateOrConnectWithoutUserInput[]
    upsert?: MembershipUpsertWithWhereUniqueWithoutUserInput | MembershipUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MembershipCreateManyUserInputEnvelope
    set?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    disconnect?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    delete?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    connect?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    update?: MembershipUpdateWithWhereUniqueWithoutUserInput | MembershipUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MembershipUpdateManyWithWhereWithoutUserInput | MembershipUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MembershipScalarWhereInput | MembershipScalarWhereInput[]
  }

  export type OrganizationUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<OrganizationCreateWithoutCreatedByInput, OrganizationUncheckedCreateWithoutCreatedByInput> | OrganizationCreateWithoutCreatedByInput[] | OrganizationUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: OrganizationCreateOrConnectWithoutCreatedByInput | OrganizationCreateOrConnectWithoutCreatedByInput[]
    upsert?: OrganizationUpsertWithWhereUniqueWithoutCreatedByInput | OrganizationUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: OrganizationCreateManyCreatedByInputEnvelope
    set?: OrganizationWhereUniqueInput | OrganizationWhereUniqueInput[]
    disconnect?: OrganizationWhereUniqueInput | OrganizationWhereUniqueInput[]
    delete?: OrganizationWhereUniqueInput | OrganizationWhereUniqueInput[]
    connect?: OrganizationWhereUniqueInput | OrganizationWhereUniqueInput[]
    update?: OrganizationUpdateWithWhereUniqueWithoutCreatedByInput | OrganizationUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: OrganizationUpdateManyWithWhereWithoutCreatedByInput | OrganizationUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: OrganizationScalarWhereInput | OrganizationScalarWhereInput[]
  }

  export type InvitationUpdateManyWithoutInvitedByNestedInput = {
    create?: XOR<InvitationCreateWithoutInvitedByInput, InvitationUncheckedCreateWithoutInvitedByInput> | InvitationCreateWithoutInvitedByInput[] | InvitationUncheckedCreateWithoutInvitedByInput[]
    connectOrCreate?: InvitationCreateOrConnectWithoutInvitedByInput | InvitationCreateOrConnectWithoutInvitedByInput[]
    upsert?: InvitationUpsertWithWhereUniqueWithoutInvitedByInput | InvitationUpsertWithWhereUniqueWithoutInvitedByInput[]
    createMany?: InvitationCreateManyInvitedByInputEnvelope
    set?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    disconnect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    delete?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    connect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    update?: InvitationUpdateWithWhereUniqueWithoutInvitedByInput | InvitationUpdateWithWhereUniqueWithoutInvitedByInput[]
    updateMany?: InvitationUpdateManyWithWhereWithoutInvitedByInput | InvitationUpdateManyWithWhereWithoutInvitedByInput[]
    deleteMany?: InvitationScalarWhereInput | InvitationScalarWhereInput[]
  }

  export type AuditLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutUserInput | AuditLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutUserInput | AuditLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutUserInput | AuditLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type MembershipUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<MembershipCreateWithoutUserInput, MembershipUncheckedCreateWithoutUserInput> | MembershipCreateWithoutUserInput[] | MembershipUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MembershipCreateOrConnectWithoutUserInput | MembershipCreateOrConnectWithoutUserInput[]
    upsert?: MembershipUpsertWithWhereUniqueWithoutUserInput | MembershipUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MembershipCreateManyUserInputEnvelope
    set?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    disconnect?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    delete?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    connect?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    update?: MembershipUpdateWithWhereUniqueWithoutUserInput | MembershipUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MembershipUpdateManyWithWhereWithoutUserInput | MembershipUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MembershipScalarWhereInput | MembershipScalarWhereInput[]
  }

  export type OrganizationUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<OrganizationCreateWithoutCreatedByInput, OrganizationUncheckedCreateWithoutCreatedByInput> | OrganizationCreateWithoutCreatedByInput[] | OrganizationUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: OrganizationCreateOrConnectWithoutCreatedByInput | OrganizationCreateOrConnectWithoutCreatedByInput[]
    upsert?: OrganizationUpsertWithWhereUniqueWithoutCreatedByInput | OrganizationUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: OrganizationCreateManyCreatedByInputEnvelope
    set?: OrganizationWhereUniqueInput | OrganizationWhereUniqueInput[]
    disconnect?: OrganizationWhereUniqueInput | OrganizationWhereUniqueInput[]
    delete?: OrganizationWhereUniqueInput | OrganizationWhereUniqueInput[]
    connect?: OrganizationWhereUniqueInput | OrganizationWhereUniqueInput[]
    update?: OrganizationUpdateWithWhereUniqueWithoutCreatedByInput | OrganizationUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: OrganizationUpdateManyWithWhereWithoutCreatedByInput | OrganizationUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: OrganizationScalarWhereInput | OrganizationScalarWhereInput[]
  }

  export type InvitationUncheckedUpdateManyWithoutInvitedByNestedInput = {
    create?: XOR<InvitationCreateWithoutInvitedByInput, InvitationUncheckedCreateWithoutInvitedByInput> | InvitationCreateWithoutInvitedByInput[] | InvitationUncheckedCreateWithoutInvitedByInput[]
    connectOrCreate?: InvitationCreateOrConnectWithoutInvitedByInput | InvitationCreateOrConnectWithoutInvitedByInput[]
    upsert?: InvitationUpsertWithWhereUniqueWithoutInvitedByInput | InvitationUpsertWithWhereUniqueWithoutInvitedByInput[]
    createMany?: InvitationCreateManyInvitedByInputEnvelope
    set?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    disconnect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    delete?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    connect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    update?: InvitationUpdateWithWhereUniqueWithoutInvitedByInput | InvitationUpdateWithWhereUniqueWithoutInvitedByInput[]
    updateMany?: InvitationUpdateManyWithWhereWithoutInvitedByInput | InvitationUpdateManyWithWhereWithoutInvitedByInput[]
    deleteMany?: InvitationScalarWhereInput | InvitationScalarWhereInput[]
  }

  export type AuditLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutUserInput | AuditLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutUserInput | AuditLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutUserInput | AuditLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutCreatedOrgsInput = {
    create?: XOR<UserCreateWithoutCreatedOrgsInput, UserUncheckedCreateWithoutCreatedOrgsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedOrgsInput
    connect?: UserWhereUniqueInput
  }

  export type MembershipCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<MembershipCreateWithoutOrganizationInput, MembershipUncheckedCreateWithoutOrganizationInput> | MembershipCreateWithoutOrganizationInput[] | MembershipUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: MembershipCreateOrConnectWithoutOrganizationInput | MembershipCreateOrConnectWithoutOrganizationInput[]
    createMany?: MembershipCreateManyOrganizationInputEnvelope
    connect?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
  }

  export type InvitationCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<InvitationCreateWithoutOrganizationInput, InvitationUncheckedCreateWithoutOrganizationInput> | InvitationCreateWithoutOrganizationInput[] | InvitationUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: InvitationCreateOrConnectWithoutOrganizationInput | InvitationCreateOrConnectWithoutOrganizationInput[]
    createMany?: InvitationCreateManyOrganizationInputEnvelope
    connect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
  }

  export type AuditLogCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<AuditLogCreateWithoutOrganizationInput, AuditLogUncheckedCreateWithoutOrganizationInput> | AuditLogCreateWithoutOrganizationInput[] | AuditLogUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutOrganizationInput | AuditLogCreateOrConnectWithoutOrganizationInput[]
    createMany?: AuditLogCreateManyOrganizationInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type MembershipUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<MembershipCreateWithoutOrganizationInput, MembershipUncheckedCreateWithoutOrganizationInput> | MembershipCreateWithoutOrganizationInput[] | MembershipUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: MembershipCreateOrConnectWithoutOrganizationInput | MembershipCreateOrConnectWithoutOrganizationInput[]
    createMany?: MembershipCreateManyOrganizationInputEnvelope
    connect?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
  }

  export type InvitationUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<InvitationCreateWithoutOrganizationInput, InvitationUncheckedCreateWithoutOrganizationInput> | InvitationCreateWithoutOrganizationInput[] | InvitationUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: InvitationCreateOrConnectWithoutOrganizationInput | InvitationCreateOrConnectWithoutOrganizationInput[]
    createMany?: InvitationCreateManyOrganizationInputEnvelope
    connect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
  }

  export type AuditLogUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<AuditLogCreateWithoutOrganizationInput, AuditLogUncheckedCreateWithoutOrganizationInput> | AuditLogCreateWithoutOrganizationInput[] | AuditLogUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutOrganizationInput | AuditLogCreateOrConnectWithoutOrganizationInput[]
    createMany?: AuditLogCreateManyOrganizationInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutCreatedOrgsNestedInput = {
    create?: XOR<UserCreateWithoutCreatedOrgsInput, UserUncheckedCreateWithoutCreatedOrgsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedOrgsInput
    upsert?: UserUpsertWithoutCreatedOrgsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCreatedOrgsInput, UserUpdateWithoutCreatedOrgsInput>, UserUncheckedUpdateWithoutCreatedOrgsInput>
  }

  export type MembershipUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<MembershipCreateWithoutOrganizationInput, MembershipUncheckedCreateWithoutOrganizationInput> | MembershipCreateWithoutOrganizationInput[] | MembershipUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: MembershipCreateOrConnectWithoutOrganizationInput | MembershipCreateOrConnectWithoutOrganizationInput[]
    upsert?: MembershipUpsertWithWhereUniqueWithoutOrganizationInput | MembershipUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: MembershipCreateManyOrganizationInputEnvelope
    set?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    disconnect?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    delete?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    connect?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    update?: MembershipUpdateWithWhereUniqueWithoutOrganizationInput | MembershipUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: MembershipUpdateManyWithWhereWithoutOrganizationInput | MembershipUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: MembershipScalarWhereInput | MembershipScalarWhereInput[]
  }

  export type InvitationUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<InvitationCreateWithoutOrganizationInput, InvitationUncheckedCreateWithoutOrganizationInput> | InvitationCreateWithoutOrganizationInput[] | InvitationUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: InvitationCreateOrConnectWithoutOrganizationInput | InvitationCreateOrConnectWithoutOrganizationInput[]
    upsert?: InvitationUpsertWithWhereUniqueWithoutOrganizationInput | InvitationUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: InvitationCreateManyOrganizationInputEnvelope
    set?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    disconnect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    delete?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    connect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    update?: InvitationUpdateWithWhereUniqueWithoutOrganizationInput | InvitationUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: InvitationUpdateManyWithWhereWithoutOrganizationInput | InvitationUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: InvitationScalarWhereInput | InvitationScalarWhereInput[]
  }

  export type AuditLogUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<AuditLogCreateWithoutOrganizationInput, AuditLogUncheckedCreateWithoutOrganizationInput> | AuditLogCreateWithoutOrganizationInput[] | AuditLogUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutOrganizationInput | AuditLogCreateOrConnectWithoutOrganizationInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutOrganizationInput | AuditLogUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: AuditLogCreateManyOrganizationInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutOrganizationInput | AuditLogUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutOrganizationInput | AuditLogUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type MembershipUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<MembershipCreateWithoutOrganizationInput, MembershipUncheckedCreateWithoutOrganizationInput> | MembershipCreateWithoutOrganizationInput[] | MembershipUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: MembershipCreateOrConnectWithoutOrganizationInput | MembershipCreateOrConnectWithoutOrganizationInput[]
    upsert?: MembershipUpsertWithWhereUniqueWithoutOrganizationInput | MembershipUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: MembershipCreateManyOrganizationInputEnvelope
    set?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    disconnect?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    delete?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    connect?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    update?: MembershipUpdateWithWhereUniqueWithoutOrganizationInput | MembershipUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: MembershipUpdateManyWithWhereWithoutOrganizationInput | MembershipUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: MembershipScalarWhereInput | MembershipScalarWhereInput[]
  }

  export type InvitationUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<InvitationCreateWithoutOrganizationInput, InvitationUncheckedCreateWithoutOrganizationInput> | InvitationCreateWithoutOrganizationInput[] | InvitationUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: InvitationCreateOrConnectWithoutOrganizationInput | InvitationCreateOrConnectWithoutOrganizationInput[]
    upsert?: InvitationUpsertWithWhereUniqueWithoutOrganizationInput | InvitationUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: InvitationCreateManyOrganizationInputEnvelope
    set?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    disconnect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    delete?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    connect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    update?: InvitationUpdateWithWhereUniqueWithoutOrganizationInput | InvitationUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: InvitationUpdateManyWithWhereWithoutOrganizationInput | InvitationUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: InvitationScalarWhereInput | InvitationScalarWhereInput[]
  }

  export type AuditLogUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<AuditLogCreateWithoutOrganizationInput, AuditLogUncheckedCreateWithoutOrganizationInput> | AuditLogCreateWithoutOrganizationInput[] | AuditLogUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutOrganizationInput | AuditLogCreateOrConnectWithoutOrganizationInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutOrganizationInput | AuditLogUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: AuditLogCreateManyOrganizationInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutOrganizationInput | AuditLogUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutOrganizationInput | AuditLogUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutMembershipsInput = {
    create?: XOR<UserCreateWithoutMembershipsInput, UserUncheckedCreateWithoutMembershipsInput>
    connectOrCreate?: UserCreateOrConnectWithoutMembershipsInput
    connect?: UserWhereUniqueInput
  }

  export type OrganizationCreateNestedOneWithoutMembershipsInput = {
    create?: XOR<OrganizationCreateWithoutMembershipsInput, OrganizationUncheckedCreateWithoutMembershipsInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutMembershipsInput
    connect?: OrganizationWhereUniqueInput
  }

  export type AuditLogCreateNestedManyWithoutMembershipInput = {
    create?: XOR<AuditLogCreateWithoutMembershipInput, AuditLogUncheckedCreateWithoutMembershipInput> | AuditLogCreateWithoutMembershipInput[] | AuditLogUncheckedCreateWithoutMembershipInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutMembershipInput | AuditLogCreateOrConnectWithoutMembershipInput[]
    createMany?: AuditLogCreateManyMembershipInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type AuditLogUncheckedCreateNestedManyWithoutMembershipInput = {
    create?: XOR<AuditLogCreateWithoutMembershipInput, AuditLogUncheckedCreateWithoutMembershipInput> | AuditLogCreateWithoutMembershipInput[] | AuditLogUncheckedCreateWithoutMembershipInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutMembershipInput | AuditLogCreateOrConnectWithoutMembershipInput[]
    createMany?: AuditLogCreateManyMembershipInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type EnumMembershipRoleFieldUpdateOperationsInput = {
    set?: $Enums.MembershipRole
  }

  export type EnumMembershipStatusFieldUpdateOperationsInput = {
    set?: $Enums.MembershipStatus
  }

  export type UserUpdateOneRequiredWithoutMembershipsNestedInput = {
    create?: XOR<UserCreateWithoutMembershipsInput, UserUncheckedCreateWithoutMembershipsInput>
    connectOrCreate?: UserCreateOrConnectWithoutMembershipsInput
    upsert?: UserUpsertWithoutMembershipsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMembershipsInput, UserUpdateWithoutMembershipsInput>, UserUncheckedUpdateWithoutMembershipsInput>
  }

  export type OrganizationUpdateOneRequiredWithoutMembershipsNestedInput = {
    create?: XOR<OrganizationCreateWithoutMembershipsInput, OrganizationUncheckedCreateWithoutMembershipsInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutMembershipsInput
    upsert?: OrganizationUpsertWithoutMembershipsInput
    connect?: OrganizationWhereUniqueInput
    update?: XOR<XOR<OrganizationUpdateToOneWithWhereWithoutMembershipsInput, OrganizationUpdateWithoutMembershipsInput>, OrganizationUncheckedUpdateWithoutMembershipsInput>
  }

  export type AuditLogUpdateManyWithoutMembershipNestedInput = {
    create?: XOR<AuditLogCreateWithoutMembershipInput, AuditLogUncheckedCreateWithoutMembershipInput> | AuditLogCreateWithoutMembershipInput[] | AuditLogUncheckedCreateWithoutMembershipInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutMembershipInput | AuditLogCreateOrConnectWithoutMembershipInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutMembershipInput | AuditLogUpsertWithWhereUniqueWithoutMembershipInput[]
    createMany?: AuditLogCreateManyMembershipInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutMembershipInput | AuditLogUpdateWithWhereUniqueWithoutMembershipInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutMembershipInput | AuditLogUpdateManyWithWhereWithoutMembershipInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type AuditLogUncheckedUpdateManyWithoutMembershipNestedInput = {
    create?: XOR<AuditLogCreateWithoutMembershipInput, AuditLogUncheckedCreateWithoutMembershipInput> | AuditLogCreateWithoutMembershipInput[] | AuditLogUncheckedCreateWithoutMembershipInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutMembershipInput | AuditLogCreateOrConnectWithoutMembershipInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutMembershipInput | AuditLogUpsertWithWhereUniqueWithoutMembershipInput[]
    createMany?: AuditLogCreateManyMembershipInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutMembershipInput | AuditLogUpdateWithWhereUniqueWithoutMembershipInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutMembershipInput | AuditLogUpdateManyWithWhereWithoutMembershipInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type OrganizationCreateNestedOneWithoutInvitationsInput = {
    create?: XOR<OrganizationCreateWithoutInvitationsInput, OrganizationUncheckedCreateWithoutInvitationsInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutInvitationsInput
    connect?: OrganizationWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutInvitationsInput = {
    create?: XOR<UserCreateWithoutInvitationsInput, UserUncheckedCreateWithoutInvitationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutInvitationsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumInvitationStatusFieldUpdateOperationsInput = {
    set?: $Enums.InvitationStatus
  }

  export type OrganizationUpdateOneRequiredWithoutInvitationsNestedInput = {
    create?: XOR<OrganizationCreateWithoutInvitationsInput, OrganizationUncheckedCreateWithoutInvitationsInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutInvitationsInput
    upsert?: OrganizationUpsertWithoutInvitationsInput
    connect?: OrganizationWhereUniqueInput
    update?: XOR<XOR<OrganizationUpdateToOneWithWhereWithoutInvitationsInput, OrganizationUpdateWithoutInvitationsInput>, OrganizationUncheckedUpdateWithoutInvitationsInput>
  }

  export type UserUpdateOneWithoutInvitationsNestedInput = {
    create?: XOR<UserCreateWithoutInvitationsInput, UserUncheckedCreateWithoutInvitationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutInvitationsInput
    upsert?: UserUpsertWithoutInvitationsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutInvitationsInput, UserUpdateWithoutInvitationsInput>, UserUncheckedUpdateWithoutInvitationsInput>
  }

  export type UserCreateNestedOneWithoutAuditLogsInput = {
    create?: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuditLogsInput
    connect?: UserWhereUniqueInput
  }

  export type OrganizationCreateNestedOneWithoutAuditLogsInput = {
    create?: XOR<OrganizationCreateWithoutAuditLogsInput, OrganizationUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutAuditLogsInput
    connect?: OrganizationWhereUniqueInput
  }

  export type MembershipCreateNestedOneWithoutAuditLogsInput = {
    create?: XOR<MembershipCreateWithoutAuditLogsInput, MembershipUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: MembershipCreateOrConnectWithoutAuditLogsInput
    connect?: MembershipWhereUniqueInput
  }

  export type UserUpdateOneWithoutAuditLogsNestedInput = {
    create?: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuditLogsInput
    upsert?: UserUpsertWithoutAuditLogsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAuditLogsInput, UserUpdateWithoutAuditLogsInput>, UserUncheckedUpdateWithoutAuditLogsInput>
  }

  export type OrganizationUpdateOneWithoutAuditLogsNestedInput = {
    create?: XOR<OrganizationCreateWithoutAuditLogsInput, OrganizationUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutAuditLogsInput
    upsert?: OrganizationUpsertWithoutAuditLogsInput
    disconnect?: OrganizationWhereInput | boolean
    delete?: OrganizationWhereInput | boolean
    connect?: OrganizationWhereUniqueInput
    update?: XOR<XOR<OrganizationUpdateToOneWithWhereWithoutAuditLogsInput, OrganizationUpdateWithoutAuditLogsInput>, OrganizationUncheckedUpdateWithoutAuditLogsInput>
  }

  export type MembershipUpdateOneWithoutAuditLogsNestedInput = {
    create?: XOR<MembershipCreateWithoutAuditLogsInput, MembershipUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: MembershipCreateOrConnectWithoutAuditLogsInput
    upsert?: MembershipUpsertWithoutAuditLogsInput
    disconnect?: MembershipWhereInput | boolean
    delete?: MembershipWhereInput | boolean
    connect?: MembershipWhereUniqueInput
    update?: XOR<XOR<MembershipUpdateToOneWithWhereWithoutAuditLogsInput, MembershipUpdateWithoutAuditLogsInput>, MembershipUncheckedUpdateWithoutAuditLogsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumUserStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | EnumUserStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUserStatusFilter<$PrismaModel> | $Enums.UserStatus
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumUserStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | EnumUserStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUserStatusWithAggregatesFilter<$PrismaModel> | $Enums.UserStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserStatusFilter<$PrismaModel>
    _max?: NestedEnumUserStatusFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumMembershipRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.MembershipRole | EnumMembershipRoleFieldRefInput<$PrismaModel>
    in?: $Enums.MembershipRole[] | ListEnumMembershipRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.MembershipRole[] | ListEnumMembershipRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumMembershipRoleFilter<$PrismaModel> | $Enums.MembershipRole
  }

  export type NestedEnumMembershipStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.MembershipStatus | EnumMembershipStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MembershipStatus[] | ListEnumMembershipStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MembershipStatus[] | ListEnumMembershipStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMembershipStatusFilter<$PrismaModel> | $Enums.MembershipStatus
  }

  export type NestedEnumMembershipRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MembershipRole | EnumMembershipRoleFieldRefInput<$PrismaModel>
    in?: $Enums.MembershipRole[] | ListEnumMembershipRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.MembershipRole[] | ListEnumMembershipRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumMembershipRoleWithAggregatesFilter<$PrismaModel> | $Enums.MembershipRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMembershipRoleFilter<$PrismaModel>
    _max?: NestedEnumMembershipRoleFilter<$PrismaModel>
  }

  export type NestedEnumMembershipStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MembershipStatus | EnumMembershipStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MembershipStatus[] | ListEnumMembershipStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MembershipStatus[] | ListEnumMembershipStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMembershipStatusWithAggregatesFilter<$PrismaModel> | $Enums.MembershipStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMembershipStatusFilter<$PrismaModel>
    _max?: NestedEnumMembershipStatusFilter<$PrismaModel>
  }

  export type NestedEnumInvitationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.InvitationStatus | EnumInvitationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.InvitationStatus[] | ListEnumInvitationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.InvitationStatus[] | ListEnumInvitationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumInvitationStatusFilter<$PrismaModel> | $Enums.InvitationStatus
  }

  export type NestedEnumInvitationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InvitationStatus | EnumInvitationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.InvitationStatus[] | ListEnumInvitationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.InvitationStatus[] | ListEnumInvitationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumInvitationStatusWithAggregatesFilter<$PrismaModel> | $Enums.InvitationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumInvitationStatusFilter<$PrismaModel>
    _max?: NestedEnumInvitationStatusFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type MembershipCreateWithoutUserInput = {
    id?: string
    role?: $Enums.MembershipRole
    status?: $Enums.MembershipStatus
    joinedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    organization: OrganizationCreateNestedOneWithoutMembershipsInput
    auditLogs?: AuditLogCreateNestedManyWithoutMembershipInput
  }

  export type MembershipUncheckedCreateWithoutUserInput = {
    id?: string
    role?: $Enums.MembershipRole
    status?: $Enums.MembershipStatus
    joinedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    organizationId: string
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutMembershipInput
  }

  export type MembershipCreateOrConnectWithoutUserInput = {
    where: MembershipWhereUniqueInput
    create: XOR<MembershipCreateWithoutUserInput, MembershipUncheckedCreateWithoutUserInput>
  }

  export type MembershipCreateManyUserInputEnvelope = {
    data: MembershipCreateManyUserInput | MembershipCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type OrganizationCreateWithoutCreatedByInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    memberships?: MembershipCreateNestedManyWithoutOrganizationInput
    invitations?: InvitationCreateNestedManyWithoutOrganizationInput
    auditLogs?: AuditLogCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateWithoutCreatedByInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    memberships?: MembershipUncheckedCreateNestedManyWithoutOrganizationInput
    invitations?: InvitationUncheckedCreateNestedManyWithoutOrganizationInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationCreateOrConnectWithoutCreatedByInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutCreatedByInput, OrganizationUncheckedCreateWithoutCreatedByInput>
  }

  export type OrganizationCreateManyCreatedByInputEnvelope = {
    data: OrganizationCreateManyCreatedByInput | OrganizationCreateManyCreatedByInput[]
    skipDuplicates?: boolean
  }

  export type InvitationCreateWithoutInvitedByInput = {
    id?: string
    email: string
    role?: $Enums.MembershipRole
    status?: $Enums.InvitationStatus
    token: string
    expiresAt: Date | string
    sentAt?: Date | string
    acceptedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    organization: OrganizationCreateNestedOneWithoutInvitationsInput
  }

  export type InvitationUncheckedCreateWithoutInvitedByInput = {
    id?: string
    email: string
    role?: $Enums.MembershipRole
    status?: $Enums.InvitationStatus
    token: string
    expiresAt: Date | string
    sentAt?: Date | string
    acceptedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    organizationId: string
  }

  export type InvitationCreateOrConnectWithoutInvitedByInput = {
    where: InvitationWhereUniqueInput
    create: XOR<InvitationCreateWithoutInvitedByInput, InvitationUncheckedCreateWithoutInvitedByInput>
  }

  export type InvitationCreateManyInvitedByInputEnvelope = {
    data: InvitationCreateManyInvitedByInput | InvitationCreateManyInvitedByInput[]
    skipDuplicates?: boolean
  }

  export type AuditLogCreateWithoutUserInput = {
    id?: string
    action: string
    entity: string
    entityId: string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    organization?: OrganizationCreateNestedOneWithoutAuditLogsInput
    membership?: MembershipCreateNestedOneWithoutAuditLogsInput
  }

  export type AuditLogUncheckedCreateWithoutUserInput = {
    id?: string
    action: string
    entity: string
    entityId: string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    organizationId?: string | null
    membershipId?: string | null
  }

  export type AuditLogCreateOrConnectWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    create: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput>
  }

  export type AuditLogCreateManyUserInputEnvelope = {
    data: AuditLogCreateManyUserInput | AuditLogCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type MembershipUpsertWithWhereUniqueWithoutUserInput = {
    where: MembershipWhereUniqueInput
    update: XOR<MembershipUpdateWithoutUserInput, MembershipUncheckedUpdateWithoutUserInput>
    create: XOR<MembershipCreateWithoutUserInput, MembershipUncheckedCreateWithoutUserInput>
  }

  export type MembershipUpdateWithWhereUniqueWithoutUserInput = {
    where: MembershipWhereUniqueInput
    data: XOR<MembershipUpdateWithoutUserInput, MembershipUncheckedUpdateWithoutUserInput>
  }

  export type MembershipUpdateManyWithWhereWithoutUserInput = {
    where: MembershipScalarWhereInput
    data: XOR<MembershipUpdateManyMutationInput, MembershipUncheckedUpdateManyWithoutUserInput>
  }

  export type MembershipScalarWhereInput = {
    AND?: MembershipScalarWhereInput | MembershipScalarWhereInput[]
    OR?: MembershipScalarWhereInput[]
    NOT?: MembershipScalarWhereInput | MembershipScalarWhereInput[]
    id?: StringFilter<"Membership"> | string
    role?: EnumMembershipRoleFilter<"Membership"> | $Enums.MembershipRole
    status?: EnumMembershipStatusFilter<"Membership"> | $Enums.MembershipStatus
    joinedAt?: DateTimeFilter<"Membership"> | Date | string
    createdAt?: DateTimeFilter<"Membership"> | Date | string
    updatedAt?: DateTimeFilter<"Membership"> | Date | string
    userId?: StringFilter<"Membership"> | string
    organizationId?: StringFilter<"Membership"> | string
  }

  export type OrganizationUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: OrganizationWhereUniqueInput
    update: XOR<OrganizationUpdateWithoutCreatedByInput, OrganizationUncheckedUpdateWithoutCreatedByInput>
    create: XOR<OrganizationCreateWithoutCreatedByInput, OrganizationUncheckedCreateWithoutCreatedByInput>
  }

  export type OrganizationUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: OrganizationWhereUniqueInput
    data: XOR<OrganizationUpdateWithoutCreatedByInput, OrganizationUncheckedUpdateWithoutCreatedByInput>
  }

  export type OrganizationUpdateManyWithWhereWithoutCreatedByInput = {
    where: OrganizationScalarWhereInput
    data: XOR<OrganizationUpdateManyMutationInput, OrganizationUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type OrganizationScalarWhereInput = {
    AND?: OrganizationScalarWhereInput | OrganizationScalarWhereInput[]
    OR?: OrganizationScalarWhereInput[]
    NOT?: OrganizationScalarWhereInput | OrganizationScalarWhereInput[]
    id?: StringFilter<"Organization"> | string
    name?: StringFilter<"Organization"> | string
    slug?: StringFilter<"Organization"> | string
    description?: StringNullableFilter<"Organization"> | string | null
    createdAt?: DateTimeFilter<"Organization"> | Date | string
    updatedAt?: DateTimeFilter<"Organization"> | Date | string
    createdById?: StringFilter<"Organization"> | string
  }

  export type InvitationUpsertWithWhereUniqueWithoutInvitedByInput = {
    where: InvitationWhereUniqueInput
    update: XOR<InvitationUpdateWithoutInvitedByInput, InvitationUncheckedUpdateWithoutInvitedByInput>
    create: XOR<InvitationCreateWithoutInvitedByInput, InvitationUncheckedCreateWithoutInvitedByInput>
  }

  export type InvitationUpdateWithWhereUniqueWithoutInvitedByInput = {
    where: InvitationWhereUniqueInput
    data: XOR<InvitationUpdateWithoutInvitedByInput, InvitationUncheckedUpdateWithoutInvitedByInput>
  }

  export type InvitationUpdateManyWithWhereWithoutInvitedByInput = {
    where: InvitationScalarWhereInput
    data: XOR<InvitationUpdateManyMutationInput, InvitationUncheckedUpdateManyWithoutInvitedByInput>
  }

  export type InvitationScalarWhereInput = {
    AND?: InvitationScalarWhereInput | InvitationScalarWhereInput[]
    OR?: InvitationScalarWhereInput[]
    NOT?: InvitationScalarWhereInput | InvitationScalarWhereInput[]
    id?: StringFilter<"Invitation"> | string
    email?: StringFilter<"Invitation"> | string
    role?: EnumMembershipRoleFilter<"Invitation"> | $Enums.MembershipRole
    status?: EnumInvitationStatusFilter<"Invitation"> | $Enums.InvitationStatus
    token?: StringFilter<"Invitation"> | string
    expiresAt?: DateTimeFilter<"Invitation"> | Date | string
    sentAt?: DateTimeFilter<"Invitation"> | Date | string
    acceptedAt?: DateTimeNullableFilter<"Invitation"> | Date | string | null
    createdAt?: DateTimeFilter<"Invitation"> | Date | string
    updatedAt?: DateTimeFilter<"Invitation"> | Date | string
    organizationId?: StringFilter<"Invitation"> | string
    invitedById?: StringNullableFilter<"Invitation"> | string | null
  }

  export type AuditLogUpsertWithWhereUniqueWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    update: XOR<AuditLogUpdateWithoutUserInput, AuditLogUncheckedUpdateWithoutUserInput>
    create: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput>
  }

  export type AuditLogUpdateWithWhereUniqueWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    data: XOR<AuditLogUpdateWithoutUserInput, AuditLogUncheckedUpdateWithoutUserInput>
  }

  export type AuditLogUpdateManyWithWhereWithoutUserInput = {
    where: AuditLogScalarWhereInput
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyWithoutUserInput>
  }

  export type AuditLogScalarWhereInput = {
    AND?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    OR?: AuditLogScalarWhereInput[]
    NOT?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    entity?: StringFilter<"AuditLog"> | string
    entityId?: StringFilter<"AuditLog"> | string
    oldValues?: JsonNullableFilter<"AuditLog">
    newValues?: JsonNullableFilter<"AuditLog">
    metadata?: JsonNullableFilter<"AuditLog">
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
    userId?: StringNullableFilter<"AuditLog"> | string | null
    organizationId?: StringNullableFilter<"AuditLog"> | string | null
    membershipId?: StringNullableFilter<"AuditLog"> | string | null
  }

  export type UserCreateWithoutCreatedOrgsInput = {
    id?: string
    email: string
    fullName?: string | null
    profileImage?: string | null
    status?: $Enums.UserStatus
    isEmailVerified?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    memberships?: MembershipCreateNestedManyWithoutUserInput
    invitations?: InvitationCreateNestedManyWithoutInvitedByInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCreatedOrgsInput = {
    id?: string
    email: string
    fullName?: string | null
    profileImage?: string | null
    status?: $Enums.UserStatus
    isEmailVerified?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    memberships?: MembershipUncheckedCreateNestedManyWithoutUserInput
    invitations?: InvitationUncheckedCreateNestedManyWithoutInvitedByInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCreatedOrgsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCreatedOrgsInput, UserUncheckedCreateWithoutCreatedOrgsInput>
  }

  export type MembershipCreateWithoutOrganizationInput = {
    id?: string
    role?: $Enums.MembershipRole
    status?: $Enums.MembershipStatus
    joinedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutMembershipsInput
    auditLogs?: AuditLogCreateNestedManyWithoutMembershipInput
  }

  export type MembershipUncheckedCreateWithoutOrganizationInput = {
    id?: string
    role?: $Enums.MembershipRole
    status?: $Enums.MembershipStatus
    joinedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutMembershipInput
  }

  export type MembershipCreateOrConnectWithoutOrganizationInput = {
    where: MembershipWhereUniqueInput
    create: XOR<MembershipCreateWithoutOrganizationInput, MembershipUncheckedCreateWithoutOrganizationInput>
  }

  export type MembershipCreateManyOrganizationInputEnvelope = {
    data: MembershipCreateManyOrganizationInput | MembershipCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type InvitationCreateWithoutOrganizationInput = {
    id?: string
    email: string
    role?: $Enums.MembershipRole
    status?: $Enums.InvitationStatus
    token: string
    expiresAt: Date | string
    sentAt?: Date | string
    acceptedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    invitedBy?: UserCreateNestedOneWithoutInvitationsInput
  }

  export type InvitationUncheckedCreateWithoutOrganizationInput = {
    id?: string
    email: string
    role?: $Enums.MembershipRole
    status?: $Enums.InvitationStatus
    token: string
    expiresAt: Date | string
    sentAt?: Date | string
    acceptedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    invitedById?: string | null
  }

  export type InvitationCreateOrConnectWithoutOrganizationInput = {
    where: InvitationWhereUniqueInput
    create: XOR<InvitationCreateWithoutOrganizationInput, InvitationUncheckedCreateWithoutOrganizationInput>
  }

  export type InvitationCreateManyOrganizationInputEnvelope = {
    data: InvitationCreateManyOrganizationInput | InvitationCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type AuditLogCreateWithoutOrganizationInput = {
    id?: string
    action: string
    entity: string
    entityId: string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutAuditLogsInput
    membership?: MembershipCreateNestedOneWithoutAuditLogsInput
  }

  export type AuditLogUncheckedCreateWithoutOrganizationInput = {
    id?: string
    action: string
    entity: string
    entityId: string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    userId?: string | null
    membershipId?: string | null
  }

  export type AuditLogCreateOrConnectWithoutOrganizationInput = {
    where: AuditLogWhereUniqueInput
    create: XOR<AuditLogCreateWithoutOrganizationInput, AuditLogUncheckedCreateWithoutOrganizationInput>
  }

  export type AuditLogCreateManyOrganizationInputEnvelope = {
    data: AuditLogCreateManyOrganizationInput | AuditLogCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutCreatedOrgsInput = {
    update: XOR<UserUpdateWithoutCreatedOrgsInput, UserUncheckedUpdateWithoutCreatedOrgsInput>
    create: XOR<UserCreateWithoutCreatedOrgsInput, UserUncheckedCreateWithoutCreatedOrgsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCreatedOrgsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCreatedOrgsInput, UserUncheckedUpdateWithoutCreatedOrgsInput>
  }

  export type UserUpdateWithoutCreatedOrgsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: MembershipUpdateManyWithoutUserNestedInput
    invitations?: InvitationUpdateManyWithoutInvitedByNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCreatedOrgsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: MembershipUncheckedUpdateManyWithoutUserNestedInput
    invitations?: InvitationUncheckedUpdateManyWithoutInvitedByNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type MembershipUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: MembershipWhereUniqueInput
    update: XOR<MembershipUpdateWithoutOrganizationInput, MembershipUncheckedUpdateWithoutOrganizationInput>
    create: XOR<MembershipCreateWithoutOrganizationInput, MembershipUncheckedCreateWithoutOrganizationInput>
  }

  export type MembershipUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: MembershipWhereUniqueInput
    data: XOR<MembershipUpdateWithoutOrganizationInput, MembershipUncheckedUpdateWithoutOrganizationInput>
  }

  export type MembershipUpdateManyWithWhereWithoutOrganizationInput = {
    where: MembershipScalarWhereInput
    data: XOR<MembershipUpdateManyMutationInput, MembershipUncheckedUpdateManyWithoutOrganizationInput>
  }

  export type InvitationUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: InvitationWhereUniqueInput
    update: XOR<InvitationUpdateWithoutOrganizationInput, InvitationUncheckedUpdateWithoutOrganizationInput>
    create: XOR<InvitationCreateWithoutOrganizationInput, InvitationUncheckedCreateWithoutOrganizationInput>
  }

  export type InvitationUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: InvitationWhereUniqueInput
    data: XOR<InvitationUpdateWithoutOrganizationInput, InvitationUncheckedUpdateWithoutOrganizationInput>
  }

  export type InvitationUpdateManyWithWhereWithoutOrganizationInput = {
    where: InvitationScalarWhereInput
    data: XOR<InvitationUpdateManyMutationInput, InvitationUncheckedUpdateManyWithoutOrganizationInput>
  }

  export type AuditLogUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: AuditLogWhereUniqueInput
    update: XOR<AuditLogUpdateWithoutOrganizationInput, AuditLogUncheckedUpdateWithoutOrganizationInput>
    create: XOR<AuditLogCreateWithoutOrganizationInput, AuditLogUncheckedCreateWithoutOrganizationInput>
  }

  export type AuditLogUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: AuditLogWhereUniqueInput
    data: XOR<AuditLogUpdateWithoutOrganizationInput, AuditLogUncheckedUpdateWithoutOrganizationInput>
  }

  export type AuditLogUpdateManyWithWhereWithoutOrganizationInput = {
    where: AuditLogScalarWhereInput
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyWithoutOrganizationInput>
  }

  export type UserCreateWithoutMembershipsInput = {
    id?: string
    email: string
    fullName?: string | null
    profileImage?: string | null
    status?: $Enums.UserStatus
    isEmailVerified?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdOrgs?: OrganizationCreateNestedManyWithoutCreatedByInput
    invitations?: InvitationCreateNestedManyWithoutInvitedByInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutMembershipsInput = {
    id?: string
    email: string
    fullName?: string | null
    profileImage?: string | null
    status?: $Enums.UserStatus
    isEmailVerified?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdOrgs?: OrganizationUncheckedCreateNestedManyWithoutCreatedByInput
    invitations?: InvitationUncheckedCreateNestedManyWithoutInvitedByInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutMembershipsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMembershipsInput, UserUncheckedCreateWithoutMembershipsInput>
  }

  export type OrganizationCreateWithoutMembershipsInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutCreatedOrgsInput
    invitations?: InvitationCreateNestedManyWithoutOrganizationInput
    auditLogs?: AuditLogCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateWithoutMembershipsInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById: string
    invitations?: InvitationUncheckedCreateNestedManyWithoutOrganizationInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationCreateOrConnectWithoutMembershipsInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutMembershipsInput, OrganizationUncheckedCreateWithoutMembershipsInput>
  }

  export type AuditLogCreateWithoutMembershipInput = {
    id?: string
    action: string
    entity: string
    entityId: string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutAuditLogsInput
    organization?: OrganizationCreateNestedOneWithoutAuditLogsInput
  }

  export type AuditLogUncheckedCreateWithoutMembershipInput = {
    id?: string
    action: string
    entity: string
    entityId: string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    userId?: string | null
    organizationId?: string | null
  }

  export type AuditLogCreateOrConnectWithoutMembershipInput = {
    where: AuditLogWhereUniqueInput
    create: XOR<AuditLogCreateWithoutMembershipInput, AuditLogUncheckedCreateWithoutMembershipInput>
  }

  export type AuditLogCreateManyMembershipInputEnvelope = {
    data: AuditLogCreateManyMembershipInput | AuditLogCreateManyMembershipInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutMembershipsInput = {
    update: XOR<UserUpdateWithoutMembershipsInput, UserUncheckedUpdateWithoutMembershipsInput>
    create: XOR<UserCreateWithoutMembershipsInput, UserUncheckedCreateWithoutMembershipsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMembershipsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMembershipsInput, UserUncheckedUpdateWithoutMembershipsInput>
  }

  export type UserUpdateWithoutMembershipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdOrgs?: OrganizationUpdateManyWithoutCreatedByNestedInput
    invitations?: InvitationUpdateManyWithoutInvitedByNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutMembershipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdOrgs?: OrganizationUncheckedUpdateManyWithoutCreatedByNestedInput
    invitations?: InvitationUncheckedUpdateManyWithoutInvitedByNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type OrganizationUpsertWithoutMembershipsInput = {
    update: XOR<OrganizationUpdateWithoutMembershipsInput, OrganizationUncheckedUpdateWithoutMembershipsInput>
    create: XOR<OrganizationCreateWithoutMembershipsInput, OrganizationUncheckedCreateWithoutMembershipsInput>
    where?: OrganizationWhereInput
  }

  export type OrganizationUpdateToOneWithWhereWithoutMembershipsInput = {
    where?: OrganizationWhereInput
    data: XOR<OrganizationUpdateWithoutMembershipsInput, OrganizationUncheckedUpdateWithoutMembershipsInput>
  }

  export type OrganizationUpdateWithoutMembershipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutCreatedOrgsNestedInput
    invitations?: InvitationUpdateManyWithoutOrganizationNestedInput
    auditLogs?: AuditLogUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateWithoutMembershipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: StringFieldUpdateOperationsInput | string
    invitations?: InvitationUncheckedUpdateManyWithoutOrganizationNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type AuditLogUpsertWithWhereUniqueWithoutMembershipInput = {
    where: AuditLogWhereUniqueInput
    update: XOR<AuditLogUpdateWithoutMembershipInput, AuditLogUncheckedUpdateWithoutMembershipInput>
    create: XOR<AuditLogCreateWithoutMembershipInput, AuditLogUncheckedCreateWithoutMembershipInput>
  }

  export type AuditLogUpdateWithWhereUniqueWithoutMembershipInput = {
    where: AuditLogWhereUniqueInput
    data: XOR<AuditLogUpdateWithoutMembershipInput, AuditLogUncheckedUpdateWithoutMembershipInput>
  }

  export type AuditLogUpdateManyWithWhereWithoutMembershipInput = {
    where: AuditLogScalarWhereInput
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyWithoutMembershipInput>
  }

  export type OrganizationCreateWithoutInvitationsInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutCreatedOrgsInput
    memberships?: MembershipCreateNestedManyWithoutOrganizationInput
    auditLogs?: AuditLogCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateWithoutInvitationsInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById: string
    memberships?: MembershipUncheckedCreateNestedManyWithoutOrganizationInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationCreateOrConnectWithoutInvitationsInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutInvitationsInput, OrganizationUncheckedCreateWithoutInvitationsInput>
  }

  export type UserCreateWithoutInvitationsInput = {
    id?: string
    email: string
    fullName?: string | null
    profileImage?: string | null
    status?: $Enums.UserStatus
    isEmailVerified?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    memberships?: MembershipCreateNestedManyWithoutUserInput
    createdOrgs?: OrganizationCreateNestedManyWithoutCreatedByInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutInvitationsInput = {
    id?: string
    email: string
    fullName?: string | null
    profileImage?: string | null
    status?: $Enums.UserStatus
    isEmailVerified?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    memberships?: MembershipUncheckedCreateNestedManyWithoutUserInput
    createdOrgs?: OrganizationUncheckedCreateNestedManyWithoutCreatedByInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutInvitationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutInvitationsInput, UserUncheckedCreateWithoutInvitationsInput>
  }

  export type OrganizationUpsertWithoutInvitationsInput = {
    update: XOR<OrganizationUpdateWithoutInvitationsInput, OrganizationUncheckedUpdateWithoutInvitationsInput>
    create: XOR<OrganizationCreateWithoutInvitationsInput, OrganizationUncheckedCreateWithoutInvitationsInput>
    where?: OrganizationWhereInput
  }

  export type OrganizationUpdateToOneWithWhereWithoutInvitationsInput = {
    where?: OrganizationWhereInput
    data: XOR<OrganizationUpdateWithoutInvitationsInput, OrganizationUncheckedUpdateWithoutInvitationsInput>
  }

  export type OrganizationUpdateWithoutInvitationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutCreatedOrgsNestedInput
    memberships?: MembershipUpdateManyWithoutOrganizationNestedInput
    auditLogs?: AuditLogUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateWithoutInvitationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: StringFieldUpdateOperationsInput | string
    memberships?: MembershipUncheckedUpdateManyWithoutOrganizationNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type UserUpsertWithoutInvitationsInput = {
    update: XOR<UserUpdateWithoutInvitationsInput, UserUncheckedUpdateWithoutInvitationsInput>
    create: XOR<UserCreateWithoutInvitationsInput, UserUncheckedCreateWithoutInvitationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutInvitationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutInvitationsInput, UserUncheckedUpdateWithoutInvitationsInput>
  }

  export type UserUpdateWithoutInvitationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: MembershipUpdateManyWithoutUserNestedInput
    createdOrgs?: OrganizationUpdateManyWithoutCreatedByNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutInvitationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: MembershipUncheckedUpdateManyWithoutUserNestedInput
    createdOrgs?: OrganizationUncheckedUpdateManyWithoutCreatedByNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutAuditLogsInput = {
    id?: string
    email: string
    fullName?: string | null
    profileImage?: string | null
    status?: $Enums.UserStatus
    isEmailVerified?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    memberships?: MembershipCreateNestedManyWithoutUserInput
    createdOrgs?: OrganizationCreateNestedManyWithoutCreatedByInput
    invitations?: InvitationCreateNestedManyWithoutInvitedByInput
  }

  export type UserUncheckedCreateWithoutAuditLogsInput = {
    id?: string
    email: string
    fullName?: string | null
    profileImage?: string | null
    status?: $Enums.UserStatus
    isEmailVerified?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    memberships?: MembershipUncheckedCreateNestedManyWithoutUserInput
    createdOrgs?: OrganizationUncheckedCreateNestedManyWithoutCreatedByInput
    invitations?: InvitationUncheckedCreateNestedManyWithoutInvitedByInput
  }

  export type UserCreateOrConnectWithoutAuditLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
  }

  export type OrganizationCreateWithoutAuditLogsInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutCreatedOrgsInput
    memberships?: MembershipCreateNestedManyWithoutOrganizationInput
    invitations?: InvitationCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateWithoutAuditLogsInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById: string
    memberships?: MembershipUncheckedCreateNestedManyWithoutOrganizationInput
    invitations?: InvitationUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationCreateOrConnectWithoutAuditLogsInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutAuditLogsInput, OrganizationUncheckedCreateWithoutAuditLogsInput>
  }

  export type MembershipCreateWithoutAuditLogsInput = {
    id?: string
    role?: $Enums.MembershipRole
    status?: $Enums.MembershipStatus
    joinedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutMembershipsInput
    organization: OrganizationCreateNestedOneWithoutMembershipsInput
  }

  export type MembershipUncheckedCreateWithoutAuditLogsInput = {
    id?: string
    role?: $Enums.MembershipRole
    status?: $Enums.MembershipStatus
    joinedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    organizationId: string
  }

  export type MembershipCreateOrConnectWithoutAuditLogsInput = {
    where: MembershipWhereUniqueInput
    create: XOR<MembershipCreateWithoutAuditLogsInput, MembershipUncheckedCreateWithoutAuditLogsInput>
  }

  export type UserUpsertWithoutAuditLogsInput = {
    update: XOR<UserUpdateWithoutAuditLogsInput, UserUncheckedUpdateWithoutAuditLogsInput>
    create: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAuditLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAuditLogsInput, UserUncheckedUpdateWithoutAuditLogsInput>
  }

  export type UserUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: MembershipUpdateManyWithoutUserNestedInput
    createdOrgs?: OrganizationUpdateManyWithoutCreatedByNestedInput
    invitations?: InvitationUpdateManyWithoutInvitedByNestedInput
  }

  export type UserUncheckedUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: MembershipUncheckedUpdateManyWithoutUserNestedInput
    createdOrgs?: OrganizationUncheckedUpdateManyWithoutCreatedByNestedInput
    invitations?: InvitationUncheckedUpdateManyWithoutInvitedByNestedInput
  }

  export type OrganizationUpsertWithoutAuditLogsInput = {
    update: XOR<OrganizationUpdateWithoutAuditLogsInput, OrganizationUncheckedUpdateWithoutAuditLogsInput>
    create: XOR<OrganizationCreateWithoutAuditLogsInput, OrganizationUncheckedCreateWithoutAuditLogsInput>
    where?: OrganizationWhereInput
  }

  export type OrganizationUpdateToOneWithWhereWithoutAuditLogsInput = {
    where?: OrganizationWhereInput
    data: XOR<OrganizationUpdateWithoutAuditLogsInput, OrganizationUncheckedUpdateWithoutAuditLogsInput>
  }

  export type OrganizationUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutCreatedOrgsNestedInput
    memberships?: MembershipUpdateManyWithoutOrganizationNestedInput
    invitations?: InvitationUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: StringFieldUpdateOperationsInput | string
    memberships?: MembershipUncheckedUpdateManyWithoutOrganizationNestedInput
    invitations?: InvitationUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type MembershipUpsertWithoutAuditLogsInput = {
    update: XOR<MembershipUpdateWithoutAuditLogsInput, MembershipUncheckedUpdateWithoutAuditLogsInput>
    create: XOR<MembershipCreateWithoutAuditLogsInput, MembershipUncheckedCreateWithoutAuditLogsInput>
    where?: MembershipWhereInput
  }

  export type MembershipUpdateToOneWithWhereWithoutAuditLogsInput = {
    where?: MembershipWhereInput
    data: XOR<MembershipUpdateWithoutAuditLogsInput, MembershipUncheckedUpdateWithoutAuditLogsInput>
  }

  export type MembershipUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumMembershipRoleFieldUpdateOperationsInput | $Enums.MembershipRole
    status?: EnumMembershipStatusFieldUpdateOperationsInput | $Enums.MembershipStatus
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMembershipsNestedInput
    organization?: OrganizationUpdateOneRequiredWithoutMembershipsNestedInput
  }

  export type MembershipUncheckedUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumMembershipRoleFieldUpdateOperationsInput | $Enums.MembershipRole
    status?: EnumMembershipStatusFieldUpdateOperationsInput | $Enums.MembershipStatus
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
  }

  export type MembershipCreateManyUserInput = {
    id?: string
    role?: $Enums.MembershipRole
    status?: $Enums.MembershipStatus
    joinedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    organizationId: string
  }

  export type OrganizationCreateManyCreatedByInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InvitationCreateManyInvitedByInput = {
    id?: string
    email: string
    role?: $Enums.MembershipRole
    status?: $Enums.InvitationStatus
    token: string
    expiresAt: Date | string
    sentAt?: Date | string
    acceptedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    organizationId: string
  }

  export type AuditLogCreateManyUserInput = {
    id?: string
    action: string
    entity: string
    entityId: string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    organizationId?: string | null
    membershipId?: string | null
  }

  export type MembershipUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumMembershipRoleFieldUpdateOperationsInput | $Enums.MembershipRole
    status?: EnumMembershipStatusFieldUpdateOperationsInput | $Enums.MembershipStatus
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutMembershipsNestedInput
    auditLogs?: AuditLogUpdateManyWithoutMembershipNestedInput
  }

  export type MembershipUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumMembershipRoleFieldUpdateOperationsInput | $Enums.MembershipRole
    status?: EnumMembershipStatusFieldUpdateOperationsInput | $Enums.MembershipStatus
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizationId?: StringFieldUpdateOperationsInput | string
    auditLogs?: AuditLogUncheckedUpdateManyWithoutMembershipNestedInput
  }

  export type MembershipUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumMembershipRoleFieldUpdateOperationsInput | $Enums.MembershipRole
    status?: EnumMembershipStatusFieldUpdateOperationsInput | $Enums.MembershipStatus
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizationId?: StringFieldUpdateOperationsInput | string
  }

  export type OrganizationUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: MembershipUpdateManyWithoutOrganizationNestedInput
    invitations?: InvitationUpdateManyWithoutOrganizationNestedInput
    auditLogs?: AuditLogUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: MembershipUncheckedUpdateManyWithoutOrganizationNestedInput
    invitations?: InvitationUncheckedUpdateManyWithoutOrganizationNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateManyWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvitationUpdateWithoutInvitedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumMembershipRoleFieldUpdateOperationsInput | $Enums.MembershipRole
    status?: EnumInvitationStatusFieldUpdateOperationsInput | $Enums.InvitationStatus
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutInvitationsNestedInput
  }

  export type InvitationUncheckedUpdateWithoutInvitedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumMembershipRoleFieldUpdateOperationsInput | $Enums.MembershipRole
    status?: EnumInvitationStatusFieldUpdateOperationsInput | $Enums.InvitationStatus
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizationId?: StringFieldUpdateOperationsInput | string
  }

  export type InvitationUncheckedUpdateManyWithoutInvitedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumMembershipRoleFieldUpdateOperationsInput | $Enums.MembershipRole
    status?: EnumInvitationStatusFieldUpdateOperationsInput | $Enums.InvitationStatus
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizationId?: StringFieldUpdateOperationsInput | string
  }

  export type AuditLogUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneWithoutAuditLogsNestedInput
    membership?: MembershipUpdateOneWithoutAuditLogsNestedInput
  }

  export type AuditLogUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    membershipId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuditLogUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    membershipId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MembershipCreateManyOrganizationInput = {
    id?: string
    role?: $Enums.MembershipRole
    status?: $Enums.MembershipStatus
    joinedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type InvitationCreateManyOrganizationInput = {
    id?: string
    email: string
    role?: $Enums.MembershipRole
    status?: $Enums.InvitationStatus
    token: string
    expiresAt: Date | string
    sentAt?: Date | string
    acceptedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    invitedById?: string | null
  }

  export type AuditLogCreateManyOrganizationInput = {
    id?: string
    action: string
    entity: string
    entityId: string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    userId?: string | null
    membershipId?: string | null
  }

  export type MembershipUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumMembershipRoleFieldUpdateOperationsInput | $Enums.MembershipRole
    status?: EnumMembershipStatusFieldUpdateOperationsInput | $Enums.MembershipStatus
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMembershipsNestedInput
    auditLogs?: AuditLogUpdateManyWithoutMembershipNestedInput
  }

  export type MembershipUncheckedUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumMembershipRoleFieldUpdateOperationsInput | $Enums.MembershipRole
    status?: EnumMembershipStatusFieldUpdateOperationsInput | $Enums.MembershipStatus
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    auditLogs?: AuditLogUncheckedUpdateManyWithoutMembershipNestedInput
  }

  export type MembershipUncheckedUpdateManyWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumMembershipRoleFieldUpdateOperationsInput | $Enums.MembershipRole
    status?: EnumMembershipStatusFieldUpdateOperationsInput | $Enums.MembershipStatus
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type InvitationUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumMembershipRoleFieldUpdateOperationsInput | $Enums.MembershipRole
    status?: EnumInvitationStatusFieldUpdateOperationsInput | $Enums.InvitationStatus
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invitedBy?: UserUpdateOneWithoutInvitationsNestedInput
  }

  export type InvitationUncheckedUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumMembershipRoleFieldUpdateOperationsInput | $Enums.MembershipRole
    status?: EnumInvitationStatusFieldUpdateOperationsInput | $Enums.InvitationStatus
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invitedById?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type InvitationUncheckedUpdateManyWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumMembershipRoleFieldUpdateOperationsInput | $Enums.MembershipRole
    status?: EnumInvitationStatusFieldUpdateOperationsInput | $Enums.InvitationStatus
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invitedById?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuditLogUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutAuditLogsNestedInput
    membership?: MembershipUpdateOneWithoutAuditLogsNestedInput
  }

  export type AuditLogUncheckedUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    membershipId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuditLogUncheckedUpdateManyWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    membershipId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuditLogCreateManyMembershipInput = {
    id?: string
    action: string
    entity: string
    entityId: string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    userId?: string | null
    organizationId?: string | null
  }

  export type AuditLogUpdateWithoutMembershipInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutAuditLogsNestedInput
    organization?: OrganizationUpdateOneWithoutAuditLogsNestedInput
  }

  export type AuditLogUncheckedUpdateWithoutMembershipInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuditLogUncheckedUpdateManyWithoutMembershipInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use OrganizationCountOutputTypeDefaultArgs instead
     */
    export type OrganizationCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = OrganizationCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MembershipCountOutputTypeDefaultArgs instead
     */
    export type MembershipCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MembershipCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use OrganizationDefaultArgs instead
     */
    export type OrganizationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = OrganizationDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MembershipDefaultArgs instead
     */
    export type MembershipArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MembershipDefaultArgs<ExtArgs>
    /**
     * @deprecated Use InvitationDefaultArgs instead
     */
    export type InvitationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = InvitationDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AuditLogDefaultArgs instead
     */
    export type AuditLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AuditLogDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}