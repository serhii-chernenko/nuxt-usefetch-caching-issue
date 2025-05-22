export default defineEventHandler(async () => {
  return await useKv().delete("items");
});