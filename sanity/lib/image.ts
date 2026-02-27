import createImageUrlBuilder from "@sanity/image-url";
import { dataset, projectId } from "../env";

const imageBuilder = createImageUrlBuilder({ projectId, dataset });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const urlFor = (source: any) => imageBuilder.image(source);
