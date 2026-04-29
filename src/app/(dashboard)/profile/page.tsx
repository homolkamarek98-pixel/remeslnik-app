import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { ProfileForm } from "./profile-form";

export default async function ProfilePage() {
  const session = await auth();
  const user = await prisma.user.findUnique({
    where: { id: session?.user?.id as string },
    select: {
      name: true,
      companyName: true,
      ico: true,
      dic: true,
      street: true,
      city: true,
      zip: true,
      bankAccount: true,
      bankName: true,
    },
  });

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Firemní profil</h1>
      <ProfileForm user={user} />
    </div>
  );
}
