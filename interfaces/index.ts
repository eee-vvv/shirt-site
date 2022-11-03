export type Product = {
  id?: number;
  name: string;
  price: number;
  measurements: string;
  description: string;
  sold: boolean;
  imagesId: string;
};


export const isProduct = (thing: any) => {
  if (
    thing.name &&
    typeof thing.name === "string" &&
    thing.price !== null &&
    typeof thing.price === "number" &&
    thing.measurements &&
    typeof thing.measurements === "string" &&
    thing.description &&
    typeof thing.description === "string" &&
    thing.sold !== null &&
    typeof thing.sold === "boolean" &&
    thing.imagesId &&
    typeof thing.imagesId === "string"
  ) {
    return true;
  }
  return false;
};

export const isProductJSON = (thing: any) => {
  if (
    thing.name &&
    thing.price &&
    thing.measurements &&
    thing.description &&
    thing.sold !== null &&
    thing.imagesId &&
    !isNaN(parseInt(thing.price)) &&
    (thing.sold === 'true' || 
    thing.sold === 'false')
  ) {
  return true
  }
  return false
}