import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

export default function useStoreUserEffect() {
  const { user } = useUser();
  // When this state is set we know the server
  // has stored the user.
  const storeUser = useMutation(api.users.store);
  // Call the `storeUser` mutation function to store
  // the current user in the `users` table and return the `Id` value.
  useEffect(() => {
    // Store the user in the database.
    // Recall that `storeUser` gets the user information via the `auth`
    // object on the server. You don't need to pass anything manually here.
    async function createUser() {
      const id = await storeUser();
    }
    createUser();
    // Make sure the effect reruns if the user logs in with
    // a different identity
  }, [storeUser, user?.id]);
}