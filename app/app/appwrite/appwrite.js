import { Client, Account, ID, Databases, Storage } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);
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

const createCoverImage = async (image) => {
  try {
    let id = ID.unique();
    await storage.createFile(
      process.env.NEXT_PUBLIC_COVER_IMAGE_STORAGE,
      id,
      image
    );
    return id;
  } catch (e) {
    console.log("appwrite :: error :: create cover image", e);
  }
};

const createMultipleProductImages = async (images) => {
  try {
    let multipleIds = [ID.unique(), ID.unique(), ID.unique(), ID.unique()];
    await storage.createFile(
      process.env.NEXT_PUBLIC_PRODUCT_IMAGE_STORAGE,
      multipleIds[0],
      images[0]
    );
    await storage.createFile(
      process.env.NEXT_PUBLIC_PRODUCT_IMAGE_STORAGE,
      multipleIds[1],
      images[1]
    );
    await storage.createFile(
      process.env.NEXT_PUBLIC_PRODUCT_IMAGE_STORAGE,
      multipleIds[2],
      images[2]
    );
    await storage.createFile(
      process.env.NEXT_PUBLIC_PRODUCT_IMAGE_STORAGE,
      multipleIds[3],
      images[3]
    );
    return multipleIds;
  } catch (e) {
    console.log("appwrite :: error :: creat multiple prodcut images :: ", e);
  }
};

const createProduct = async ({
  productName,
  productPrice,
  productPriceBeforeDiscount,
  productDescription,
  colours,
  fabrics,
  coverImage,
  productImages,
  tags,
}) => {
  try {
    await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_COLLECTION_ID,
      ID.unique(),
      {
        name: productName,
        currentPrice: productPrice,
        priceBeforeDiscount: productPriceBeforeDiscount,
        colours: colours,
        prodcutDescription: productDescription,
        tags: tags,
        fabric: fabrics,
        coverImages: await createCoverImage(coverImage),
        multipleSareeImages: await createMultipleProductImages(productImages),
      }
    );
  } catch (e) {
    console.log("appwrite :: error :: create prodcut ", e);
  }
};

export { googleOauthSession, getAccountDetails, deleteSession, createProduct };
