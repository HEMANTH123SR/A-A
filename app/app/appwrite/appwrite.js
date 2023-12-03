import { Client, Account, ID } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const account = new Account(client);

const googleOauthSession = async () => {
  try {
    const res = await account.createOAuth2Session(
      "google",
      "http://localhost:3000/",
      "http://localhost:3000/sign-in-again"
    );
    console.log("appwrite :: google oauth session :: res", res);
  } catch (e) {
    console.log("appwrite :: google oauth session ::error ::", e);
  }
};

const getAccountDetails = async () => {
  try {
    const res = await account.get();
    console.log("appwrite :: get details :: res ", res);
    return res;
  } catch (e) {
    console.log("appwrite :: get details :: error ", e);
    return null;
  }
};

const deleteSession = async () => {
  try {
    await account.deleteSessions();
  } catch (e) {
    console.log("appwrite :: delete session :: error ", e);
  }
};

export { googleOauthSession, getAccountDetails, deleteSession };
