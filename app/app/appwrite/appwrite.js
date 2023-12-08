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

function generateUniqueId() {
  const timestamp = new Date().getTime();
  const randomNumber = Math.floor(Math.random() * 1000000);
  const uniqueId = `${timestamp.toString(16)}${randomNumber.toString(16)}`;
  return uniqueId;
}

const createCoverImage = async (image) => {
  try {
    if (!image || !image instanceof File) {
      console.log(image);
      throw new Error("Invalid or missing image file");
    }

    let id = generateUniqueId();
   const res=await storage.createFile(
      process.env.NEXT_PUBLIC_COVER_IMAGE_STORAGE,
      id,
      image
    );
    console.log("appwrite cover image return value ",res);
    return id;
  } catch (e) {
    console.log("id ", id);
    console.log("appwrite :: error :: create cover image", e);
  }
};

const createMultipleProductImages = async (images) => {
  try {
    let multipleIds = [generateUniqueId(), generateUniqueId(), generateUniqueId(), generateUniqueId()];
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

const createProduct = async (
  productName,
  productDescription,
  currentPrice,
  priceBeforeDiscount,
  fabric,
  color,
  coverImage,
  multipleImages
) => {
  console.log("productName", productName);
  console.log("currentPrice", currentPrice);
  console.log("priceBeforeDiscount", priceBeforeDiscount);
  console.log("prodcutDescription", productDescription);
  console.log("colour", color);
  console.log("fabric", fabric);
  console.log("cover image appwrite ", coverImage);
  console.log("multiple images", multipleImages);
  try {
    await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_COLLECTION_ID,
      ID.unique(),
      {
        name: productName,
        currentPrice: currentPrice,
        priceBeforeDiscount: priceBeforeDiscount,
        colour: color,
        prodcutDescription: productDescription,
        fabric: fabric,
        coverImages: await createCoverImage(coverImage),
        multipleSareeImages: await createMultipleProductImages(multipleImages),
      }
    );
    console.log("success");
  } catch (e) {
    console.log("appwrite :: error :: create prodcut ", e);
  }
};

export { googleOauthSession, getAccountDetails, deleteSession, createProduct };
