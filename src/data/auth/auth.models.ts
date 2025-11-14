import z from "zod";

export namespace AuthModels {
  export const profileSchema = z.object({
    // Define your app users profile schema here
  });
  export type Profile = z.infer<typeof profileSchema>;
}
