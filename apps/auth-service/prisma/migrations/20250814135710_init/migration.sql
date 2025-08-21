-- CreateTable
CREATE TABLE "public"."auth_users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "is_email_verified" BOOLEAN NOT NULL DEFAULT false,
    "verification_token" TEXT,
    "reset_password_token" TEXT,
    "reset_password_expires_at" TIMESTAMP(3),
    "last_login_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "auth_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."invitation_tokens" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "invited_by" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "used_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "invitation_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."refresh_tokens" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "refresh_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "auth_users_email_key" ON "public"."auth_users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "auth_users_verification_token_key" ON "public"."auth_users"("verification_token");

-- CreateIndex
CREATE UNIQUE INDEX "auth_users_reset_password_token_key" ON "public"."auth_users"("reset_password_token");

-- CreateIndex
CREATE UNIQUE INDEX "invitation_tokens_email_key" ON "public"."invitation_tokens"("email");

-- CreateIndex
CREATE UNIQUE INDEX "invitation_tokens_token_key" ON "public"."invitation_tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "refresh_tokens_token_key" ON "public"."refresh_tokens"("token");

-- AddForeignKey
ALTER TABLE "public"."invitation_tokens" ADD CONSTRAINT "invitation_tokens_invited_by_fkey" FOREIGN KEY ("invited_by") REFERENCES "public"."auth_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."refresh_tokens" ADD CONSTRAINT "refresh_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."auth_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
