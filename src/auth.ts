import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
// Your own logic for dealing with plaintext password strings; be careful!
import { getUser } from "./db/db";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: {},
        password: {},
      },

      authorize: async (credentials) => {

        if (!credentials?.username || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        let user = null
 
        // logic to verify if the user exists
        user = await getUser(credentials as { username: string; password: string });

        
 
        if (!user) {
          // No user found, so this is their first attempt to login
          // Optionally, this is also the place you could do a user registration
          throw new Error("Invalid credentials.")
        }
 
        // return user object with their profile data
        return user;
      },
    }),
  ],
})