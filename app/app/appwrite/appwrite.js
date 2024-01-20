import { Client, Account, ID, Databases, Storage, Query } from "appwrite";


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

const getProducts = async (
  colorArray,
  fabricArray,
  minPriceRange,
  maxPriceRange
) => {
  console.log(colorArray);
  console.log(fabricArray);
  try {
    const res = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_COLLECTION_ID,
      [
        Query.select(["currentPrice", "coverImages", "name", "$id"]),
        Query.equal("colour", [colorArray]),
        Query.equal("fabric", [fabricArray]),
        Query.greaterThanEqual("currentPrice", minPriceRange),
        Query.lessThanEqual("currentPrice", maxPriceRange),
      ]
    );
    console.log("appwrite :: success :: get products ", res);
    return res;
  } catch (e) {
    console.log("appwrite :: error :: get products", e);
  }
};

const getProduct = async (id) => {
  try {
    const res = await databases.getDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_COLLECTION_ID,
      id
    );
    console.log("appwrite :: success :: get product ", res);
    return res;
  } catch (e) {
    console.log("appwrite :: error :: get product", e);
  }
};

const deleteProduct = async (id, coverImage, displayImages) => {
  try {
    await databases.deleteDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_COLLECTION_ID,
      id
    );
    await deleteCoverImages(coverImage);
    await deleteDisplayImages(displayImages);
    console.log(id, coverImage, displayImages);
    return true;
  } catch (e) {
    console.log("appwrite :: delete product :: error", e);
    return false;
  }
};

const deleteCoverImages = async (image) => {
  try {
    const id = image
      .replace(
        "https://cloud.appwrite.io/v1/storage/buckets/656eb430ce8aff9b7554/files/",
        ``
      )
      .split("/")[0];
    await storage.deleteFile(process.env.NEXT_PUBLIC_COVER_IMAGE_STORAGE, id);
  } catch (e) {
    console.log("appwrite :: delete cover image :: error ", e);
  }
};

const deleteDisplayImages = async (images) => {
  try {
    const ids = images.map((image) => {
      return image
        .replace(
          "https://cloud.appwrite.io/v1/storage/buckets/656eb430ce8aff9b7554/files/",
          ``
        )
        .split("/")[0];
    });
    await storage.deleteFile(
      process.env.NEXT_PUBLIC_PRODUCT_IMAGE_STORAGE,
      ids[0]
    );
    await storage.deleteFile(
      process.env.NEXT_PUBLIC_PRODUCT_IMAGE_STORAGE,
      ids[2]
    );
    await storage.deleteFile(
      process.env.NEXT_PUBLIC_PRODUCT_IMAGE_STORAGE,
      ids[3]
    );
    await storage.deleteFile(
      process.env.NEXT_PUBLIC_PRODUCT_IMAGE_STORAGE,
      ids[4]
    );
  } catch (e) {
    console.log("appwrite :: delete display images :: error", e);
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

const addCartProduct = async (
  userId,
  productId,
  name,
  currentPrice,
  colour,
  coverImage
) => {
  try {
    // const cartRes = await databases.listDocuments(
    //   process.env.NEXT_PUBLIC_DATABASE_ID,
    //   process.env.NEXT_PUBLIC_APPWRITE_CARTCOLLECTION_ID,
    //   [Query.equal("productId", [userId])]
    // );
    // if (cartRes.documents.length < 1) {}
    await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_CARTCOLLECTION_ID,
      ID.unique(),
      {
        userId,
        productId,
        name,
        currentPrice,
        colour,
        coverImage,
      }
    );

    return true;
  } catch (e) {
    console.log("appwrite :: add card product :: error", e);
    return false;
  }
};

const getCartDetails = async (userId) => {
  try {
    return await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_CARTCOLLECTION_ID,
      [Query.equal("userId", [userId])]
    );
  } catch (e) {
    console.log("appwrite :: get cart details :: error", e);
  }
};

const removeChart = async (id) => {
  try {
    await databases.deleteDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_CARTCOLLECTION_ID,
      id
    );
  } catch (e) {
    console.log("appwrite :: remove chart :: error", e);
  }
};

export {
  googleOauthSession,
  getAccountDetails,
  deleteSession,
  createProduct,
  getImage,
  getProducts,
  getProduct,
  deleteProduct,
  addCartProduct,
  getCartDetails,
  removeChart,
};
