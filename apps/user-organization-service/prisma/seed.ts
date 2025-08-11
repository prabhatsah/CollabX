import { MembershipRole, UserStatus, MembershipStatus } from "@app/common";
import { PrismaClient } from "./generated/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding user-organization database...");

  // Create test users
  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: "john.doe@example.com" },
      update: {},
      create: {
        email: "john.doe@example.com",
        fullName: "John Doe",
        status: UserStatus.ACTIVE,
        isEmailVerified: true,
      },
    }),
    prisma.user.upsert({
      where: { email: "jane.smith@example.com" },
      update: {},
      create: {
        email: "jane.smith@example.com",
        fullName: "Jane Smith",
        status: UserStatus.ACTIVE,
        isEmailVerified: true,
      },
    }),
    prisma.user.upsert({
      where: { email: "bob.wilson@example.com" },
      update: {},
      create: {
        email: "bob.wilson@example.com",
        fullName: "Bob Wilson",
        status: UserStatus.ACTIVE,
        isEmailVerified: true,
      },
    }),
  ]);

  console.log(
    "Created users:",
    users.map((u) => u.email)
  );

  // Create test organizations
  const organizations = await Promise.all([
    prisma.organization.upsert({
      where: { slug: "acme-corp" },
      update: {},
      create: {
        name: "Acme Corporation",
        slug: "acme-corp",
        description: "A leading technology company",
        createdById: users[0].id,
      },
    }),
    prisma.organization.upsert({
      where: { slug: "startup-inc" },
      update: {},
      create: {
        name: "Startup Inc",
        slug: "startup-inc",
        createdById: users[1].id,
      },
    }),
  ]);

  console.log(
    "Created organizations:",
    organizations.map((o) => o.name)
  );

  // Create memberships
  const memberships = await Promise.all([
    // John as owner of Acme Corp
    prisma.membership.upsert({
      where: {
        userId_organizationId: {
          userId: users[0].id,
          organizationId: organizations[0].id,
        },
      },
      update: {},
      create: {
        userId: users[0].id,
        organizationId: organizations[0].id,
        role: MembershipRole.ADMIN,
        status: MembershipStatus.ACTIVE,
      },
    }),
    // Jane as owner of Startup Inc
    prisma.membership.upsert({
      where: {
        userId_organizationId: {
          userId: users[1].id,
          organizationId: organizations[1].id,
        },
      },
      update: {},
      create: {
        userId: users[1].id,
        organizationId: organizations[1].id,
        role: MembershipRole.SUPPORT,
        status: MembershipStatus.ACTIVE,
      },
    }),
    // Bob as member of both organizations
    prisma.membership.upsert({
      where: {
        userId_organizationId: {
          userId: users[2].id,
          organizationId: organizations[0].id,
        },
      },
      update: {},
      create: {
        userId: users[2].id,
        organizationId: organizations[0].id,
        role: MembershipRole.USER,
        status: MembershipStatus.ACTIVE,
      },
    }),
    prisma.membership.upsert({
      where: {
        userId_organizationId: {
          userId: users[2].id,
          organizationId: organizations[1].id,
        },
      },
      update: {},
      create: {
        userId: users[2].id,
        organizationId: organizations[1].id,
        role: MembershipRole.ADMIN,
        status: MembershipStatus.ACTIVE,
      },
    }),
    // Jane as member of Acme Corp
    prisma.membership.upsert({
      where: {
        userId_organizationId: {
          userId: users[1].id,
          organizationId: organizations[0].id,
        },
      },
      update: {},
      create: {
        userId: users[1].id,
        organizationId: organizations[0].id,
        role: MembershipRole.ADMIN,
        status: MembershipStatus.ACTIVE,
      },
    }),
  ]);

  console.log("Created memberships:", memberships.length);

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
