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
    if (!image || !image instanceof File) {
      console.log(image);
      throw new Error("Invalid or missing image file");
    }
    const res = await storage.createFile(
      process.env.NEXT_PUBLIC_COVER_IMAGE_STORAGE,
      ID.unique(),
      image
    );
    console.log("appwrite cover image return value ", res);
    return `https://cloud.appwrite.io/v1/storage/buckets/656eb430ce8aff9b7554/files/${res.$id}/preview?project=656aa2e6d65c98e96c84`;
  } catch (e) {
    console.log("appwrite :: error :: create cover image", e);
  }
};

const createMultipleProductImages = async (images) => {
  try {
    const res1 = await storage.createFile(
      process.env.NEXT_PUBLIC_PRODUCT_IMAGE_STORAGE,
      ID.unique(),
      images[0]
    );
    const res2 = await storage.createFile(
      process.env.NEXT_PUBLIC_PRODUCT_IMAGE_STORAGE,
      ID.unique(),
      images[1]
    );
    const res3 = await storage.createFile(
      process.env.NEXT_PUBLIC_PRODUCT_IMAGE_STORAGE,
      ID.unique(),
      images[2]
    );
    const res4 = await storage.createFile(
      process.env.NEXT_PUBLIC_PRODUCT_IMAGE_STORAGE,
      ID.unique(),
      images[3]
    );
    return [
      `https://cloud.appwrite.io/v1/storage/buckets/656eb67e21c2fa4c3d8e/files/${res1.$id}/preview?project=656aa2e6d65c98e96c84`,
      `https://cloud.appwrite.io/v1/storage/buckets/656eb67e21c2fa4c3d8e/files/${res2.$id}/preview?project=656aa2e6d65c98e96c84`,
      `https://cloud.appwrite.io/v1/storage/buckets/656eb67e21c2fa4c3d8e/files/${res3.$id}/preview?project=656aa2e6d65c98e96c84`,
      `https://cloud.appwrite.io/v1/storage/buckets/656eb67e21c2fa4c3d8e/files/${res4.$4id}/preview?project=656aa2e6d65c98e96c84`,
    ];
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

const getImage = async () => {
  try {
    const res = await storage.getFilePreview(
      process.env.NEXT_PUBLIC_COVER_IMAGE_STORAGE,
      "18c47f3efa6ddf72"
    );
    console.log("appwrite getimage response", res);
  } catch (e) {
    console.log("appwrite getimage error", e);
  }
};

export {
  googleOauthSession,
  getAccountDetails,
  deleteSession,
  createProduct,
  getImage,
};
