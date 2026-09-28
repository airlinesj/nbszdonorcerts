import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const authOptions: AuthOptions = {
  session: { strategy: "jwt" },
  providers: [CredentialsProvider({
    name: "NBSZ credentials",
    credentials: { email: { label: "Email", type: "email" }, password: { label: "Password", type: "password" } },
    async authorize(credentials) {
      if (!credentials?.email || !credentials.password) return null;
      const user = await prisma.user.findUnique({ where: { email: credentials.email.toLowerCase() } });
      if (!user || !(await bcrypt.compare(credentials.password, user.passwordHash))) return null;
      return { id: user.id, email: user.email, role: user.role };
    }
  })],
  callbacks: {
    async jwt({ token, user }) { if (user) token.role = (user as { role: "ADMIN" | "CLERK" }).role; return token; },
    async session({ session, token }) { if (session.user) session.user.id = token.sub ?? ""; session.user.role = token.role as "ADMIN" | "CLERK"; return session; }
  },
  pages: { signIn: "/" }
};