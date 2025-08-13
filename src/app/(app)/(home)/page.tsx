import { getPayload } from "payload";
import configPromise from "@payload-config";
import React from "react";

const Page = async () => {
  const payload = await getPayload({
    config: configPromise,
  });

  const data = await payload.find({
    collection: "categories",
  });

  return <div>{JSON.stringify(data, null, 2)}</div>;
};

export default Page;
