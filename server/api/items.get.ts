export default defineEventHandler(async () => {
  return JSON.parse(await useKv().get("items") ?? "[]");
});