import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useConvexAuth, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { useUserStore } from "@/context/store";

export default function useStoreUserEffect() {
  const { isAuthenticated } = useConvexAuth();
  const { user } = useUser();
  const { setUserId } = useUserStore();
  // When this state is set we know the server
  // has stored the user.
  const storeUser = useMutation(api.users.store);
  // Call the `storeUser` mutation function to store
  // the current user in the `users` table and return the `Id` value.
  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
    // Store the user in the database.
    // Recall that `storeUser` gets the user information via the `auth`
    // object on the server. You don't need to pass anything manually here.
    async function createUser() {
      const id = await storeUser();
      setUserId(id);
    }
    createUser();
    // Make sure the effect reruns if the user logs in with
    // a different identity
  }, [isAuthenticated, storeUser, user?.id, setUserId]);
}
